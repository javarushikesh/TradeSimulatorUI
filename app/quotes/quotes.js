'use strict';  
angular
.module('myApp.Quotes', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/quotes', {
    templateUrl: 'quotes/quotes.html',
    controller: 'QuotesController',
    controllerAs: 'quotesCtrl',  
  });
}])
.controller('QuotesController', QuotesController);

function QuotesController(){
    
}