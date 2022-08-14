const Discord = require('discord.js');
const client = new Discord.Client({ intents : [] });
const token = require('./token.json');
const config = require('./config.json');
const RegisterCommands = require("./interactions/register");

client.on('ready', () => {
    console.log(`[${client.user.tag}] Connecté!`);
    client.user.setStatus("dnd");
    client.user.setPresence("être en Debug par omega7711")
    RegisterCommands(config, token);
});

client.on('interactionCreate', interaction => {
    if(interaction.commandType === 1) {
        if(interaction.commandName === 'link') {
            console.log('linking...')
        }
    }
});

client.login(token[0]);