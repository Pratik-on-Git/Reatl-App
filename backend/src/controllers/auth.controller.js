// We've to create a controller for the auth routes.
const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function registerUser(req, res) {
    // Destructuring the request body. fullName, email, password are the fields that are required to register a user.
    // By deafult server that we create from express.js is not able to parse the request body.
    // So we'll use the express.json() middleware to parse the request body in app.js file.
    const { fullName, email, password } = req.body

    // Now We'll check if the email already exists in the database `auth.controller.js`.
    const isUserAlreadyExists = await userModel.findOne({
        email
    })
    if(isUserAlreadyExists){
        return res.status(400).json({
            message: "User already exists"
        })
    }

    // Now we'll hash the password.
    const hashedPassword = await bcrypt.hash(password, 10);
    // Now we'll create a new user in the database.
    const user = await userModel.create({
        fullName,
        email,
        password: hashedPassword
    })
}

module.exports = { registerUser }
