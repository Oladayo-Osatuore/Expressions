'use strict';

// Lists controller
angular.module('lists').controller('ListsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Lists',
	function($scope, $stateParams, $location, Authentication, Lists ) {
		$scope.authentication = Authentication;

		// Create new List
		$scope.create = function() {
			// Create new List object
			var list = new Lists ({
				caption: this.caption,
				// console.log('doing debugging');
				// console.log(list);
				// console.log('done');
				// category: this.category,
				title: this.title,
				// image_url: this.image,
				// video_url: this.video,
				description: this.description;
			});
		};

			// Redirect after save
			list.$save(function(response) {
				$location.path('lists/' + response._id);

				// Clear form fields
				// $scope.caption = '';
				$scope.category = '';
				$scope.title = '';
				$scope.image_url = '';
				$scope.video_url = '';
				$scope.description = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing List
		$scope.remove = function( list ) ;
			if ( list ) { list.$remove();

				for (var i in $scope.lists ) {
					if ($scope.lists [i] === list ) {
						$scope.lists.splice(i, 1);
					}
				}
			} else {
				$scope.list.$remove(function() {
					$location.path('lists');
				});
			}
		};

		// Update existing List
		$scope.update = function() {
			var list = $scope.list ;

			list.$update(function() {
				$location.path('lists/' + list._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Lists
		$scope.find = function() {
			$scope.lists = Lists.query();
		};

		// Find existing List
		$scope.findOne = function() {
			$scope.list = Lists.get({ 
				listId: $stateParams.listId
			});
		};
	}
]);