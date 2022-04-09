const User = require('../models/User.Model');
const jwt = require('jsonwebtoken');

exports.isAuthenticatedUser = async (req, res, next) => {

    console.log("Works");

    const token = req.headers;
    console.log(token.authorization);

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Login First',
        })
    }

    const decoded = jwt.verify(token.authorization, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id);

    next();

}

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            res.status(403).json({
                success: false,
                message: `Role ${req.user.role} Is Not Allowed To Access This Resourse`
            })
        } else {
            next()
        }
    }
}