const { Client, Intents } = require('discord.js');
const Discord = require('discord.js')
require('dotenv').config()
const prefixx = require('discord-prefix');
const config = require('./config.json')

const client = new Client({
    partials: ['CHANNEL', 'MESSAGE', 'REACTION', 'USER', 'GUILD_MEMBER'],
    intents: [
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_INTEGRATIONS,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGES,
    ]
})


client.commands = new Discord.Collection();
client.events = new Discord.Collection();

[`command_handler`, `event_handler`,].forEach(handler =>{
    require(`./handlers/${handler}`)(client);
})

client.on('messageCreate', async message => {
    if (message.content == `<@${client.user.id}>` || message.content == `<@!${client.user.id}>`)
    {
        let prefix = prefixx.getPrefix(message.guild.id);
        if (!prefix) prefix = config.df_prefix;
        message.reply(`Prefix dla tego serwera to \`${prefix}\`.\nJeśli potrzebujesz pomocy z daną komendą użyj \`${prefix}help <nazwa-komendy>\`.`)
    }
})

client.login(process.env.TOKEN)

module.exports = client;