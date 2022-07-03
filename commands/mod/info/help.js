const Discord = require('discord.js')
const config = require('../../../config.json')
const moment = require('moment');
const fs = require('fs');

module.exports = {
	name: 'pomoc',
    aliases: ['help', 'p'],
    permissions: ["VIEW_CHANNEL"],

	description: 'Informacje o komendach!',
    async execute(client, message, args, member) {


 const row1 = new Discord.MessageActionRow()
 .addComponents(
     new Discord.MessageSelectMenu()
     .setCustomId('Help')
     .setPlaceholder('Nie wybrano żadnej opcji')
     .setMaxValues(1)
     .addOptions([
         {
             label: 'Lista komendy',
             description: 'Lista komend do bota',
             value: '1'
         },
         {
            label: 'Ekonomia',
            description: 'Informacje o ekonomi i sklepach',
            value: '2'
        },
        {
            label: 'Rodzaje serwerów',
            description: 'Informacje na temat rodzaji serwerów!',
            value: '3'
        },
        {
            label: 'Support',
            description: 'Kontakt do supportu',
            value: '4'
        },
     ])
 )

    const e = message.client.commands
    .filter(cmd => cmd.category == 'Mod')
    .map(cmd => cmd.name)
    .join(', ');
    
    const i = message.client.commands
    .filter(cmd => cmd.category == 'Info')
    .map(cmd => cmd.name)
    .join(', ');

    const ex = message.client.commands
    .filter(cmd => cmd.category == 'Exp')
    .map(cmd => cmd.name)
    .join(', ');
    const lv = message.client.commands
    .filter(cmd => cmd.category == 'Level')
    .map(cmd => cmd.name)
    .join(', ');

    const Prace = message.client.commands
    .filter(cmd => cmd.category == 'Prace')
    .map(cmd => cmd.name)
    .join(', ');

    const Gry = message.client.commands
    .filter(cmd => cmd.category == 'Gry')
    .map(cmd => cmd.name)
    .join(', ');

    const fun = message.client.commands
    .filter(cmd => cmd.category == '4fun')
    .map(cmd => cmd.name)
    .join(', ');
    const sklep = message.client.commands
    .filter(cmd => cmd.category == 'sklep')
    .map(cmd => cmd.name)
    .join(', ');
    const helpemb = new Discord.MessageEmbed()
    .setTitle('Wszystkie dostępne informacje!')
    .setDescription("Użyj odpowiedniego przycisku, aby uzyskać informacje!")
    .setFooter({text: `${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
    .setTimestamp()
    .setColor(config.color.success)
        
    const msg = await message.channel.send({embeds: [helpemb], components: [row1]})
   
    client.on('interactionCreate', async interaction => {    
        if (interaction.customId === 'Help') {
            try {
            await interaction.deferUpdate();

            if(interaction.values[0] === '1'){
                const helpkom = new Discord.MessageEmbed()
                .setTitle('Wszystkie dostępne komendy!')
                .addFields(
                    { name: '🌐 Adminitracyjne', value: `***Moderacyjne »***\n ${e}\n\n ***Moderacyjne exp*** »\n ${ex}\n \u200B`, inline: true },
                    { name: '\u200B', value: '\u200B', inline: true},
                    { name: '🌐 Ekonomia', value: `**Prace »**\n ${Prace}\n\n***Gry »***\n${Gry}\n \u200B`, inline: true },
                    { name: '🌐 Informacyjne', value: `${i}`, inline: true },
                    { name: '\u200B', value: '\u200B', inline: true},
                    { name: '🌐 System leveli', value: `${lv}\n \u200B`, inline: true },
                    { name: '🌐 4Fun', value: `${fun}`, inline: true },
                    { name: '\u200B', value: '\u200B', inline: true},
                    { name: '\u200B', value: '\u200B \n \u200B ', inline: true},
                    { name: 'Nie wiesz co robi poszczególna komenda?', value: 'Użyj >help info', inline: true},

                )
                .setFooter({text: `${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                .setTimestamp()
                .setColor(config.color.success)
                msg.edit({embeds: [helpkom], components: [row1]})
            }
            if(interaction.values[0] === '2'){
                const helpeko = new Discord.MessageEmbed()
                .setTitle('Informacje o ekonomii!')
                .setFooter({text: `${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                .setTimestamp()
                .setColor(config.color.success)
                msg.edit({embeds: [helpeko], components: [row1]})
            }
            if(interaction.values[0] === '3'){
                const helpeko = new Discord.MessageEmbed()
                .setTitle('Rodzaje serwerów!')
                .setFooter({text: `${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                .setTimestamp()
                .setColor(config.color.success)
                msg.edit({embeds: [helpeko], components: [row1]})
            }
            if(interaction.values[0] === '4'){
                const helpeko = new Discord.MessageEmbed()
                .setTitle('Informacje o na temat bota!')
                .setDescription(`\n *Założycielem bota jest <@${config.owner}>. Bot jest zbiorem inowacyjjnych zastosowań lub rozwiązań tak, aby serwery, które posiadają bota prowadziło się lepiej. Bot nie tylko posiada typowe dla botów funkcje, ale też dodatki w postaci boostów na dany serwer lub danej osoby. Bot prowadzi rannking najbardziej aktywnych serwerów biorąc pod uwagę aktywność samych użytkowników po przez pisanie lub romowę na voice chacie. Dla najbardziej aktywnych oraz lojanych pod względem używania bota przewidzane są nagrody >nagrody. Miłego użytkowania bota :D.* \n\n**Media »**\nDiscord Link`)
                .setFooter({text: `${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                .setTimestamp()
                .setColor(config.color.success)
                msg.edit({embeds: [helpeko], components: [row1]})
            }
        } catch (errrr) {
            const er = new Discord.MessageEmbed()
            .setDescription("Wystąpił bład")
            .setColor(config.color.fail)
            return message.channel.send({embeds: [er]})
        }
        }
    });

    }
    }