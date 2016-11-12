import Vue from 'vue'

export default {
  getMeetingList () {
    return Vue.http.get(`/api/meeting`);
  },
  createMeeting (meeting) {
    return Vue.http.post(`/api/meeting`, meeting);
  },
  agree (id) {
    return Vue.http.put(`/api/meeting/${id}/agree`)
  },
  disagree (id) {
    return Vue.http.put(`/api/meeting/${id}/disagree`)
  },
}