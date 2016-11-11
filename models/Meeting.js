var mongoose = require('mongoose');
var getJsonFromReq = require('./utils/getJsonFromReq');
var Schema = mongoose.Schema;

var MeetingSchema = new Schema({
  creator : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  class_id:  {type:String,required:true},
  place: {type :String},
  create_time:   {type:Date,required:true},
  numbers_required: {type:Number,min:0},
  numbers_gotten: {type:Number,min:0},
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
  }
}

var Meeting = mongoose.model('Meeting', MeetingSchema);
module.exports = Meeting;