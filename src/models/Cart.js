const { mongoose } = require('mongoose');
const { Schema } = mongoose;

const cartSchema = new Schema ({
    quantity: {
        type: Number,
        required: true
    },
     //userId
    //productId
});

const Cart = mongoose.model('Cart', cartSchema)
module.exports = Cart;