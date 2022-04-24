const express = require('express');
const router = express.Router();

const { addProduct, getProducts } = require('../controllers/Product.controller');

//Register User
router.route('/addproducts').post(addProduct);

router.route('/getproducts').get(getProducts)

module.exports = router;