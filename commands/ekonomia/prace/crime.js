const Discord = require('discord.js');
const ms = require('ms');
const punishmentSchema = require('../../../schemas/punishments-expiriance')
const config = require('../../../config.json')
const rolem = require('../../../schemas/mrole-schema')

module.exports = {
	name: 'crime',
    category: 'Prace',
    permissions: ["VIEW_CHANNEL"],
	description: 'Komenda do zarabinia!',
	async execute(client, message, args) {


    }
}