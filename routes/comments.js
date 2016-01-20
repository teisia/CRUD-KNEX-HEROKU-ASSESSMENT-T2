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
    res.json({'SUCCESS': comments});
  })
});

router.post('/:post_id/comments', function(req, res) {
var newComment = {
  post_id: req.params.post_id,
  commenter: req.params.commenter,
  body: req.body.body
}
  Comments().insert(newComment).then(function (comment) {
    res.redirect('/posts/'+req.params.post_id+'/comments');
  })
});

router.get('/:post_id/comments/:comment_id', function(req, res) {
  Comments().where('post_id', req.params.post_id).first().then(function (comment) {
    Comments().where('id', req.params.comment_id).then(function (comments) {
      res.json({'SUCCESS': comment});
    })
  })
});

router.get('/:post_id/comments/:comment_id/edit', function(req, res) {
  Comments().where('post_id', req.params.post_id).first().then(function (comment) {
    Comments().where('id', req.params.comment_id).then(function (comments) {
      res.json({'SUCCESS': comment});
    })
  })
});

router.post('/:post_id/comments/:comment_id', function(req, res) {
  Comments().where('post_id', req.params.post_id).first().then(function (post) {
    Comments().where('id', req.params.comment_id).then(function (comment) {
      res.redirect('/posts/'+req.params.post_id+'/comments');
    })
  })
});

router.post('/:post_id/comments/:comment_id/delete', function(req, res) {
  Comments().where('post_id', req.params.post_id).first().then(function (post) {
    Comments().where('id', req.params.comment_id).del().then(function (comment) {
      res.redirect('/posts/'+req.params.post_id+'/comments');
    })
  })
});


module.exports = router;
