import Vue from 'vue'

export default {
  getList () {
    return Vue.http.get(`/api/product`);
  },
  get (id) {
    return Vue.http.get(`/api/product/${id}`);
  },
  update (product) {
    return Vue.http.put(`/api/product/${product._id}`,product);
  },
  deleteById (product) {
    return Vue.http.delete(`/api/product/${product._id}`);
  },
  create (product) {
    return Vue.http.post(`/api/product`, product);
  }
}