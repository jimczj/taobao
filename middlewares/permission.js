var Role = require('../models/Role');

module.exports = {
  //是否有权限
  has_perm: function (permission) {
    return function (req,res,next) {
      if(!req.session.user){
        next();
      }
      let user = req.session.user;
      Role.findById(user.role_id,function(err,role){
        if(err){
          res.json({status:0,message:err});
        }
        else {
          if(role && role.role_rights.includes(permission)){
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