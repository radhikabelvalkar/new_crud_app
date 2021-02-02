const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {type: String},
    quantity: {type: Number},
    price: {type: Number},
    createdBy: {type: require('mongoose').Types.ObjectId, ref: 'users'}
});

module.exports = mongoose.model('products', productSchema);