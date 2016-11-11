var mongoose = require('mongoose');
var getJsonFromReq = require('./utils/getJsonFromReq');
var Schema = mongoose.Schema;

//收班费帖
var ClassMoneySchema = new Schema({
  creator : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  class_id:  {type:String,required:true},
  howmuch: {type:Number,min:0},
  deadline:   {type:Date,required:true},
  payed_members: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  unpayed_members: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
});

ClassMoneySchema.statics = {
  // 根据req传来到内容，进行 add meeting
  createFromReq:function(req,cb){
    let jsonObj = getJsonFromReq(ClassMoneySchema,req);
    jsonObj.creator = req.session.user._id;
    class_money = ClassMoney(jsonObj);
    return class_money.save(cb);
  }
}
var ClassMoney = mongoose.model('ClassMoney', ClassMoneySchema);
module.exports = ClassMoney;