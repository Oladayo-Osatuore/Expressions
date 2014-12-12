'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors'),
    List = mongoose.model('List'),
    // like = mongoose.model('Like'),
    _ = require('lodash');
var lists = require('../../app/controllers/lists');
// var comments = require('../../app/controllers/comments');



exports.hasAuthorization = function(req, res, next) {
  if (req.list.user.id !== req.user.id) {
    return res.status(403).send('User is not authorized');
  }
  next();
};

exports.getLikeCount = function(req, res){
    var item = req.item;
    var likeCount = item.likes.length;
    return res.jsonp({count:likeCount}); 
};

exports.likeItem = function(req, res) {
    var item = req.item,
        list = req.list,
        like = {};
    like.user = req.user;
    //like.nameOfLiker = req.user.displayName;
    //like.gravatarUrlLike = req.user.gravatar;
    var Liked = false;

    // if (req.user.id === item.user._id.toString()) { 
    //     return res.send(400, {
    //            message: 'You cannot like your own expression'
    //     });
    // } else {
    for (var i = 0; i < item.likes.length; i++) {
        if (req.user.id === item.likes[i].user.toString()) {
            Liked = true;
            break;
        }
    }
    if (!Liked) {
        item.likes.push(like);
        item.save(function(err) {
            if (err) {
                return res.send(400, {
                    message: ''
                });
            } else {

                list.save(function(err) {
                    if (err)
                        return res.send(400, {
                            message: ''
                        });
                    else
                        return res.jsonp(list);
                    console.log(item);
                });
            }
        });
    } else {
        return res.send(400, {
            message: 'you have already liked this expression before'
        });
    }
    // }

};
