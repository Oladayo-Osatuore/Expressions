'use strict';

// Lists controller
angular.module('lists').controller('ListsController', ['$scope', '$sce', '$stateParams', '$location', 'Authentication', 'Lists','Items',
	function($scope, $sce, $stateParams, $location, Authentication, Lists, Items) {
		$scope.authentication = Authentication;
		// $scope.items = [];
		// $scope.item = {};
		// $scope.lists = {};
		// $scope.list = {};
		/*******************************************
		FUNCTION FOR THE VIDEO URL 
		*******************************************/
		$scope.scePermit = function(path){
	      return $sce.trustAsResourceUrl(path);
	    };

		/****************************************
		FUNCTION FOR SHOWING CATEGORIES OF ITEMS
		****************************************/

		$scope.list ={};
		$scope.list.items = [];
		// var items = [{itemType: 'text', itemType: 'picture', itemType: 'video'}]
		$scope.addText = function() {
			$scope.list.items.push({itemType: 'text', itemTitle: '', itemDescription: ''});
		};

		$scope.addPicture = function() {
			$scope.list.items.push({itemType: 'picture', itemTitle: '', itemImageUrl: '', itemDescription:''});
		};

		$scope.addVideo = function() {
			$scope.list.items.push({itemType: 'video', itemTitle: '', itemVideoUrl: '', itemDescription:''});
		};


				// Create new List
		$scope.create = function() {
			//saveCurrentItems();
			//console.log($scope.items,$scope.item);
			//if($scope.item)return;
			//Create new List object
			var list = new Lists ({
				caption: this.caption,
				description: this.description,
				items:$scope.list.items
			});


			// Redirect after save
			list.$save(function(response) {
				$location.path('/lists/' + response._id);

				// Clear form fields
				// $scope.caption = '';
				$scope.caption = '';
				// $scope.item = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};



		
		// Remove existing List
		$scope.remove = function( list ) {
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

		function saveCurrentItems()
		{
			$scope.list.items = [];
			var textContent = {
				itemType:['text'],
				itemTextDescription: $scope.list.item.itemTextDescription,
				itemTextTitle: $scope.item.itemTextTitle
			};
			if($scope.textState)
			{
				$scope.list.items.push(textContent);
			}				
			else
			{
				removeItemFromList('text');
			}
		
		
		var pictureContent = {
				itemType:['picture'],
				itemPictureDescription: $scope.item.itemPictureDescription,
				itemPictureTitle: $scope.list.item.itemPictureTitle
			};
			if($scope.pictureState)
			{
				$scope.list.items.push(pictureContent);
			}				
			else
			{
				removeItemFromList('picture');
			}
		


		var videoContent = {
				itemType:['video'],
				itemVideoDescription: $scope.list.item.itemVideoDescription,
				itemVideoTitle: $scope.list.item.itemVideoTitle
			};
			if($scope.videoState)
			{
				$scope.items.push(videoContent);
			}				
			else
			{
				removeItemFromList('video');
			}
		}
		/*******************************************
		FUNCTIONS FOR SHOWING AND HIDDING FIELDSETS
		*******************************************/
		// function removeItemFromList(itemType)
		// {
		// 	for(var i in $scope.items)
		// 	{
		// 		if($scope.items[i].itemType.indexOf(itemType)===0)
		// 			$scope.items.splice(i,1);
		// 	}
		// }
		// $scope.textState = false;

		// $scope.showTextFieldSet = function(){
		// 	$scope.textState = !$scope.textState;
		// };


		// $scope.pictureState = false;

		// $scope.showPictureFieldSet = function(){
		// 	$scope.pictureState = !$scope.pictureState;
		// };
		// $scope.videoState = false;

		// $scope.showVideoFieldSet = function(){
		// 	$scope.videoState = !$scope.videoState;
		// };



		// Update existing List
		$scope.update = function() {
			$scope.list.$update(function(response) {
				$location.path('/lists/' + $scope.list._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
			
		};

		/************************************
		FUNCTION TO DELETE ITEM
		************************************/
		$scope.removeItem = function(i){
			$scope.list.items.splice(i, 1);
		}
		// Find a list of Lists
		$scope.find = function() {
			$scope.lists = Lists.query();
			console.log($scope.lists);
		};

		// Find existing List
		$scope.findOne = function() {
			$scope.list = Lists.get({ 
				listId: $stateParams.listId
			}, function(e) {
				console.log(e);
			});

	

		};

	}	
]);


