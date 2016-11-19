const express = require('express');
const router = express.Router();
const checkLogin = require('../middlewares/check').checkLogin;
const has_perm = require('../middlewares/permission').has_perm;
const Product = require('../models/Product');
const responseJson = require('./utils/responseJson');
/* GET Product listing. */
router.get('/', checkLogin,function(req, res) {
  Product.fetch({},responseJson(res));
});

//create a Product
router.post('/',has_perm('addProduct'),function(req,res) {
  Product.createFromReq(req,responseJson(res,"成功添加产品"));
});

/* GET a Product . */
router.get('/:id',checkLogin,function(req, res) {
  Product.fetchOne(req.params.id,responseJson(res));
});

/* delete a Product . */
router.delete('/:id',has_perm('deleteProduct'),function(req, res) {
  Product.findByIdAndRemove(req.params.id,responseJson(res,"成功删除产品"));
});

/* update a Product . */
router.put('/:id',has_perm('updateProduct'),function(req, res) {
  Product.updateByIdFromReq(req,responseJson(res,"成功更新产品"));
});
module.exports = router;