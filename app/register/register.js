(function () {    
'use strict';

angular.module('myApp.register', ['ngRoute','myApp.flashService','myApp.userService', 'myApp.authenticationService'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/register', {
    templateUrl: 'register/register.html',
    controller: 'RegisterController',
    controllerAs: 'registerCtrl'  
  });
}])
.controller('RegisterController', RegisterController);


RegisterController.$inject = ['UserService', '$location', '$rootScope', 'FlashService'];
function RegisterController(UserService, $location, $rootScope, FlashService) {
    var registerCtrl = this;

    registerCtrl.register = register;

    function register() {
        registerCtrl.dataLoading = true;
        UserService.Create(registerCtrl.user)
            .then(function (response) {
                if (response.success) {
                    FlashService.Success('Registration successful', true);
                    $location.path('/login');
                } else {
                    FlashService.Error(response.message);
                    registerCtrl.dataLoading = false;
                }
            });
    }
}
})();