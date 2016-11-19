import Vue from 'vue'

export default {
  getGoodStudentList () {
    return Vue.http.get(`/api/good_student`);
  },
  createGoodStudent (good_student) {
    return Vue.http.post(`/api/good_student`, good_student);
  }
}