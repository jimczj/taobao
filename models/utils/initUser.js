var Role = require('../Role');
var User = require('../User');
var mongoose = require('mongoose');
var config = require('../../config');

mongoose.connect(config.mongodb);

Role.findOne({
  role_name: 'root'
}, function(err, role) {
  if (err) {
    console.log(err)
  } else {
    let user = User({
      username: 'root',
      password: 'root',
      role_id: role._id,
    });
    user.save(function(err) {
      if (err) {
        console.log("create root user fail")
      } else {
        console.log("create root user success")
      }
    });
  }
});


Role.findOne({
  role_name: 'customer'
}, function(err, role) {
  if (err) {
    console.log(err)
  } else {
    let user = User({
      username: 'customer',
      password: 'customer',
      role_id: role._id,
    });
    user.save(function(err) {
      if (err) {
        console.log("create customer user fail")
      } else {
        console.log("create customer user success")
      }
    });
  }
});

Role.findOne({
  role_name: 'customer'
}, function(err, role) {
  if (err) {
    console.log(err)
  } else {
    let user = User({
      username: 'user',
      password: 'user',
      money: 99999999,
      role_id: role._id,
    });
    user.save(function(err) {
      if (err) {
        console.log("create supercustomer user fail")
      } else {
        console.log("create supercustomer user success")
      }
    });
  }
});

// mongoose.disconnect(()=>{
//   console.log('完成初始化');
// })