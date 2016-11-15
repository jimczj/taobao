var mongoose = require('mongoose');
var getJsonFromReq = require('./utils/getJsonFromReq');
var Schema = mongoose.Schema;

var GoodStudentSchema = new Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }, //发帖人
  class_id: {
    type: String,
    required: true
  }, //班级ID
  title: {
    type: String
  }, //优等头衔
  bond: {
    type: Number,
    min: 0
  }, //奖金
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }, //获奖者
  create_time: {
    type: Date
  },
});

GoodStudentSchema.statics = {
  // 根据req传来到内容，进行 add goodStudent
  createFromReq: function(req, cb) {
    let jsonObj = getJsonFromReq(GoodStudentSchema, req);
    jsonObj.creator = req.session.user._id;
    jsonObj.create_time = Date.now();
    goodStudent = GoodStudent(jsonObj);
    return goodStudent.save(cb);
  },
  fetchOne: function(id, cb) {
    return GoodStudent.findById(id)
      .populate('creator')
      .populate('owner')
      .exec(cb);
  },
  fetch: function(json, cb) {
    return GoodStudent.find(json)
      .sort({
        '_id': -1
      })
      .populate('creator')
      .populate('owner')
      .exec(cb);
  }
}
var GoodStudent = mongoose.model('GoodStudent', GoodStudentSchema);
module.exports = GoodStudent;