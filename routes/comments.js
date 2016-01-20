var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

function Posts() {
  return knex('posts');
}

function Comments() {
  return knex('comments');
}

router.get('/:post_id/comments', function(req, res) {
  Comments().where('post_id', req.params.post_id).then(function (comments) {
    res.json({'SUCCESS': 'This is the comments page'});
  })
});

router.post('/:post_id/comments', function(req, res) {
var newComment = {
  post_id: req.params.post_id,
  commenter: req.params.commenter,
  body: req.body.body
}
  Comments().insert(newComment).then(function (comment) {
    res.redirect('/'+req.params.post_id+'/comments');
  })
});

router.get('/:post_id/comments/:comment_id', function(req, res) {
  Comments().where('post_id', req.params.post_id).first().then(function (post) {
    Comments().where('id', req.params.comment_id).then(function (comment) {
      res.json({'SUCCESS': 'This is the individual comment page'});
    })
  })
});

router.get('/:post_id/comments/:comment_id/edit', function(req, res) {
  Comments().where('post_id', req.params.post_id).first().then(function (post) {
    Comments().where('id', req.params.comment_id).then(function (comment) {
      res.json({'SUCCESS': 'This is the edit comments page'});
    })
  })
});

router.post('/:post_id/comments/:comment_id', function(req, res) {
  Comments().where('post_id', req.params.post_id).first().then(function (post) {
    Comments().where('id', req.params.comment_id).then(function (comment) {
      res.redirect('/'+req.params.post_id+'/comments');
    })
  })
});


module.exports = router;
