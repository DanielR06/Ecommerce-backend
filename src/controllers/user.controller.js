const catchError = require('../utils/catchError');
const User = require('../models/User');

const getAll = catchError(async(req, res) => {
    const users = await User.find({})
    return res.json(users);
});

const getOne = catchError(async(req, res) =>{
    const { id } = req.params;
    const user = await User.findById(id);
    return res.json(user);
});

const create = catchError(async(req, res) =>{
    const body = req.body
    const user = await User.create(body);
    return res.status(201).json(user);
});

const update = catchError(async(req, res) =>{
    const { id } = req.params;
    const body = req.body;
    const user = await User.findByIdAndUpdate(id, body, {returnDocument:'after'} );
    return res.json(user);
});

const remove = catchError(async(req, res) =>{
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    return res.sendStatus(204);
});

module.exports = {
    getAll,
    create,
    getOne,
    update,
    remove
}