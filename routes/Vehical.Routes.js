const express = require('express');
const router = express.Router();

const { addVehical, getVehicals, updateVehical, deleteVehical } = require('../controllers/Vehical.Controller');

//Register User
router.route('/addvehical').post(addVehical);

router.route('/getvehicals').get(getVehicals)

router.route('/updatevehicals/:id').put(updateVehical)

router.route('/deletevehicals/:id').delete(deleteVehical)


module.exports = router;