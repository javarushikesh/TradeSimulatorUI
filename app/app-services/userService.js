'use strict';

angular.module('myApp.userService',[])
.factory('UserService', UserService);

UserService.$inject = ['$http'];
    function UserService($http) {

      return {
         
            createUser: function(user){
                    return $http.post('http://localhost:8080/tradesim/register', user)
                            .then(function(response){
                                        return response.data;
                            });
            }
         
    }; 
}