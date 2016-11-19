const express = require('express');
const router = express.Router();
const checkLogin = require('../middlewares/check').checkLogin;
const has_perm = require('../middlewares/permission').has_perm;
const responseJson = require('./utils/responseJson');

const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');


const productFindById = (id) => {
  return new Promise((resolve, reject) => {
    Product.findById(id,(err,product)=>{
      if(err){
        reject(err);
      } else{
        resolve(product);
      }
    });
  });
};
/**
 * 检查货物数量是否足够，并计算总额
 * @param  {[Array]} products [产品id 和产品数量数组]
 * @return {[Number]}          [总额]
 */
const checkNumAndgetTotalPrice = async (products) => {
  let totalPrice = 0;
  for(item of products){
    let product = await productFindById(item.product_id);
    let num = parseInt(item.number) || 1;
    if(product.number < num){
      throw Error("没有足够的货物");
    }
    totalPrice += product.price * num;
  }
  return totalPrice;
};

const userfindById = (id) => {
  return new Promise((resolve, reject) => {
    User.findById(id,(err,user)=>{
      if(err){
        reject(err);
      } else{
        resolve(user);
      }
    });
  });
};

/**
 * 检查是否足够扣费，并扣去费用
 * @param  {[Number]} id    [user id]
 * @param  {[Number]} price [price totalPrice]
 * @return {[Promise]}       [promise]
 */
const checkUserMoneyAndDeduction = async (id,price) => {
  let user = await userfindById(id);
  if(user.money < price){
    throw Error("没有足够的现金，请充值");
  } else {
    user.money -= price;
    user.save();
  }
};



/* GET Order listing. */
router.get('/', checkLogin,function(req, res) {
  Order.fetch({customer:req.session.user._id},responseJson(res));
});

//create a Order
//
//{"products":[{"product_id":"582fb74f7f7b2b13aec84b96","number":1}]}
router.post('/',has_perm('buyProduct'),function(req,res) {

  let products = req.body.products;
  let product_ids = products.map((item,index) =>{
      return item.product_id;
  });

  let jsonObj = {products:product_ids};
  jsonObj.customer = req.session.user._id;
  jsonObj.create_time = Date.now();
  jsonObj.totalPrice = 0;

  try{
    checkNumAndgetTotalPrice(products)
    .then(price=>{
      jsonObj.totalPrice = price;
      checkUserMoneyAndDeduction(req.session.user._id,price)
      .then(() =>{
        order = Order(jsonObj);
        order.save();
        products.forEach((item)=>{
          Product.findById(item.product_id)
          .then((product)=>{
            product.number -=parseInt(item.number);
            product.save();
          })
        });
        res.json({status:1,message:"成功购买产品"});
      })
      .catch(err=>{
        res.json({status:0,message:err.message});
      })
    })
  }
  catch (err) {
    res.json({status:0,message:err.message});
  };
  
});

/* GET a Order . */
router.get('/:id',checkLogin,function(req, res) {
  Order.fetchOne(req.params.id,responseJson(res));
});



module.exports = router;