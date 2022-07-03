const fs = require('fs');
module.exports = (client) => {
const catalogues = fs.readdirSync(`./commands`).filter(folder => !folder.startsWith('.'))

for (const catalogue of catalogues) {
    const commandfolder = fs.readdirSync(`./commands/${catalogue}`)
    

    for (const folder of commandfolder) {
        const files = fs.readdirSync(`./commands/${catalogue}/${folder}`).filter(file => file.endsWith('.js'))

        for (const commands of files){
            const command = require(`../commands/${catalogue}/${folder}/${commands}`)
            if (command.name) {
                client.commands.set(command.name, command);
            } else {
                continue;
            }
        }
    }
}
}