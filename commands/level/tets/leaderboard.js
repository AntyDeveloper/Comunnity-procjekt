const Discord = require('discord.js');
const ms = require('ms');
const punishmentSchema = require('../../../schemas/punishments-expiriance')
const config = require('../../../config.json')
const rolem = require('../../../schemas/mrole-schema')

module.exports = {
	name: 'ranking',
    aliases: ['lb', 'leaderboard'],
    category: 'Level',
    permissions: ["VIEW_CHANNEL"],
	description: 'Komenda do sprawdzania rankingu expa',
	async execute(client, message, args) {


    }
}