const { mongoose } = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    carts:[{
        type: Schema.Types.ObjectId,
        ref: 'Cart'
    }],
    purchases:[{
        type: Schema.Types.ObjectId,
        ref: 'Purchase'
    }],
    isVerified:{
        type:Boolean,
        default: false
    },
});

const User = mongoose.model('User', userSchema);
module.exports = User;