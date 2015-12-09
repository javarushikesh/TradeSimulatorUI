'use strict';

angular.module('myApp.navbar', ['ngRoute'])

.directive('tradeSimulatorNavbar', [function() {
    return{
        templateUrl:'components/navbar/navbar.html',
        restrict : 'E'
    };
}])
.controller('TabController',TabController);
            
function TabController(){
    this.tab = 1;
    
    this.selectTab = function(setTab){
        this.tab = setTab;
    };
    
    this.isSelected = function(checkTab){
        return this.tab === checkTab;
    };
}            