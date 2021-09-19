const Leaves = require('../models/Leaves.Model')

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