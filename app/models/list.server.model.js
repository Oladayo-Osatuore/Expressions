'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * List Schema
 */
var LikeSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    created: {
        type: Date,
        default: Date.now
    }
    //,
    // nameOfLiker: {
    //     type: String,
    //     default: '',
    //     trim: true
    // },
    // gravatarUrlLike: {
    //     type: String,
    //     default: '',
    //     trim: true
    // }
});


/**
 * Comment Schema
 */
var CommentSchema = new Schema({
    comment: {
        type: String,
        default: '',
        trim: true
    },
    creator: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    nameOfCreator: {
        type: String,
        default: '',
        trim: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    gravatarUrlComm: {
        type: String,
        default: '',
        trim: true
    },
});






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
		required: 'Item Description can not be blank',
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

	likes: [LikeSchema],
	comments: [CommentSchema]

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
		required: 'List Description can not be blank',
		trim: true

	},



	items: [ItemSchema]

});



mongoose.model('List', ListSchema);
mongoose.model('Item', ItemSchema);
mongoose.model('Comment', CommentSchema);
mongoose.model('Like', LikeSchema);



