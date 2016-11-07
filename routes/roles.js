var express = require('express');
var router = express.Router();
var Role = require('../models/role');


/* GET role listing. */
router.get('/', function(req, res) {

  Role.find({}, function(err, roles) {
    if(err) throw err;
    res.json(roles)
  })
});
/* GET role . */
router.get('/:id', function(req, res) {
  Role.findById(req.params.id,function(err,role){
    if(err) throw err;
    res.json(role)
  });
  
});
// add a Role
router.post('/',function(req,res) {
  var role = Role(req.body);
  Role.save(function(err){
    if(err) throw err;
    res.json({status:1,message:'success'});
  });

})


//delete a Role
router.delete('/:id',function(req,res) {
  Role.findByIdAndRemove(req.params.id, function(err) {
    if(err) throw err;
    res.json({status:1,message:'success'});
  });
})

//update a Role
router.put('/:id',function(req,res) {
  const RoleObj = {
    Rolename:req.body.Rolename,
    email:req.body.email,
    // sex:req.body.sex,
    // age:req.body.age,
    // class:req.body.class,
    password:req.body.password
  };
  Role.findByIdAndUpdate(req.params.id,RoleObj, function(err, Role) {
    if (err) throw err;
    res.json({status:1,message:'success'});
  });
})
module.exports = router;
