const { SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const RegisterCommands = (config, token) => {
    const commands = [
        new SlashCommandBuilder()
            .setName('link')
            .setDescription('Vous connecte à votre compte Minecraft!')
            .addStringOption(option =>
            option.setName('pseudo')
                .setDescription('Le pseudo du joueur à synchroniser!')
                .setRequired(true)),
    ]
        .map(command => command.toJSON());
    
    const rest = new REST({ version: '10' }).setToken(token);
    rest.delete(Routes.applicationCommand(config.clientId, 'commandId'))
	.then(() => console.log('Successfully deleted application command'))
	.catch(console.error);
    
    rest.put(Routes.applicationGuildCommands(config.clientId, config.guildId), { body: commands })
        .then(() => console.log('Successfully registered application commands.'))
        .catch(console.error);
}
module.exports = RegisterCommands;