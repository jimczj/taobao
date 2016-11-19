var Role = require('../Role');
var User = require('../User');
var mongoose = require('mongoose');
var config = require('../../config');

mongoose.connect(config.mongodb);


let customer = Role({
  role_name: 'customer',
  role_rights: ['buyProduct']
})
customer.save(function(err) {
  if (err) {
    console.log("create role leader success");
  } else {
    console.log("create role leader fail")
  }
});

let root = Role({
  role_name: 'root',
  role_rights: ['addProduct', 'deleteProduct', 'updateProduct'],
})
root.save(function(err) {
  if (err) {
    console.log("create role competitive_person success");
  } else {
    console.log("create role competitive_person fail")
  }
});


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

mongoose.disconnect(()=>{
  console.log('完成初始化');
})