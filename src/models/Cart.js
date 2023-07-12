const { mongoose } = require('mongoose');
const { Schema } = mongoose;

const cartSchema = new Schema ({
    quantity: {
        type: Number,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required : true
    },//userId
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required : true
    },//productId
});

const Cart = mongoose.model('Cart', cartSchema)
module.exports = Cart;