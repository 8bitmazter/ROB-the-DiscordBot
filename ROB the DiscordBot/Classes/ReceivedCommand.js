// Performs the logic of taking in the user's command and removing the prefix and making it lower case. Returning the command back.
const LogArgumentToConsole = require('./ReceivedArgument');
module.exports = {
    name: 'ReceivedCommand',
    description: 'filters out the prefix and makes the command in lower font',
    return: 'Command in lower font and no prefix',
    ReceivedCommand(receivedCommand) {
        let fullCommand = receivedCommand.content.substr(1); // Remove the leading exclamation mark. This code may not be needed later
        let splitCommand = fullCommand.split(" "); // Split the message up in to pieces for each space
        let makeCommandLowerCase = splitCommand.content.ToLowerCase(); // Makes the message to lowercase for easier comparison.
        let command = makeCommandLowerCase[0]; // The first word directly after the exclamation is the command
        console.log("Command Received: " + command);
        LogArgumentToConsole(command);

        return command;
    }
}