var mongoose = require('mongoose');
var getJsonFromReq = require('./utils/getJsonFromReq');
var Schema = mongoose.Schema;

var MeetingSchema = new Schema({
  creator : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  class_id:  {type:String,required:true},
  place: {type :String},
  create_time:   {type:Date,required:true},
  numbers_required: {type:Number,min:0,default:0},
  numbers_gotten: {type:Number,min:0,default:0},
  topic: {type:String},
  pool_agrees: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  pool_disagrees: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
});

MeetingSchema.statics = {
  // 根据req传来到内容，进行 add meeting
  createFromReq:function(req,cb){
    let jsonObj = getJsonFromReq(MeetingSchema,req);
    jsonObj.creator = req.session.user._id;
    jsonObj.create_time = Date.now();
    meeting = Meeting(jsonObj);
    return meeting.save(cb);
  },
  fetchOne:function(id,cb){
    return Meeting.findById(id)
      .populate('creator')
      .populate('pool_agrees')
      .populate('pool_disagrees')
      .exec(cb);
  },
  fetch:function(json,cb){
    return Meeting.find(json)
      .sort({'_id':-1})
      .populate('creator')
      .populate('pool_agrees')
      .populate('pool_disagrees')
      .exec(cb);
  },
  
};
//实例方法
//同意投票
MeetingSchema.methods.agree = function(user_id, cb){
  let index = this.pool_disagrees.indexOf(user_id);
  if(index > -1){
    this.pool_disagrees.splice(index,1);
  }
  if(this.pool_agrees.indexOf(user_id)>-1){
    this.save(cb);
  }else {
    this.pool_agrees.push(user_id);
    this.save(cb);
  }
};
// 不同意投票
MeetingSchema.methods.disagree = function(user_id, cb){
  let index = this.pool_agrees.indexOf(user_id);
  if(index > -1){
    this.pool_agrees.splice(index,1);
  }
  if(this.pool_disagrees.indexOf(user_id)>-1){
    this.save(cb);
  }else {
    this.pool_disagrees.push(user_id);
    this.save(cb);
  }
};

var Meeting = mongoose.model('Meeting', MeetingSchema);
module.exports = Meeting;