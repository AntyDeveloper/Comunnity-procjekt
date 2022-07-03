const Discord = require('discord.js');
const ms = require('ms');
const punishmentSchema = require('../../../schemas/punishments-expiriance')
const config = require('../../../config.json')
const rolem = require('../../../schemas/mrole-schema')

module.exports = {
	name: 'mute',
    category: 'Mod',
    aliases: ['m'],
    permissions: ["ADMINISTRATOR", "BAN_MEMBERS"],
	description: 'Komenda do wyrzucenia użytkownika z serwera!',
	async execute(client, message, args) {

        const targetUser = message.mentions.members.first() || await message.guild.members.fetch(args[0]).catch(() => null)

  
        if(!targetUser) {
            const format = new Discord.MessageEmbed()
            .setDescription(`Nie można znaleźć użytkownika z tym id ${targetUser.id}`)
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
    if(message.guild.me.roles.highest.position <= TargetRole) {
        const format = new Discord.MessageEmbed()
        .setDescription('Osoba posiada wyższa role ode mnie!')
        .setColor(config.color.fail)
        return message.channel.send({embeds: [format]})
    } 
    const duration = args[1];
    const reason = args.slice(2).join(" ")
       let time 
       let type
       const authorid = message.author.id
       if(!reason) reason = 'brak'

      const userId = targetUser.id
       try {
           const split = duration.match(/\d+|\D+/g)
           time = parseInt(split[0])
           type = split[1].toLowerCase()
        
       } catch (e) {
        const format = new Discord.MessageEmbed()
        .setDescription('Nie po prawny format: Przykładowy format 1d = 1 dzień.')
        .setColor(config.color.fail)
        return message.channel.send({embeds: [format]})       }
       if(type == 'h') {
           time *=60
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


              const guild = message.guild.id
              const guildd = message.guild


                      const banembed = new Discord.MessageEmbed()
                      .setDescription(`${targetUser.user.tag} został wyciszony przez ${author.tag} z powodu: ${reason}\n⏰ Czas bana: ${duration}`)
                      .setThumbnail(targetUser.displayAvatarURL({ dynamic: true }))
                      .setFooter({text: `${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                      .setTimestamp()
                      .setColor(config.color.success)
                     // targetUser.send(`Zostałeś wyciszony na serwerze ${guildd.name} z powodu ${reason}.\n\n⏰ Czas bana: ${duration} `)

                      const result = await punishmentSchema.findOne({
                          guildId: guild,
                          userId,
                          type: 'mute'
                      })
                      if (result) {
                          return message.channel.send('Osoba jest już wyciszona na tym serwerze!')
                      }
                      try {
                          const member = await message.guild.members.fetch(userId)
                          if (member) {
                              const query = {
                                GuildId: message.guild.id,
                              }
                            const results = await rolem.find(query)
                            for (const result of results) {
                                const { MutedRoleId } = result
                              const Role = await message.guild.roles.cache.find((role) => role.id === MutedRoleId)

                              if(!Role) {
                               return message.channel.send("Nie znaleziono roli muted!")
                           }
                           
                           member.roles.add(Role)
                            
                          
                          await new punishmentSchema({
                              userId,
                              staffId: authorid,
                              guildId: guild,
                              reason,
                              expires,
                              type: 'mute',
                              MutedRoleId,               
                          }).save()
                        }
                        }
               
                      } catch (ignored) {
                        console.log(ignored)
                        const er = new Discord.MessageEmbed()
                        .setDescription("Nie możesz z mutować tego użytkownika!")
                        .setColor(config.color.fail)
                        return message.channel.send({embeds: [er]})
              
                      }
                      message.channel.send({embeds: [banembed]})

                      
 
            
        
    }
}