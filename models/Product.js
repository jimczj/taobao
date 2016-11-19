var mongoose = require('mongoose');
var getJsonFromReq = require('./utils/getJsonFromReq');
var Schema = mongoose.Schema;

// b.  产品信息列表，能显示下列产品基本信息
// i.  产品名称
// ii. 产品详细描述
// iii.  产品价格
// iv. 剩余库存

var ProductSchema = new Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    required: true
  },//产品名称
  description: {
    type: String
  },//产品详细描述
  price: {
    type: Number,
    required: true
  },//产品价格
  numbers: {
    type: Number,
    min: 0,
    default: 0
  },//剩余库存
});

ProductSchema.statics = {
  // 根据req传来到内容，进行 add production
  createFromReq: function(req, cb) {
    let jsonObj = getJsonFromReq(ProductSchema, req);
    jsonObj.creator = req.session.user._id;
    product = Product(jsonObj);
    return product.save(cb);
  },
  // 根据req传来到内容，进行更新
  updateByIdFromReq: function(req, cb) {
    let jsonObj = getJsonFromReq(ProductSchema, req);
    return Product.findByIdAndUpdate(req.params.id, jsonObj, cb);
  },
  fetchOne: function(id, cb) {
    return Product.findById(id)
      .populate('creator')
      .exec(cb);
  },
  fetch: function(json, cb) {
    return Product.find(json)
      .sort({
        '_id': -1
      })
      .populate('creator')
      .exec(cb);
  },

};


var Product = mongoose.model('Product', ProductSchema);
module.exports = Product;