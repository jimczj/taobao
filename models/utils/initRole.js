var Role = require('../Role');
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




mongoose.disconnect(()=>{
  console.log('完成初始化');
})