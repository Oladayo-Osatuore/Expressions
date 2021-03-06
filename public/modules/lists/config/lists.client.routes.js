'use strict';

//Setting up route
angular.module('lists').config(['$stateProvider',
	function($stateProvider) {
		// Lists state routing
		$stateProvider.
		state('listLists', {
			url: '/lists',
			templateUrl: 'modules/lists/views/list-lists.client.view.html'
		}).
		state('createList', {
			url: '/lists/create',
			templateUrl: 'modules/lists/views/create-list.client.view.html'
		}).
		state('viewList', {
			url: '/lists/:listId',
			templateUrl: 'modules/lists/views/view-list.client.view.html'
		}).
		state('editList', {
			url: '/lists/:listId/edit',
			templateUrl: 'modules/lists/views/edit-list.client.view.html'
		}).
		state('createItem', {
			url: 'lists/:listId/addItem',
			templateUrl: 'modules/lists/views/create-item.client.view.html'
		}).
		state('likesItem', {
			url: 'lists/:listId/items/:itemId/like',
			templateUrl: 'modules/lists/views/view-list.client.view.html'
		}).
		state('getLikeCount', {
			url: 'lists/:listId/items/:itemId/getLikeCount',
			templateUrl: 'modules/lists/views/view-list.client.view.html'
		});
	}
]);

