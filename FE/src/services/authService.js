import Vue from 'vue'
import store from '../store'

export default {
  login (user) {
    return Vue.http.post(`/api/login`, {
      username:user.username,
      password:user.password
    })
    .then(res=>{
      store.dispatch('saveUser',res.body.user);
    })
  },
  register (user) {
    return Vue.http.post(`/api/register`,user);
  },
  signout (){
    return Vue.http.get('/api/signout')
      .then(res=>{
        store.dispatch('clearUser');
      })
  }
}