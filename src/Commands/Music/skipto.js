const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skipto')
        .setDescription('Skips to a certain track #')
        .addNumberOption(option =>
            option
                .setName("tracknumber")
                .setDescription("The track to skip to")
                .setMinValue(1)
                .setRequired(true)),
    async execute(interaction, client) {
        const queue = client.player.getQueue(interaction.guildId)

        if (!queue){
            return await interaction.editReply("There are no songs in the queue")
        }

        const trackNum = interaction.options.getNumber("tracknumber")
        if (trackNum > queue.tracks.length){
            return await interaction.editReply("Invalid track number")
        }
        queue.skipTo(trackNum -1);
        await interaction.editReply(`Skipped ahead to track number ${trackNum}`)

    },
};