var express = require('express');
var router = express.Router();
var ClassMoney = require('../models/ClassMoney');
var checkLogin = require('../middlewares/check').checkLogin;
var has_perm = require('../middlewares/permission').has_perm;

/* GET ClassMoney listing. */
router.get('/', checkLogin,function(req, res) {

  ClassMoney.find({}, function(err, classMoneys) {
    if(err){
      res.json({status:0,message:err})
    }
    else{
      res.json(classMoneys);
    }
  })
});

//create a ClassMoney
router.post('/',has_perm('收班费帖'),function(req,res) {
  ClassMoney.createFromReq(req,function(err) {
    if(err){
      res.json({status:0,message:err})
    }
    else {
      res.json({status:1,message:"success create a meeting"})
    }
  });
});

/* GET a Meeting . */
router.get('/:id', checkLogin, function(req, res) {

  ClassMoney.findById(req.params.id, function(err, classMoney) {
    if(err){
      res.json({status:0,message:err})
    }
    else{
      res.json(classMoney);
    }
  })
});

module.exports = router;