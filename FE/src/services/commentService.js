import Vue from 'vue'
import config from '../config'

export default {
  getCommentList (topic_id) {
    return Vue.http.get(`/api/comment/${topic_id}`);
  },
  createComment (comment) {
    return Vue.http.post(`/api/comment`, comment);
  }
}