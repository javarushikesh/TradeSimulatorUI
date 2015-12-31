'use strict';

angular.module('myApp.userService',[])
.factory('UserService', UserService);

UserService.$inject = ['$http', 'AppConfig'];
    function UserService($http, AppConfig) {

      return {
         
            createUser: function(user){
                    return $http.post(AppConfig.appURL + '/tradesim/register', user)
                            .then(function(response){
                                        return response.data;
                            });
            }
         
    }; 
}