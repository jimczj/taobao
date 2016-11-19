var express = require('express');
var router = express.Router();
var checkLogin = require('../middlewares/check').checkLogin;
var has_perm = require('../middlewares/permission').has_perm;
var responseJson = require('./utils/responseJson');

var Order = require('../models/Order');
var User = require('../models/User');
var Product = require('../models/Product');

/* GET Order listing. */
router.get('/', checkLogin,function(req, res) {
  Order.fetch({customer:req.session.user._id},responseJson(res));
});

//create a Order
router.post('/',has_perm('buyProduct'),function(req,res) {
  let jsonObj = req.body.products;

  jsonObj.customer = req.session.user._id;
  jsonObj.create_time = Date.now();

  jsonObj.totalPrice = 0;
  jsonObj.products.forEach((id)=>{
    Product.findById(id)
    .then((product)=>{
      jsonObj.totalPrice += product.price
    })
    .catch((err)=>{
      return res.json({status:0,message:err.message});
    })
  })
   
  User.findById(req.session.user._id)
  .then((user)=>{
    if(user.money < jsonObj.totalPrice){
      throw Error("没有足够的现金，请充值");
    } else {
      order = Order(jsonObj);
      order.save()
      .then(()=>{
        user.money-=jsonObj.totalPrice;
        user.save();
        res.json({status:1,message:"成功购买产品"});
      })
      .catch((err)=>{
        res.json({status:1,message:"购买产品失败"})
      })
    }
  })
  .catch((err)=>{
    return res.json({status:0,message:err.message});
  });
  
});

/* GET a Order . */
router.get('/:id',checkLogin,function(req, res) {
  Order.fetchOne(req.params.id,responseJson(res));
});



module.exports = router;