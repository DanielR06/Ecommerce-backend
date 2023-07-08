const { mongoose } = require('mongoose');
const { Schema } = mongoose;

const productImgSchema = new Schema ({
    url: {
        type: String,
        required: true
    },
    publicId: {
        type: String,
        required: true
    },
    product:{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },//productId
});

const ProductImg = mongoose.model('ProductImg', productImgSchema)
module.exports = ProductImg;