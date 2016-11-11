var express = require('express');
var router = express.Router();
var has_perm = require('../middlewares/permission').has_perm;
var Comment = require('../models/Comment');

/* GET comment listing. */
router.get('/:topic_id', has_perm('回复帖'),function(req, res) {

  Comment.fetch({topic_id:req.params.topic_id},function(err, comments) {
    if(err){
      res.json({status:0,message:err.message})
    }
    else{
      res.json({status:1,json:comments});
    }
  })
});

//create a comment
router.post('/',has_perm('回复帖'),function(req,res) {
  Comment.createFromReq(req,function(err) {
    if(err){
      res.json({status:0,message:err.message});
    }
    else {
      res.json({status:1,message:"success create a comment"});
    }
  });
});

module.exports = router;