import Vue from 'vue'

Vue.filter('showUsersName', function (users) {
  let usersname = '';
  for(user of users){
    usersname += user.username+',';
  }
  //去掉最后一个逗号
  usersname.substring(0,usersname.length-2);
  return usersname
})
