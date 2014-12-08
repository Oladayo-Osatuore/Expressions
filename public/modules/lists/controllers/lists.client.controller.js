'use strict';

// Lists controller
angular.module('lists').controller('ListsController', ['$scope', '$sce', '$stateParams', '$location', 'Authentication', 'Lists','Items','LikesItem','$upload','$timeout',
	function($scope, $sce, $stateParams, $location, Authentication, Lists, Items, LikesItem, $upload, $timeout) {
		$scope.authentication = Authentication;
		$scope.liked = false;
		$scope.likesItem = [];
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

		$scope.onFileSelect = function($files,$index) {
           $scope.files = $files;
           $scope.uploadFiles = [];
           $scope.uploadResult = [];
           $scope.correctFormat = true;
           if ($scope.files) {
               // for (var i in $scope.files) {
                   // if ($scope.files[i].type === 'image/jpeg' || $scope.files[i].type === 'image/png' || $scope.files[i].size < 600000) {
                       // $scope.correctFormat = true;
                       $scope.start(0,$index);

                   // } else {
                   //     alert('Wrong file format...');
                   //     $scope.correctFormat = true;
                   // }
               }
           };


        $scope.start = function(indexOftheFile,$index) {
           $scope.selectedItem = $index;
           $scope.fileLoading = true;
           var formData = {
               key: $scope.files[indexOftheFile].name,
               AWSAccessKeyID: 'AKIAIWGDKQ33PXY36LQA',
               acl: 'private',
               policy: 'ewogICJleHBpcmF0aW9uIjogIjIwMjAtMDEtMDFUMDA6MDA6MDBaIiwKICAiY29uZGl0aW9ucyI6IFsKICAgIHsiYnVja2V0IjogImtlaGVzamF5In0sCiAgICBbInN0YXJ0cy13aXRoIiwgIiRrZXkiLCAiIl0sCiAgICB7ImFjbCI6ICJwcml2YXRlIn0sCiAgICBbInN0YXJ0cy13aXRoIiwgIiRDb250ZW50LVR5cGUiLCAiIl0sCiAgICBbInN0YXJ0cy13aXRoIiwgIiRmaWxlbmFtZSIsICIiXSwKICAgIFsiY29udGVudC1sZW5ndGgtcmFuZ2UiLCAwLCA1MjQyODgwMDBdCiAgXQp9',
               signature: 'PLzajm+JQ9bf/rv9lZJzChPwiBc=',
               filename: $scope.files[indexOftheFile].name,
               'Content-Type': $scope.files[indexOftheFile].type
           };

           $scope.uploadFiles[indexOftheFile] = $upload.upload({
               url: 'https://kehesjay.s3-us-west-2.amazonaws.com/',
               method: 'POST',
               headers: {
                   'Content-Type': $scope.files[indexOftheFile].type
               },
               data: formData,
               file: $scope.files[indexOftheFile]
           });
           $scope.uploadFiles[indexOftheFile].then(function(response) {
               $timeout(function() {
                   //alert('uploaded');
                   var imageUrl = 'https://kehesjay.s3-us-west-2.amazonaws.com/' + $scope.files[indexOftheFile].name;
                   $scope.uploadResult.push(imageUrl);
                   console.log('upload done',$scope.uploadResult);
                   // $scope.fileUploaded = false;
                   if($scope.list.items[$scope.selectedItem].itemType === 'picture'){
                   		$scope.list.items[$scope.selectedItem].itemImageUrl = $scope.uploadResult;
                   		console.log('upload done img',$scope.uploadResult); 
	               }else{
	               			$scope.list.items[$scope.selectedItem].itemVideoUrl = $scope.uploadResult; 
	               			console.log('upload done vid',$scope.uploadResult);
	               } 
                                    
                   $scope.fileLoading = false;
               }, 2000);
           }, function(response) {
               if (response.status > 0) $scope.errorMsg = response.status + ': ' + response.data;
               alert('Connection Timed out');
           }, function(evt) {

           });

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
		function removeItemFromList(itemType)
		{
			for(var i in $scope.items)
			{
				if($scope.items[i].itemType.indexOf(itemType)===0)
					$scope.items.splice(i,1);
			}
		}
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


		// $scope.likesItem = function() {
  //           var likeitem = new LikesItem({
  //               itemId: this.item._id,
  //               choose: 'like'
  //           });
  //           //save like
  //           likeitem.$save(function(response) {
  //               $scope.item = response;
  //               $scope.liked = true;
  //           }, function(errorResponse) {
  //               $scope.likeError = errorResponse.data.message;
  //           });
  //       };



		// Update existing List
		$scope.update = function() {
			$scope.list.$update(function(response) {
				$location.path('/lists/' + $scope.list._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
			
		};


		//likeItem
		$scope.likesItem = function () {
	        var likeitem = new LikesItem({
	        itemId: this.item._id,
	        _id:$scope.list._id
	    });
	        // console.log($scope.list._id);
            //save like
            likeitem.$save(function(response) {
            	console.log(response)
                $scope.item = response;
                $scope.liked = true;
            }, function(errorResponse) {
                $scope.likeError = errorResponse.data.message;
                alert(errorResponse.data.message);
            });
            // $state.reload();
        };

		

		/************************************
		FUNCTION TO DELETE ITEM
		************************************/
		$scope.removeItem = function(i){
			$scope.list.items.splice(i, 1);
		};
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

		$scope.shareItem = function(i){
		var shareURL,url=encodeURIComponent($scope.url);
			switch(i){
				case 1:
					fBShare();
					break;
				case 2:
					shareURL="//twitter.com/intent/tweet?original_referer="+url+"&text="+$scope.itemDescription+"&tw_p=tweetbutton&url="+url;
					break;
				case 3:
					shareURL="//plus.google.com/share?url="+url
					break;
			}
			 if (shareURL)
			shareURL&&window.open(shareURL,'expressions_window',"height=250,width=600,toolbar=0,location=0")
		}
		var shortenString = function(str) {
            if (typeof str === typeof '') {
                str = str.length >= 200 ? str.substring(0, 197) + '...' : str;
                return str;
            }
            return str;
        };
        var fBShare = function() {
            //var FB = FB?FB:null;
            if(!window.FB)
                return;
            window.FB.ui({
                method: 'feed',
                link: $scope.url,
                itemImageUrl: $scope.itemImageUrl,
                caption: shortenString($scope.list.caption),
                itemDescription: shortenString($scope.itemDescription)
            });
        };
	}	
]);


