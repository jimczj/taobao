import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({

  state:{
    user: JSON.parse(window.localStorage.getItem('user') || '{}')
  },

  mutations:{
    saveUser (state,user) {
      state.user = user;
      window.localStorage.setItem('user', JSON.stringify(user));
    },
    clearUser (state) {
      state.user = {};
      window.localStorage.removeItem('user')
    },
  },

  getters:{
    user: state =>{
      return state.user
    }
  },

  actions:{
    saveUser ({ commit },user) {
      commit('saveUser',user)
    },
    clearUser ({ commit }) {
      commit('clearUser')
    }
  },

})