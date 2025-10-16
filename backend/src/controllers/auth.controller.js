// We've to create a controller for the auth routes.
const userModel = require('../models/user.model');

async function registerUser(req, res) {
    // Destructuring the request body. fullName, email, password are the fields that are required to register a user.
    // By deafult server that we create from express.js is not able to parse the request body.
    // So we'll use the express.json() middleware to parse the request body in app.js file.
    const { fullName, email, password } = req.body
}