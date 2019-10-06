import { Message } from "discord.js";

export function AssigningRolesCommands(receivedCommand) {
    let fullCommand = receivedCommand.content.substr(1); // Remove the leading exclamation mark. This code may not be needed later
    let splitCommand = fullCommand.split(" "); // Split the message up in to pieces for each space
    let makeCommandLowerCase = splitCommand.content.ToLowerCase(); // Makes the message to lowercase for easier comparison.
    let primaryCommand = makeCommandLowerCase[0]; // The first word directly after the exclamation is the command
    let arguments = makeCommandLowerCase.slice(1); // All other words are arguments/parameters/options for the command
    let member = receivedCommand.author; //User's Name
    let generalRole = member.guild.roles.find(r => r.name === "Gunners"); //General Role
    let worldEatersRole = member.guild.roles.find(w => w.name === "WorldEaters Musicians"); //RagnarokM Guild Members
    //Logging to the Console    
    console.log("Command Received: " + primaryCommand);
    console.log("Arguments: " + arguments); // Yo there may be some arguments
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
