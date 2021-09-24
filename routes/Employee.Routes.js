const express = require('express');
const router = express.Router();

const { addEmployee, getEmployees, getEmployeeById, deleteEmployee, updateEmployee } = require('../controllers/Employee.controller');

//Register User
router.route('/addemployee').post(addEmployee);
router.route('/getemployee').get(getEmployees);
router.route('/getemployeebyid/:id').get(getEmployeeById);
router.route('/deleteemployee/:id').delete(deleteEmployee);
router.route('/updateemployee/:id').post(updateEmployee)


module.exports = router