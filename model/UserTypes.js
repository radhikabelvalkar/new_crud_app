const mongoose = require('mongoose');

const UserTypeSchema = new mongoose.Schema({
    name: String,
    description: String
});

module.exports = mongoose.model('user_types', UserTypeSchema)