'use strict';

//LikesPoem service used to communicate Poems REST endpoints
angular.module('items').factory('LikesItem', ['$resource',
	function($resource) {
		return $resource('lists/:listId/items/:itemId/:choose', {}, {
			save: {
				method: 'POST', params: {choose: 'like', itemId: '@itemId'}
			},
			unsave: {
				method: 'DELETE', params: {choose: 'unlike', itemId: '@itemId'}
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