const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const {Nocly} = require('../../config.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('status')
        .setDescription('set status').addStringOption(option=> option.setName('status').setDescription('set status')
            .addChoices(

                {name:'Online', value:`online`},
                {name: 'Do Not Disturb', value: `dnd`},
                {name:'Idle', value:`idle`},
                {name:'Offline', value:`offline`}).setRequired(true)),
    async execute(interaction, client) {

        const status = interaction.options.getString('status');

        if (interaction.user.id != Nocly){

        } else {
            client.user.setStatus(`${status}`);

            const embed = new EmbedBuilder()
                .setColor('DarkBlue')
                .setDescription(`:white_check_mark:  The bot has the status **\`${client.user.presence.status}\`** now`)

            await interaction.reply({embeds: [embed], ephemeral: true});
        }

    },
};