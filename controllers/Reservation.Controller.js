const Reservation = require('../models/Reservation.Model')
const User = require('../models/User.Model')
const Vehical = require('../models/Vehical.Model')

//Register Reservation   => /api/v1/signup
exports.addReservation = async (req, res, next) => {

    const reservation = await Reservation.create(req.body)

    const user = await User.findByIdAndUpdate(req.body.userID, { $push: { reservations: [{ reservationID: reservation._id }] } }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    const vehical = await Vehical.findByIdAndUpdate(req.body.carID, { $push: { reservations: [{ reservationID: reservation._id }] } }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    if (!reservation) {
        res.status(201).json({
            success: false
        })
    }

    res.status(200).json({
        success: true,
        reservation
    })

}

//update reservation   => api/v1/reservation/update
exports.updateReservation = async (req, res, next) => {

    const reservation = await Reservation.findByIdAndUpdate(req.params.id, req.body.reservation, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        reservation
    })

}

//get reservation  => /api/v1/reservation
exports.getReservation = async (req, res, next) => {

    const reservation = await Reservation.findById(req.params.id)

    if (!reservation) {
        return res.status(401).json({
            success: false,
            reservation: [],
            message: 'Reservation Not Found'
        })
    }

    res.status(200).json({
        success: true,
        reservation
    })
}


//get all reservation  => /api/v1/reservation
exports.getAllReservation = async (req, res, next) => {

    const reservation = await Reservation.find().populate('userID').populate('carID')

    if (!reservation) {
        return res.status(401).json({
            success: false,
            reservation: [],
            message: 'Reservation Not Found'
        })
    }

    res.status(200).json({
        success: true,
        reservation
    })
}