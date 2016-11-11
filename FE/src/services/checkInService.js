import Vue from 'vue'
import config from '../config'

export default {
  getCheckInList () {
    return Vue.http.get(`/api/check_in`);
  },
  createCheckIn (check_in) {
    return Vue.http.post(`/api/check_in`, check_in);
  }
}