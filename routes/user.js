var express = require('express');
var router = express.Router();
var checkLogin = require('../middlewares/check').checkLogin;
var User = require('../models/User');
var responseJson = require('./utils/responseJson');



/* GET user list. checkLogin*/
router.get('/',function(req, res) {

  User.fetch({},responseJson(res));
});

/* GET a user by id. */
router.get('/:id', function(req, res) {
  User.fetchById(req.params.id,responseJson(res));
});


// 包括总缴费金额、总欠费金额）、考勤情况表（包括旷课总数、旷课天数）。

//delete a user by id
// router.delete('/:id',function(req,res) {
//   User.findByIdAndRemove(req.params.id, function(err) {
//     if (err){
//       res.json({status:0,message:err.message});
//     }
//     else{
//       res.json({status:1,message:'success'});
//     }
//   });
// })

// //update a user by id
// router.put('/:id',function(req,res) {
 
//   User.updateByIdFromReq(req, function(err, user) {
//     if (err){
//       res.json({status:0,message:err.message});
//     }
//     else{
//       res.json({status:1,message:'success'});
//     }
//   });
// })
module.exports = router;
