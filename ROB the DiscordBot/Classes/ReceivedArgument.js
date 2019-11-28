// This is for logging the argument on the Console
module.exports = {
    name: 'ReceivedArgument',
    description: 'Slices the argument and writes it to the Console',
    ReceivedArgument(receivedArgument) {
        let arguments = receivedArgument.slice(1); // All other words are arguments/parameters/options for the command
        console.log("Arguments: " + arguments) // Yo there may be some arguments
    }
}