var express = require('express');
var router = express.Router();
var Meeting = require('../models/Meeting');
var checkLogin = require('../middlewares/check').checkLogin;
var has_perm = require('../middlewares/permission').has_perm;


/* GET Meeting listing. */
router.get('/', checkLogin,function(req, res) {

  Meeting.find({}, function(err, meetings) {
    if(err){
      res.json({status:1,message:err})
    }
    else{
      res.json(meetings);
    }
  })
});

//create a meeting
router.post('/',has_perm('发布开班会帖'),function(req,res) {
  Meeting.createFromReq(req,function(err) {
    if(err){
      res.json({status:0,message:err})
    }
    else {
      res.json({status:1,message:"success create a meeting"})
    }
  });
});

/* GET a Meeting . */
router.get('/:id',checkLogin, function(req, res) {

  Meeting.findById(req.params.id, function(err, meeting) {
    if(err){
      res.json({status:0,message:err})
    }
    else{
      res.json(meeting);
    }
  })
});

module.exports = router;