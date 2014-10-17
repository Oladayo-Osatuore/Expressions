'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * List Schema
 */


var ItemSchema = new Schema({
	itemType: {
		type: String,
		enum : ['text', 'video', 'picture'],
		required: 'category can only be text, picture or video and not blank',
		trim : true
	},
	itemTitle: {
		type: String,
		required: 'Title can not be blank',
		trim: true
	},
	
	itemImageUrl:{
		type: String,
		trim: true,
		default: ''

	},
	itemVideoUrl:{
		type: String,
		trim: true,
		default: ''

	},
	itemDescription:{
		type: String,
		required: 'Description can not be blank',
		trim: true

	},

	
	created: {
		type: Date,
		default: Date.now
	},

	itemUser: {
		type: Schema.ObjectId,
		ref: 'User'
	},

});

var ListSchema = new Schema({
	caption: {
		type: String,
		required: 'Caption can not be blank',
		trim: true
	},

	created: {
		type: Date,
		default: Date.now
	},

	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},

	description:{
		type: String,
		required: 'Description can not be blank',
		trim: true

	},



	items: [ItemSchema]

});



mongoose.model('List', ListSchema);
mongoose.model('Item', ItemSchema);
