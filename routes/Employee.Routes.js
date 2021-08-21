const express = require('express');
const router = express.Router();

const { addEmployee, getEmployees } = require('../controllers/Employee.controller');

//Register User
router.route('/addemployee').post(addEmployee);
router.route('/getemployee').get(getEmployees);


module.exports = router