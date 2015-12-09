'use strict';  
angular
.module('myApp.buysell', ['ngRoute', 'ngStorage'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/buysell', {
    templateUrl: 'buysell/buysell.html',
    controller: 'BuySellController',
    controllerAs: 'buysellCtrlBuySellCash'  
  }).when('/buyConfirm', {
    templateUrl: 'buysell/buyConfirm.html',
    controller: 'BuySellConfirmController'
  }).when('/sellConfirm', {
    templateUrl: 'buysell/sellConfirm.html',
    controller: 'BuySellConfirmController' 
  }).when('/orderBook', {
    templateUrl: 'buysell/orderBook.html',
    controller: 'OrderBookController'
  }).when('/tradeBook', {
    templateUrl: 'buysell/tradeBook.html',
    controller: 'TradeBookController'
  });
}])

.factory('BuySellFactory', function($localStorage){
    return {
        submitBuySellCash: function(userName, formData, action){
                
            if ($localStorage.orderNumber == undefined) {
                 $localStorage.orderNumber = 10000;
            } else {        
                 $localStorage.orderNumber = $localStorage.orderNumber + 1;
            }

            if ($localStorage.orders == undefined) {
                $localStorage.orders = [];
            }
            
            if ($localStorage.tradeBookOrders == undefined) {
                $localStorage.tradeBookOrders = [];
            }            
            
            var tradeVal = (formData.orderType == "limit")? formData.limitPrice * formData.quantity: 100 * formData.quantity;
            var priceVal = (formData.orderType == "limit")? formData.limitPrice: 100;
            var contractNoteVal = $localStorage.orderNumber + 10;
            var buyOrder = { 
                orderDate: new Date(),
                orderNumber: $localStorage.orderNumber,
                username: userName,
                product : formData.product,
                action: action,
                exchange: formData.exchange,
                stock: formData.stock,
                quantity: new Number(formData.quantity),
                orderType: formData.orderType,
                price: priceVal,
                tradeValue: tradeVal,
                brokerage: tradeVal * 0.02,
                taxes : tradeVal * 0.01,
                viewLimit: formData.viewLimit,
                contractNote: contractNoteVal,
                quote: formData.quote,
                disclosedQuantity: formData.disclosedQuantity,
                orderValidity: formData.orderValidity,
                stopLossTriggerPrice: formData.stopLossTriggerPrice,
                orderStatus: 'P'
            };

            $localStorage.newBuyOrder = buyOrder; 
             $localStorage.orders.push(buyOrder);            
            
            
        },
        
        getNewOrder: function(userName){
            var newOrder = {};
            angular.forEach($localStorage.orders, function(value, key){
                if (value.username == userName && value.orderStatus == 'P') {
                    newOrder = value;
                }
            });
            return newOrder;
        },
        
         getOrders: function(userName){
            var userOrders = [];
            var otherUserOrders = [];
            angular.forEach($localStorage.orders, function(orderA, key){
                if (orderA.username == userName && orderA.orderStatus == 'P') {
                    

                    angular.forEach($localStorage.orders, function(orderB, key){
                        if (orderB.username != userName && orderB.orderStatus == 'P'
                            && orderA.action != orderB.action 
                            && orderA.stock == orderB.stock
                           && orderA.quantity == orderB.quantity && orderA.price == orderB.price) {
                            orderA.orderStatus = 'E';
                            orderB.orderStatus = 'E';
                        }
                    });
                }
                
            });
             

            angular.forEach($localStorage.orders, function(orderA, key){
                if (orderA.username == userName && orderA.orderStatus == 'P') {                    
                    userOrders.push(orderA);
                }                
            });             
             

             
            return userOrders;
        },
        
        
         getTradeOrders: function(userName){
            var userOrders = [];
            var otherUserOrders = [];
            angular.forEach($localStorage.orders, function(orderA, key){
                if (orderA.username == userName && orderA.orderStatus == 'P') {
                    

                    angular.forEach($localStorage.orders, function(orderB, key){
                        if (orderB.username != userName && orderB.orderStatus == 'P'
                            && orderA.action != orderB.action 
                            && orderA.stock == orderB.stock
                           && orderA.quantity == orderB.quantity && orderA.price == orderB.price) {
                            orderA.orderStatus = 'E';
                            orderB.orderStatus = 'E';
                        }
                    });
                }
                
            });
             

            angular.forEach($localStorage.orders, function(orderA, key){
                if (orderA.username == userName && orderA.orderStatus == 'E') {                    
                    userOrders.push(orderA);
                }                
            });             
             

             
            return userOrders;
        }        

    }               
})

.controller('BuySellController', BuySellController)
.controller('BuySellConfirmController', BuySellConfirmController)
.controller('OrderBookController', OrderBookController)
.controller('TradeBookController', TradeBookController);

BuySellController.$inject = ['$scope', '$rootScope', 'BuySellFactory', '$timeout'];
function BuySellController($scope, $rootScope, BuySellFactory, $timeout) {
    
    
    var dataelem = [
    
        {
		       label: "APPLE INC",
		       value: "APPL"
        },
        
        {
		       label: "IBM SOLUTIONS",
		       value: "IBM"
        },
        
        {
		       label: "RELIENCE INDUSTRIES",
		       value: "REL"
        },
        
        {
		       label: "GOOGLE INC",
		       value: "GOOGLE"
        }
        
    ];
     $( "#sellCashStock" ).autocomplete({
	         source: dataelem,
             select: function() { 
                    $timeout(function() { 
                      $("#sellCashStock").trigger('input'); 
                    }, 10); 
                } 
      
	 });
    
     $( "#buyCashStock" ).autocomplete({
	         source: dataelem,
             select: function() { 
                    $timeout(function() { 
                      $("#buyCashStock").trigger('input'); 
                    }, 10); 
                } 
      
	 });    
    
    $scope.buyCashFormData = {};
    $scope.$newBuyOrder = {};

    $scope.newBuyOrder = {};
    
    $scope.submitCashBuyTrade = function() {        
        BuySellFactory.submitBuySellCash($rootScope.globals.currentUser.username, $scope.buyCashFormData, 'BUY');
     }
    
    $scope.submitCashSellTrade = function() {        
        BuySellFactory.submitBuySellCash($rootScope.globals.currentUser.username, $scope.buyCashFormData, 'SELL');
     }    
}


BuySellConfirmController.$inject = ['$scope', '$rootScope', 'BuySellFactory'];
function BuySellConfirmController($scope, $rootScope, BuySellFactory) {
    
    
    $scope.$newBuyOrder = {};
    var currentUser = $rootScope.globals.currentUser.username;
    $scope.$newOrder = BuySellFactory.getNewOrder($rootScope.globals.currentUser.username);
}

OrderBookController.$inject = ['$scope', '$rootScope', 'BuySellFactory'];
function OrderBookController($scope, $rootScope, BuySellFactory) {
    var currentUser = $rootScope.globals.currentUser.username;
    $scope.orderBookEntriesAll = BuySellFactory.getOrders($rootScope.globals.currentUser.username);
    
    $scope.orderBookEntries = [];
    
    angular.forEach($scope.orderBookEntriesAll, function(value, key){
        if (value.username == $rootScope.globals.currentUser.username && value.orderStatus == 'P') {                    
            $scope.orderBookEntries.push(value);
        }                
    });  
    
}

TradeBookController.$inject = ['$scope', '$rootScope', 'BuySellFactory'];
function TradeBookController($scope, $rootScope, BuySellFactory) {
    
    var currentUser = $rootScope.globals.currentUser.username;
    $scope.orderBookEntriesAll = BuySellFactory.getTradeOrders($rootScope.globals.currentUser.username);
    
    $scope.orderBookEntries = [];
    
    angular.forEach($scope.orderBookEntriesAll, function(value, key){
        if (value.username == $rootScope.globals.currentUser.username && value.orderStatus == 'E') {                    
            $scope.orderBookEntries.push(value);
        }                
    });
    
}
