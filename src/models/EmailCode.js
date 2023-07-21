const { mongoose } = require('mongoose');
const { Schema } = mongoose;

const emailCodeSchema = new Schema ({
    code: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required : true
    },//userId
});

const EmailCode = mongoose.model('EmailCode', emailCodeSchema)
module.exports = EmailCode;