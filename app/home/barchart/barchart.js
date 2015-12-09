'use strict';

angular.module('myApp.home')
.directive('barChart',[function() {
    return{
        templateUrl:'home/barchart/barchart.html',
        restrict : 'E'
    };
}])
.controller('BarChartController',['$scope', function($scope){
    
    $.getJSON('https://www.highcharts.com/samples/data/jsonp.php?filename=new-intraday.json&callback=?', function (data) {

        // create the chart
        $('#containerChart').highcharts('StockChart', {


            title: {
                text: 'BSE Stock Sensex'
            },

            subtitle: {
                text: 'Using ordinal X axis'
            },

            xAxis: {
                gapGridLineWidth: 0
            },

            rangeSelector : {
                buttons : [{
                    type : 'hour',
                    count : 1,
                    text : '1h'
                }, {
                    type : 'day',
                    count : 1,
                    text : '1D'
                }, {
                    type : 'all',
                    count : 1,
                    text : 'All'
                }],
                selected : 1,
                inputEnabled : false
            },

            series : [{
                name : 'BSE',
                type: 'area',
                data : data,
                gapSize: 5,
                tooltip: {
                    valueDecimals: 2
                },
                fillColor : {
                    linearGradient : {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops : [
                        [0, Highcharts.getOptions().colors[0]],
                        [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                },
                threshold: null
            }]
        });
    });
}]);