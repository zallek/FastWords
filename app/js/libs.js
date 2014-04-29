/**
 * Created by zallek on 4/30/14.
 */

angular.module('Fastwords.libs', [])

    .factory('Libs', function(){
        return {
            changecss: function(theClass,element,value) {
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
            },
            /**
             * Convert CamelCase to camel-case
             * @param string
             */
            camelCaseToURL: function(string){
                var newString = string;
                if(newString.length>0){
                    newString = newString[0].toLowerCase() + newString.slice(1);
                }
                for(var i=1; i<newString.length; i++){
                    if(newString[i] != newString[i].toLowerCase()){
                        newString = newString.slice(0, i) + "-" + newString[i].toLowerCase() + newString.slice(i+1);
                    }
                }
                return newString;
            }
        }
    })