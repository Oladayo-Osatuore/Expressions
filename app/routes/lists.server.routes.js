'use strict';

module.exports = function(app) {
    var users = require('../../app/controllers/users');
    var lists = require('../../app/controllers/lists');
    var items = require('../../app/controllers/items');
    // var comments = require('../../app/controllers/comments');
    var likes = require('../../app/controllers/likes');

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
        .get(items.readItem, likes.likeItem)
        .put(users.requiresLogin, items.hasAuthorization, items.updateItem)
        .delete(users.requiresLogin, items.hasAuthorization, items.deleteItem);

    // comment routes

    // app.route('/lists/:listId/items/:itemId/comments')
    // 	.post(users.requiresLogin, comments.createComment)

    // app.route('/lists/:listId/comments/:commentId')
    // 	.delete(users.requiresLogin, comments.hasAuthorization, comments.deleteComment);


    // like route

    app.route('/lists/:listId/items/:itemId/like')
        .post(users.requiresLogin, likes.likeItem);

    app.route('/lists/:listId/items/:itemId/getLikeCount')
        .get(users.requiresLogin, likes.getLikeCount);    



    // app.route('/lists/:listId/items/:itemId/unlike')
    // 	.post(users.requiresLogin, likes.unlikeItem);



    // app.route('/lists/:listId/items/:itemId/comments')
    // 	.post(users.requiresLogin, likes.likeComment);


    // app.route('/lists/:listId/items/:itemId/comments/:commentId/unlike')
    // 	.post(users.requiresLogin, likes.unlikeComment);



    app.param('listId', lists.listByID);
    app.param('itemId', items.itemByID);
};
