var express = require('express');
var router = express.Router();
var ClassMoney = require('../models/ClassMoney');
var checkLogin = require('../middlewares/check').checkLogin;
var has_perm = require('../middlewares/permission').has_perm;
var responseJson = require('./utils/responseJson');

/* GET ClassMoney listing. */
router.get('/', checkLogin,function(req, res) {

  ClassMoney.fetch({},responseJson(res));
});

//create a ClassMoney
router.post('/',has_perm('收班费帖'),function(req,res) {
  ClassMoney.createFromReq(req,responseJson(res,"success create a meeting"));
});

/* GET a ClassMoney . */
router.get('/:id', checkLogin, function(req, res) {

  ClassMoney.fetchOne(req.params.id,responseJson(res));
});

module.exports = router;