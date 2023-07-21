const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');
const Cart = require('../models/Cart');

const getAll = catchError(async(req, res) => {
    const result = await Purchase.find({})
        .populate('user')
        .populate('product');
    return res.json(result);
});

const buyCart = catchError(async (req, res) => {
    const userId = req.user.id;
    const cartProducts = await Cart.find({ userId }).lean();
    const purchases = await Purchase.create(cartProducts);
    await Cart.deleteMany({ userId });
    return res.json(purchases);
  });

module.exports = {
    getAll,
    buyCart
};