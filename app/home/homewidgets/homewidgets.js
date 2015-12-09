'use strict';

angular.module('myApp.home')
.directive('homeWidgets',[function() {
    return{
        templateUrl:'home/homewidgets/homewidgets.html',
        restrict : 'E'
    };
}])
.factory('WidgetFactory', function($localStorage){
    return {             
         getBuySellCount: function(userName){
            var count = 0;
            angular.forEach($localStorage.orders, function(orderA, key){
                if (orderA.username == userName) {                    
                    ++count;
                }                
            });             
             

             
            return count;
        },
         getPendingOrders: function(userName){
            var count = 0;
            angular.forEach($localStorage.orders, function(orderA, key){
                if (orderA.username == userName && orderA.orderStatus == 'P') {                    
                    ++count;
                }                
            });             
            return count;
        },
         getTotalTradeValue: function(userName){
            var tradeValue = 0;
            angular.forEach($localStorage.orders, function(orderA, key){
                if (orderA.username == userName && orderA.orderStatus == 'E' && orderA.action == 'BUY') {                    
                    tradeValue += orderA.tradeValue;
                }                
            });             
            return tradeValue;
        }        

    }               
})
.controller('WidgetController', WidgetController);

WidgetController.$inject = ['$scope', '$rootScope', 'WidgetFactory'];

function WidgetController($scope, $rootScope, WidgetFactory) {

     $scope.buysell = WidgetFactory.getBuySellCount($rootScope.globals.currentUser.username);
     $scope.pendingOrders = WidgetFactory.getPendingOrders($rootScope.globals.currentUser.username);
    $scope.tradeValue =1000;
     
}
