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


RegisterController.$inject = ['UserService', '$location', '$rootScope', 'FlashService','$scope'];
function RegisterController(UserService, $location, $rootScope, FlashService, $scope) {
var registerCtrl = this;
          registerCtrl.user={firstName:'',lastName:'',username:'',password:''};
               
          registerCtrl.createUser = function(user){
              UserService.createUser(user)
                      .then(function (response) {
                    if (response.status == 'success') {
                        FlashService.Success(response.message, true);
                        $location.path('/login');
                    } else {
                        FlashService.Error(response.message);
                        registerCtrl.dataLoading = false;
                    }
                });
          };
 
          registerCtrl.submit = function() {
              registerCtrl.dataLoading = true;
              registerCtrl.createUser(registerCtrl.user);
              registerCtrl.reset();
          };
               
          registerCtrl.reset = function(){
              registerCtrl.user={firstName:'',lastName:'',username:'',password:''};
              $scope.form.$setPristine(); //reset Form
          };
 
}})();