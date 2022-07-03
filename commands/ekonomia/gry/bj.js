const Discord = require('discord.js');
const ms = require('ms');
const punishmentSchema = require('../../../schemas/punishments-expiriance')
const config = require('../../../config.json')
const rolem = require('../../../schemas/mrole-schema')

module.exports = {
	name: 'bj',
    category: 'Gry',
    aliases: ['blackjack'],
    permissions: ["VIEW_CHANNEL"],
	description: 'Komenda do black jacka!',
	async execute(client, message, args) {


    }
}