const mongoose = require('mongoose');
const config = require('../config.json')


const reqString = {
    type: String,
    required: true,
}
const ekonomia = new mongoose.Schema(
    {
        GuildId: {
            type: String, 
            required: false,
        },

        UserId: {
            type: String, 
            required: false,
        },
        Kasa: {
            type: Number, 
            required: false,
        },

    },

);

module.exports = mongoose.model('ekonomia', ekonomia);