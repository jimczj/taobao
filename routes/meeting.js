var express = require('express');
var router = express.Router();
var Meeting = require('../models/Meeting');
var checkLogin = require('../middlewares/check').checkLogin;
var has_perm = require('../middlewares/permission').has_perm;
var responseJson = require('./utils/responseJson');


/* GET Meeting listing. */
router.get('/', checkLogin,function(req, res) {
  Meeting.fetch({},responseJson(res));
});

//create a meeting
router.post('/',has_perm('发布开班会帖'),function(req,res) {
  Meeting.createFromReq(req,responseJson(res,'success create a meeting'));
});
//同意开班会
router.put('/:id/agree',checkLogin, function(req, res) {

  Meeting.findById(req.params.id, function(err, meeting) {
    if(err){
      res.json({status:0,message:err.message})
    }
    else{
      meeting.agree(req.session.user._id,(err)=>{
        if(err){
          res.json({status:0,message:err.message})
        }else {
          res.json({status:1,message:'已同意开班会'})
        }
      })
    }
  })
});

//不同意开班会
router.put('/:id/disagree',checkLogin, function(req, res) {

  Meeting.findById(req.params.id, function(err, meeting) {
    if(err){
      res.json({status:0,message:err.message})
    }
    else{
      meeting.disagree(req.session.user._id,(err)=>{
        if(err){
          res.json({status:0,message:err.message})
        }else {
          res.json({status:1,message:'已不同意开班会'})
        }
      })
    }
  })
});

/* GET a Meeting . */
router.get('/:id',checkLogin, function(req, res) {

  Meeting.fetchOne(req.params.id,responseJson(res))
});

module.exports = router;