'use strict';

angular.module('myApp.navbar', ['ngRoute','myApp.authenticationService'])

.directive('tradeSimulatorNavbar', [function() {
    return{
        templateUrl:'components/navbar/navbar.html',
        restrict : 'E'
    };
}])
.controller('TabController',TabController);

TabController.$inject = ['$location', 'AuthenticationService'];
            
function TabController($location, AuthenticationService){
    this.tab = 1;
    
    this.selectTab = function(setTab){
        this.tab = setTab;
    };
    
    this.isSelected = function(checkTab){
        return this.tab === checkTab;
    };
    
    this.logout = function (){
        AuthenticationService.logout()
        .then(function (response) {
                    if (response.status == 'success') {
                        $location.path('/login');
                    }});
    }
}            