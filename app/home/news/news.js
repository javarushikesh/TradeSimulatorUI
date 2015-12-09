'use strict';

angular.module('myApp.home')
.directive('news',function() {
    return{
        templateUrl:'home/news/news.html',
        restrict : 'EA',
        link: function(){
            $(".demo1").bootstrapNews({
                newsPerPage: 5,
                autoplay: true,
                pauseOnHover:true,
                direction: 'up',
                newsTickerInterval: 2000,
                onToDo: function () {
                    //console.log(this);
                }
            });
        }
    };
})
.controller('NewsController',['$scope', function($scope){
    
}]);