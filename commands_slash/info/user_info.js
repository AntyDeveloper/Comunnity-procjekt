const { MessageEmbed } = require('discord.js')

module.exports = {
    data: {
        name: "user info",
        type: 2
    },
    run: async (interaction) => {
        const member = await interaction.guild.members.fetch(interaction.targetId)
        const joinTime = (member.joinedTimestamp - (member.joinedTimestamp % 1000)) / 1000
        const createdTime = (member.user.createdAt - (member.user.createdAt % 1000)) / 1000

        const embed = new MessageEmbed()
        .setColor(member.displayColor)
        .setAuthor({ name: `${member.user.tag}`, iconURL: `${member.displayAvatarURL({ dynamic: true })}` })
        .setDescription(`<@${member.user.id}> ${member.user.bot? ":robot:":""}`)
        .setThumbnail(member.displayAvatarURL({ dynamic: true }))
        .addFields(
            { name: "ID", value: member.id },
            { name: "Dołączył/a do serwera", value: `<t:${joinTime}:D> (<t:${joinTime}:R>)` },
            { name: "Dołączył/a do Discorda", value: `<t:${createdTime}:D> (<t:${createdTime}:R>)` },
            { name: "Najwyższa rola", value: `<@&${member.roles.highest.id}>` },
            { name: "Nick", value: `${member.nickname? member.nickname:'`brak`'}` }
        )

        interaction.reply({ embeds: [embed], ephemeral: true })
    }
}