const { mongoose } = require("mongoose");
const { Schema } = mongoose;

const purchaseSchema = new Schema({
    quantity: {
        type: Number,
        required: true
    },
    //userId
    //productId
});

const Purchase = mongoose.model('Purchase', purchaseSchema);
module.exports = Purchase;