const Discord = require('discord.js');
const constants = require('../utils/constants');

module.exports = (client) => {
    console.log(`Estoy listo en ${client.user.tag}!`)

  
    client.user.setPresence({
        status: "online",
        activity: {
            name: "!help | Varelandia",
            url: "https://www.twitch.tv/varelabere",
            type: "STREAMING"
        }
    });

}
