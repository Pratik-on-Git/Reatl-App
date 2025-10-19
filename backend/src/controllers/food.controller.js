const foodModel = require('../models/food.model');
const storageService = require('../services/storage.service');


// First Controller will help us to upload videos of the food items.
// Will add a description to the food item. Will add a name of the food item.
// after uploading all these things we'll create a food item in the database.
async function createFood(req, res){
    console.log(req.foodPartner)
    console.log(req.body)
    console.log(req.file)

    const fileUploadResult = await storageService.uploadFile(req.file.buffer, "<unique_name>")
    
    res.send("Food Item Created")
}

module.exports = { createFood }
