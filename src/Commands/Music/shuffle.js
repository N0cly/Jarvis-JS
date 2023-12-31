const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shuffle')
        .setDescription('Shuffle the queue'),
    async execute(interaction, client) {
        const queue = client.player.getQueue(interaction.guildId)

        if (!queue){
            return await interaction.editReply("There are no songs in the queue")
        }

        queue.shuffle();
        await interaction.editReply(`the queue of ${queue.tracks.length} songs have been shuffled!`)

    },
};