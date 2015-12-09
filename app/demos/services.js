'use strict';

/* Services */

angular.module('phonecatServices', ['ngResource'])
.factory('Phone', ['$resource',
  function($resource){
    return $resource('demotopics/:phoneId.json', {}, {
      query: {method:'GET', params:{phoneId:'topiclist'}, isArray:true}
    });
  }]);
