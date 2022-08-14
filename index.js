const Discord = require('discord.js');
const client = new Discord.Client({ intents : [] });
const token = require('./token.json');
const config = require('./config.json');
const RegisterCommands = require("./interactions/register");
const commands = require('./interactions/commands');

client.on('ready', () => {
    console.log(`[${client.user.tag}] Connecté!`);
    client.user.setStatus("dnd");
    client.user.setActivity("être en Debug par omega7711");
    RegisterCommands(config, token);
});

client.on('interactionCreate', interaction => {
    if(interaction.commandType === 1) {
        if(interaction.commandName === 'link') {
            commands.linkAccount(interaction);
        }
    }
});

client.login(token[0]);