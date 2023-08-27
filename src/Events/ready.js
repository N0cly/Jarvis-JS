const {Events, ActivityType} = require('discord.js');


module.exports ={
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`)
        //console.log(`${client.user.tag} is connected !`)
        // client.user.setStatus("idle");
        // setTimeout(() => {
        //     client.user.setActivity("son apprentissage...", {type: 'WATCHING'});
        //
        // }, 2000);

        //client.user.setActivity('SUNLIGHTS', { type: ActivityType.Listening });

        client.user.setActivity({
            name: 'SUNLIGHTS',
            type: ActivityType.Listening,
            url: 'https://youtu.be/2p_AxoaHeRw',
        })

        client.user.setStatus("online");
    }
}