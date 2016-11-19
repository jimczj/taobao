import Vue from 'vue'

export default {
  getList () {
    return Vue.http.get(`/api/order`);
  },
  create (order) {
    return Vue.http.post(`/api/order`, order);
  }
}