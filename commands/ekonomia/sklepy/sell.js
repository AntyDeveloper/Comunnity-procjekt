
const ProfileData = require('../../../schemas/ekonomia-schema')
const itemn = require('../../../schemas/itemy')
const fs = require('fs');

module.exports = {
    name: "sell",
    async execute(client, message, args, userQuery){

      let shop_data = JSON.parse(Buffer.from(fs.readFileSync('./shop.json')).toString());
  
      let temp_items = Object.keys(shop_data.pages)
      .map(v => shop_data.pages[v].items);
      let items = [];
       const GuildId = message.guild.id
      temp_items.forEach(tmp_items => {
        items = items.concat(tmp_items)
      });
  
    
        let  itemy = items.find(v => v.name === args[0].toLowerCase())

      if(!itemy) return message.channel.send("Nie znaleziono itemu!")

  
      const UserId = message.author.id

      const queryy = {
        UserId,
        GuildId: message.guild.id,
        
    }
      const resultss = await itemn.find(queryy)
      for (const result of resultss) {
          const { inventory, GuildId } = result


        let item = itemn.findOne(queryy, {
        "push": {
          inventory: args[0].toLowerCase()
        }
        
        })

        if(!item) return message.channel.send("Nie masz żadnych itemów!");

        const guildd = await client.guilds.fetch(GuildId)

      if(guildd) {
      if(!item){
        return message.channel.send("No Item Found In Inventory");
      }
    } else {
      console.log("Nie znaleziono serwera!")
    }
   const cena = Math.round(itemy.cost * 2/3)
   console.log(cena)
      await ProfileData.updateOne(userQuery,{
        "$inc": {
          "Kasa": cena
        }
      });


        if(!guildd) {
            console.log(`Serwer ${GuildId} nie używa już bota!`)
            continue
        }
        const member = guildd.members.cache.get(UserId)
        if(!member){
            continue
        } 
        await message.channel.send(`Sprzedałeś ${itemy.name} i otrzymałeś ${Math.round(itemy.cost * 2/3)}$.`)

    }
    await itemn.deleteMany(queryy)

  
  
    }
  }
  