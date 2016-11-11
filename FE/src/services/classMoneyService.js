import Vue from 'vue'
import config from '../config'

export default {
  getClassMoneyList () {
    return Vue.http.get(`/api/class_money`);
  },
  createClassMoney (class_money) {
    return Vue.http.post(`/api/class_money`, class_money);
  }
}