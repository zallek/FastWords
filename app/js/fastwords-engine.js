/**
 * Created by zallek on 4/20/14.
 */

(function($) {

    /******************************************/
    /*            FastWords Class             */
    /*                                        */
    /******************************************/

    var FastWords = function(element, options)
    {
        /** Constructor **/
        if(isset(element)){
            gamePanel = $(element);
            gamePanel.height = parseInt(gamePanel.css('height'), 10);
            gamePanel.width = parseInt(gamePanel.css('width'), 10);
            gamePanel.padding = parseInt(gamePanel.css('zk-padding'), 10);
        }
        else {
            return;
        }

        if(isset(options)){
            Params.CASE_SENSITIVE = valueOrDefault(options.caseSensitive, Params.CASE_SENSITIVE);
            Params.ERROR_START = valueOrDefault(options.ErrorStart, Params.ERROR_START);
            Params.MULTIWORD_COMPLETE = valueOrDefault(options.MultiwordComplete, Params.MULTIWORD_COMPLETE);
            Params.GAME_PANEL_PADDING = valueOrDefault(options.GamePanelPadding, Params.GAME_PANEL_PADDING);
            Params.WORD_COMPLETE_ANIMATION_DURATION = valueOrDefault(options.WordCompleteAnimationDuration, Params.WORD_COMPLETE_ANIMATION_DURATION);
            this.AddScoreChangedCallback(options.scoreChangedCallback);
            this.AddWords(options.words);
            if(options.start == true){
                this.Start();
            }
        }
    };
    /******************************************/
    /*              API Functions             */
    /******************************************/
    FastWords.prototype.Start = function() {
        keyPressElement.bind('keypress.fastWords', keyPressHandler);
        wordsToLoad.forEach(function(word) {
            new Word(word);
        });
        wordsToLoad = [];
    };
    FastWords.prototype.Pause = function() {

    };
    FastWords.prototype.Stop = function(){
        keyPressElement.unbind('keypress.fastWords', keyPressHandler);
        Word.wordsList.forEach(function(word) {
            word.stop();
        });
        wordsToLoad = [];
        Word.wordsList = [];
    };
    FastWords.prototype.AddWords = function(words) {
        if(words != null){
            $.merge(wordsToLoad, words);
        }
    };
    FastWords.prototype.AddScoreChangedCallback = function(callback) {
        scoreChangedCallback = callback;
    };


    //Params
    var Params = {
        CASE_SENSITIVE : true,
        ERROR_START : true,
        MULTIWORD_COMPLETE : false,
        GAME_PANEL_PADDING : 10,
        WORD_COMPLETE_ANIMATION_DURATION : 800
    };

    var gamePanel;
    var keyPressElement = $("body");
    var scoreChangedCallback = null;
    var wordsToLoad = [];

    function fireScoreChangedEvent(){
        if(scoreChangedCallback != null){
            //Compute score
            var wordsCount = 0;
            var wordsCompleted = 0;
            var wordsMissed = 0;

            Word.wordsList.forEach(function(word){
                wordsCount++;
                if(word.zkMissed == true) wordsMissed++;
                if(word.zkCompleted == true) wordsCompleted++;
            });
            scoreChangedCallback({
                wordsCount : wordsCount,
                wordsCompleted : wordsCompleted,
                wordsMissed : wordsMissed
            });
        }
    }

    //Event handler
    var currentWord = null;
    var keyPressHandler = function(event) {
        //Init words list
        var words = Word.wordsList;
        if(currentWord != null) { //add current at the beginning so that it's test first
            Array_moveAtFirst(words, currentWord);
        }
        var words_count = words.length;

        //Check each word
        words.every(function(word) {
            if(word.zkCompleted == false && word.zkCompleted == false) {
                //Each key press math with char to type
                if(charMatch(String.fromCharCode(event.which), word.text().charAt(word.zkIc), Params.CASE_SENSITIVE)) {
                    if(word == currentWord) {
                        word.zkSetIc(word.zkIc + 1);
                    }
                    else {
                        if(currentWord != null && !Params.MULTIWORD_COMPLETE) { //Reset current word if MULTIWORD_COMPLETED
                            currentWord.zkSetIc(0);
                        }
                        word.zkSetIc(word.zkIc + 1); //Increment word
                        currentWord = word;
                    }
                    return false; //match found -> stop testing words
                }
                else { //Do not match
                    if(Params.ERROR_START) {
                        if(Params.MULTIWORD_COMPLETE) { //Count words which not match
                            words_count--;
                            if(words_count == 0){ //No word match -> reset all words
                                words.forEach(function (word) {
                                    word.zkSetIc(0);
                                });
                                return false;
                            }
                        }
                        else {
                            if(word == currentWord) {
                                word.zkSetIc(0);
                            }
                        }
                    }
                }
            }
            return true;
        });
    };


    /**
     * Word Class
     * @param word : {text, [x], [velocity], [delay]}
     * @constructor
     * @property zkIc integer
     * @property zkCompleted boolean
     * @property zkMissed boolean
     * @function zkSetIc
     * @function zkRefresh private
     * @function zkWordCompleted
     * @function zkWordMissed
     */
    function Word(word) {
        var that = this;
        this.zkIc = 0;
        this.zkCompleted = false;
        this.zkMissed = false;

        if(isset(word)){
            var text = word.text;
            var x = getDefault(word.x, {default: floatRandom(0, 1), random: floatRandom(0, 1)});
            var velocity = getDefault(word.velocity, {default: floatRandom(0.03, 0.1), random: floatRandom(0.03, 0.1)});
            var delay = getDefault(word.delay, 0);

            window.setTimeout(function(){
                //Append new DOM element to #gamePanel
                var newWord = $('<div class="'+Word.WORDCLASS+'">'+text+'</div>').appendTo(gamePanel);
                //Add Word class properties to this new element
                $.extend(that, newWord);

                var wordX = x*(gamePanel.width - newWord.width() - Params.GAME_PANEL_PADDING*2) + Params.GAME_PANEL_PADDING;
                var wordDuration = gamePanel.height/velocity;
                that
                    .css({left : wordX, top: 0, 'z-index': Math.round(-wordDuration)})
                    .animate({top: gamePanel.height},{
                        duration: wordDuration,
                        queue: false,
                        complete: function(){
                            that.zkWordMissed();
                        }
                    });
                Word.wordsList.push(that);
                fireScoreChangedEvent();
            }, delay);
        }
    }
    Word.prototype.zkSetIc = function(value){
        if(!this.zkCompleted) {
            this.zkIc = value;
            if(this.zkIc == this.text().length){
                this.zkCompleted = true;
                this.zkWordCompleted();
            }
            this.zkRefresh();
        }
    };
    Word.prototype.zkRefresh = function() {
        var temp = '<span class="zk-completed">';
        var text = this.text();
        for(var i=0;  i< text.length; i++){
            if(this.zkIc == i){
                temp += '</span>';
            }
            temp += text[i];
        }
        this.html(temp);
    };
    Word.prototype.zkWordCompleted = function(){
        this.zkCompleted = true;
        fireScoreChangedEvent();

        this.animate({opacity : 0}, {
            duration: Params.WORD_COMPLETE_ANIMATION_DURATION,
            complete : function() {
                this.remove();
            }
        });
    };
    Word.prototype.zkWordMissed = function(){
        this.zkMissed = true;
        fireScoreChangedEvent();
        this.remove();
    };
    Word.wordsList = [];
    Word.WORDCLASS = "zk-word";



    /******************************************/
    /*            Library Functions           */
    /******************************************/

    function Array_moveAtFirst(array, element){
        array.splice(array.indexOf(element),1);
        array.unshift(element);
    }

    function intRandom(min, max) {
        return Math.floor(floatRandom(min, max));
    }
    function floatRandom(min, max){
        return (Math.random()*max)+min;
    }

    function getDefault(val, defaults){
        for (var key in defaults) {
            if(defaults.hasOwnProperty(key)) {
                if(key == "default" && typeof val === "undefined" || key == val) {
                    return defaults[key];
                }
            }
        }
        return val;
    }

    function charMatch(char1, char2, caseSensitive) {
        if(caseSensitive) {
            return char1 == char2;
        }
        else {
            return char1.toLowerCase() == char2.toLowerCase();
        }
    }

    function isset(_var){
        return (typeof _var !== "undefined");
    }

    function valueOrDefault(_value, _default){
        return !isset(_value) ? _default : _value;
    }

    /******************************************/
    /*                 Factory                */
    /*                                        */
    /******************************************/

    /**
     * Factory
     * @param options
     * @return {*}
     */
    $.fn.fastWords = function(options)
    {
        this.each(function()
        {
            var element = $(this);

            // Return early if this element already has a plugin instance
            if (element.data('instance')) return;

            // Pass options to plugin constructor
            var instance = new FastWords(this, options);
            // Save instance
            element.data('instance', instance);
        });
        return this.data('instance');
    };
})(jQuery);

