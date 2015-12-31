'use strict';  
angular
.module('myApp.buysell', ['ngRoute', 'ngStorage', 'angularjs-autocomplete'])
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
.factory('dataFactory', function($http) {
  return {
    get: function(url) {
      return $http.get(url).then(function(resp) {
        return resp.data;
      });
    }
  };
})
.directive('typeahead', function($timeout) {
  return {
    restrict: 'AEC',
    scope: {
		items: '=',
		prompt:'@',
		title: '@',
		subtitle:'@',
		model: '=',
		onSelect:'&'
	},
	link:function(scope,elem,attrs){
	   scope.handleSelection=function(selectedItem){
		 scope.model=selectedItem.abbreviation;
		 scope.buyCashFormData.stock=selectedItem.name;
		 scope.current=0;
		 scope.selected=true;        
		 $timeout(function(){
			 scope.onSelect();
		  },200);
	  };
	  scope.current=0;
	  scope.selected=true;
	  scope.isCurrent=function(index){
		 return scope.current==index;
	  };
	  scope.setCurrent=function(index){
		 scope.current=index;
	  };
	},
    templateUrl: 'buysell/templateurl.html'
  }
})

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
         
BuySellController.$inject = ['$scope', '$rootScope', 'BuySellFactory', '$timeout','$http','$location', 'dataFactory'];
function BuySellController($scope, $rootScope, BuySellFactory, $timeout,$http, $location, dataFactory) {
    
    
    dataFactory.get('http://mumd14269.igatecorp.com:8080/tradesim/listAllStocks').then(function(data){
		$scope.items=data;
	});
	$scope.name="";
	$scope.onItemSelected=function(){
		console.log('selected='+$scope.name);
        $scope.buyCashFormData.stock = $scope.name;
	}
    
    var buysellCtrlBuySellCash = this;

    
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
