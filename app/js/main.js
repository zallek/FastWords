/**
 * Created by zallek on 4/20/14.
 */

$(document).ready(function() {
    var gamePanel = $("#gamePanel")
    var scorePanel = $('#scorePanel');

    //LISTENERS
    scorePanel.on("ScoreChanged", function(event, data) {
        scorePanel.html(data.wordsCompleted + '/' + data.wordsCount);
        if(data.wordsCount == data.wordsCompleted + data.wordsMissed) {
            //END
            scorePanel.css("color", "red");
        }
    });


    gamePanel.fastWords({
        scoreChangedObservers : scorePanel,
        words : [
            {text : "template"},
            {text : "lol"},
            {text : "undo", delay: 0},
            {text : "fight"}
        ],
        start : true
    });

    //var fastWords = gamePanel.data('instance');  //Get instance
});