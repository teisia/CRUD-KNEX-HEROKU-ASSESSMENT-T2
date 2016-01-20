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

module.exports = router;
