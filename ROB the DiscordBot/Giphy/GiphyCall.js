// GiphyCall - Calls Giphy API & returns Gif
const GphApiClient = require('giphy-js-sdk-core');
const GiphyApiToken = GphApiClient(giphyToken);
const Giphy = GiphyApiToken;

module.exports = {
    name: 'GiphyCall',
    description: 'Summons the Giphy demon',
    GiphyCall(theArguments, receivedCommand) {
    if (theArguments.length > 0) {
        Giphy.search('gifs', { "q": receivedCommand }).then((response) => {
            var gifResponses = response.data.length;
            var gifIndex = Math.floor((Math.random() * 10) + 1) % gifResponses;
            var gifFinal = response.data[gifIndex]

            message.channel.send({ files: [gifFinal.image.fixed_height.url] })

            setTimeout(function(){}, 300000);
        })
    } 
    else {
        message.channel.send("Beep Boop There Was An Error!");
    }
}
}