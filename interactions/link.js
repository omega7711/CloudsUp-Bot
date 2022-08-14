const request = require('request');
const Discord = require('discord.js');
  /**
   * @param {Discord.Interaction} interaction L'Interaction d'invocation 
   */

const LinkAccountCommand = (interaction) => {
    const linkingpseudo = interaction.options._hoistedOptions[0].value;
    request(`https://minecraft-api.com/api/uuid/${linkingpseudo}/json`, function (error, response, body) {
        if(body === "Player not found !") {
            interaction.reply()
        }
    })
}

module.exports = LinkAccountCommand;