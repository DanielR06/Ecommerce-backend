const catchError = require('../utils/catchError');
const Category = require('../models/Category');

const getAll = catchError(async(req, res) => {
    const result = await Category.find({}).populate('products')
    return res.json(result);
});

const getOne = catchError(async(req, res) =>{
    const { id } = req.params;
    const result = await Category.findById(id);
    return res.json(result);
});

const create = catchError(async(req, res) =>{
    const body = req.body
    const result = await Category.create(body);
    return res.status(201).json(result);
});

const update = catchError(async(req, res) =>{
    const { id } = req.params;
    const body = req.body;
    const result = await Category.findByIdAndUpdate(id, body, {returnDocument:'after'} );
    return res.json(result);
});

const remove = catchError(async(req, res) =>{
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    return res.sendStatus(204);
});

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove,
};