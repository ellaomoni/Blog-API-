const User = require('../models/user');
const { body, validateResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const userSignUp = async (req, res) => {
    try{
        await body ('name', 'name is requuired').notEmpty().run(req);
        await body ('email', 'email is required').notEmpty().run(req);
        await body ('password', 'password must be at least 8 characters').isLength({min: 8}).run(req);
    

    const errors = validateResult(req);
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

    // create new user
    const newUser = new User({
        name: name,
        email: email,
        password: password,
    });

    await newUser.save

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
    },
    });
    } catch(error) {
        res.status(500).json({message: 'Internal Server Error', error: error.message });
    }

};