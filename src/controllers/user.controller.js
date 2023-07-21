const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const catchError = require('../utils/catchError');
const sendEmail = require('../utils/sendEmail')

const User = require('../models/User');
const EmailCode = require('../models/EmailCode');

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
    const {firstName, lastName, email, password, phone, frontBaseUrl} = req.body
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phone,
    });
    const code = require('crypto').randomBytes(32).toString("hex");
    const link = `${frontBaseUrl}/verify_email/${code}`
    await sendEmail({
        to: email,
        subject: "Veficate email for NeverInHouse",
        html:`
        <h1>Hello ${firstName} ${lastName}</h1>
        <p>Verify your account cheking the link</p>
        <a href=${link} target="_blank">${link}</a>
        `
    });
    await EmailCode.create({
        code,
        user:user.id
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
    if(!user.isVerified) return res.status(401).json({ message: "Not Verified" });
    const token = jwt.sign(
        {user},
        process.env.TOKEN_SECRET,
        { expiresIn: '7d' }
    )
    return res.json({user, token});
});

const getLoggeedUser = catchError(async(req, res) =>{
    res.json(req.user);
});

const verifyCode = catchError(async(req, res) =>{
    const { code }= req.params;
    const codeFound = await EmailCode.find({ code });
    if (!codeFound)return res.status(401).json({message: 'Invalid code' });
    const user = await User.findByIdAndUpdate(
        codeFound.user, 
        { isVerified: true },
        {returnDocument:'after'} 
    );
    await EmailCode.findByIdAndDelete(codeFound.id);
    return res.json(user);
})

const linkPassword = catchError(async(req, res) =>{
    const {email, frontBaseUrl} = req.body;
    const user = await User.find({ email });
    if(!user) return res.status(401).json({ message: "invalid email" }); 
    const code = require('crypto').randomBytes(32).toString("hex");
    const link = `${frontBaseUrl}/reset_password/${code}`
    await sendEmail({
        to: email,
        subject: "Reset youy password for user app",
        html:`
        <h1>Hello User</h1>
        <p>Reset youy password cheking the link</p>
        <a href=${link} target="_blank">${link}</a>
        `
    });
    await EmailCode.create({
        code:code,
        user:user.id
    });
    return res.status(201).json({ message: "Send email for reset password" });
});

const resetPassword = catchError(async(req, res) =>{
    const { password } = req.body;
    const { code } = req.params;
    const codeFound = await EmailCode.find({ code });
    if(!codeFound) return res.status(401).json({ message: "invalid code" });
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(
        codeFound.user,
        { password: hashedPassword },
    );
    return res.status(201).json({ message: "Update password" });
});

module.exports = {
    getAll,
    create,
    getOne,
    update,
    remove,
    login,
    getLoggeedUser, 
    verifyCode,
    linkPassword,
    resetPassword
}