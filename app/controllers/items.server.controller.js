'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	List = mongoose.model('List'),
	Item = mongoose.model('Item'),
	_ = require('lodash');
var lists = require('../../app/controllers/lists');


exports.createItem = function(req, res) {
	var item = new Item(req.body);
	var list = req.list;
	console.log(req.user);
	item.itemMaker = req.user;
	list.item.unshift(item);


	list.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			
	        res.jsonp(list);
	    }         
	});
	// console.log(list);
};

/**
 * Show the current List
 */
exports.readItem = function(req, res) {
	res.jsonp(req.lists.item);
};

/**
 * Update a List
 */
exports.updateItem = function(req, res) {
	var item = req.item;
	var list = req.list;
	item = _.extend(item , req.body);

	list.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(item);
		}
	});
};

/**
 * Delete an List
 */
exports.deleteItem = function(req, res) {
	var item = req.item ;
	var list = req.list;
	var message = '';

	console.log(item);


	item.remove();

	list.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} 
		else {
			res.jsonp(list, {message: 'Your item has been deleted'});
		}
	});
	// console.log(list);
};


/**
* List of Items
*/
exports.readItem = function(req, res) { 
	res.jsonp(req.item);
};

/**
 * List middleware
 */
exports.itemByID = function(req, res, next, id) { 
	var list = req.list;
	req.item = list.item.id(id);
	next();
};

// Item.find({}).populate('comments.created_by').exec(function(err, items) {
//     console.log(list[0].items[0].created_by.name);
// });
/**
 * List authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.list.user._id.toString() !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};