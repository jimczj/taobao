var express = require('express');
var router = express.Router();
var User = require('../models/User')


/* GET user list. */
router.get('/', function(req, res) {

  User.fetchUsers(function(err, users) {
    if (err){
      res.json({status:0,message:err});
    }
    else{
      res.json(users);
    }
  })
});
/* GET a user by id. */
router.get('/:id', function(req, res) {
  User.fetchById(req.params.id,function(err,user){
    if (err){
      res.json({status:0,message:err});
    }
    else{
      res.json(user);
    }
  });
});
// create a user
router.post('/',function(req,res) {

  User.createFromReq(req,function(err){
    if (err){
      res.json({status:0,message:err});
    }
    else{
      res.json({status:1,message:'success'});
    }
  });

})

//delete a user by id
router.delete('/:id',function(req,res) {
  User.findByIdAndRemove(req.params.id, function(err) {
    if (err){
      res.json({status:0,message:err});
    }
    else{
      res.json({status:1,message:'success'});
    }
  });
})

//update a user by id
router.put('/:id',function(req,res) {
 
  User.updateByIdFromReq(req, function(err, user) {
    if (err){
      res.json({status:0,message:err});
    }
    else{
      res.json({status:1,message:'success'});
    }
  });
})
module.exports = router;
