const Discord = require('discord.js')
const ms = require('ms')
const config = require('../../../config.json')
module.exports = {
	name: 'kick',
    aliases: ['f'],
    category: 'Mod',
    permissions: ["ADMINISTRATOR", "KICK_MEMBERS"],
	description: 'Komenda do wyrzucenia użytkownika z serwera!',
	async execute(client, message, args, guild) {
    const targetUser = message.mentions.members.first() ||  await message.guild.members.fetch(args[0]).catch(() => null)

        if (!targetUser) return message.channel.send("Nie oznaczyłeś osoby")
        if(targetUser == message.author) return message.channel.send("Nie możesz się wyrzucić!")
        const author = message.author

        const authorRole = message.member.roles.highest.position
      const TargetRole = targetUser.roles.highest.position
        
        if(authorRole <= TargetRole) return message.channel.send("Ta osoba ma wyższą role od ciebie!")
        if(authorRole = TargetRole) return message.channel.send("Ta osoba ma taka sama role jak ty!")
        if(message.guild.me.roles.highest.position <= TargetRole) return message.channel.send("Osoba posiada wyższa role ode mnie!")
        let reason = args.slice(1).join(" ")
        if(!reason) reason = '`None`'

      
        



            try {
                        targetUser.kick({
                          reason: `${author.tag} zostal wyrzucony ${targetUser.user.tag} z powodu: ${reason}.`
                      })
                      const banembed = new Discord.MessageEmbed()
                      .setDescription(`${targetUser.user.tag} został wyrzucony przez ${author} z powodu: ${reason}`)
                      .setFooter({text: `${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                      .setTimestamp()
                      .setColor(config.color.success)
                      targetUser.send(`Zostałeś wyrzucony z serwera ${guild.name} z powodu ${reason}.`)
                      
                      message.channel.send({embeds: [banembed]})
  
                    } catch (err) {
                      const er = new Discord.MessageEmbed()
                      .setDescription("Nie możesz zbanować tego użytkownika!")
                      .setColor(config.color.fail)
                      return message.channel.send({embeds: [er]})
                    }
                    
                    


 
    }
}