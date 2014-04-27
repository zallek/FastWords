'use strict';

/* Directives */


angular.module('myApp.directives', [])

    .directive('zkFastwords', ['$interval',
        function($interval) {
            return {
                restrict: 'E',
                transclude: true,
                templateUrl: 'directive/fastwords.html',
                link: function(scope, element, attrs) {
                    //attrs.engineMod
                    //attrs.wordList

                    //Fast is written in jQuery and need a jQuery selector to be initiate
                    var fastWords = $("#gamePanel").fastWords({
                        words : [
                            {text : "template"},
                            {text : "lol"},
                            {text : "undo", delay: 0},
                            {text : "fight"}
                        ],
                        start : true,
                        scoreChangedCallback : function(newScores) {
                            scope.wordsCompleted = newScores.wordsCompleted;
                            scope.wordsCount = newScores.wordsCount;
                        }
                    });

                    element.on('$destroy', function() {
                        $interval.cancel(timeoutId);
                        fastWords.Stop();
                    });

                    // start the UI update process; save the timeoutId for canceling
                    var timeoutId = $interval(function() {
                        //updateTime(); // update DOM
                    }, 1000);
                }
            }
        }
    ])

    .directive('zkScrollTo', ['$document',
        function($document) {
            return {
                restrict: 'A',
                link: function(scope, elm) {
                    window.scrollTo(0, elm[0].offsetTop);
                }
            }
        }
    ])

