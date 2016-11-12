var express = require('express');
var router = express.Router();
var has_perm = require('../middlewares/permission').has_perm;
var Comment = require('../models/Comment');
var responseJson = require('./utils/responseJson');

/* GET comment listing. */
router.get('/:topic_id', has_perm('回复帖'),function(req, res) {
  Comment.fetch({topic_id:req.params.topic_id},responseJson(res))
});

//create a comment
router.post('/',has_perm('回复帖'),function(req,res) {
  Comment.createFromReq(req,responseJson(res,"success create a comment"));
});

module.exports = router;