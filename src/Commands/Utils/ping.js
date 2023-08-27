const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    //cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction, client) {

        const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });


        await interaction.editReply(`Pong!\n> **Websocket heartbeat:** \`${client.ws.ping} ms\` \n> **Roundtrip latency:** \`${sent.createdTimestamp - interaction.createdTimestamp} ms\``);
    },
};