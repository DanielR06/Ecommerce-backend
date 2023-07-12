const { mongoose } = require("mongoose");
const { Schema } = mongoose;

const purchaseSchema = new Schema({
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

const Purchase = mongoose.model('Purchase', purchaseSchema);
module.exports = Purchase;