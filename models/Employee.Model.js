const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const employeeSchema = mongoose.Schema({
    fName: {
        type: String,
        required: true
    },
    Nic: {
        type: String,
        required: true
    },
    emCoNo: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: [true, 'Please Enter Your Email'],
        unique: true,
        validate: [validator.isEmail, 'Please Enter Valid Email Address']
    },
    password: {
        type: String,
        required: [true, 'Please Enter Password'],
        minLength: [5, 'Your Password must be longer than 5 characters'],
        select: false
    },
    age: {
        type: Number,
        required: true
    },
    emAddress: {
        line1: {
            type: String,
            required: true
        },
        line2: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        }
    },
    gender: {
        type: String,
        required: true
    },
    emType: {
        type: String,
        required: true
    }
})

employeeSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
}

module.exports = mongoose.model('Employee', employeeSchema)