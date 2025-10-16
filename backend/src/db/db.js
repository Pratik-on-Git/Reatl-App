// We'll Connect to the MongoDB database.
const mongoose = require('mongoose');
// How my mongodb database is connected to the server.
function connectDB(){
    // Local Database URL is used to connect to the MongoDB database. Database name is "reatl".
    mongoose.connect("mongodb://localhost:27017/reatl")
    // If the connection is successful, the following message will be printed to the console.
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log("error connecting to MongoDB", err);
    });
}
module.exports = connectDB;