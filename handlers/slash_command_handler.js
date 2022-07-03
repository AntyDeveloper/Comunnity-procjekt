const fs = require('fs');

function isJson(item) {
    item = typeof item !== "string"
        ? JSON.stringify(item)
        : item;

    try {
        item = JSON.parse(item);
    } catch (e) {
        return false;
    }

    if (typeof item === "object" && item !== null) {
        return true;
    }

    return false;
}

const slash = {
    register: async (clientId, client) => {
        const mainGuild = await client.guilds.cache.get("604785981446422528")
        const catalogues = fs.readdirSync("./commands_slash").filter((file) => !file.startsWith("."));
    
        let commandsArray = [];
        let commandsPermissions = [];
        let contextMenus = [];

        catalogues.forEach((catalogue) => {
            const commandFiles = fs.readdirSync(`./commands_slash/${catalogue}`).filter((file) => file.endsWith(".js"));

            for (const commandFile of commandFiles)
            {
                const command = require(`../commands_slash/${catalogue}/${commandFile}`)

                if (command.permissions)
                {
                    command.data.defaultPermission = false

                    commandsPermissions.push({
                        name: command.data.name, 
                        perms: command.permissions
                    })
                }

                client.commands.set(command.data.name, command);
                
                if (isJson(command.data)) contextMenus.push(command)
                else commandsArray.push(command);
            }
        });
    
        const commands = commandsArray.map((e) => e.data.toJSON());
        contextMenus.forEach(menu => {
            commands.push(menu.data)
        })

        try
        {
            mainGuild.commands.set(commands).then(collection => {
                collection.forEach(async (cmd) => {
                    const command = commands.find((c) => c.name == cmd.name)

                    const element = commandsPermissions.find(element => element.name == command.name)
                    if (element) {
                        let rolePermissions = [];
                        
                        element.perms.forEach(perm => {
                            rolePermissions.push({
                                id: perm,
                                type: 'ROLE',
                                permission: true
                            })
                        })
                        
                        await client.application.commands.permissions.set({ guild: mainGuild , command: cmd.id, permissions: rolePermissions });
                    }
                })
            })

            //global -> commands.forEach(command => client.application.commands.create(command)
        }
        catch (error) 
        {
            console.log(error)
        }
    },
};

module.exports = slash;