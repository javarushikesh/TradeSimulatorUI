angular.module('myApp.stocksheader', ['myApp.stockPriceService'])
.directive('stocksPrice', [function() {
    return{
        templateUrl:'components/stocksheader/stocksheader.html',
        restrict : 'E'
    };
}])
.controller('StockPriceDisplayController', ['StockPriceService', function(StockPriceService) {
  
  this.getStockPricesBanner = function getStockPricesBanner() {
    return StockPriceService.getStocksBanner();
  };
  this.pay = function pay() {
    window.alert("Thanks!");
  };
}]);