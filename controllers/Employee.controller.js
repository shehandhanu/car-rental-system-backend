const Employee = require('../models/Employee.Model')

//add Employee
exports.addEmployee= async(req,res) =>{
    const emp = await Employee.create(req.body)

    if(!emp){
        res.status(401).json({
            success: false,
            message: 'Add employee was failed'
        })
    }

    res.status(200).json({
        success: true,
        emp
    })
}

//get employees
exports.getEmployees = async(req,res) =>{
    const emp = await Employee.find()

    if(!emp){
        res.status(401).json({
            success: false,
            message: 'get employee was failed'
        })
    }

    res.status(200).json({
        success: true,
        emp
    })
}