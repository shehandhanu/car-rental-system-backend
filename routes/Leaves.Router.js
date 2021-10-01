const express = require('express');
const router = express.Router();

const { applyLeaves,getLeaves,approveLeaves,rejectLeaves} = require('../controllers/Leaves.controller');

//Register User
router.route('/applyleaves').post(applyLeaves);
router.route('/getleaves').get(getLeaves);
router.route('/approveleaves/:id').get(approveLeaves);
router.route('/rejectleaves/:id').get(rejectLeaves);


module.exports = router