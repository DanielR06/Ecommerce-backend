const { getAll, create, getOne, remove, update } = require('../controllers/purchase.controller');
const express = require('express');

const purchaseRouter = express.Router();

purchaseRouter.route('/')
    .get(getAll)
    .post(create);

purchaseRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = purchaseRouter;