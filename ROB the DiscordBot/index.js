const { Client, MessageEmbed } = require('discord.js');
const {  token } = require('./config.json');
const client = new Client({
    disableEveryone: true,
    partials: ['MESSAGE'] // Cache's message
});
client.login(token);
// const startingRole = guild.roles.cache.find(role => role.name === 'Deck Swabs'); 
//member.guild.roles.find('name', 'Deck Swabs');



// Client is Ready
client.once('ready', () => {
    console.log('Ready!')
})

client.on('message', message => {
    if(message.content === 'doit')
    {
        message.channel.send({ embed: welcomeMessage });
    }
});

/*client.on('messageReactionAdd', async (reaction, user) => {
    console.log(reaction.emoji.name);

    let applyRole = async () => {

        let emojiName = reaction.emoji.name;
        let role = reaction.message.guild.roles.find(role => role.name.toLowerCase() === emojiName.toLowerCase());
        let member = reaction.message.guild.members.find(member => member.id === user.id);
        try {
            if(role && member)
            {
                console.log("Role and member found.");
                await member.roles.add(role);
                console.log("Done.");
                await member.roles.remove(startingRole)
            }
        }
        catch(err)
        {
           console.log(err);
        }

    }
    if(reaction.message.partial)
    {
        try {
            let msg = await reaction.message.fetch();
            if(msg.id === )
            console.log("Cached")
            applyRole();
        }
        catch (err)
        {
            console.log(err);
        }

    }
    else
    {
        console.log("Not a partial.")
        if(reaction.message.id === )
        {
            console.log(true);
            applyRole();
        }
    }
})*/

const welcomeMessage = {
    color: ("#0099ff"),
    title: "Welcome to Misfit Heroes Games!",
    description: "A server made for all sorts of gamers alike. Retro-Gamers, Game Developers, Twitch Streamers, Rocket League Players, Monster Hunter Hunters, Valorant Players, League of Legends Champions, & Home of the WorldEaters guild of Ragnarok Mobile.\n\n If you are new to Discord and in need of a tutorial, we got you. [Just click here!](https://www.youtube.com/watch?v=zZ08Fbs5LpM)",
    fields: [
        {
            name: "\u200b",
            value: "Please abide by these simple set of rules!\n",
            inline: true
        },
        {
            name: "Rule 1.",
            value: "Don't be Mean. You're more than welcome to express your views & you have the right to have your own beliefs but I ask you do not ridicule someone elses. I.E. Don't be mean.",
            inline: false
        },
        {
            name: "\u200b",
            value: "\u200b",
            inline: false
        },
        {
            name: "Rule 2.",
            value: "Please be attentive to the Captain's Wishes section. The Captain & First Mates will post announcements and updates to this channel. This will also lead to less usage of the @everyone command. So please do not mute the captains-wishes text channel",
            inline: false
        },
        {
            name: "\u200b",
            value: "\u200b",
            inline: false
        },
        {
            name: "Rule 3.",
            value: "Certain text channels (Mainly cave-paintings-nsfw) have specific guidelines to them that I ask you please to follow. You may find them in the pinned message section within that text channel. Please check pinned messages before posting.",
            inline: false
        },
        {
            name: "\u200b",
            value: "\u200b",
            inline: false
        },
        {
            name: "Rule 4",
            value: "I do ASK (Which means it is NOT required) that you do leave the @everyone command on in this channel. The Captain & First Mates will not use this command unless it is completely necessary. Or if it is specifically for a major update to the server. This is why the Captains Wishes channel exists (to limit the use of the @everyone command)",
            inline: false
        },
        {
            name: "TLDR:",
            value: "Don't be Mean, Updates are in Captain's Orders Text Channel, Read Pinned Messages for more specific Rules, I prefer you leave @everyone notification on. I may use it once every 6 months.",
            inline: true
        },
        {
            name: "\u200b",
            value: "The Most Important Thing to Remember is:\n\n This is the Internet. Nothing is Sacred.\n\n If you have any other questions or concerns please do not hesitate to reach out to the Captain or a First Mate for assistance!",
            inline: false
        },
        {
            name: "\u200b",
            value: "If you are here for the WorldEaters Guild & you agree to these rules please respond with: !zenyplease\n\n If you are here for everything else & you agree to these rules please respond with: !agree\n\n By doing one of the responses will assign you a specific role within the Discord server & avoid getting pruned."
        },
    ],
    timestamp: new Date(),
};
