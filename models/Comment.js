var mongoose = require('mongoose');
var getJsonFromReq = require('./utils/getJsonFromReq');
var Schema = mongoose.Schema;


var CommentSchema = new Schema({
  creator:  {type:Schema.Types.ObjectId,required:true,ref: 'User'},
  topic_id: {type:String},
  create_time: {type:Date},
  content: {type:String,required:true}
});

CommentSchema.statics = {
  // 根据req传来到内容，进行 add comment,并设置creator
  createFromReq:function(req,cb){
    let jsonObj = getJsonFromReq(CommentSchema,req);
    jsonObj.creator = req.session.user._id;
    jsonObj.create_time = Date.now();
    comment = Comment(jsonObj);
    return comment.save(cb);
  },
  fetchOne:function(id,cb){
    return Comment.findById(id).populate('creator').exec(cb);
  },
  fetch:function(json,cb){
    return Comment.find(json)
      .sort({'_id':-1})
      .populate('creator')
      .exec(cb);
  }
};
// 保存前對密碼進行加密,如果是刚创建的用户，权限初始化为班级成员


var Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;