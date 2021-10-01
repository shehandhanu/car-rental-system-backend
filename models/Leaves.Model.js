const mongoose = require('mongoose');
const validator = require('validator');

const leavesSchema = mongoose.Schema({
    emName:{
        type: String,
        required:true
    },
    noOfDates:{
        type: Number,
        required:true
    },
    startDate:{
        type: Date,
        required:true
    },
    endDate:{
        type: Date,
        required:true
    },
    email:{
        type: String,
        required: [true, 'Please Enter Your Email'],
        unique: true,
        validate: [validator.isEmail, 'Please Enter Valid Email Address']
    },
    reason:{
        type: String,
        required:true
    },
    isApproved:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model('Leaves',leavesSchema)