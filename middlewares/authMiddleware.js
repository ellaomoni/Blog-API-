const jwt = require('jsonwebtoken');
const authMiddleware = (req, res, next) => {
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

module.exports = authMiddleware; 