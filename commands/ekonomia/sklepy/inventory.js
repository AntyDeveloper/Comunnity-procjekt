const itemn = require('../../../schemas/itemy')
const Discord = require('discord.js');

module.exports = {
    name: "test",
    async execute(client, message, args, userQuery){
        try {       
        const UserId = message.author.id

        const queryy = {
          UserId,
          GuildId: message.guild.id,
      }


  
      const testt = await itemn.find(queryy, {}).select('-_id inventory')
      const test = testt.map(inventories => inventories.inventory).join(", ")
      const testtt = testt
      .map(inventories => inventories.inventory
        ).join(", ")
  console.log(testtt)
      
      const inventoryy = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setTitle("Inventory")
      .setDescription(`${testtt}`)
  
       message.channel.send({embeds: [inventoryy]});
       
        

        

} catch (errrf) {
    console.log(errrf)
}
    }
  }