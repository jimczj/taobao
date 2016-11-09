var express = require('express');
var router = express.Router();
var checkLogin = require('../middlewares/check').checkLogin;
var has_perm = require('../middlewares/permission').has_perm;
var GoodStudent = require('../models/GoodStudent');

/* GET GoodStudent listing. */
router.get('/', checkLogin,function(req, res) {

  GoodStudent.find({},function(err, goodStudents) {
    if(err){
      res.json({status:0,message:err.message})
    }
    else{
      res.json({status:1,json:goodStudents});
    }
  })
});

//create a GoodStudent
router.post('/',has_perm('评优等生帖'),function(req,res) {
  GoodStudent.createFromReq(req,function(err) {
    if(err){
      res.json({status:0,message:err.message})
    }
    else {
      res.json({status:1,message:"success create a good student"})
    }
  });
});

/* GET a GoodStudent . */
router.get('/:id',checkLogin,function(req, res) {

  GoodStudent.findById(req.params.id, function(err, goodStudent) {
    if(err){
      res.json({status:0,message:err.message})
    }
    else{
      res.json({status:1,json:goodStudent});
    }
  })
});

module.exports = router;