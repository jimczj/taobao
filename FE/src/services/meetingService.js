import Vue from 'vue'
import config from '../config'

export default {
  getMeetingList () {
    return Vue.http.get(`/api/meeting`);
  },
  createMeeting (meeting) {
    return Vue.http.post(`/api/meeting`, meeting);
  }
}