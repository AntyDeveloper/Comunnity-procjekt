const mongoose = require('mongoose');
const config = require('../config.json')


const reqString = {
    type: String,
    required: true,
}
const itemschema = new mongoose.Schema(
    {
        GuildId: {
            type: String, 
        },
        UserId: {
            type: String, 
        },
        inventory: {
            type: Object, 
        },
        expires: Date,

    },

);

module.exports = mongoose.model('item', itemschema);