const mongoose = require('mongoose');

const reservationSchema = mongoose.Schema({
    due: {
        type: Date,
        required: true
    },
    to: {
        type: Date,
        required: true
    },
    carID: {
        type: mongoose.Schema.ObjectId,
        ref: 'Vehical'
    },
    userID: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    payment: {
        type: Number,
        require: true,
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    paymentDetails: {
        cardNumber: {
            type: String,
        },
        cardOwnerName: {
            type: String,
        },
        expireDate: {
            type: Date,
        },
        cvv: {
            type: Number,
        }
    }
})

module.exports = mongoose.model('Reservation', reservationSchema)