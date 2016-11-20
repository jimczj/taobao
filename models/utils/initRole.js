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
    console.log("create role customer success");
  } else {
    console.log("create role customer fail")
  }
});

let root = Role({
  role_name: 'root',
  role_rights: ['addProduct', 'deleteProduct', 'updateProduct'],
})
root.save(function(err) {
  if (err) {
    console.log("create role root success");
  } else {
    console.log("create role root fail")
  }
});




// mongoose.disconnect(()=>{
//   console.log('完成初始化');
// })