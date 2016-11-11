import Vue from 'vue'
import config from '../config'

export default {
  getUserList () {
    return Vue.http.get(`/api/user`);
  },
  getUser (id) {
    return Vue.http.get(`/api/user/${id}`);
  }
}