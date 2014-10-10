'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var lists = require('../../app/controllers/lists');
	var items = require('../../app/controllers/items');

	// Lists Routes
	app.route('/lists')
		.get(lists.list)
		.post(users.requiresLogin, lists.create);

	app.route('/lists/:listId')
		.get(lists.read)
		.put(users.requiresLogin, lists.hasAuthorization, lists.update)
		.delete(users.requiresLogin, lists.hasAuthorization, lists.delete);

	//Items Routes
	app.route('/lists/:listId/items')
		.get(items.item)
		.post(users.requiresLogin, items.createItem);

	app.route('/lists/:listId/items/:itemId')
		.get(items.readItem)
		.put(users.requiresLogin, items.hasAuthorization, items.updateItem)
		.delete(users.requiresLogin, items.hasAuthorization, items.deleteItem);

	// Finish by binding the List middleware
	app.param('listId', lists.listByID);
	app.param('itemId', items.itemByID);
};