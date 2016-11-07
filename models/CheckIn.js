var mongoose = require('mongoose');
var getJsonFromReq = require('./utils/getJsonFromReq');
var Schema = mongoose.Schema;

var CheckInSchema = new Schema({
  class_id:  {type:String,required:true},//班级ID
  course_name: {type :String},//课程名
  missing_date: {type:Date},//旷课日期
  truancy_student: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}//旷课学生Id
});

CheckInSchema.statics = {
  // 根据req传来到内容，进行 add goodStudent
  createFromReq:function(req,cb){
    let jsonObj = getJsonFromReq(CheckInSchema,req);
    checkIn = CheckIn(jsonObj);
    return checkIn.save(cb);
  }
}
var CheckIn = mongoose.model('CheckIn', CheckInSchema);
module.exports = CheckIn;