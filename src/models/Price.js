const mongoose = require('mongoose');

const PriceSchema = new mongoose.Schema({
    price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

module.exports = mongoose.model('Price', PriceSchema);
