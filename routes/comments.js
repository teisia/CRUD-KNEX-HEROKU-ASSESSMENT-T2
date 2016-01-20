var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

function Posts() {
  return knex('posts');
}

function Comments() {
  return knex('comments');
}

router.get('/:post_id/comments', function(req, res, next) {
  Comments().where('id', req.params.id).then(function (comments) {
    res.json({'SUCCESS': comments});
  })
});

router.post('/:post_id/comments', function(req, res, next) {
var newComment = {
  post_id: req.params.post_id,
  commenter: req.params.commenter,
  body: req.body.body
}
  Comments().insert(newComment).then(function (comment) {
    res.redirect('/'+req.params.post_id+'/comments');
  })
});

module.exports = router;
