const catchError = require('../utils/catchError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const getAll = catchError(async(req, res) => {
    const users = await User.find({})
        .populate('carts')
        .populate('purchases');
    return res.json(users);
});

const getOne = catchError(async(req, res) =>{
    const { id } = req.params;
    const user = await User.findById(id).exec();
    return res.json(user);
});

const create = catchError(async(req, res) =>{
    const {firstName, lastName, email, password, phone} = req.body
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phone,
    });
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

const login = catchError(async(req, res) => {
    const { email, password } = req.body;
    const user = await User.find({email});
    if(!user) return res.status(401).json({ error: "invalid credentials" });    
    const isValid = await bcrypt.compare(password, user[0].password);
    if(!isValid) return res.status(401).json({ error: "invalid credentials" });
    const token = jwt.sign(
        {user},
        process.env.TOKEN_SECRET,
        { expiresIn: '1d' }
    )
    return res.json({user, token});
});

module.exports = {
    getAll,
    create,
    getOne,
    update,
    remove,
    login
}