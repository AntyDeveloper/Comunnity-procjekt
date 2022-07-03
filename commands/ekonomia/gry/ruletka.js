const Discord = require('discord.js');
const ms = require('ms');
const punishmentSchema = require('../../../schemas/punishments-expiriance')
const config = require('../../../config.json')
const rolem = require('../../../schemas/mrole-schema')

module.exports = {
	name: 'ruletka',
    category: 'Gry',
    permissions: ["VIEW_CHANNEL"],
	description: 'Komenda do rueltki!',
	async execute(client, message, args) {


    }
}