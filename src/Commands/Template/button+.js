const {SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('buttonplus')
        .setDescription('special button'),
    async execute(interaction, client) {

        const roles =[
            {
                id: '882353270872506369',
                label: 'blue'
            },
            {
                id: '882353271442911293',
                label: 'orange'
            },
            {
                id: '1145320470443462676',
                label: 'green'
            }
        ]

        try{
            const row = new ActionRowBuilder();

            roles.forEach((role) => {
                row.components.push(
                    new ButtonBuilder()
                        .setCustomId(role.id)
                        .setLabel(role.label)
                        .setStyle(ButtonStyle.Primary)
                )
            })

            const response = await interaction.reply({content: 'Selection ta couleur', components:[row]});

            const collectorFilter = i => i.user.id === interaction.user.id;

            try {
                const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 60000 });
            } catch (e) {
                await interaction.editReply({ content: 'Confirmation not received within 1 minute, cancelling', components: [] });
            }


            // const collectorFilter = i => i.user.id === interaction.user.id;
            //
            // try{
            //     const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 60000 });
            //
            //     const role = interaction.guild.roles.cache.get(interaction.customId);
            //
            //     if (!role){
            //         interaction.editReply({
            //             content: "I couldn't find that role"
            //         })
            //         return;
            //     }
            //
            //     const hasRole = interaction.member.roles.cache.has(role.id);
            //
            //     if (hasRole){
            //         await interaction.member.roles.remove(role);
            //         await confirmation.update({ content:`The role ${role} has been removed.`, components: []});
            //         return;
            //     }
            //
            //     await interaction.member.roles.add(role);
            //     await confirmation.update({ content: `The role ${role} has been added.`, components: [] });
            //
            // } catch (e){
            //     await interaction.editReply({ content: 'Confirmation not received within 1 minute, cancelling', components: [] });
            //     console.log(e);
            // }

        } catch (e) {
            console.log(e);
        }
    },
};