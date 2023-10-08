const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: true,
        enum: ['farmer', 'inspector', 'certifier','mill_owner','transporting_company','retailer','customer']
    },
    storeName:{
        type: String,
    },
    buildingname: {
        type: String,
    },
    buildingnum: {
        type: String,
    },

});

module.exports = mongoose.model('User', userSchema);;