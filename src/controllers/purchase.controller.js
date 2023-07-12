const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');

const getAll = catchError(async(req, res) => {
    const result = await Purchase.find({})
        .populate('user')
        .populate('product');
    return res.json(result);
});

const getOne = catchError(async(req, res) =>{
    const { id } = req.params;
    const result = await Purchase.findById(id);
    return res.json(result);
});

const create = catchError(async(req, res) =>{
    const body = req.body
    const result = await Purchase.create(body);
    return res.status(201).json(result);
});

const update = catchError(async(req, res) =>{
    const { id } = req.params;
    const body = req.body;
    const result = await Purchase.findByIdAndUpdate(id, body, {returnDocument:'after'} );
    return res.json(result);
});

const remove = catchError(async(req, res) =>{
    const { id } = req.params;
    await Purchase.findByIdAndDelete(id);
    return res.sendStatus(204);
});

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove,
};