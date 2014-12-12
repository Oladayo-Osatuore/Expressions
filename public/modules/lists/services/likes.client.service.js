'use strict';

//LikesPoem service used to communicate Poems REST endpoints
angular.module('lists').factory('Likes', ['$resource',
	function($resource) {
		return $resource('lists/:listId/items/:itemId/like', { itemId: '@itemId', listId: '@_id'}, {
			
			// get: {
			// 	method: 'GET', params: {listId: '@listId', itemId: '@_id'}
			// }
			// // unsave: {
			// 	method: 'DELETE', params: {choose: 'unlike', itemId: '@itemId', listId: '@_id'}
			// }
		});
	}
]);


angular.module('lists').factory('Items', ['$resource',
	function($resource) {
		return $resource('/lists/:listId/items/:itemId'/'getLikeCount', { listId:'@list', itemId: '@_id'
		}, {
			update: {
				method: 'GET'
			}
		});
	}
]);



//LikesComment service used to communicate Poems REST endpoints
// angular.module('poems').factory('LikesComment', ['$resource',
// 	function($resource) {
// 		return $resource('poems/:poemId/comments/:commentId/:choose', {}, {
// 			save: {
// 				method: 'POST', params: {choose: 'like', poemId: '@poemId', commentId:'@_id'}
// 			},
// 			unsave: {
// 				method: 'DELETE', params: {choose: 'unlike',  poemId: '@poemId', commentId:'@_id'}
// 			}
// 		});
// 	}
// ]);