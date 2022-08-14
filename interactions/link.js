const request = require('request');
const Discord = require('discord.js');
const embed = require('../utils/embeds/embedbuilder');
  /**
   * @param {Discord.Interaction} interaction L'Interaction d'invocation 
   */

const PNameCannotContain = [
    "&", "é", "\"", "~", "#", "'", "{", "(", "[", "-", "|", "è", "\`", "\\", "ç", "à", "@", ")", "]", "=", "}", "§", "!", ";", ",", "?", "%", "ù", "â", "ê", "ô", "ö", "¨", "^", "$", "£", "¤", "*", "µ", ":", "/"
]

const LinkAccountCommand = (interaction) => {
    const linkingpseudo = interaction.options._hoistedOptions[0].value;
    let i = 0;
    while(i < PNameCannotContain.length) {
        i++;
        if(linkingpseudo.includes(PNameCannotContain[i])) return interaction.reply({ embeds: [embed.error(`Le pseudo ne peut contenir le caractère suivant: \`${PNameCannotContain[i]}\``)]});
    }
    request(`https://minecraft-api.com/api/uuid/${linkingpseudo}`, function (error, response, body) {
        if(body === "Player not found !") {
            interaction.reply({ embeds: [embed.error(`Le joueur \`${linkingpseudo}\` est introuvable!`)]});
            console.log(`Le joueur ${linkingpseudo} est introuvable!`);
        } else {
            let i = body;
            let linkingpseudob = i.substr(0,8)+"-"+i.substr(8,4)+"-"+i.substr(12,4)+"-"+i.substr(16,4)+"-"+i.substr(20);
            request(`https://api.hypixel.net/player?uuid=${linkingpseudob}&key=fe43eda3-d887-4b54-a774-4b70dc76b3e2`, function (error, response, body) {
                if(JSON.parse(body).player.socialMedia.links.DISCORD === interaction.member.user.tag) {
                    console.log("faire le système d'enregistrement");
                } else {
                    const membed = embed.error(`Votre compte \`${interaction.member.user.tag}\` ne corresponds pas à celui enregistré sur le compte Hypixel de \`${JSON.parse(body).player.displayname}\` qui est \`${JSON.parse(body).player.socialMedia.links.DISCORD}\``)
                    interaction.reply({ embeds: [membed] });
                }
                console.log(JSON.parse(body).player.socialMedia.links.DISCORD);
            })
        }
    })
}

module.exports = LinkAccountCommand;