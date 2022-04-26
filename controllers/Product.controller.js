const Product = require('../models/Product.Model')
const Order = require('../models/Order.Model')
const Cart = require('../models/Cart.Model')

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

    const product = await Product.find()

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



//Add Product   => /api/v1/Product/addProduct
exports.addOrders = async (req, res, next) => {

    const order = await Order.create(req.body)

    if (!order) {
        res.status(201).json({
            success: false
        })
    }

    res.status(200).json({
        success: true,
        order
    })

}

//get current user  => /api/v1/user
exports.getOrders = async (req, res, next) => {

    console.log(req.user.id);

    const order = await Order.find({ userID: req.user.id }).populate('product')

    if (!order) {
        return res.status(401).json({
            success: false,
            message: 'No Product Found'
        })
    }

    let count = order.length

    res.status(200).json({
        success: true,
        count: order.length,
        order
    })
}




//Add Product   => /api/v1/Product/addProduct
exports.addCart = async (req, res, next) => {

    const userID = req.user.id

    const { quantity, product } = req.body

    const body = {
        "userID": userID,
        "quantity": quantity,
        "product": product
    }

    const cart = await Cart.create(body)

    if (!cart) {
        res.status(201).json({
            success: false
        })
    }

    res.status(200).json({
        success: true,
        cart
    })

}

//get current user  => /api/v1/user
exports.getCart = async (req, res, next) => {

    console.log(req.user.id);

    const cart = await Cart.find({ userID: req.user.id }).populate('product')

    if (!cart) {
        return res.status(401).json({
            success: false,
            message: 'No Product Found'
        })
    }

    res.status(200).json({
        success: true,
        count: cart.length,
        cart
    })
}

