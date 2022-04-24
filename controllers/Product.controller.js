const Product = require('../models/Product.Model')

//Add Product   => /api/v1/Product/addProduct
exports.addProduct = async (req, res, next) => {

    const product = await Product.create(req.body)

    if (!product) {
        res.status(201).json({
            success: false
        })
    }

    res.status(200).json({
        success: true,
        product
    })

}

//get current user  => /api/v1/user
exports.getProducts = async (req, res, next) => {

    const product = await Product.find().populate('reservations.reservationID')

    if (!product) {
        return res.status(401).json({
            success: false,
            message: 'No Product Found'
        })
    }

    let count = product.length

    res.status(200).json({
        success: true,
        count: product.length,
        product
    })
}
