'use strict';  
angular
.module('myApp.home', ['ngRoute', 'ngStorage'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'home/home.html',
    controller: 'HomeController',
    controllerAs: 'homeCtrl',  
  });
}])
.controller('HomeController', HomeController);

HomeController.$inject = ['UserService', '$rootScope'];
function HomeController(UserService, $rootScope) {
    var homeCtrl = this;

    homeCtrl.user = null;
    homeCtrl.allUsers = [];
    homeCtrl.deleteUser = deleteUser;

    initController();

    function initController() {
        loadCurrentUser();
        loadAllUsers();
    }

    function loadCurrentUser() {
        UserService.GetByUsername($rootScope.globals.currentUser.username)
        .then(function (user) {
            homeCtrl.user = user;
        });
    }

    function loadAllUsers() {
        UserService.GetAll()
        .then(function (users) {
            homeCtrl.allUsers = users;
        });
    }

    function deleteUser(id) {
        UserService.Delete(id)
        .then(function () {
            loadAllUsers();
        });
    }
}
