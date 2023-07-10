const { getAll, create, getOne, remove, update, setProductsImages } = require('../controllers/product.controller');
const express = require('express');

const productRouter = express.Router();

productRouter.route('/')
    .get(getAll)
    .post(create);

productRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

productRouter.route('/:id/images')
    .post(setProductsImages);

module.exports = productRouter;