const mongoose = require("mongoose");

const vehicalSchema = new mongoose.Schema({
    vehicleNumber: {
        type: String,
    },
    vehicleName: {
        type: String,
    },
    vehicleCategory: {
        type: String,
    },
    manufactureYear: {
        type: String,
    },
    vehicleSupplier: {
        type: String,
    },
    vehicleColor: {
        type: String,
    },
    vehicleType: {
        type: String,
    },
    vehiclePrice: {
        type: String,
    },
    vehicleCondition: {
        type: String,
    },
    mileage: {
        type: String,
    },
    fuelType: {
        type: String,
    },
    registerDate: {
        type: Date,
    },
    specification: {
        type: String,
    },
    vehicleStatus: {
        type: String,
    },
    vehicleImage: {
        type: String,
    },
    reservations: [
        {
            reservationID: {
                type: mongoose.Schema.ObjectId,
                ref: 'Reservation'
            }
        }
    ]
})

module.exports = mongoose.model('Vehical', vehicalSchema)
