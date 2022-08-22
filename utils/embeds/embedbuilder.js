const Discord = require('discord.js');
/**
   * @param {String} name Nom de l'erreur
   */
const error = (name) => {
    const Embed = new Discord.EmbedBuilder()
        .setColor(0xff0000)
        .setTitle(`Une erreur est survenue!`)
        .setDescription(name)
    return Embed;
}

const success = (name) => {
    const Embed = new Discord.EmbedBuilder()
        .setColor(0x2bff00)
        .setTitle(`Effectué avec succès!`)
        .setDescription(name)
    return Embed;
}
const embed = {
    error: error,
    sucess: success,
}
module.exports = embed;