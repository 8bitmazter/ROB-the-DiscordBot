import { ErrorMessage } from './index';


//Ping the bot to confirm he is alive...Or is he?
export function pingCommand(arguments, receivedCommand) {
    if (arguments.length > 0) {
        message.channel.send('Pong');
    }
    else {
        receivedCommand.message.send(ErrorMessage);
    }
}
