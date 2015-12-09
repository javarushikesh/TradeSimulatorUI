'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngResource',
  'ngCookies',    
  'myApp.view1',
  'myApp.view2',
  'myApp.version',
  'myApp.login',
  'myApp.navbar',
  'myApp.register',
  'myApp.home',
  'myApp.buysell',
  'myApp.Quotes',    
  'myApp.stocksheader',
  'phonecatControllers',
  'phonecatFilters',
  'phonecatServices'
]).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.
      when('/demos', {
        templateUrl: 'demos/phone-list.html',
        controller: 'PhoneListCtrl'
      }).
      when('/demos/:phoneId', {
        templateUrl: 'demos/phone-detail.html',
        controller: 'PhoneDetailCtrl'
      }).
      otherwise({
        redirectTo: '/demos'
      });
  }]).run(run);

run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
function run($rootScope, $location, $cookieStore, $http) {
    // keep user logged in after page refresh
    $rootScope.globals = $cookieStore.get('globals') || {};
    if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
    }

/**    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // redirect to login page if not logged in and trying to access a restricted page
        var restrictedPage = $.inArray($location.path(), ['/login', '/register','/demos']) === -1;
        var loggedIn = $rootScope.globals.currentUser;
        if (restrictedPage && !loggedIn) {
            $location.path('/login');
        }
    });
*/    
}
