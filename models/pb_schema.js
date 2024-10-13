const mongoose = require('mongoose');

const persnalbudget_schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    budget: {
        type: Number,
        required: true,
    },
    color: {
        type: String,
        required: true,
        match: /^#[0-9A-Fa-f]{6}$/,
    },
});

module.exports = mongoose.model('budget', persnalbudget_schema);