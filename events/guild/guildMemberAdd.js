const Discord = require('discord.js');
const punishmentSchema = require('../../schemas/punishments-expiriance')
const guildy = require('../../schemas/mrole-schema')
const itemn = require('../../schemas/itemy')

module.exports =  {
    name: "ready", 
    once: true,
    async execute(client) {
        client.on('guildMemberAdd', async (member) => {
        var result = await punishmentSchema.findOne({
            guildId: member.guild.id,
            userId: member.id,
            type: 'mute',
        })
        if (result) {
            try {
                const Role = guild.roles.cache.find((role) => role.name === 'Muted')
                if(!Role) {
                    console.log("Nie znaleziono roli!")
                }
             
             member.roles.add(Role)
            } catch (error) {
                console.log(error)
            }
        } 
    })

        const check = async () => {

            const query = {
                expires: { $lt: new Date() },
            }
            const results = await punishmentSchema.find(query)
            for (const result of results) {
                const { guildId, userId, type, MutedRoleId} = result
                
                const guild = await client.guilds.fetch(guildId)
                if(!guild) {
                    console.log(`Serwer ${guildId} nie używa już bota!`)
                    continue
                }
                if(type === 'ban') {
                  const ub = await guild.members.unban(userId).catch(() => null)
                  console.log(ub)
                  if(!ub ){
                      console.log('Użytkownik nie ma już bana!')
                  }
                } else if(type === 'mute') {
                    const Role = guild.roles.cache.find((role) => role.id === MutedRoleId)
                    
                    if(!Role) {
                        console.log("Nie znaleziono roli!")
                        continue
                    }
                    const member = guild.members.cache.get(userId)
                    if(!member){
                        continue
                    } 
                    member.roles.remove(Role)

                }
    }
    const queryy = {
        expires: { $lt: new Date() },
    }
    const resultss = await itemn.find(queryy)
    for (const result of resultss) {
        const { GuildId } = result
        const guild = await client.guilds.fetch(GuildId)
        if(!guild) {
            console.log(`Serwer ${GuildId} nie używa już bota!`)
            continue
        }
    }
    await itemn.deleteMany(queryy)

    await punishmentSchema.deleteMany(query)
    setTimeout(check, 1000 * 60)
    
    
}
 check()
    }
}