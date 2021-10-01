const Reservation = require('../models/Reservation.Model')
const User = require('../models/User.Model')
const Vehical = require('../models/Vehical.Model')
const fs = require('fs')
const cloudinary = require('cloudinary').v2;
const easyInvoice = require("easyinvoice");

//Register Reservation   => /api/v1/signup
exports.addReservation = async (req, res, next) => {

    let data = req.body;
    data.userID = req.user.id;

    console.log(data);

    const reservation = await Reservation.create(data)

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

exports.getReserveDates = async (req, res) => {

    const reservations = await Reservation.find({
        carID: req.params.id
    })

    if (!reservations) {
        return res.status(401).json({
            success: false,
            reservation: [],
            message: 'Reservation Not Found'
        })
    }

    let dates = [];

    if (reservations.length !== 0) {
        reservations.map((reservation, index) => {
            let startDate = reservation.due;
            let endDate = reservation.to;
            getDates = (startDate, endDate) => {
                const cFrom = new Date(startDate);
                const cTo = new Date(endDate);

                let daysArr = [];
                let tempDate = cFrom;

                do {
                    if (cTo.getDate() != cFrom.getDate()) {
                        if (daysArr.length === 0) {
                            daysArr.push(new Date(tempDate))
                        }
                        tempDate.setUTCDate(tempDate.getUTCDate() + 1);
                        daysArr.push(new Date(tempDate));
                    } else {
                        daysArr.push(new Date(cFrom));
                        tempDate.setUTCDate(tempDate.getUTCDate() + 1);
                    }
                } while (tempDate < cTo);


                daysArr.map((day, index) => {
                    dates.push(day)
                })

            }

            getDates(startDate, endDate)

        })
    }

    const changedDates = []

    dates.map((date, index) => {
        changedDates.push(date.toISOString().substring(0, 10))
    })

    res.status(200).json({
        success: true,
        reservations,
        changedDates
    })
}

exports.userReport = async (req, res) => {
    const startDate = new Date(req.body.StartDate)
    const endDate = new Date(req.body.EndDate)

    const reservation = await Reservation.find({ userID: req.user.id }).populate('carID')

    const user = await User.findById(req.user.id);

    if (!reservation) {
        return res.status(401).json({
            success: false,
            reservation: [],
            message: 'Reservation Not Found'
        })
    }

    let trips = []

    reservation.map((trip, index) => {
        if (trip.due >= startDate && trip.to <= endDate) {
            const vahicalNo = trip.carID.vehicleName + " " + trip.carID.vehicleNumber
            const noOfDates = (trip.to.getDate() + 1 - trip.due.getDate())
            const pay = trip.payment
            const tripDate = {
                quantity: noOfDates,
                description: vahicalNo,
                tax: 0,
                price: pay,
            }
            trips.push(tripDate)
        }
    })

    const date = new Date(Date.now())

    var data = {
        currency: "LKR",
        taxNotation: "vat",
        marginTop: 25,
        marginRight: 25,
        marginLeft: 25,
        marginBottom: 25,
        logo: "https://res.cloudinary.com/dxz8wbaqv/image/upload/v1633031369/afproject/SPM%20Project/navbar-logo_covajt.png", //or base64
        background: "",
        sender: {
            company: "Black Code Team",
            address: "No 1/11",
            zip: "1234 AB",
            city: "Colombo",
            country: "Sri Lanka",
        },
        client: {
            company: user.firstName + " " + user.lastName,
            address: user.phoneNumber,
            city: user.email,
            country: req.body.StartDate + " To " + req.body.EndDate + " Report",
        },
        invoiceNumber: Date.now(),
        invoiceDate: date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear(),
        products: trips
    };

    async function genReport() {

        //Create invoice
        const pdf = await easyInvoice.createInvoice(data);
        await fs.writeFileSync('invoice.pdf', pdf.pdf, 'base64');

        uploadImage()
    }

    const uploadImage = async () => {

        cloudinary.config({
            cloud_name: "dxz8wbaqv",
            api_key: "296131486339646",
            api_secret: "Y3QNUt0uDdfS5DYT0rfB57-Akic"
        })

        cloudinary.uploader.upload('./invoice.pdf').then((result) => {
            res.status(200).json({
                success: true,
                response: result.secure_url
            })
        })

    };

    genReport();

}

exports.addPayemntDetails = async (req, res) => {

    const data = {
        cardNumber: req.body.cardNumber,
        cardOwnerName: req.body.cardOwnerName,
        expireDate: req.body.expireDate,
        cvv: req.body.cvv,
    }

    let reservation = await Reservation.findByIdAndUpdate(req.params.id, { paymentDetails: data })

    reservation = await Reservation.findByIdAndUpdate(req.params.id, { isPaid: true })

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