const Discord = require('discord.js');
const punishments = require('../../../schemas/punishments-expiriance.js')
const ms = require('ms')
const config = require('../../../config.json')
module.exports = {
	name: 'ban',
    aliases: ['f'],
    permissions: ["ADMINISTRATOR", "BAN_MEMBERS"],
    category: 'Mod',
	description: 'Komenda do zbanowania użytkownika z serwera!',
	async execute(client, message, args) {
  const targetUser = message.mentions.members.first() ||  await message.guild.members.fetch(args[0]).catch(() => null)
              
            if(!targetUser) {
                const format = new Discord.MessageEmbed()
                .setDescription(`Nie można znaleźć użytkownika z tym id`)
                .setColor(config.color.fail)
                return message.channel.send({embeds: [format]})
                
            }


        if(targetUser == message.author) {
            const format = new Discord.MessageEmbed()
            .setDescription('Nie możesz się zbanować!')
            .setColor(config.color.fail)
            return message.channel.send({embeds: [format]})
        }



        const author = message.author
        const authorRole = message.member.roles.highest.position
      const TargetRole = targetUser.roles.highest.position

        if(authorRole <= TargetRole) {
            const format = new Discord.MessageEmbed()
            .setDescription('Ta osoba ma wyższą role od ciebie!')
            .setColor(config.color.fail)
            return message.channel.send({embeds: [format]})
        } 
        if(authorRole === TargetRole) {
            const format = new Discord.MessageEmbed()
            .setDescription('Ta osoba ma taka sama role jak ty!')
            .setColor(config.color.fail)
            return message.channel.send({embeds: [format]})
        } 
        if(message.guild.me.roles.highest.position <= TargetRole) {
            const format = new Discord.MessageEmbed()
            .setDescription('Osoba posiada wyższa role ode mnie!')
            .setColor(config.color.fail)
            return message.channel.send({embeds: [format]})
        } 
    
        
        const duration = args[1];
        const userId = targetUser.id

       let time 
       let type
       const staff = message.author
       const reason = args.slice(2).join(" ")
       if(!reason) reason = 'brak'

       try {
           const split = duration.match(/\d+|\D+/g)
           time = parseInt(split[0])
           type = split[1].toLowerCase()

       } catch (e) {
        const format = new Discord.MessageEmbed()
        .setDescription('Nie po prawny format: Przykładowy format 1d = 1 dzień.')
        .setColor(config.color.fail)
        return message.channel.send({embeds: [format]})
       }

       if(type == 'h') {
           time *= 60
       } else if (type == 'd') {
           time *= 60 * 24
       } else if (!type == 'm') {
         const format = new Discord.MessageEmbed()
         .setDescription('Nie po prawny format: Przykładowy "m", "h", "d".')
         .setColor(config.color.fail)
         return message.channel.send({embeds: [format]})
       }
       
       const expires = new Date()
       expires.setMinutes(expires.getMinutes() + time)
        


         const guildd = message.guild.id
         const name = message.guild

                      const banembed = new Discord.MessageEmbed()
                      .setDescription(`📇 ${targetUser} został zbanowany!\n\n🧾 Powód: ${reason}\n\n⏰ Czas bana: ${duration}`)
                      .setThumbnail(targetUser.displayAvatarURL({ dynamic: true }))
                      .setFooter({text: `${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                      .setColor(config.color.success)
                      .setTimestamp()
                      try {
                     //targetUser.send(`Zostałeś zbanowany na serwerze ${name.name} z powodu ${reason}.\n\n⏰ Czas bana: ${duration} `)
                      } catch (errormsg) {
                          console.log(errormsg)
                      }
                      const result = await punishments.findOne({
                          guildId: guildd,
                          userId,
                          type: 'ban'
                      })
                      if (result) {
                          const res = new Discord.MessageEmbed()
                          .setDescription("Osoba jest już z banowana na tym serwerze!")
                          .setColor(config.color.fail)
                          return message.channel.send({embeds: [res]})
                      }
                      try {
                          targetUser.ban({
                            reason: `${author.tag} banned ${targetUser} z powodu: ${reason}.`  
                        })
                        
                        message.channel.send({embeds: [banembed]})
                        
                        console.log(reason)
                        console.log()
                          const data =  new punishments({
                              userId,
                              guildId: guildd,
                              staffId: staff.id,
                              reason,
                              expires,
                              type: 'ban',               
                          })
                          await data.save()
               
                      } catch (error) {
                        console.log(error)

                          const er = new Discord.MessageEmbed()
                          .setDescription("Nie możesz zbanować tego użytkownika!")
                          .setColor(config.color.fail)
                          return message.channel.send({embeds: [er]})
                      }
                      


    }
}