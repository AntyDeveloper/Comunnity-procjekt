const { Discord, MessageEmbed, MessageSelectMenu, MessageActionRow, Role, Permissions } = require('discord.js');
const guildy = require('../../schemas/mrole-schema')
module.exports = {
  name: "guildDelete",
  async execute(client, guild, channel) {
     const GuildId = guild.id
   try {
    const query = {
        GuildId: guild.id,
    }
    const results = await guildy.find(query)
    console.log(results)
    for (const result of results) {
        const { MutedRoleId, Rguild} = result

        await punishmentSchema.deleteMany(query)

        

    }

  } catch (error) {
  console.log(error)
  }
  }
}