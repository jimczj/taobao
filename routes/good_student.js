var express = require('express');
var router = express.Router();
var GoodStudent = require('../models/GoodStudent');

/* GET GoodStudent listing. */
router.get('/', function(req, res) {

  GoodStudent.find({}, function(err, goodStudents) {
    if(err){
      res.json({status:1,message:err})
    }
    else{
      res.json(goodStudents);
    }
  })
});

//create a ClassMoney
router.post('/',function(req,res) {
  GoodStudent.createFromReq(req,function(err) {
    if(err){
      res.json({status:0,message:err})
    }
    else {
      res.json({status:1,message:"success create a good student"})
    }
  });
});

/* GET a Meeting . */
router.get('/:id', function(req, res) {

  GoodStudent.findById(req.params.id, function(err, goodStudent) {
    if(err){
      res.json({status:0,message:err})
    }
    else{
      res.json(goodStudent);
    }
  })
});

module.exports = router;