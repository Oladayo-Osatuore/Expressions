'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', 'Lists',
	function($scope, Authentication,Lists) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
		$scope.find = function()
		{
			$scope.lists = Lists.query();
			console.log($scope.lists);
		};
	}
]);


// $scope.find = function() {
// 			$scope.lists = Lists.query();
// 			console.log($scope.lists);
// 		};