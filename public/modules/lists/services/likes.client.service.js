'use strict';

//LikesPoem service used to communicate Poems REST endpoints
angular.module('lists').factory('LikesItem', ['$resource',
	function($resource) {
		return $resource('lists/:listId/items/:itemId/like', { itemId: '@itemId', listId: '@_id'}, {
			// save: {
			// 	method: 'POST', params: {listId: '@listId', itemId: '@_id'}
			// }
			// // unsave: {
			// 	method: 'DELETE', params: {choose: 'unlike', itemId: '@itemId', listId: '@_id'}
			// }
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