'use strict';

/* Directives */


angular.module('Fastwords.directives', [])

    .directive('zkFastwords', ['$interval', 'Resources',
        function($interval, Resources) {
            return {
                restrict: 'E',
                transclude: true,
                templateUrl: 'directive/fastwords.html',
                link: function(scope, element, attrs) {
                    var engineMod = attrs.zkEngineMod;
                    var fastWords;
                    scope.timeElapsed = 0;

                    if(engineMod == 'catchThemAll'){
                        Resources.get('WordsList', 'CatchThemAll', function(wordsList){
                            fastWords = $("#gamePanel").fastWords({
                                words : wordsList,
                                start : true,
                                scoreChangedCallback : function(newScores) {
                                    scope.wordsCompleted = newScores.wordsCompleted;
                                    scope.wordsCount = newScores.wordsCount;
                                    scope.nbErrors = newScores.errors;
                                    if(newScores.wordsMissed > 0){
                                        $interval.cancel(timeoutId);
                                        fastWords.Stop();
                                    }
                                }
                            })
                        });
                    }

                    // start the UI update process; save the timeoutId for canceling
                    var timeoutId = $interval(function() {
                        scope.timeElapsed++;
                    }, 1000);

                    element.on('$destroy', function() {
                        $interval.cancel(timeoutId);
                        fastWords.Stop();
                    });
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

