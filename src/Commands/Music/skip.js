const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skip the current song'),
    async execute(interaction, client) {
        const queue = client.player.getQueue(interaction.guildId)

        if (!queue){
            return await interaction.editReply("There are no songs in the queue")
        }

        const currentSong = queue.current

        queue.skip();
        await interaction.editReply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`${currentSong.title} has been skipped`)
                    .setThumbnail(currentSong.thumbnail)
            ]
        })

    },
};