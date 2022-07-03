const Discord = require('discord.js');
const ms = require('ms')
const { Client, Intents, Collection } = require('discord.js');
const config = require('../../../config.json')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const punishmentSchema = require('../../../schemas/punishments-expiriance.js')

const { MessageEmbed } = require('discord.js');

const { Permissions } = require('discord.js');
const rgx = /^(?:<@!?)?(\d+)>?$/;

module.exports = {
    name: 'unban',
    aliases: ['ub'],
    description: 'Komenda do odbanowanai użytkownika z serwera!',
    category: 'Mod',
        permissions: ["ADMINISTRATOR", "BAN_MEMBERS"],
        
    async execute(client, message, args) {

        const staff = message.author
        const guildd = message.guild.id
      const id = args[0]
      if(!rgx.test(id)) {
        const format = new Discord.MessageEmbed()
        .setDescription(`Nie podaleś id!`)
        .setColor(config.color.fail)
        return message.channel.send({embeds: [format]})
        
    } 
      const bnnedUsers = await message.guild.bans.fetch()
      const targetUserr = bnnedUsers.get(id).user.id
      const targetUser = bnnedUsers.get(id).user
      if(!targetUser) {
        const format = new Discord.MessageEmbed()
        .setDescription(`Nie można znaleźć użytkownika z tym id`)
        .setColor(config.color.fail)
        return message.channel.send({embeds: [format]})
        
    }
        let reason = args.slice(1).join(' ')
        if(!reason) reason = '`None`'
        const userId = targetUserr
        console.log(userId)    
        const query = {
            guildId: guildd,
            userId,
            type: 'ban'
        }
        try {
            const result = await punishmentSchema.findOne({
                guildId: guildd,
                userId,
                type: 'ban',
            })
            if(result) {
              await punishmentSchema.deleteMany(query)
            }
            await message.guild.members.unban(targetUserr)
            const banembed = new MessageEmbed()
            .setThumbnail(targetUser.displayAvatarURL({ dynamic: true }))
            .setDescription(`📇 ${targetUser.tag} został  odbanowany!`)
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