const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('Donne la parole au bot')
        .addStringOption(option =>
            option.setName('message')
                .setDescription('Qu\'as-tu à dire ?')
                .setRequired(true))
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('Où ?')),
    async execute(interaction, client) {
        const message = interaction.options.getString('message');
        const channel = interaction.options.getChannel('channel');

        // Si le canal n'est pas spécifié, utilise le canal par défaut du serveur
        const defaultChannel = interaction.guild.channels.cache.find(
            (ch) => ch.type === 'text' && ch.permissionsFor(interaction.guild.me).has('SEND_MESSAGES')
        );

        if (!channel) {
            if (defaultChannel) {
                await defaultChannel.send(message);
            } else {
                await interaction.reply('Le canal par défaut du serveur n\'a pas été trouvé.');
            }
        } else {
            await channel.send(message);
        }
    },
};