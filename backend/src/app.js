// We'll Create a simple Express.js server.
const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World');
});
// Exporting the app to the server.js file. We'll use this app in the server.js file.
module.exports = app;