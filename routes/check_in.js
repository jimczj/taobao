var express = require('express');
var router = express.Router();
var CheckIn = require('../models/CheckIn');

/* GET CheckIn listing. */
router.get('/', function(req, res) {

  CheckIn.find({}, function(err, checkIns) {
    if(err){
      res.json({status:1,message:err})
    }
    else{
      res.json(checkIns);
    }
  })
});

//create a CheckIn
router.post('/',function(req,res) {
  CheckIn.createFromReq(req,function(err) {
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

  CheckIn.findById(req.params.id, function(err, checkIn) {
    if(err){
      res.json({status:0,message:err})
    }
    else{
      res.json(checkIn);
    }
  })
});

module.exports = router;