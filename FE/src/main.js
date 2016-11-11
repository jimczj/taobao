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
    if(response.body.status){
      if(response.body.message){
        Vue.prototype.$message.success(response.body.message);
      }
    }else {
      Vue.prototype.$message.error(response.body.message);
      return response.body.message;
    }
  });
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
