const express = require('express')
const foodController = require('../controllers/food.controller')
const router = express.Router()
const authMiddleware = require('../middlewares/auth.middleware')
const multer = require('multer')

const upload = multer({
    storage: multer.memoryStorage(),
})

// POST /api/food [protected] -> Normal User can't create a food. Only Food Partner can create a food.
// authMiddleware is used to authenticate the food partner. 
router.post('/', authMiddleware.authFoodPartnerMiddleware, upload.single('video'), foodController.createFood)

module.exports = router