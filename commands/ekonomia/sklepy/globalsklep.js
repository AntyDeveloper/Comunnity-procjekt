const Discord = require('discord.js');
const ms = require('ms');
const punishmentSchema = require('../../../schemas/punishments-expiriance')
const config = require('../../../config.json')
const rolem = require('../../../schemas/mrole-schema')
const fs = require('fs');

module.exports = {
	name: 'sklep',
    category: 'Prace',
    permissions: ["VIEW_CHANNEL"],
	description: 'Komenda do otwarcia sklepu!',
	async execute(client, message, args, ProfileData, user, userQuery) {
        const test = fs.readFileSync('./shop.json')
        console.log(test)
        let shop_data = JSON.parse(Buffer.from(fs.readFileSync('./shop.json')).toString());
        let index = (args[0] || "1");
        let page = shop_data.pages[index];
    
        if(!page) {
          return message.channel.send("» Nie znaleziono strony!")
        }
    
        const shop = new Discord.MessageEmbed()
        .setTitle("Sklep globalny")
        .setColor("RANDOM");
    
        for(let item of page.items){
          console.log(item);
          if('hidden' in item){
            if(!item.hidden){
              continue;
            }
          }
          shop.addField(item.name, `Opis przedimotu » \`${item.description || "brak"}\`\Koszt » \`${item.cost || "nie podano"}\``);
        }
    
        await message.channel.send({embeds: [shop]});

    }
}