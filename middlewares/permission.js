var Role = require('../models/Role');

module.exports = {
  //是否有权限
  has_perm: function (permission) {
    return function (res,req,next) {
      let user = req.session.user;
      Role.findById(user.role_id,function(err,role){
        if(err){
          res.json({status:0,message:err});
        }
        else {
          if(permission in role.role_rights){
            next();
          }
          else{
            res.json({status:0,message:"没有权限访问"});
          }
        }
      })
    }
  }
};