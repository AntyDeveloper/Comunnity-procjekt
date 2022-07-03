const mongoose = require('mongoose');
const config = require('../config.json')


const reqString = {
    type: String,
    required: true,
}
const punishments = new mongoose.Schema(
    {
        userId: {
            type: String, 
            required: true,
        },
        guildId: {
            type: String, 
            required: true,
        },
        staffId: {
            type: String, 
            required: true,
        },
        reason: {
            type: String, 
            required: true,
        },
        expires: Date,
        type: {
            type: String,
            required: true,
            enum: ['ban', 'mute'],
        },
        MutedRoleId: {
            type: String, 
            required: false,
        },

    },
    {
        timestamps: true,

    }

);

module.exports = mongoose.model('punishments', punishments);