var mongoose = require('mongoose');
var getJsonFromReq = require('./utils/getJsonFromReq');
var Schema = mongoose.Schema;

var GoodStudentSchema = new Schema({
  creator : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},//发帖人
  class_id:  {type:String,required:true},//班级ID
  title: {type :String},//优等头衔
  bond: {type:Number,min:0},//奖金
  owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}//获奖者
});

GoodStudentSchema.statics = {
  // 根据req传来到内容，进行 add goodStudent
  createFromReq:function(req,cb){
    let jsonObj = getJsonFromReq(GoodStudentSchema,req);
    goodStudent = GoodStudent(jsonObj);
    return goodStudent.save(cb);
  }
}
var GoodStudent = mongoose.model('GoodStudent', GoodStudentSchema);
module.exports = GoodStudent;