import Vue from 'vue'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'
import router from './router'

Vue.use(VueResource)
Vue.use(ElementUI)

//配置发送cookie
Vue.http.options.xhr = { withCredentials: true };

// 配置处理status，staus为0，不继续执行下面
Vue.http.interceptors.push((request, next) => {
  next((response)=>{
    // 如果服务器出现错误
    if(!response.ok){
      Vue.prototype.$message.error('something error');
      return response;
    }
    else{
      //如果成功
      if(response.body.status){
        if(response.body.message){
          Vue.prototype.$message.success(response.body.message);
        }
        //如果成功响应，但数据验证不成功
      }else {
        Vue.prototype.$message.error(response.body.message);
        return response.body.message;
      }
    }
  });
});

Vue.filter('showUsersName', function (users) {
  let usersname = '';
  for(let i in users){
    usersname += users[i].username+',';
  }
  //去掉最后一个逗号
  return usersname.substring(0,usersname.length-1);
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
