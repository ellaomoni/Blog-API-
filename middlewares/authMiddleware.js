const jwt = require('jsonwebtoken');
const User = require('../models/user');
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({ messaage: 'No token provided, authorization denied.'});
    }

    const token = authHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error){
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({message: 'Token expired. Please login again.'});
        }
        return res.status(403).json ({ message: 'Token is not valid'});
    }
};


 const isAdmin = async (req, res, next) => {
        try{
            const user = await User.findByid(req.user.id);
            if(!user){
                return res.status(404).json({message: 'User not found'});
            }
            if(user.role !== 'admin'){
                return res.status(403).json({message: ' Access Denied. You are not authorized to access this route'});
            }
            next();
        }catch(error){
            return res.status(500).json({message: 'Internal server error', error: error.message});
        }
 }

module.exports = {verifyToken, isAdmin};

