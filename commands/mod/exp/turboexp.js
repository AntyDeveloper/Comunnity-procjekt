const Discord = require('discord.js');
const ms = require('ms');
const punishmentSchema = require('../../../schemas/punishments-expiriance')
const config = require('../../../config.json')
const rolem = require('../../../schemas/mrole-schema')

module.exports = {
	name: 'turboexp',
    aliases: ['texp'],
    category: 'Exp',
    permissions: ["ADMINISTRATOR"],
	description: 'Komenda do sprawdzania swojego poziomu',
	async execute(client, message, args) {


    }
}