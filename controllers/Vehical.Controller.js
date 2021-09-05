const Vehical = require('../models/Vehical.Model')

//Add Vehical   => /api/v1/vehical/addvehical
exports.addVehical = async (req, res, next) => {

    const vehical = await Vehical.create(req.body)

    if (!vehical) {
        res.status(201).json({
            success: false
        })
    }

    res.status(200).json({
        success: true,
        vehical
    })

}


//update user profile   => api/v1/user/update
exports.updateVehical = async (req, res, next) => {

    const vehical = await Vehical.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        vehical
    })

}

//update user profile   => api/v1/user/update
exports.deleteVehical = async (req, res, next) => {

    const vehical = await Vehical.findByIdAndDelete(req.params.id)

    res.status(200).json({
        success: true,
        vehical
    })

}

//get current user  => /api/v1/user
exports.getVehicals = async (req, res, next) => {

    const vehical = await Vehical.find();

    if (!vehical) {
        return res.status(401).json({
            success: false,
            message: 'No Vehical Found'
        })
    }

    res.status(200).json({
        success: true,
        vehical
    })
}
