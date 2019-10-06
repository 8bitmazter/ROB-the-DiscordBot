const Discord = require('discord.js');
import { url } from 'inspector';


//Welcome Message
export const welcomeMessage = new Discord.RichEmbed()
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
    .setTitle("The Most Important Thing to Remember is: ")
    .addBlankField()
    .addField("This is the Internet. Nothing is Sacred.")
    .addBlankField()
    .addBlankField()
    .addField("For those of you who are new to Discord don't be afraid to reach out to the Captain for assistance. Or you may a take look at this for a quick walkthrough:" + url("https://www.youtube.com/watch?v=zZ08Fbs5LpM"))
    .addBlankField()
    .addField("If you have any questions or concerns please do not hesitate to reach out to the Captain or a First Mate for assistance!")
    .addBlankField()
    .addField("If you are here for the WorldEaters Guild & you agree to these rules please respond with: !zenyplease")
    .addField("If you are here for everything else & you agree to these rules please respond with: !agree")
    .setTimestamp()
    .setFooter("By doing one of the responses will assign you a specific role within the Discord server & avoid getting pruned");
