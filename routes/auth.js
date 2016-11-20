var express = require('express');
var User = require('../models/User');
var sha1 = require('sha1');
var checkLogin = require('../middlewares/check').checkLogin;
var router = express.Router();

//登录
router.post('/login', function(req, res) {
  if(!req.body.username){
    res.json({status:0,message:'user name is required'});
  }
  if(!req.body.password){
    res.json({status:0,message:'password is required'});  
  }
  User.fetch({username:req.body.username},function(err,users){
    if(err||!users){
      res.json({status:0,message:'该用户不存在'});
    }
    else{
      let user = users[0];

      if(user.password === sha1(req.body.password)){
        req.session.user = user;
        user.password ='';
        res.json({status:1,message:'success login',user:user});
      }
      else{
        res.json({status:0,message:'password error'});
      }
    }
  });
});

// register a user
router.post('/register',function(req,res) {

  User.createFromReq(req,function(err){
    if (err){
      res.json({status:0,message:err.message});
    }
    else{
      res.json({status:1,message:'success'});
    }
  });
})

// 退出
router.get('/signout', checkLogin, function(req, res) {
  // 清空 session 中用户信息
  req.session.user = null;
  res.json({status:1,message:'退出成功'});
});



module.exports = router;
