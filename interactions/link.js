const request = require('request');
const Discord = require('discord.js');
const embed = require('../utils/embeds/embedbuilder');
const fs = require('fs');
  /**
   * @param {Discord.Interaction} interaction L'Interaction d'invocation 
   */
const users = require('./storage/linkedaccounts.json');
const PNameCannotContain = [
    "&", "é", "\"", "~", "#", "'", "{", "(", "[", "-", "|", "è", "\`", "\\", "ç", "à", "@", ")", "]", "=", "}", "§", "!", ";", ",", "?", "%", "ù", "â", "ê", "ô", "ö", "¨", "^", "$", "£", "¤", "*", "µ", ":", "/"
]

function grade() {
    
}

const LinkAccountCommand = (interaction) => {
    if(users[interaction.member.user.id]) return interaction.reply({ embeds: [embed.error(`Cette action est impossible, vous êtes déja connecté au compte Minecraft \`${users[interaction.member.user.id].displayname}\`!`)]});
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
                if(!JSON.parse(body).player) return interaction.reply({ embeds: [embed.error(`Le joueur \`${linkingpseudo}\` est introuvable sur le serveur Hypixel!`)]});
                console.log(JSON.parse(body));
                if(JSON.parse(body).player.socialMedia.links.DISCORD === interaction.member.user.tag) {
                    interaction.reply({ embeds: [embed.sucess(`Vous vous êtes correctement connecté a votre compte Minecraft \`${JSON.parse(body).player.displayname}\``)]});
                    users[interaction.member.user.id] = {
                        uuid: linkingpseudob,
                        displayname: JSON.parse(body).player.displayname,
                        highest_grade: JSON.parse(body).player.newPackageRank
                    }
                    fs.writeFile(`./interactions/storage/linkedaccounts.json`, JSON.stringify(users), err => {
                        if(err) console.log(err)
                    });
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