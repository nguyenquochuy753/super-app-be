const mongoose = require('mongoose');

const addressSchema = {
    district: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    isActived: {
        type: Boolean,
        default: false
    },
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    }
}

const Address = mongoose.model('Address',addressSchema);
module.exports = Address;