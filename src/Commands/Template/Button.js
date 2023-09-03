const {SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('button')
        .setDescription('send some button'),
    async execute(interaction, client) {

        const primary = new ButtonBuilder()
            .setCustomId('primary')
            .setLabel('Primary')
            .setStyle(ButtonStyle.Primary);

        const secondary = new ButtonBuilder()
            .setCustomId('secondary')
            .setLabel('Secondary')
            .setStyle(ButtonStyle.Secondary);

        const success = new ButtonBuilder()
            .setCustomId('success')
            .setLabel('Success')
            .setStyle(ButtonStyle.Success);

        const danger = new ButtonBuilder()
            .setCustomId('danger')
            .setLabel('Danger')
            .setStyle(ButtonStyle.Danger);

        const link = new ButtonBuilder()
            .setLabel('Link')
            .setURL('https://youtu.be/2p_AxoaHeRw')
            .setStyle(ButtonStyle.Link);

        const row = new ActionRowBuilder()
            .addComponents(primary, secondary, success, danger, link);


        await interaction.reply({
            content: 'Some button, idk :)',
            components: [row],
        });
    },
};