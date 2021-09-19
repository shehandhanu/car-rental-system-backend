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

//get employees By Id
exports.getEmployeeById = async(req,res) =>{
    const emp = await Employee.findById(req.params.id)

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

exports.deleteEmployee = async (req,res) =>{
    const emp = await Employee.findByIdAndDelete(req.params.id)

    if(!emp){
        res.status(401).json({
            success: false,
            message: 'delete employee was failed'
        })
    }

    res.status(200).json({
        success: true,
        emp
    })
}

exports.updateEmployee = async (req, res) => {

    let emp = await Employee.findById(req.params.id);


    if (!emp) {
        return res.status(404).json({
            success: false,
            message: 'Employee Not Found'
        })
    }

    emp = await Employee.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        emp
    })
}