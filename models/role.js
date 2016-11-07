var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RoleSchema = new Schema({
  role_name:  String,
  role_rights: [String],
  parent_role_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Role'},
  
});

var Role = mongoose.model('Role', RoleSchema);
module.exports = Role;