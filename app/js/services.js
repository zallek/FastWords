'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])

    .value('version', '0.1')

    .service('CommonLib', function CommonLib() {

        this.changecss = function(theClass,element,value) {
            //http://www.shawnolson.net/a/503/altering-css-class-attributes-with-javascript.html
            var cssRules;

            for (var S = 0; S < document.styleSheets.length; S++){
                try{
                    document.styleSheets[S].insertRule(theClass+' { '+element+': '+value+'; }',document.styleSheets[S][cssRules].length);
                }
                catch(err){
                    try{
                        document.styleSheets[S].addRule(theClass,element+': '+value+';');
                    }
                    catch(err){
                        try{
                            if (document.styleSheets[S]['rules']) {
                                cssRules = 'rules';
                            }
                            else if (document.styleSheets[S]['cssRules']) {
                                cssRules = 'cssRules';
                            }
                            else {
                                //no rules found... browser unknown
                            }

                            for (var R = 0; R < document.styleSheets[S][cssRules].length; R++) {
                                if (document.styleSheets[S][cssRules][R].selectorText == theClass) {
                                    if(document.styleSheets[S][cssRules][R].style[element]){
                                        document.styleSheets[S][cssRules][R].style[element] = value;
                                        break;
                                    }
                                }
                            }
                        }
                        catch (err){}
                    }
                }
            }
        }
    })

    /*.service('Language', function Language() {
        var that = this;
        this.currentLanguage;
        var languages = [
            {value : 'en', text: 'anglais'},
            {value : 'fr', text: 'français'}
        ];

        this.getList = function(){
            return languages;
        };
        this.setLanguage = function(newLanguage){
            languages.forEach(function(language){
                if(language.value == newLanguage){
                    that.currentLanguage = language;
                    return;
                }
            })
        }
        this.setLanguage('en');
    })

    .factory('String', ['$http', '$q', 'Language', function($http, $q, Language){
        return {
            get: function(stringId){
                var deferred = $q.defer(),
                    intermediate = $q.defer(),
                    generic = $http.get('string/' + stringId + '.json'),
                    specific = $http.get('string-' + Language.currentLanguage.value + '/' + stringId + '.json');

                specific.then(function(data) { intermediate.resolve(data); }, // Success
                    function() { intermediate.resolve({}); });       // Error

                $q.all([generic, intermediate.promise]).then(function(results) {
                    deferred.resolve(jQuery.extend(results[0].data, results[1].data));
                });

                return deferred.promise;
            }
        }
    }]);*/

