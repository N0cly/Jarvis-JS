const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('resume')
        .setDescription('Resume the music'),
    async execute(interaction, client) {
        const queue = client.player.getQueue(interaction.guildId)

        if (!queue){
            return await interaction.editReply("There are no songs in the queue")
        }

        queue.setPaused(false);
        await interaction.editReply("Music has been resumed! Use `\pause` to pause the music")

    },
};