const express = require('express');
const router = express.Router();

const { addReservation, updateReservation, getReservation, getAllReservation } = require('../controllers/Reservation.Controller');

//add reservation
router.route('/addreservation').post(addReservation);

//Get reservation by id
router.route('/getallreservation').get(getAllReservation);


module.exports = router;