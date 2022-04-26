const mongoose = require('mongoose');
const validator = require('validator');

const productSchema = mongoose.Schema({
    productName: {
        type: String,
    },
    type: {
        type: String,
    },
    productDescription: {
        type: String,
    },
    price: {
        type: Number,
    },
    image: {
        type: String,
    },
    availability: {
        type: Number,
    }
})

module.exports = mongoose.model('Product', productSchema)