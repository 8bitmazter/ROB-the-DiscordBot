const ErrorMessage = require('./index');


// Ping the bot to confirm he is alive...Or is he?
    module.exports = {
        name: 'ErrorMessage',
        description: 'Displays an error for bad command',
        pingCommand(arguments, receivedCommand) {
        if (arguments.length > 0) {
            message.channel.send('Pong');
        }
        else {
            receivedCommand.message.send(ErrorMessage.ErrorMessage);
        }
    }
}
