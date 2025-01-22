const User = require('../models/user');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const userSignUp = async (req, res) => {
    try{
        await body ('name', 'name is requuired').notEmpty().run(req);
        await body ('email', 'email is required').notEmpty().run(req);
        await body ('password', 'password must be at least 8 characters').isLength({min: 8}).run(req);
    

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    // check if user exist
    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(400).json({errors: [{msg: 'User already exists'}]});
    }

    const isFirstUser = (await User.countDocuments()) === 0;
    const role = isFirstUser ? 'admin' : 'user';

    // create new user
    const newUser = new User({
        name: name,
        email: email,
        password: password,
        role: role,
    });
    
    //save user to database
    await newUser.save();

    const token = jwt.sign(
        {id: newUser._id},
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    res.status(201).json({ message: "User signed up successfully",
    token : token,
    user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
    },
    });
    } catch(error) {
        res.status(500).json({message: 'Internal Server Error', error: error.message });
    }

};

const userLogin = async (req, res) => {
try {
    const {email, password} = req.body 

    if(!email || !password) {
        return res.status(400).json({errors: [{msg: 'Please provide email and password'}]});
    }

    const user = await User.findOne({email});
    if(!user){
        return res.status(401).json({errors: [{msg: 'Invalid email. Try again'}]});
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({errors: [{msg: 'Invalid password. Try again'}]});
    }

    const token = jwt.sign(
        {id: user._id},
        process.env.JWT_SECRET,
        {expiresIn: '1h'}
    );

    res.status(200).json({
        message: 'Login successful',
        token, 
        user:{
            id: user.id,
            name: user.name,
            email: user.email,
        },
    });
} catch (error) {
    res.status(500).json({message: 'Internal Server error', error: error.message});
}
}
module.exports = {userSignUp: userSignUp,
    userLogin: userLogin,
}