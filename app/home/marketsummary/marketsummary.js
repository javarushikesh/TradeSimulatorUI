'use strict';

angular.module('myApp.home')
.directive('marketSummary',[function() {
    return{
        templateUrl:'home/marketsummary/marketsummary.html',
        restrict : 'E'
    };
}])
.factory('MarketSummaryFactory', function($localStorage){
    return {             
         getPositions: function(userName){
            var userOrders = [];
            var otherUserOrders = [];
            var myMap = new Map();

            angular.forEach($localStorage.orders, function(orderA, key){
                if (orderA.username == userName && orderA.orderStatus == 'E' && orderA.action == 'BUY') {                    
                    if (myMap.has(orderA.stock)) {
                        var val = myMap.get(orderA.stock);
                        myMap.set(orderA.stock, new Number(val) + new Number(orderA.quantity));
                    } else {
                        myMap.set(orderA.stock, new Number(orderA.quantity));
                    }
                }                
            });             
             

             
            return myMap;
        }        

    }               
})
.controller('MarketSummeryController', MarketSummeryController);

MarketSummeryController.$inject = ['$scope', '$rootScope', 'MarketSummaryFactory'];

function MarketSummeryController($scope, $rootScope, MarketSummaryFactory) {

    $scope.positions = MarketSummaryFactory.getPositions($rootScope.globals.currentUser.username);
    var positionList = [];
    angular.forEach($scope.positions, function(value, key) {
        var o = {'qty': value, 'stock': key};
      this.push(o);
    }, positionList);
    $scope.positionListArr = positionList;
    
}