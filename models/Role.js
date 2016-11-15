var mongoose = require('mongoose');
var getJsonFromReq = require('./utils/getJsonFromReq');
var Schema = mongoose.Schema;

var RoleSchema = new Schema({
  role_name: {
    type: String,
    unique: true,
    require: true
  },
  role_rights: [{
    type: String,
    unique: true
  }],
  parent_role_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role'
  },

});

RoleSchema.statics = {
  // 根据req传来到内容，进行 add role
  createFromReq: function(req, cb) {
    let jsonObj = getJsonFromReq(RoleSchema, req);
    role = Role(jsonObj);
    return role.save(cb);
  }
}
var Role = mongoose.model('Role', RoleSchema);
module.exports = Role;