const express = require('express');
const router = express.Router();

const { addProduct, getProducts, addOrders, getOrders, addCart, getCart } = require('../controllers/Product.controller');
const { isAuthenticatedUser } = require('../utils/authenticator')
//Register User
router.route('/addproducts').post(addProduct);

router.route('/getproducts').get(getProducts)

router.route('/addorders').post(addOrders);

router.route('/getorders').get(isAuthenticatedUser, getOrders)

router.route('/addcart').post(isAuthenticatedUser, addCart)

router.route('/getcart').get(isAuthenticatedUser, getCart)


module.exports = router;