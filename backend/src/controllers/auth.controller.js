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

// Now we'll create a token. jwt.sign() is a method that creates a token.
// id: user._id is the payload of the token. Object id is the unique identifier of the user.
    const token = jwt.sign({
        id: user._id
    }, "0e70fbead3c3b9baaa566e98f4ffabb4")
    // Saving the token in the name of "token" in the cookie.
    res.cookie("token", token)

    // New resource is being created so we're using 201 status code.
    return res.status(201).json({
        message: "User registered successfully",
        user:{
            fullName : user.fullName,
            email : user.email,
            _id : user._id
        }
    })
}

async function loginUser(req, res){
    const { email, password } = req.body;

    const user = await userModel.findOne({
        email
    })
    if(!user){
        return res.status(400).json({
            message: "Invalid Email or Password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        return res.status(400).json({
            message: "Invalid Email or Password"
        })
    }

    const token = jwt.sign({
        id: user._id
    }, "0e70fbead3c3b9baaa566e98f4ffabb4")
    res.cookie("token", token)

    return res.status(200).json({
        message: "User Logged In Successfully",
        user:{
            fullName : user.fullName,
            email : user.email,
            _id : user._id
        }
    })
}

module.exports = { registerUser, loginUser }
