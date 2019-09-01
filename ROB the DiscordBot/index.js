const Discord = require('discord.js');
const { prefix, token, giphyToken } = require('./config.json');
import { GetGiphyList } from './GiphyList';
const client = new Discord.Client();
const listOfGiphySearchPossibilities = GetGiphyList();
var ErrorMessage = ":( Beep Boop Are you trying to call something that doesn't exist? Please check the bot commands text channel for more information";

var GphApiClient = require('giphy-js-sdk-core')
giphy = GphApiClient(giphyToken)

//Return back to the console that the bot is working
client.once('ready', () => {
    console.log('Ready!')
})

//Bot Commands
client.on('message', (receivedCommand) => {
    if (receivedCommand.author == client.user) // Prevents bot from responding to itself like a big dingus.
    {
        return
    }

    if (receivedCommand.content.startsWith(prefix)) {
        BotCommands(receivedCommand);
    }


})

function BotCommands(receivedCommand) {
    let fullCommand = receivedCommand.content.substr(1) // Remove the leading exclamation mark. This code may not be needed later
    let splitCommand = fullCommand.split(" ")  // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after the exlamtion is the command
    let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command
    let giphySearchList = listOfGiphySearchPossibilities

    //Logging to the Console    
    console.log("Command Recieved: " + primaryCommand)
    console.log("Arguements: " + arguments) // Yo there may be some arguements

    if (primaryCommand == "ping") {
        pingCommand(arguments, receivedCommand)
    }
    else if (giphySearchList.includes(primaryCommand)) {
        //TODO: Timeout for members to avoid spamming
        GifphyCall(arguments, receivedCommand)
    }
    else if(primaryCommand == "kick") {
        KickAMember(arguments, receivedCommand)
    }

}

//Ping the bot to confirm he is alive...Or is he?
function pingCommand(arguments, receivedCommand) {
    if (arguments.length > 0) {
        message.channel.send('Pong');
    }
    else {
        receivedCommand.message.send(ErrorMessage)
    }
}

//Giphy Call Method
function GifphyCall(arguements, receivedCommand) {
    //this._search = search;
    if (arguements.length > 0) {
        giphy.search('gifs', { "q": receivedCommand }).then((response) => {
            var gifResponses = response.data.length;
            var gifIndex = Math.floor((Math.random() * 10) + 1) % gifResponses;
            var gifFinal = response.data[gifIndex]

            message.channel.send({ files: [gifFinal.images.fixed_height.url] })

            setTimeout(function(){}, 300000);
        })
    }
    else {
        message.channel.send("Beep Boop There Was An Error!")
    }
}

//Kick Someone out    TODO: See how to pass in the member name to kick
function KickAMember(arguments, recievedCommand) {
    if(arguments.length > 0)
    {
        if (recievedCommand.member.hasPermission(["KICK_MEMBERS", "BAN_MEMBERS"])) {
            let member = recievedCommand.mentions.members.first();
            member.kick().then((member) => {
                giphy.search('gifs', { "q": "fail" })
                    .then((response) => {
                        var totalResponses = response.data.length;
                        var responseIndex = Math.floor((Math.random() * 10) + 1) % totalResponses;
                        var responseFinal = response.data[responseIndex];
                        recievedCommand.channel.send(member.displayName + " has walked the plank!", {
                            files: [responseFinal.images.fixed_height.url]
                        });
                    }).catch(() => {
                        recievedCommand.channel.send("Well this is awkward...");
                    });
            });
        }
        else
        {
            message.channel.send(recievedCommand.author.displayName + " you do not have this permission. Please reach out to the Captain or First Mate to perform this action.")
        }
    }
    else
    {
        message.channel.send(ErrorMessage)
    }

}

//Welcome Message
const welcomeMessage = new Discord.RichEmbed()
    .setColor('#0099ff')
    .setAuthor(author.displayName)
    .setTitle("Welcome to Retro 8-Bit's corner")
    .setDescription("A server made for all sorts of gamers alike. Retro-Gamers, Game Developers, Twitch Streamers, Rocket League Players, Monster Hunter Hunters, D&D/Pathfinder lovers, & Home of the WorldEaters Musicians guild of Ragnarok Mobile")
    .addField("Please abide by these simple set of rules: ")
    .addField("1.",  "Don't be Mean. You're more than welcome to express your views & you have the right to have your own beliefs but I ask you do not ridicule someone else. I.E. Don't be mean")
    .addField("Don't be a dick.")
    .addField("Futher still, don't be a dick.")

// DM New Users
client.on('guildMemberAdd', member => {
    member.send(welcomeMessage)
});

client.login(token);


