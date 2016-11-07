var express = require('express');
var router = express.Router();
var ClassMoney = require('../models/ClassMoney');

/* GET ClassMoney listing. */
router.get('/', function(req, res) {

  ClassMoney.find({}, function(err, classMoneys) {
    if(err){
      res.json({status:1,message:err})
    }
    else{
      res.json(classMoneys);
    }
  })
});

//create a ClassMoney
router.post('/',function(req,res) {
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
router.get('/:id', function(req, res) {

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