const { request } = require('express')
const Leaves = require('../models/Leaves.Model')
const sendEmail = require('../utils/sendEmail');

exports.applyLeaves= async(req,res) =>{
    const leaves = await Leaves.create(req.body)

    if(!leaves){
        res.status(401).json({
            success: false,
            message: 'Apply leave was failed'
        })
    }

    res.status(200).json({
        success: true,
        leaves
    })
}

exports.getLeaves = async(req,res) =>{
    const leaves = await Leaves.find()

    if(!leaves){
        res.status(401).json({
            success: false,
            message: 'get leaves was failed'
        })
    }

    res.status(200).json({
        success: true,
        leaves
    })
}

exports.approveLeaves = async(req,res)=>{
    console.log(req.params.id);
    const leaves = await Leaves.findByIdAndUpdate(req.params.id,{isApproved:true})

    if(!leaves){
        res.status(401).json({
            success: false,
            message: 'get leaves was failed'
        })
    }
    const data = leaves
    sendEmail(4,data);
    res.status(200).json({
        success: true,
        leaves
    })
}

exports.rejectLeaves = async(req,res)=>{
    console.log(req.params.id);
    const leaves = await Leaves.findByIdAndUpdate(req.params.id,{isApproved:false});

    if(!leaves){
        res.status(401).json({
            success: false,
            message: 'get leaves was failed'
        })
    }
    const data = leaves
    sendEmail(5,data);
    res.status(200).json({
        success: true,
        leaves
    })
}