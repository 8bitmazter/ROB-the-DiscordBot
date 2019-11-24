const Discord = require('discord.js');
const { prefix, token, giphyToken } = require('./config.json');
const ytdl = require('ytdl-core');
import { GiphyCall } from './GiphyCall.js';
import { AssigningRolesCommands } from './AssigningRolesCommands.js';
import { welcomeMessage } from './welcomeMessage';
import { pingCommand } from './pingCommand.js';
import { GetGiphyList } from './GiphyList.js';
const client = new Discord.Client();
const listOfGiphySearchPossibilities = new GetGiphyList();
export var ErrorMessage = ":( Beep Boop Are you trying to call something that doesn't exist? Please check the bot commands text channel for more information";
const startingRole = member.guild.roles.find('name', 'Deck Swabs');
//global.servers = {};
//TODO: Add a command for "Send Nudes"

var GphApiClient = require('giphy-js-sdk-core')
giphy = GphApiClient(giphyToken)

//Return back to the console that the bot is working
client.once('ready', () => {
    console.log('Ready!')
})

//Bot Commands
client.on('message', async receivedCommand => {
    if (receivedCommand.author == client.user) // Prevents bot from responding to itself like a big dingus.
    {
        return
    }
    if (receivedCommand.channel.type == "dm" && receivedCommand.member.equals(startingRole)) {
        AssigningRolesCommands(receivedCommand)

    }
    if (receivedCommand.content.startsWith(prefix)) {
        BotCommands(receivedCommand);
    }
})

function BotCommands(receivedCommand) {
    let fullCommand = receivedCommand.content.substr(1) // Remove the leading exclamation mark. This code may not be needed later
    let splitCommand = fullCommand.split(" ")  // Split the message up in to pieces for each space
    let makeCommandLowerCase = splitCommand.content.ToLowerCase(); // Makes the message to lowercase for easier comparison.
    let primaryCommand = makeCommandLowerCase[0] // The first word directly after the exclamation is the command
    let arguments = makeCommandLowerCase.slice(1) // All other words are arguments/parameters/options for the command
    let giphySearchList = listOfGiphySearchPossibilities

    //Logging to the Console    
    console.log("Command Received: " + primaryCommand)
    console.log("Arguments: " + arguments) // Yo there may be some arguments

    if (primaryCommand == "ping") {
        pingCommand(arguments, receivedCommand);
    }
    else if (giphySearchList.includes(primaryCommand)) {
        GiphyCall(arguments, primaryCommand);
    }
    else if(primaryCommand == "play") {
        execute(primaryCommand, serverQueue);
    }
    else if(primaryCommand == 'stop') {
        stop(primaryCommand, serverQueue);
    }
    else if(primaryCommand == 'skip') {
        skip(primaryCommand, serverQueue);
    }
    else if(primaryCommand == "kick") {
        KickAMember(arguments, receivedCommand)
    }
    else {
        message.channel.send('Please enter a valid command, home slice.')
    }

}

//Kick Someone out    TODO: See how to pass in the member name to kick
function KickAMember(arguments, receivedCommand) {
    if(arguments.length > 0)
    {
        if (receivedCommand.member.hasPermission(["KICK_MEMBERS", "BAN_MEMBERS"])) {
            let member = receivedCommand.mentions.members.first();
            member.kick().then((member) => {
                giphy.search('gifs', { "q": "fail" })
                    .then((response) => {
                        var totalResponses = response.data.length;
                        var responseIndex = Math.floor((Math.random() * 10) + 1) % totalResponses;
                        var responseFinal = response.data[responseIndex];
                        receivedCommand.channel.send(member.displayName + " has walked the plank!", {
                            files: [responseFinal.images.fixed_height.url]
                        });
                    }).catch(() => {
                        receivedCommand.channel.send("Well this is awkward...");
                    });
            });
        }
        else
        {
            message.channel.send(receivedCommand.author.displayName + " you do not have this permission. Please reach out to the Captain or First Mate to perform this action.")
        }
    }
    else
    {
        message.channel.send(ErrorMessage)
    }

}

// DM New Users
client.on('guildMemberAdd', member => {
    member.addRole(startingRole);
    member.send(welcomeMessage);
});


//#region Music
const queue = new Map();


async function execute(message, serverQueue) {
    const args = message.content.split(' ');
    const voiceChannel = message.member.voiceChannel;
    if(!voiceChannel) return message.channel.send("You need to be in Kafra's Cafe to play music!");
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if(!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
        return message.channel.send('I need the permissions to join and speak in your voice channel!');
    }

    const songInfo = await ytdl.getInfo(args[1]);
    const song = {
        title: songInfo.title,
        url: songInfo.video_url,
    };

    if(!serverQueue) {
        // Creating the contract for our queue
        const queueContract = {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 5,
            playing: true,
        };
    
        // Setting the queue using our contract
        queue.set(message.guild.id, queueContract);
    
        // Pushing the song to our songs array
        queueContract.songs.push(song);
    
        try{
            var connection = await voiceChannel.join();
            queueContract.connection = connection;
            play(message.guild, queueContract.songs[0]);
        }
        catch(err) {
            console.log(err);
            queue.delete(message.guild.id);
        }
    }
    else{
        serverQueue.songs.push(song);
        console.log(serverQueue.songs);
        return message.channel.send(`${song.title} has been added to the queue!`);
    }
}

function skip(message, serverQueue) {
    if (!message.member.voiceChannel) return message.channel.send('You have to be in a voice channel to do this!');
    if (!serverQueue) return message.channel.send('There is no song to skip!');
    serverQueue.connection.dispatcher.end();
}

function stop(message, serverQueue) {
    if (!message.member.voiceChannel) return message.channel.send('You have to be in a voice channel to do this!');
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
}

function play(guild, song) {
    const serverQueue = queue.get(guild.id);

    if (!song) {
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    }

    const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
    .on('end', () => {
        console.log('No more music! :(');
        serverQueue.songs.shift();
        play(guild, serverQueue.songs[0]);
    })
    .on('error', error => {
        console.error(error);
    });
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
}
//#endregion

client.login(token);

