const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('quit')
        .setDescription('Stop the bot and clears the queue'),
    async execute(interaction, client) {
        const queue = client.player.getQueue(interaction.guildId)

        if (!queue){
            return await interaction.editReply("There are no songs in the queue")
        }

        queue.destroy();
        await interaction.editReply("Bye!")

    },
};