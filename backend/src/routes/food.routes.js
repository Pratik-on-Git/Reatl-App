const express = require('express')
const router = express.Router()

// POST /api/food [protected] -> Normal User can't create a food. Only Food Partner can create a food.
router.post('/',){

}

module.exports = router