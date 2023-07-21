const { getAll, create, getOne, remove, update, login, getLoggeedUser, verifyCode, linkPassword, resetPassword } = require('../controllers/user.controller');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const userRouter = express.Router();

userRouter.route('/')
    .get(verifyJWT, getAll)
    .post(create);

userRouter.route('/login')
    .post(login);

userRouter.route('/me')
        .get(verifyJWT, getLoggeedUser);

userRouter.route('/verify/:code')
        .get(verifyCode);

userRouter.route('/reset_password')
    .post(linkPassword);

userRouter.route('/reset_password/:code')
    .post(resetPassword);

userRouter.route('/:id')
    .get(verifyJWT, getOne)
    .delete(verifyJWT, remove)
    .put(verifyJWT, update);

module.exports = userRouter;