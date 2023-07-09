const catchError = require('../utils/catchError');
const Product = require('../models/Product');
const Category = require('../models/Category');

const getAll = catchError(async(req, res) => {
    const result = await Product.find({}).populate('images').populate('category', 'name -_id');
    return res.json(result);
});

const getOne = catchError(async(req, res) =>{
    const { id } = req.params;
    const result = await Product.findById(id);
    return res.json(result);
});

const create = catchError(async(req, res) =>{
    const {
        title,
        description,
        brand, 
        price, 
        category
    } = req.body
    const categoryObject  = await Category.findById(category);
    if(!categoryObject) return res.status(204).json({message: "Category not found"})
    const product = await Product.create({
        title,
        description,
        brand, 
        price, 
        category
    });
    categoryObject.products.push(product);
    await categoryObject.save();
    return res.status(201).json(product);
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