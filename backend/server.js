// We'll Start a simple Express.js server.
// Importing the app from the app.js file.
require('dotenv').config();
const app = require('./src/app');
// We'll Connect to the MongoDB database.
const connectDB = require('./src/db/db');
// MongoDB Database is called here.
connectDB();
// Server is running on port 3000.
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});