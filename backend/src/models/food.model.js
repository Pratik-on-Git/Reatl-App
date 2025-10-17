const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    video: {
    // In Database we'll only store the link of the video.
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    foodPartnerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'foodpartner',
        required: true,
    }
});

const foodModel = mongoose.model('food', foodSchema);

module.exports = foodModel;
