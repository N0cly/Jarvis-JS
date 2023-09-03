const {Events} = require('discord.js');


module.exports ={
    name: Events.ClientReady,
    once: false,
    execute(interaction, client) {

        //console.log(`Ready! Logged in as ${client.user.tag}`)
        //console.log(`${client.user.tag} is connected !`)
        // client.user.setStatus("idle");
        // setTimeout(() => {
        //     client.user.setActivity("son apprentissage...", {type: 'WATCHING'});
        //
        // }, 2000);
    }
}