// We'll Create a simple Express.js server.
const express = require('express');
const cookieParser = require('cookie-parser');
// Instance of the express server is created.
const app = express();
// We'll use the express.json() middleware to parse the request body. This is a built-in middleware function in Express.js. It is used to parse the request body and convert it into a JSON object from auth.controller.js file.
app.use(cookieParser());
app.use(express.json());
// 
app.get('/', (req, res) => {
    res.send('Welcome to the Reatl API');
});
// Exporting the app to the server.js file. We'll use this app in the server.js file.
module.exports = app;