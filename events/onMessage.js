const Discord = require('discord.js');
const constants = require('../utils/constants');
const { splitMessage } = require('discord.js');
let prefix  = process.env.PREFIX;

module.exports = (message, client) => {
    const commandHasPreffix = message.content.startsWith(prefix) ? true : false;
    
    if (!commandHasPreffix) {

             // Commands sin prefijo
        switch(message.content) {
            case 'Ban':
                message.channel.send('<:BAN:758106286046183424><:NED:758106286297972778>');
                break;
            case 'ban':
                message.channel.send('<:BAN:758106286046183424><:NED:758106286297972778>');
                break;
            default:
                break;
        }
    } else {
        // Commands con prefijo
        if (message.author.bot) return;

        if(message.guild.id != constants.server_id ) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const commandWithPrefix = args.shift().toLowerCase();
        switch(commandWithPrefix) {
            case 'wph':
                return sendWph(message);
            case 'avatar':
                return sendAvatar(message);
            case 'help':
                return sendHelp(message);
            case 'love':
                return sendLove(message);
            case 'banned':
                return sendBanned(message);
            case 'espai':
                return message.channel.send('gei <a:SALAMI:786643915909890078>');
            case 'clear':
                return sendClear(message, args);
            case 'sv':
                return sendSV(message);
            default:
                break;
        }
    }
}

const sendAvatar = (message) => {
    const miembro = message.mentions.users.first()
    let embed;
    if (!miembro) {
        embed = new Discord.MessageEmbed()
            .setTitle(`${message.author.tag}`)
            .setDescription("Este es tu Avatar")
            .setImage(`${message.author.displayAvatarURL({dynamic: true, size : 1024})}`)
            .setColor(0x9c98f8)
    } else {
        embed = new Discord.MessageEmbed()
            .setTitle(`${miembro.tag}'`)
            .setDescription(`${message.author} Este es el Avatar de ${miembro.tag}.`)
            .setImage(miembro.displayAvatarURL({dynamic: true, size : 1024}))
            .setColor(0x9c98f8)        
    };
    message.channel.send(embed);
}

const sendHelp = (message) => {
    message.delete();
    const embed = new Discord.MessageEmbed()
        .setThumbnail(message.guild.iconURL({dynamic: true}))   
        .setAuthor(message.author.username, message.author.avatarURL({dynamic: true}))
        .setTitle('Hola soy Casper, el bot del canal')
        .setDescription('Aca abajo estan todos los comandos actuales que existen, y que puedes usar')
        .addField('!avatar', 'Muestra el avatar de un usuario', true)
        .addField('!sv', 'Muestra el avatar del servidor', true)
        .addField('ban', 'emote Banned', true)
        .addField('!love', 'Muestra el amor entre dos personas', true)
        .addField('!banned', 'Muestra gif al azar de banneos', true)
        .addField('!clear (ADMIN)', 'Borra un # de mensajes de la sala', true)
        .setColor(0xff6b9f)
        .setImage('https://cdn.discordapp.com/attachments/289829636391567370/774401280458227782/varelaLove.png')
        .setFooter('Hecho por moderadores ', 'https://cdn.discordapp.com/attachments/289829636391567370/774397423014903818/745085348387881010.png');
    message.author.send(embed);
}


const sendLove = (message) => {
    let users = message.mentions.users.map(m => m.username).join(' y ');
    if(!users) return message.channel.send('Etiqueta a dos usuarios para calcular su amor');
    const random = Math.floor(Math.random() * 100);
    let heard = '';
    if(random < 50){
        heard = ':broken_heart:';
    } else if(random < 80){
        heard = ':sparkling_heart: ';
    } else if(random < 101){
        heard = ':heart:';
    }
    const embed = new Discord.MessageEmbed()
        .setAuthor('El porcentaje de amor de '+users+' es:')
        .setDescription(heard+' **'+random+' %**'+' '+heard)
        .setColor(0xff69e9)
    message.channel.send(embed);
}

const sendBanned = (message) => {
    let thumb = ["https://cdn.discordapp.com/attachments/773783284920221696/774350991306391592/O3DHIA5.gif", "https://i.imgur.com/pgAybBd.gif", "https://i.imgur.com/r42VJvZ.gif", "https://i.imgur.com/bfOSpyg.gif"]
    var enlace = thumb[Math.floor(Math.random() * thumb.length)]
    const embed = new Discord.MessageEmbed()
    
        .setColor(0xff0700)
        .setImage(enlace)
    
    message.channel.send({ embed });
}
const sendClear = async(message, args) => {
    if (!message.guild.me.permissions.has('Burroman')) {
        return message.channel.send("No tengo permisos para borrar mensajes.")
    }
    if (!message.member.roles.cache.find(r => r.name === "mod")) {
        return message.channel.send(`Perdon <@${message.author.id}>, pero no tienes el permiso para borrar mensajes <:sadKEK:761281532035596349>`)
        .then(e => e.delete({
            timeout: 4000
        }))
    }

    if (!args[0]) {
        return message.channel.send(" :no_entry_sign: Nesecitas colocar el __numero__ de mensajes que quieres eliminar no mayor de 100.")
        .then(e => e.delete({
            timeout: 4000
        }))
    }

    if (isNaN(parseInt(args[0]))) {
        return message.channel.send(" :no_entry_sign:  Nesecitas colocar un __numero__, no letras ni simbolos.")
        .then(e => e.delete({
            timeout: 4000
        }))
    }

    const number = parseInt(args[0])
    if (number >= 100 || number <= 0) {
        return message.channel.send(' :no_entry_sign: El valor es Invalido.')
        .then(e => e.delete({
            timeout: 4000
        }))
    }

    try {
        await message.channel.bulkDelete(number + 1);
        const tmpMessage = await message.channel.send(` :white_check_mark:  Se eliminaron **${number}** mensajes del Chat.`);
        tmpMessage.delete({ timeout: 4000 });
    } catch (error) {
        const tmpMessage = await message.channel.send(`:x: Ocurrio un error: **${error.message}**`);
        tmpMessage.delete({ timeout: 4000 });
    }

}

const sendWph = (message) => {
    message.delete()
    message.channel.send('<:whp1:786677945682755597><:whp2:786677928623996928><:whp3:786677908697382962><:whp4:786677876996702288>')
}

const sendSV = (message) => {
    
    const server = message.guild;
    const miembro = message.mentions.users.first()
    let embed;
    if (!miembro) {
        embed = new Discord.MessageEmbed()
    .setTitle(`Este es el Avatar del Servidor.`)
    .setAuthor(message.author.username, message.author.avatarURL({dynamic: true}))
    .setImage(server.iconURL({dynamic: true, size: 1024}))
    .setColor(0x9c98f8)
    .setFooter(`Hecho por los Admin de ${server.name}` , 'https://cdn.discordapp.com/attachments/289829636391567370/774397423014903818/745085348387881010.png')
    .setTimestamp();
    };
    message.channel.send(embed);
}


