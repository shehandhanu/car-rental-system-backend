const Employee = require('../models/Employee.Model')
const sendToken = require('../utils/jwtToken');

//add Employee
exports.addEmployee = async (req, res) => {
    const emp = await Employee.create(req.body)

    if (!emp) {
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

exports.loginEmp = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(204).json({
            success: false,
            message: 'Email Or Password Empty'
        })
    }

    //finding user in data bsae
    const employee = await Employee.findOne({ email }).select('+password');

    if (!employee) {
        return next(new ErrorHandler('Invalid Email Or Password', 401));
    }

    //checks password is correct 
    if (employee.password !== req.body.password) {
        res.status(201).json({
            success: false,
            message: "Your User name or password is incorrect"
        })
    }

    const tokendata = await sendToken(employee);

    console.log(tokendata);

    const token = tokendata.token
    const option = tokendata.option

    res.status(200).cookie('token', token, option).json({
        success: true,
        token,
        employee
    })
}

//get employees
exports.getEmployees = async (req, res) => {
    const emp = await Employee.find()

    if (!emp) {
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