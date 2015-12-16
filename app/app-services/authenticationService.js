'use strict';

angular
.module('myApp.authenticationService',['ngCookies'])
.factory('AuthenticationService', AuthenticationService);

AuthenticationService.$inject = ['$http'];
function AuthenticationService($http) {
    return {
        
        //Authentication Service
        login: function(user){
                  return $http.post('http://localhost:8080/tradesim/authenticate', user)
                      .then(function(response){
                      return response.data;
                  });
              } 
                
    }; 
}