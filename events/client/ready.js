const slash = require('../../handlers/slash_command_handler.js')
require('dotenv').config()
const conf = require('../../config.json'
)
const punishment = require('../../schemas/punishments-expiriance')

const mongoose = require('mongoose')
module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        slash.register(client.user.id, client);




        await mongoose.connect(
            process.env.MONGO_URI || '',
        {
            keepAlive: true
        }) 


        const memberCount = client.guilds.cache.reduce((a, g) => a+g.memberCount, 0)
        const guildd = client.guilds.cache.size
        const owner = await client.users.fetch(conf.owner)
        console.log("\x1b[32m",`ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ🎇 ${client.user.username} 🎇`,"\x1b[0;31m")
        console.log("\x1b[1;31m ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ📊 Staty 📊 \x1b[0m" ,`\nㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ 🔒 Serwery ${guildd} 🔒 || 👤 Użytkownicy ${memberCount} 👤`)
        const activities_list = [
            `| Użytkownicy 👤 ${memberCount} |`,
            `| Pula ekonomi 💸 xxxx |`,
            `| Top1 Ekonomi 💸 xxxx |`,
            `| ${client.user.username} 💜 by ${owner.username} |`
              ]; 
            let i = 0;
            setInterval(() => {
                client.user.setPresence({ status: 'dnd', activities:  [{name: activities_list[i++%activities_list.length], type:'PLAYING'}] }) 
            }, 10000);




            
    }
}