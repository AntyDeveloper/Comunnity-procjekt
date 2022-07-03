module.exports = {
    name: "interactionCreate",
    async execute(client, i) {
        if (i.isCommand() || i.isContextMenu()) 
        {
            
            const commandCheck = client.commands.get(i.commandName);

            if (!commandCheck) {
                return console.log(`Could not find command: '${i.commandName}'`);
            } else {
                await commandCheck.run(i);
            }
        }
    }
}
