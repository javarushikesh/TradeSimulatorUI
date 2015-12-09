'use strict';

/* Controllers */

angular.module('phonecatControllers', [])
.controller('PhoneListCtrl', ['$scope', 'Phone',
  function($scope, Phone) {
    $scope.phones = Phone.query();
    $scope.orderProp = 'age';
  }])
.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone',
function($scope, $routeParams, Phone) {
    $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone)       {
        $scope.mainImageUrl = phone.images[0];
    });

    $scope.setImage = function(imageUrl) {
        $scope.mainImageUrl = imageUrl;
    };
}])
.controller('AudioCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {
    $scope.audioURL =  "audio/" + $routeParams.phoneId + "/0.mp3";
	var audio = new Audio($scope.audioURL);
	audio.src = 'audio/'+ $routeParams.phoneId +'/0.mp3';
	audio.play();
	$("#myCarousel").on('slide.bs.carousel', function(evt) {
	  $scope.audioURL = "audio/"+ $routeParams.phoneId +"/" + $(evt.relatedTarget).index() + ".mp3";
	audio.src = $scope.audioURL
	audio.play();
	
	})
	
	    $scope.$on("$destroy", function(){
            audio.pause();
        });
	
	
	$("#pause").click(function(evt) {
		audio.pause();
	})	
	
	$("#resume").click(function(evt) {
		audio.play();
	})	

	$("#replay").click(function(evt) {
		audio.src = $scope.audioURL
		audio.play();
	})		
	
	$( document ).unload(function() {
		audio.pause();
	});	
	
}]);
