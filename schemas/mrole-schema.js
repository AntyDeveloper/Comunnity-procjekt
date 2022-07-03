const mongoose = require('mongoose');
const config = require('../config.json')


const reqString = {
    type: String,
    required: true,
}
const rolem = new mongoose.Schema(
    {
        GuildId: {
            type: String, 
            required: false,
        },

        MutedRoleId: {
            type: String, 
            required: false,
        },
        Rguild: {
            type: String, 
            required: false,
            enum: ['Standard', 'Premium', 'Main'],
        },

    },

);

module.exports = mongoose.model('RoleMute', rolem);