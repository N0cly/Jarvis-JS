const {SlashCommandBuilder} = require('discord.js');
const {Nocly} = require('../../config.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('console')
        .setDescription('command dev')
        .addStringOption(option => option.setName('command').setDescription('command').setRequired(true)),
    async execute(interaction, client) {

        const command = interaction.options.getString('command');

        if (interaction.user.id != Nocly) {
            return await interaction.reply({content: `this command is only for devs`, ephemeral: true});

        } else {
            await interaction.reply(`\`\`\`json \n ${command}\`\`\``)
        }
    },
};