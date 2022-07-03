const Discord = require('discord.js')
const config = require('../../../config.json')
const moment = require('moment');
const guildy = require('../../../schemas/mrole-schema')

module.exports = {
	name: 'serverinfo',
    aliases: ['sv'],
    category: 'Info',
    description: 'Komenda do sprawdzania informacji o serwerze',
    permissions: ["VIEW_CHANNEL"],

	description: 'Informacje o użytkowniku!',
    async execute(client, message, args, member) {
        try {
        const au = message.guild
        const query = {
            GuildId: au.id
        }
        const results = await guildy.find(query)
        console.log(results)
        for (const result of results) {
            const { Rguild } = result
        if(!args[0]) args[0] = au
        const TargetUser = await client.guilds.fetch(args[0]).catch(() => null)
        const created = moment(TargetUser.createdAt).format('DD/MM/YYYY');
        const join = moment(message.author.joinedAt).format('DD/MM/YYYY');
        const wl = au.ownerId
        if(!join) join = `Nie jesteś na serwerze!`
        if(!Rguild) Rguild == 'Standard'
        if(Rguild == 'Standard') emoji = `🏵️` 
         if(Rguild) emoji = `🏅` 
         if(Rguild == 'Main') emoji = `🏅` 
  
         if(Rguild == 'Premium') emoji = `🎖️` 
         const author = message.author
   
        const infou = new Discord.MessageEmbed()
        .setTitle(`Informacje o ${TargetUser.name}`)
        .setThumbnail(au.iconURL({ dynamic: true })) 
        .addFields(
            { name: '🌐 Informacje globalne', value: '\u200B' },
            { name: `${emoji} Rodzaj serwera`, value: `» ${Rguild}`, inline: true },
            { name: '💸 Ranking serwera', value: '» xxx', inline: true },
            { name: '🎖️ Włączone boosty', value: '» Brak', inline: true },
            { name: '\u200B', value: '\u200B' },
            { name: '🗂️ Informacje serwerowe', value: '\u200B' },
            { name: '👑 Właściciel serwera', value: `» <@${wl}>`, inline: true },
            { name: '🗓️ Data założenia serwera', value: `» ${created}`, inline: true },
            { name: '🗓️ Data dołączenia do discorda', value: `» ${join}`, inline: true },

        )
        .setFooter({text: `${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
        .setColor(config.color.success)
        .setTimestamp()

        message.channel.send({embeds: [infou]})
        }
        } catch(error) {
            console.log(error)
            const er = new Discord.MessageEmbed()
            .setDescription("Coś poszło nie tak!")
            .setColor(config.color.fail)
            return message.channel.send({embeds: [er]})
        }
    }
}