var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

function Posts() {
  return knex('posts');
}

router.get('/', function(req, res, next) {
  Posts().select().then(function (posts) {
    res.json({'SUCCESS': posts });
  })
});

router.post('/', function(req, res, next) {
var newPost = {
  author: req.body.author,
  body: req.body.body
}
  Posts().insert(newPost).then(function (posts) {
    res.redirect('/');
  })
});

router.get('/:id', function(req, res, next) {
  Posts().where('id', req.params.id).first().then(function (post) {
    res.json({'SUCCESS': post});
  })
});

router.get('/:id/edit', function(req, res, next) {
  Posts().where('id', req.params.id).first().then(function (posts) {
    res.json({'SUCCESS': 'This is the edit page'});
  })
});

router.post('/:id', function(req, res) {
  Posts().where('id', req.params.id).update(req.body).then(function (posts) {
  res.redirect('/');
  })
});

router.post('/:id/delete', function(req, res, next) {
  Posts().where('id', req.params.id).del().then(function (posts) {
  res.redirect('/');
  })
});

module.exports = router;
