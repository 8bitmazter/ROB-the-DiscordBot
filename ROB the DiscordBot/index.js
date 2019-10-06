const Discord = require('discord.js');
const { prefix, token, giphyToken } = require('./config.json');
import { GetGiphyList } from './GiphyList';
import { GifphyCall } from './GifphyCall';
import { AssigningRolesCommands } from './AssigningRolesCommands';
import { welcomeMessage } from './welcomeMessage';
import { pingCommand } from './pingCommand';
const client = new Discord.Client();
const listOfGiphySearchPossibilities = GetGiphyList();
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
        pingCommand(arguments, receivedCommand)
    }
    else if (giphySearchList.includes(primaryCommand)) {
        GifphyCall(arguments, receivedCommand)
    }
    else if(primaryCommand == "kick") {
        KickAMember(arguments, receivedCommand)
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

client.login(token);


