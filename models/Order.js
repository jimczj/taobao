var mongoose = require('mongoose');
var getJsonFromReq = require('./utils/getJsonFromReq');
var User = require('../models/User');
var Product = require('../models/Product');
var Schema = mongoose.Schema;


var OrderSchema = new Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },//购买者
  products: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Product'
  },//所购买到产品
  totalPrice: {
    type: Number,
    required: true
  },//总价格
  create_time: {
    type: Date
  },
});

OrderSchema.statics = {
  fetchOne: function(id, cb) {
    return Order.findById(id)
      .populate('customer')
      .populate('products')
      .exec(cb);
  },
  fetch: function(json, cb) {
    return Order.find(json)
      .sort({
        '_id': -1
      })
      .populate('customer')
      .populate('products')
      .exec(cb);
  },

};


var Order = mongoose.model('Order', OrderSchema);
module.exports = Order;