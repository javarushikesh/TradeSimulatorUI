(function(){
    
    'use strict';

    angular.module('myApp.login', ['ngRoute','myApp.flashService','myApp.userService', 'myApp.authenticationService'])

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/login', {
        templateUrl: 'login/login.html',
        controller: 'LoginController',
        controllerAs: 'loginCtrl',  
      });
    }])

    .controller('LoginController', LoginController);
    
    LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService','$scope'];
    
    function LoginController($location, AuthenticationService, FlashService, $scope) {
        var loginCtrl = this;

        loginCtrl.user={username:'',password:''};
        
        loginCtrl.login = function(user) {
            loginCtrl.dataLoading = true;
            AuthenticationService.login(user).
                then(function (response) {
                    if (response.status == 'success') {
                        $location.path('/home');
                    } else {
                        FlashService.Error(response.message);
                        loginCtrl.dataLoading = false;
                    }
            });
        };
        
        loginCtrl.submit = function() {
            loginCtrl.dataLoading = true;
            loginCtrl.login(loginCtrl.user);
            loginCtrl.reset();
        };
               
        loginCtrl.reset = function(){
            loginCtrl.user={username:'',password:''};
            $scope.form.$setPristine(); //reset Form
        };
        
    }
    
})();