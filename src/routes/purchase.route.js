const { getAll, create, getOne, remove, update } = require('../controllers/purchase.controller');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const purchaseRouter = express.Router();

purchaseRouter.route('/')
    .get(verifyJWT, getAll)
    .post(create);

purchaseRouter.route('/:id')
    .get(verifyJWT, getOne)
    .delete(verifyJWT, remove)
    .put(verifyJWT, update);

module.exports = purchaseRouter;