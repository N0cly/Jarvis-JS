// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits , ActivityType} = require('discord.js');
const dotenv = require("dotenv");
const { token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');
const {Collection} = require("@discordjs/collection");
const {Player} = require("discord-player")


dotenv.config();


const client = new Client({ intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildPresences] });



client.commands = new Collection();

client.player = new Player(client, {
    ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1<<25
    }
})


const foldersPath  = path.join(__dirname, 'Commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        // Set a new item in the Collection with the key as the command name and the value as the exported module
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

const eventsPath = path.join(__dirname, 'Events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {
        await command.execute(interaction, client);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
        } else {
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }

    // try{
    //     if (!interaction.isButton()) return;
    //     await interaction.deferReply({ ephemeral: true});
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
    //         await interaction.editReply(`The role ${role} has been removed.`);
    //         return;
    //     }
    //
    //     await interaction.member.roles.add(role);
    //     await interaction.editReply(`The role ${role} has been added.`);
    // } catch (e) {
    //     console.log(e);
    // }




    //console.log(client);
});

// Log in to Discord with your client's token
client.login(process.env.TOKEN);