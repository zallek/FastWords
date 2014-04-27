'use strict';

/* Controllers */

angular.module('myApp.controllers', [])


    .controller('HomeCtrl', [function() {

    }])

    .controller('ModsListCtrl', ['$scope',
        function($scope) {
            $scope.setModPreview = function(mod) {
                $scope.modPreview = mod;
            };
            $scope.modPreview = "falling";
        }])

    .controller('FallingCtrl', ['$scope',
        function($scope) {
            //RESOURCES
            $scope.getWordsList = function() {
                return [
                    {textWord : "template"},
                    {textWord : "lol"},
                    {textWord : "undo", delay: 2000},
                    {textWord : "fight"}
                ];
            };
        }])

    .controller('ColorPickerCtrl', ['$scope', 'CommonLib',
        function($scope, CommonLib) {
            //RESOURCES
            $scope.colors = [
                    {text : "Blue", value:"#92CDDC"},
                    {text : "Orange", value:"#FFC106"},
                    {text : "Pink", value:"#FF3399"},
                    {text : "Green", value:"#2EB90B"}
                ];
            $scope.changeTemplate = function(newValue){
                CommonLib.changecss(newValue);
            }
        }]);
