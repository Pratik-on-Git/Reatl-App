// We've to create a router for the auth routes.
const express = require('express');
const authController = require('../controllers/auth.controller');

// We'll create a router for the auth routes.
const router = express.Router();

// We'll create a function to register a user. The (req, res) is the request and response object which we can also call controller.
// Logic of the function is written in the controller file auth.controller.js.

// User Routes
router.post('/user/register', authController.registerUser);
router.post('/user/login', authController.loginUser);
router.get('/user/logout', authController.logoutUser)

// Food Partner Routes
router.post('/foodpartner/register', authController.registerFoodPartner);
router.post('/foodpartner/login', authController.loginFoodPartner);
router.get('/foodpartner/logout', authController.logoutFoodPartner)

module.exports = router;