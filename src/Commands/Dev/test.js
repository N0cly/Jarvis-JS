const {SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js');
const {Nocly} = require('../../config.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('test command')
        .addRoleOption(option =>
        option.setName('role')
            .setDescription('select a role')),
    async execute(interaction, client) {

        if (interaction.user.id != Nocly) {
            return await interaction.reply({content: `this command is only for devs`, ephemeral: true});

        } else {
            const role = interaction.options.getRole('role');

            console.log(role)
            interaction.user.id.roles.add(role)
            await interaction.reply('heyyyyyyyyy')
        }
    },
};