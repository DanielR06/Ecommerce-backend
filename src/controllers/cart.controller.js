const catchError = require('../utils/catchError');
const Cart = require('../models/Cart');

const getAll = catchError(async(req, res) => {
    const result = await Cart.find({})
        .populate('user')
        .populate('product');
    return res.json(result);
});

const getOne = catchError(async(req, res) =>{
    const { id } = req.params;
    const result = await Cart.findById(id);
    return res.json(result);
});

const create = catchError(async(req, res) =>{
    const body = req.body
    const result = await Cart.create(body);
    return res.status(201).json(result);
});

const update = catchError(async(req, res) =>{
    const { id } = req.params;
    const body = req.body;
    const result = await Cart.findByIdAndUpdate(id, body, {returnDocument:'after'} );
    return res.json(result);
});

const remove = catchError(async(req, res) =>{
    const { id } = req.params;
    await Cart.findByIdAndDelete(id);
    return res.sendStatus(204);
});

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove,
};