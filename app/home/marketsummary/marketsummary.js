'use strict';

angular.module('myApp.home')
.directive('marketSummary',[function() {
    return{
        templateUrl:'home/marketsummary/marketsummary.html',
        restrict : 'E'
    };
}])
.factory('MarketSummaryFactory', MarketSummaryFactory)
.controller('MarketSummeryController', MarketSummeryController);

MarketSummaryFactory.$inject = ['$http', 'AppConfig'];

function MarketSummaryFactory ($http, AppConfig){
    return {             
         getPositions: function(userName){
               return $http.post(AppConfig.appURL +'/tradesim/getPositions', userName) 
            .then(function(response){
                return response.data;
        });
         }
    }               
}


MarketSummeryController.$inject = ['$scope', '$rootScope', 'MarketSummaryFactory'];

function MarketSummeryController($scope, $rootScope, MarketSummaryFactory) {
    
  
  MarketSummaryFactory.getPositions($rootScope.globals.currentUser.username)
      .then(function(response){
            $scope.positionListArr = response;
        });
  
}