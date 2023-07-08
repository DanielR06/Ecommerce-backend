const express = require('express');
const router = express.Router();

const userRouter = require('./user.route');
const purchaseRouter = require('./purchase.route');
const productImgRouter = require('./productImg.route');
const productRouter = require('./product.route');
const categoryRouter = require('./category.route');
const cartRouter = require('./cart.route');

router.use('/users', userRouter);
router.use('/purchases', purchaseRouter);
router.use('/products', productRouter);
router.use('/productsImgs', productImgRouter);
router.use('/categories', categoryRouter);
router.use('/cart', cartRouter);

module.exports = router;