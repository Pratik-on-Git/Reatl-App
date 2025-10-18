const foodPartnerModel = require('../models/foodpartner.model');
const jwt = require('jsonwebtoken');

// in middleware we've three parameters req, res, next.
async function authFoodPartnerMiddleware(req, res, next){
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message: "Unauthorized Access"
        })
    }
    try{
        // jwt.verify() is used to verify the token.
        // if the token is valid then we'll find the food partner in the database. We saved `foodPartner._id` in the token in auth.controller.js file.
        // if the token is valid then it'll be in decoded.id as an object.
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // if the token is valid then we'll find the food partner based on the decoded.id.
        const foodPartner = await foodPartnerModel.findById(decoded.id);
        
        // we're creating a new property in req object to store the food partner. 
        // We're setting the value of the property to the foodPartner.
        req.foodPartner = foodPartner;
        // next() is used to move to the next middleware. Whatever logic I write after this middleware will be executed.
        next();

    }
    catch(err){
        return res.status(401).json({
            message: "Unauthorized Access"
        })
    }
}

module.exports = { authFoodPartnerMiddleware }