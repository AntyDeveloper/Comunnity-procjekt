
const fs = require('fs');
const itemn = require('../../../schemas/itemy')
const ProfileData = require('../../../schemas/ekonomia-schema');
const { count } = require('console');

module.exports = {
  name: "buy",
  async execute(client, message, args, userQuery){
    let shop_data = JSON.parse(Buffer.from(fs.readFileSync('./shop.json')).toString());
    user = await ProfileData.findOne(userQuery);

    let temp_items = Object.keys(shop_data.pages)
    .map(v => shop_data.pages[v].items);
    let items = [];
    temp_items.forEach(tmp_items => {
      items = items.concat(tmp_items)
    });


    let item = items.find(v => v.name === args[0].toLowerCase())

    const GuildId = message.guild.id


    if(!item){
      return message.channel.send("no item found");
    }
    const duration = item.dur;
    const UserId = message.author.id
   let time 
   let type
    const split = duration.match(/\d+|\D+/g)
    time = parseInt(split[0])
    type = split[1].toLowerCase()
if(type == 'h') {
    time *= 60
} else if (type == 'd') {
    time *= 60 * 24
} else if (type == 'm') {

}
const expires = new Date()
expires.setMinutes(expires.getMinutes() + time)
const query = {
  UserId,
}
const queryy = {
  UserId,
  GuildId: message.guild.id,
  
}
let itemm = itemn.findOne(queryy, {
  "push": {
    inventory: args[0].toLowerCase()
  }
  
  })
  try {
  itemm.count(async function (err, count) {
    if (err) console.log(err)
    if(count.item > item.max) return message.channel.send("Masz już ten item!")
console.log(count)
  

if(!duration) duration = " "

    if(item.cost > user.Kasa){
      return message.channel.send("you cannot afford this item");
    } else {
      await ProfileData.updateOne(query,{
        "$inc": {
          "Kasa": -item.cost
        }
      });
     const data =  new itemn({
          inventory: item.name,
          GuildId: GuildId,
          UserId: message.author.id,
          expires,
                
      });
      await data.save()

      message.channel.send(`You Have Just Bought ${item.name}`);
      
    }
  });
  } catch (errr) {
    console.log(errr)
  }
  }
}
