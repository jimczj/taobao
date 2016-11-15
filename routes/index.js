var express = require('express');
var User = require('../models/User');
var sha1 = require('sha1');
var checkLogin = require('../middlewares/check').checkLogin;
var CheckIn = require('../models/CheckIn');
var ClassMoney =  require('../models/ClassMoney');
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
    if(err||!user){
      res.json({status:0,message:'该用户不存在'});
    }
    else{
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

/* GET a user reporting. */
router.get('/reporting',checkLogin, function(req, res) {
  let id = req.session.user._id;
  let resJson = {
    truancy_day:0,
    truancy_times:0,
    payed_money:0,
    unpayed_money:0
  };
  CheckIn.find({truancy_student:id})
    .then((json)=>{
      //旷课次数
      resJson.truancy_times = json.length;

      let truancy_set = new Set();
      json.forEach((item) =>{
        truancy_set.add(item.missing_date.toLocaleDateString());
      });
      //旷课天数
      resJson.truancy_day = truancy_set.size;

      ClassMoney.find({payed_members:id})
      .then((json2)=>{
        json2.forEach((item) =>{
          // 总缴费金额
          resJson.payed_money+=item.howmuch;
        });
        ClassMoney.find({unpayed_members:id})
        .then((json3)=>{
          json3.forEach((item) =>{
            // 总欠费金额
            resJson.unpayed_money+=item.howmuch;
          });
          res.json({status:1,json:resJson})
        })
      })
  }).catch((err)=>{
    res.json({status:0,message:err.message});
  });
});

module.exports = router;
