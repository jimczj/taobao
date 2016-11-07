var express = require('express');
var router = express.Router();
var Role = require('../models/Role');


// /* GET role listing. */
router.get('/', function(req, res) {

  Role.find({}, function(err, roles) {
    if(err) {
      res.json({status:0,message:err});
    }
    else{
      res.json(roles)
    }
  })
});
// /* GET role . */
// router.get('/:id', function(req, res) {
//   Role.findById(req.params.id,function(err,role){
//     if(err) {
//       res.json({status:0,message:err});
//     }
//     else{
//       res.json(role)
//     }
//   });
  
// });
// // add a Role
// router.post('/',function(req,res) {
//   Role.createFromReq(req,function(err){
//     if(err) {
//       res.json({status:0,message:err});
//     }
//     else{
//       res.json({status:1,message:'success'});
//     }
//   });
// })


// //delete a Role
// router.delete('/:id',function(req,res) {
//   Role.findByIdAndRemove(req.params.id, function(err) {
//     if(err) {
//       res.json({status:0,message:err});
//     }
//     else {
//       res.json({status:1,message:'success'});
//     }
//   });
// })

module.exports = router;
