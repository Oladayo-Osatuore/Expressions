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

	//item Routes
	app.route('/lists/:listId/items')
		.post(users.requiresLogin, items.createItem);

	app.route('/lists/:listId/items/:itemId')
		.get(items.readItem)	 
		.put(users.requiresLogin, items.hasAuthorization, items.updateItem)
		.delete(users.requiresLogin, items.hasAuthorization, items.deleteItem);

	app.param('listId', lists.listByID);
	app.param('itemId', items.itemByID);
};