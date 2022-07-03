const { Discord, MessageEmbed, MessageSelectMenu, MessageActionRow, Role, Permissions } = require('discord.js');
const guildy = require('../../schemas/mrole-schema')
module.exports = {
  name: "guildCreate",
  async execute(client, guild, channel) {
     const GuildId = guild.id
const mr = await guildy.findOne({ GuildId })
   try {
   if(!mr) {
     
 const role = await guild.roles.create({
      name: 'Wyciszony/a',
      color: '#808080',
      permissions: []
     })

     await guild.channels.cache.forEach(async (channel, id) => {
       channel.permissionOverwrites.create(role, {
         SEND_MESSAGES: false,
         MANAGE_MESSAGES: false,
         ADD_REACTIONS: false
      });
   });
     console.log(role.id)
     const data =  new guildy({
      MutedRoleId: role.id,
      GuildId,
      Rguild: 'Standard',

  })
  await data.save()

    } else {
      console.log('Na tym serwerze jest rola!')
    }
  } catch (error) {
  console.log(error)
  }
  }
}