angular.module('myApp.stockPriceService', [])
.factory('StockPriceService', ['$http', function($http) {
  var YAHOO_FINANCE_STOCKS_URL_PATTERN =
		'//query.yahooapis.com/v1/public/yql?q=select * from ' + 
		'yahoo.finance.quotes where symbol in ("SYMBOLS")' + 
		'&env=http://datatables.org/alltables.env&format=json&callback=JSON_CALLBACK';
  var symbols = ['YHOO','AAPL','GOOG','MSFT'];
  var stocksDetails = "";

  var getStocksBanner = function () {
    return stocksDetails;
  };

  var refresh = function() {
    var url = YAHOO_FINANCE_STOCKS_URL_PATTERN.
                    replace('SYMBOLS', symbols.join('","'));
      console.log(url);
    return $http.jsonp(url).success(function(data) {
      var newstocksDetails = "";
      angular.forEach(data.query.results.quote, function(quote) {
        var symbol = quote.symbol;
        var name = quote.Name;
        var askPrice = quote.Ask;
        var bidPrice = quote.Bid;
          
        newstocksDetails = newstocksDetails + name + " [" + symbol + "]" +
            " Ask: " + askPrice + " Bid: " + bidPrice + " ";
          
      });
      stocksDetails = newstocksDetails;
    });
  };

  refresh();

  return {
    getStocksBanner: getStocksBanner
  };
}]);