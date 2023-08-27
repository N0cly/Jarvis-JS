const {SlashCommandBuilder, ActivityType, EmbedBuilder} = require('discord.js');
const {Nocly} = require('../../config.json')


module.exports = {
    data: new SlashCommandBuilder()
        .setName('activities')
        .setDescription('Set the bot status (only devs)')
        .addStringOption(option=> option.setName('type').setDescription('le type d\'action du bot ')
            .addChoices(
                {name: 'Watching', value: `${3}`},
                {name:'Playing', value:`${0}`},
                {name:'Listening', value:`${2}`},
                {name:'Competing', value:`${5}`},
                {name:'Streaming', value:`${1}`},
                {name:'Custom', value:`${4}`}).setRequired(true))
        .addStringOption(option => option.setName('status').setDescription('le status du bot').setMaxLength(128).setRequired(true)),
    async execute(interaction, client) {

        const status = interaction.options.getString('status');
        const type = interaction.options.getString('type');

        if (interaction.user.id != Nocly) {

            return await interaction.reply({content: `this command is only for devs`, ephemeral: true});
        } else {

            client.user.setActivity({
                name: status,
                type: type,
                url: 'https://youtu.be/2p_AxoaHeRw',
            })


            const embed = new EmbedBuilder()
                .setColor('Gold')
                .setDescription(`:white_check_mark:  The bot \`${client.user.presence}\` \`${client.user.presence.activities}\``)

            await interaction.reply({embeds: [embed], ephemeral: true});
            //console.log(client.user.presence.user)
            //await interaction.reply(`\`\`\`${client.user.presence}\`\`\``)
        }
    },
};