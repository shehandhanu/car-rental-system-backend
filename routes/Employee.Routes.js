const express = require('express');
const router = express.Router();

const { addEmployee, getEmployees, loginEmp } = require('../controllers/Employee.controller');

//Register User
router.route('/addemployee').post(addEmployee);
router.route('/loginemp').post(loginEmp);
router.route('/getemployee').get(getEmployees);


module.exports = router