var mongoose = require('mongoose');
var sha1 = require('sha1');
var getJsonFromReq = require('./utils/getJsonFromReq');
var Schema = mongoose.Schema;


var SexEnum =['F','M'];

var UserSchema = new Schema({
  username:  {type:String,required:true,unique: true},
  email: {type :String,match:/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/},
  sex:   {type:String,enum: SexEnum},
  age: {type:Number,min:0},
  class: String,
  password: {type:String,required: true},
  role_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Role'}
});



UserSchema.statics = {
  // 根据req传来到内容，进行 add user
  createFromReq:function(req,cb){
    let jsonObj = getJsonFromReq(UserSchema,req);
    user = User(jsonObj);
    return user.save(cb);
  },
  // 根据req传来到内容，进行更新
  updateByIdFromReq:function(req,cb){
    let jsonObj = getJsonFromReq(UserSchema,req);
    return User.findByIdAndUpdate(req.params.id,jsonObj, cb);
  },
  //获取除了密码之外的所有字段
  fetchUsers:function(cb){
   return this.find ({},'username email sex age class role_id',cb);
  },
  //获取除了密码之外的所有字段
  fetchById:function(id,cb){
    return this.findById(id,'username email sex age class role_id',cb);
  },

};
// 保存前對密碼進行加密
UserSchema.pre('save', function(next){
  this.password = sha1(this.password);
  next();
});

var User = mongoose.model('User', UserSchema);
module.exports = User;