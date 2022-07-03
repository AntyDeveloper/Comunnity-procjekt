const { Permissions } = require('discord.js')
const config = require('../../config.json')
const { MessageEmbed } = require('discord.js')
const prefixx = require('discord-prefix');
const ban = require('../../commands/mod/Ban etc/ban');

const Discord = require('discord.js')
const ProfileData = require('../../schemas/ekonomia-schema')

module.exports = {
    name: "messageCreate",
    async execute(client, message, guild) {

        const embed1 = new MessageEmbed()
        .setColor(`RED`)
        .setDescription(`❌ **Komend możesz używać tylko na serwerze!**`)

        if (!message.guild) return;
        let prefix = prefixx.getPrefix(message.guild.id);
        if (!prefix) prefix = config.df_prefix;

        if (!message.content.startsWith(prefix) || message.author.bot) return;
        
        //args and aliases
        const args = message.content.slice(prefix.length).split(/ +/);

        const cmd = args.shift().toLowerCase();
        const command = client.commands.get(cmd) || client.commands.find(c => c.aliases && c.aliases.includes(cmd));

        let userQuery = { userID: message.author.id }

        // get the user
        let user = await ProfileData.findOne(userQuery);
        // if user not found create the user in the schema
        if(!user){
          console.log('new user')

          let new_user = new ProfileData({
            userQuery,
            UserId: message.author.id,
            Kasa: '200',
          })
          
          await new_user.save();
          user = await ProfileData.findOne(userQuery);
        };
        if (!command) return;
        const validPermissions = [
          "CREATE_INSTANT_INVITE",
          "KICK_MEMBERS",
          "BAN_MEMBERS",
          "ADMINISTRATOR",
          "MANAGE_CHANNELS",
          "MANAGE_GUILD",
          "ADD_REACTIONS",
          "VIEW_AUDIT_LOG",
          "PRIORITY_SPEAKER",
          "STREAM",
          "VIEW_CHANNEL",
          "SEND_MESSAGES",
          "SEND_TTS_MESSAGES",
          "MANAGE_MESSAGES",
          "EMBED_LINKS",
          "ATTACH_FILES",
          "READ_MESSAGE_HISTORY",
          "MENTION_EVERYONE",
          "USE_EXTERNAL_EMOJIS",
          "VIEW_GUILD_INSIGHTS",
          "CONNECT",
          "SPEAK",
          "MUTE_MEMBERS",
          "DEAFEN_MEMBERS",
          "MOVE_MEMBERS",
          "USE_VAD",
          "CHANGE_NICKNAME",
          "MANAGE_NICKNAMES",
          "MANAGE_ROLES",
          "MANAGE_WEBHOOKS",
          "MANAGE_EMOJIS",
        ]
        if(message.author.id === config.owner) {
          try {
            await command.execute(client, message, args)
        } catch (error) {
            console.error(error);
        }
        } else
        if(command.permissions.length){
          let invalidPerms = []
          for(const perm of command.permissions){
            if(!validPermissions.includes(perm)){
              return console.log(`Invalid Permissions ${perm}`);
            }

            if(!message.member.permissions.has(perm)){
              invalidPerms.push(perm);
            } else {
              try {
                await command.execute(client, message, args, ProfileData, user, userQuery)
            } catch (error) {
                console.error(error);
            }
            }
          }
          if (invalidPerms.length){
            return message.channel.send(`Nie posiadasz permisji \`${invalidPerms}\``);
          }
        }
      
      

  


                  
          


        //execute command

    }
}