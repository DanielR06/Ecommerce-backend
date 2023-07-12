const { mongoose } = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required : true
    },//categoryId
    images:[{
        type: Schema.Types.ObjectId,
        ref: 'ProductImg'
    }],
    carts:[{
        type: Schema.Types.ObjectId,
        ref: 'Cart'
    }],
    purchases:[{
        type: Schema.Types.ObjectId,
        ref: 'Purchase'
    }]
});

const Product = mongoose.model('Product', productSchema)
module.exports = Product;