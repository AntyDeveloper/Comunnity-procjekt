const Discord = require('discord.js');
const ms = require('ms');
const punishmentSchema = require('../../../schemas/punishments-expiriance')
const config = require('../../../config.json')
const rolem = require('../../../schemas/mrole-schema')

module.exports = {
	name: 'reset',
    category: 'Exp',
    permissions: ["ADMINISTRATOR"],
	description: 'Komenda do resetowania expa na serwerze',
	async execute(client, message, args) {


    }
}