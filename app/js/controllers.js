'use strict';

/* Controllers */

angular.module('Fastwords.controllers', [])


    .controller('HomeCtrl', [function() {

    }])

    .controller('ModsListCtrl', ['$scope',
        function($scope) {
            $scope.setModPreview = function(mod) {
                $scope.modPreview = mod;
            };
            $scope.modPreview = "falling";
        }])

    .controller('EngineCtrl', ['$scope',
        function($scope) {
            //RESOURCES

        }])

    .controller('ColorPickerCtrl', ['$scope', 'Libs',
        function($scope, Libs) {
            $scope.templateColor = "#92CDDC";
            $scope.$watchCollection('templateColor', function() {
                Libs.changecss('.templateColor', 'color', $scope.templateColor);
                Libs.changecss('.zk-completed', 'color', $scope.templateColor);
            });
        }]);
