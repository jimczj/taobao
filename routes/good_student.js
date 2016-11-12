var express = require('express');
var router = express.Router();
var checkLogin = require('../middlewares/check').checkLogin;
var has_perm = require('../middlewares/permission').has_perm;
var GoodStudent = require('../models/GoodStudent');
var responseJson = require('./utils/responseJson');
/* GET GoodStudent listing. */
router.get('/', checkLogin,function(req, res) {
  GoodStudent.fetch({},responseJson(res));
});

//create a GoodStudent
router.post('/',has_perm('评优等生帖'),function(req,res) {
  GoodStudent.createFromReq(req,responseJson(res,"success create a good student"));
});

/* GET a GoodStudent . */
router.get('/:id',checkLogin,function(req, res) {
  GoodStudent.fetchOne(req.params.id,responseJson(res));
});

module.exports = router;