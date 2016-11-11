import Vue from 'vue'
import config from '../config'

export default {
  login (user) {
    return Vue.http.post(`/api/login`, {
      username:user.username,
      password:user.password
    });
  },
  register (user) {
    return Vue.http.post(`/api/register`, {
      username:user.username,
      password:user.password,
      email:user.email,
      sex:user.sex,
      age:user.age,
      class:user.class,
    });
  }
}