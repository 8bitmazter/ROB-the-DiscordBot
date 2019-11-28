// This is the list of searchable Gif's that the bot can compare to search for Gifs
module.exports = {
    name: 'GetGiphyList',
    description: 'Summons the list of Demons that can be summoned',
    returns: 'List of Possible Gif Searches',
    GetGiphyList() {
        var listOfGiphySearchCommands = [
            "fail",
            "success",
            "yoda",
            "wtf",
            "celebrate",
            "victory",
            "wth",
            "sorry",
            "apology",
            "fml",
            "oops",
            "embarrassed",
            "clapping"
        ]

        return listOfGiphySearchCommands;
    }
}