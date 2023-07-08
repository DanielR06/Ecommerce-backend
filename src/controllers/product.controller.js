const catchError = require('../utils/catchError');
const Product = require('../models/Product');

const getAll = catchError(async(req, res) => {
    const result = await Product.find({}).populate('images');
    return res.json(result);
});

const getOne = catchError(async(req, res) =>{
    const { id } = req.params;
    const result = await Product.findById(id);
    return res.json(result);
});

const create = catchError(async(req, res) =>{
    const body = req.body
    const result = await Product.create(body);
    return res.status(201).json(result);
});

const update = catchError(async(req, res) =>{
    const { id } = req.params;
    const body = req.body;
    const result = await Product.findByIdAndUpdate(id, body, {returnDocument:'after'} );
    return res.json(result);
});

const remove = catchError(async(req, res) =>{
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    return res.sendStatus(204);
});

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove,
};