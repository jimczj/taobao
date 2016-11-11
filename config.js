module.exports = {
  session:{
    key:'useradmin',// 设置 cookie 中保存 session id 的字段名称
    secret:'dontgetmysecret',
    maxAge:60000*60*24*180,//设置maxAge是180 day
  },
  mongodb:'mongodb://localhost:27017/userAdmin'// db url

};