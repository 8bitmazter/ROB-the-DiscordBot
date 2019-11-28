// This assigns roles to new users coming into the server. It assigns them base on a typed response. Also logs it to the Console.
const Message = require('discord.js');
const ReceivedCommand = require('./ReceivedMessages/ReceivedCommand.js');

module.exports = {
    name: 'AssigningRolesCommands',
    description: 'Assigns new Bubblegummers a role.',
    AssigningRolesCommands(receivedCommand) {
        let primaryCommand = ReceivedCommand(receivedCommand); // Returns the command without prefix and logs
        let member = receivedCommand.author; // User's Name 
        let generalRole = member.guild.roles.find(r => r.name === "Gunners"); // General Role
        let worldEatersRole = member.guild.roles.find(w => w.name === "WorldEaters Musicians"); // RagnarokM Guild Members

        if (primaryCommand == "agree") 
        {
            member.addRole(generalRole);
        }
        else if (primaryCommand == "zenyplease") 
        {
            member.addRole(worldEatersRole);
        }
        else(!primaryCommand == "agree" || !primaryCommand == "agree")
        {
            Message.member("Please read the rules and if you agree, please respond with !agree or !zenyplease to join the server")
        }
    }
}
