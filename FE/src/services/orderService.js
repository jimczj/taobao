import Vue from 'vue'

export default {
  getList () {
    return Vue.http.get(`/api/order`);
  },
  get (id) {
    return Vue.http.get(`/api/order/${id}`);
  },
  update (order) {
    return Vue.http.put(`/api/order/${order._id}`,order);
  },
  deleteById (order) {
    return Vue.http.delete(`/api/order/${order._id}`);
  },
  create (order) {
    return Vue.http.post(`/api/order`, order);
  }
}