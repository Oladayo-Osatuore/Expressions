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
	_type: {
		type: String,
		enum : ['text', 'video', 'picture'],
		required: 'category can only be text, picture or video and not blank',
		trim : true
	},
	title: {
		type: String,
		required: 'Title can not be blank',
		trim: true
	},
	image_url:{
		type: String,
		trim: true,
		default: ''

	},
	video_url:{
		type: String,
		trim: true,
		default: ''

	},
	description:{
		type: String,
		required: 'Description can not be blank',
		trim: true

	},
	itemMaker: {
		type: Schema.ObjectId,
		ref: 'User'
	}


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

	item: [ItemSchema]

});





mongoose.model('List', ListSchema);
