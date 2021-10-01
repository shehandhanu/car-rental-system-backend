const express = require('express');
const router = express.Router();

const { addReservation, updateReservation, getReservation, addPayemntDetails, userReport, getAllReservation, getReserveDates } = require('../controllers/Reservation.Controller');
const { isAuthenticatedUser, authorizeRoles } = require('../utils/authenticator')
//add reservation
router.route('/addreservation').post(isAuthenticatedUser, addReservation);

//Get reservation by id
router.route('/getallreservation').get(getAllReservation);

router.route('/getreservedates/:id').get(getReserveDates)

router.route('/genreport/:id').post(isAuthenticatedUser, userReport)

router.route('/addpaymentdetails/:id').post(addPayemntDetails)


module.exports = router;