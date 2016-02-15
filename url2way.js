/**
 * @file url2way service definition
 * @name url2way.js
 * @author David Ruiz <david.ruiz@eldiario.es>
 * @license MIT
 * @copyright 2016 eldiarioes
 */

'use strict';
 /*global angular */
 /*global l33teral */
 /*global _ */

try {
  var l33t = l33teral, ng = angular, underscore = _;
} catch(e) {
  throw 'Some required library (l33teral, _, angular) not found.';
}

angular.module('url2way', [])
  .factory('url2way', ['$location', function($location) {
    
    var $sc00pe = null;
    var settings = null;


      // Constructor
    var url2way = function(setts, $scope) {
      
      if(!setts) throw 'Settings object not received.';
      if(!$scope) throw 'Access to your inner scope is required.';

        // set global elements
      $sc00pe = l33t($scope);
      settings = setts;
      
      if(angular.isString(settings)) {
        processValue(settings, settings, $sc00pe.tap(settings, null));
      } else {
        angular.forEach(settings, bindObject);
      }
    };


      // Process the parameters object
    var bindObject = function(value, key) {

      if(!value) { // if a value is not passed for this key, a auto-reference object is suppossed
        angular.forEach($sc00pe.tap(key), bindAuto, key);

      } else { // otherwise a default settings element

        if(angular.isArray(settings[key])) { // settings passed as key: [target, defaults]
          processValue(key, settings[key][0], settings[key][1]);

        } else if (angular.isString(settings[key])) { // settings passed as key: target
          console.log(settings[key], $sc00pe, $sc00pe.tap(settings[key], null));
          processValue(key, settings[key], $sc00pe.tap(settings[key], null));
        }
      }
    };


      // process auto-reference object element
    var bindAuto = function(value, key) {
        // use passed context this as target
      processValue(key, this + '.' + key, value);
    };


      // do the binding
    var processValue = function(key, target, defaults) {

        // initiates the variable with the url value if found 
      var query = $location.search()[key];

        // save the initial value or defaults (or null) for the variable
      $sc00pe.plant(target, query ? query : defaults);

        // bind url changes
      $sc00pe.obj.$on('$locationChangeStart', function(event, next, current) {
        var query = $location.search()[key];
        if(query) $sc00pe.plant(target, query);
      });

        // bind variable changes
      $sc00pe.obj.$watch(target, function(newval){
        var value = $sc00pe.tap(target);
        if(value) $location.search(key, value);
      });

    };

    return url2way;
  }]);
