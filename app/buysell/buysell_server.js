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

.factory('BuySellFactory',BuySellFactory)
.controller('BuySellController', BuySellController)
.controller('BuySellConfirmController', BuySellConfirmController)
.controller('OrderBookController', OrderBookController)
.controller('TradeBookController', TradeBookController);

BuySellFactory.$inject = ['$localStorage','$http'];         
function BuySellFactory ($localStorage,$http){
    
    var tradeData = {};
    
    return {
        submitBuySellCash: function(form){
        return $http.post('http://mumd14269.igatecorp.com:8080/tradesim/submitTrade', form)
            .then(function(response){
            return response.data;
        });
        },
        
        populateConfirmData : function(data){
            tradeData = data;
        },
        
        getConfirmData : function(){
            return tradeData;
        },
        
        getNewOrder: function(userName){

        },
        
        getOrders: function(userName){
            return $http.post('http://mumd14269.igatecorp.com:8080/tradesim/listOrderBook', userName) 
            .then(function(response){
            return response.data;
        });
        },
        
        
         getTradeOrders: function(userName){
            return $http.post('http://mumd14269.igatecorp.com:8080/tradesim/listTradeBook', userName) 
            .then(function(response){
            return response.data;
        });
        }        
    }               
}         
         
BuySellController.$inject = ['$scope', '$rootScope', 'BuySellFactory', '$timeout','$http','$location'];
function BuySellController($scope, $rootScope, BuySellFactory, $timeout,$http, $location) {
    
    var buysellCtrlBuySellCash = this;
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
        $scope.buyCashFormData.username = $rootScope.globals.currentUser.username;
        $scope.buyCashFormData.action = 'BUY';
        BuySellFactory.submitBuySellCash($scope.buyCashFormData)
            .then(function(response){
            if(response.status = 'success'){
                alert("Success");
                BuySellFactory.populateConfirmData(response);
                $location.path('/buyConfirm')
            }else{
                alert("call Failed");
            }
        })
     }
    
    $scope.submitCashSellTrade = function() {        
        $scope.buyCashFormData.username = $rootScope.globals.currentUser.username;
        $scope.buyCashFormData.action = 'SELL';
        BuySellFactory.submitBuySellCash($scope.buyCashFormData)
            .then(function(response){
            if(response.status = 'success'){
                alert("Success");
                BuySellFactory.populateConfirmData(response);
                $location.path('/sellConfirm')
            }else{
                alert("call Failed");
            }
        })
     }    
}


BuySellConfirmController.$inject = ['$scope', '$rootScope', 'BuySellFactory'];
function BuySellConfirmController($scope, $rootScope, BuySellFactory) {
    $scope.$newOrder = BuySellFactory.getConfirmData();
}

OrderBookController.$inject = ['$scope', '$rootScope', 'BuySellFactory'];
function OrderBookController($scope, $rootScope, BuySellFactory) {
    var currentUser = $rootScope.globals.currentUser.username;
    BuySellFactory.getOrders($rootScope.globals.currentUser.username)
    .then(function(response){
        $scope.orderBookEntries = response;    
    });
}

TradeBookController.$inject = ['$scope', '$rootScope', 'BuySellFactory'];
function TradeBookController($scope, $rootScope, BuySellFactory) {
    var currentUser = $rootScope.globals.currentUser.username;
    BuySellFactory.getTradeOrders($rootScope.globals.currentUser.username)
    .then(function(response){
        $scope.tradeBookEntries = response;    
    });
}
