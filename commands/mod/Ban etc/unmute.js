const Discord = require('discord.js');
const ms = require('ms');
const punishmentSchema = require('../../../schemas/punishments-expiriance')
const config = require('../../../config.json')
const rolem = require('../../../schemas/mrole-schema')

module.exports = {
	name: 'unmute',
    aliases: ['unm'],
    category: 'Mod',
    permissions: ["ADMINISTRATOR", "BAN_MEMBERS"],
	description: 'Komenda do od ciszenia użytkownika',
	async execute(client, message, args) {
        const guildd = message.guild
        const targetUser = message.mentions.members.first() || await message.guild.members.fetch(args[0]).catch(() => null)



        const userId = targetUser.id
        try {
            const query = {
                guildId: guildd,
                userId,
                type: 'mute'
            }
            const result = await punishmentSchema.findOne({
                guildId: guildd,
                userId,
                type: 'mute',
            })
            if(result) {
              await punishmentSchema.deleteMany(query)
            }
            const banembed = new Discord.MessageEmbed()
            .setThumbnail(targetUser.displayAvatarURL({ dynamic: true }))
            .setDescription(`📇 ${targetUser.user.tag} został/a  odbanowany!`)
            .setColor(config.color.success)
            .setFooter({text: `${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
            .setTimestamp()

            message.channel.send({embeds: [banembed]}) 
        } catch (errr ){
         console.log(errr)
         const format = new Discord.MessageEmbed()
         .setDescription(`Coś poszło nie tak :c`)
         .setColor(config.color.fail)
         return message.channel.send({embeds: [format]})
         
        } 



    }
}