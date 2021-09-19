const express = require('express');
const router = express.Router();

const { applyLeaves,getLeaves} = require('../controllers/Leaves.controller');

//Register User
router.route('/applyleaves').post(applyLeaves);
router.route('/getleaves').get(getLeaves);


module.exports = router