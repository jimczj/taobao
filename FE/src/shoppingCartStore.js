import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
//{"products":[{"product_id":"58303ac0231b0726d177130b","number":9},{"product_id":"58303a8a231b0726d1771308","number":9}]}
export default new Vuex.Store({

  state:{
    shoppingCart: JSON.parse(window.localStorage.getItem('shoppingCart') || '{}')
  },

  mutations:{
    save (state,shoppingCart) {
      state.shoppingCart = shoppingCart;
      window.localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
    },
    clear (state) {
      state.shoppingCart = {};
      window.localStorage.removeItem('shoppingCart')
    },
  },

  getters:{
    shoppingCart: state =>{
      return state.shoppingCart
    }
  },

  actions:{
    save ({ commit },shoppingCart) {
      commit('save',shoppingCart)
    },
    clear ({ commit }) {
      commit('clear')
    }
  },

})