const fs = require('fs');

module.exports = (client, ProfileData) => {
    const catalogues = fs.readdirSync(`./events/`).filter(file => !file.startsWith('.'))

    const load_dir = (dirs) => {
        const event_files = fs.readdirSync(`./events/${dirs}`).filter(file => file.endsWith('.js'));

        for (const file of event_files){
            const event = require(`../events/${dirs}/${file}`);

            if (event.once) {
                client.once(event.name, (...args) => event.execute(client, ...args, ProfileData));
            } else {
                client.on(event.name, (...args) => event.execute(client, ...args, ProfileData));
            }
        }
    }
    catalogues.forEach(e => load_dir(e));
}   