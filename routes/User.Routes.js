const express = require('express');
const router = express.Router();

const { registerUser,
    confirmationEmail,
    loginUser,
    updatePassword,
    updateProfile,
    getUserProfile,
    forgotPassword,
    resetPassword,
    logout } = require('../controllers/User.Controller');
const { isAuthenticatedUser, authorizeRoles } = require('../utils/authenticator')

//Register User
router.route('/signup').post(registerUser);

//Email Confirmation
router.route('/confirmation/:token').get(confirmationEmail);

//Get User Profile
router.route('/profile').get(isAuthenticatedUser, getUserProfile);


module.exports = router;