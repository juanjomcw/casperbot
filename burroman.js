const Discord = require('discord.js');
const client = new Discord.Client();


/* Events */
const onReady = require('./events/onReady');
const onMessage = require('./events/onMessage');



client.on("ready", () => onReady(client));
client.on('message', (message) => onMessage(message, client));








client.login(process.env.TOKEN);
