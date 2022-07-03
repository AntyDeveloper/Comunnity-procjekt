const Discord = require('discord.js')
const config = require('../../../config.json')
const moment = require('moment');
module.exports = {
	name: 'userinfo',
    aliases: ['u'],
    category: 'Info',
    permissions: ["VIEW_CHANNEL"],
    description: 'Komenda do sprawdzania informacji o użytkowniku',
    async execute(client, message, args, member) {
        const au = message.member
        const guild = await client.guilds.fetch('905198534393991198')

        if(!args[0]) args[0] = au
        const TargetUser = message.mentions.members.first() || await message.guild.members.fetch(args[0]).catch(() => null)

       let Rolee 
       let emoji
       const r1 = TargetUser.roles.cache.find(r => r.id == '905198534490472477')
       const r2 = TargetUser.roles.cache.find(rr => rr.id === '905198534490472474')

       if(r1) Rolee = `Developer` 
       if(r1 == undefined && r2 == undefined) Rolee = `Użytkownik` 

       if(r2) Rolee = `Support` 

       
       if(r1) emoji = `👑` 
       if(r1 == undefined && r2 == undefined) emoji = `👤` 

       if(r2) emoji = `🛡️` 
       const author = message.author
         
        const TargetRole = TargetUser.roles.highest.id
        const created = moment(TargetUser.createdAt).format('DD/MM/YYYY');
        const join = moment(TargetUser.joinedAt).format('DD/MM/YYYY');
try {
        const infou = new Discord.MessageEmbed()
        .setTitle(`Informacje o ${TargetUser.user.tag}`)
        .setThumbnail(TargetUser.displayAvatarURL({ dynamic: true })) 
        .addFields(
            { name: '🌐 Informacje globalne', value: '\u200B' },
            { name: `${emoji} Globalna rola`, value: `» ${Rolee}`, inline: true },
            { name: '💸 Ekonomia top', value: '» xxx', inline: true },
            { name: '🎖️ Włączone boosty', value: '» Brak', inline: true },
            { name: '\u200B', value: '\u200B' },
            { name: '🗂️ Informacje serwerowe', value: '\u200B' },
            { name: '🗓️ Data dołączenia do serwera', value: `» ${created}`, inline: true },
            { name: '🗓️ Data dołączenia do discorda', value: `» ${join}`, inline: true },
            { name: '📤 Najwyższa rola', value: `» <@&${TargetRole}>`, inline: true },

        )
        .setFooter({text: `${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
        .setColor(config.color.success)
        .setTimestamp()

        message.channel.send({embeds: [infou]})

        } catch (err) {
            const er = new Discord.MessageEmbed()
            .setDescription("Coś poszło nie tak!")
            .setColor(config.color.fail)
            return message.channel.send({embeds: [er]})
        }
    
    }
}