var express = require('express');
var User = require('../models/user');
var sha1 = require('sha1');
var checkLogin = require('../middlewares/check').checkLogin;
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});
//登录
router.post('/login', function(req, res) {
  if(!req.body.username){
    res.json({status:0,message:'user name is required'});
  }
  if(!req.body.password){
    res.json({status:0,message:'password is required'});  
  }
  User.findOne({username:req.body.username},function(err,user){
    if(err){
      res.json({status:0,message:'该用户不存在'});
    }
    else{
      if(user.password === sha1(req.body.password)){
        req.session.user = user;
        res.json({status:1,message:'success login'});
      }
      else{
        res.json({status:0,message:'password error'});
      }
    }
  });
});
// 退出
router.get('/signout', checkLogin, function(req, res) {
  // 清空 session 中用户信息
  req.session.user = null;
  res.json({status:1,message:'退出成功'});
});
module.exports = router;
