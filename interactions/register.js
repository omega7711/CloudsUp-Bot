const { SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const RegisterCommands = (config, token) => {
    const commands = [
        new SlashCommandBuilder()
            .setName('link')
            .setDescription('Vous connecte à votre compte Minecraft!')
            .addStringOption(option =>
            option.setName('input')
                .setDescription('The input to echo back')
                .setRequired(true)),
    ]
        .map(command => command.toJSON());
    
    const rest = new REST({ version: '10' }).setToken(config.token);
    
    rest.put(Routes.applicationGuildCommands(config.clientId, config.guildId), { body: commands })
        .then(() => console.log('Successfully registered application commands.'))
        .catch(console.error);
}
module.exports = RegisterCommands;