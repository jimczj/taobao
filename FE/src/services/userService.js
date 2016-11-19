import Vue from 'vue'

export default {
  getUserList () {
    return Vue.http.get(`/api/user`);
  },
  getUser (id) {
    return Vue.http.get(`/api/user/${id}`);
  },
  getReporting(){
    return Vue.http.get('/api/reporting');
  }
}