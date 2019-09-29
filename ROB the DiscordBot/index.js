const Discord = require('discord.js');
const { prefix, token, giphyToken } = require('./config.json');
import { GetGiphyList } from './GiphyList';
import { GifphyCall } from './GifphyCall';
import { url } from 'inspector';
const client = new Discord.Client();
const listOfGiphySearchPossibilities = GetGiphyList();
var ErrorMessage = ":( Beep Boop Are you trying to call something that doesn't exist? Please check the bot commands text channel for more information";
//TODO: Add a command for "Send Nudes"

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
    let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
    let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command
    let giphySearchList = listOfGiphySearchPossibilities

    //Logging to the Console    
    console.log("Command Received: " + primaryCommand)
    console.log("Arguments: " + arguments) // Yo there may be some arguments

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

//Welcome Message
const welcomeMessage = new Discord.RichEmbed()
    .setColor('#0099ff')
    .setAuthor(author.displayName)
    .setTitle("Welcome to Retro 8-Bit's corner")
    .setDescription("A server made for all sorts of gamers alike. Retro-Gamers, Game Developers, Twitch Streamers, Rocket League Players, Monster Hunter Hunters, Overwatch Players, League of Legends Champions, & Home of the WorldEaters guild of Ragnarok Mobile")
    .addField("Please abide by these simple set of rules: ")
    .addField("1.", "Don't be Mean. You're more than welcome to express your views & you have the right to have your own beliefs but I ask you do not ridicule someone elses. I.E. Don't be mean")
    .addField("2.", "Please be attentive to the Captain's Orders section. The Captain & First Mates will post announcements and updates to this channel. This will also lead to less usage of the @everyone command. This also means do not mute this text channel")
    .addField("3.", "Certain text channels (Mainly cave-paintings-nsfw) have specific guidelines to them that I ask you please to follow. You may find them in the pinned message section within that text channel.")
    .addField("4", "I do ASK (Which means it is NOT required) that you do leave the @everyone command on in this channel. The Captain & First Mates will not use this command unless it is completely necessary. Or if it is specifically for a major update to the server. This is why the Captains Wishes channel exists.")
    .addField("TLDR: Don't be Mean, Updates are in Captain's Orders Text Channel, Read Pinned Messages for more specific Rules, I prefer you leave @everyone notification on. I may use it once every 6 months.")
    .addBlankField()
    .addField("For those of you who are new to Discord don't be afraid to reach out to the Captain for assistance. Or you may a take look at this for a quick walkthrough:" + url("https://www.youtube.com/watch?v=zZ08Fbs5LpM"))
    .addBlankField()
    .addField("If you have any questions or concerns please do not hesitate to reach out to the Captain or a First Mate for assistance!")
    .addBlankField()
    .addField("If you are here for the WorldEaters Guild & you agree to these rules please respond with: !zenyplease")
    .addField("If you are here for everything else & you agree to these rules please respond with: !agree")
    .setTimestamp()
    .setFooter("By doing one of the responses will assign you a specific role within the Discord server & avoid getting pruned")
//This is the internet. Nothing is Sacred. 
// DM New Users
client.on('guildMemberAdd', member => {
    member.send(welcomeMessage)
    let generalRole = message.guild.roles.find(r => r.name === "Gunners");
    let worldEatersRole = message.guild.roles.find(w => w.name === "WorldEaters Musicians");
});

client.login(token);


