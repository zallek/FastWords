
/* Services */


angular.module('Fastwords.services', [])

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

.factory('Resources', ['$http', 'Constants', 'Libs', function($http, Constants, Libs){
    return {
        get: function(type, id, success){
            if(Constants.ResourcesMap[type] == "undefined"){
                throw Error("Undefined resources. Verify resources map");
            }
            else {
                $http.get(Constants.ResourcesMap[type].Url + '/' + Libs.camelCaseToURL(id) + '.json')
                    .success(function(data, status, headers, config) {
                        success(data);
                    })
                    .error(function() {
                        throw Error("Undefined resources type. Verify resources map");
                    });
            }
        }
    }
}]);


