const mongoose = require('mongoose');
const validator = require('validator');

const cartSchema = mongoose.Schema({
    userID: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    quantity: {
        type: String,
    },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product'
    }
})

module.exports = mongoose.model('Cart', cartSchema)