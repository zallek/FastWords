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
            $scope.templateColor = "#92CDDC";
            $scope.$watchCollection('templateColor', function() {
                CommonLib.changecss('.templateColor', 'color', $scope.templateColor);
                CommonLib.changecss('.zk-completed', 'color', $scope.templateColor);
            });
        }]);
