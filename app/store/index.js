import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    storage: {
      newCursors: [],
      topCursors: [],
    }
  },
  getters: {
    storage: state => {
      return state.storage;
    },
  },
  mutations: {
    SET_STORAGE: (state, payload) => {
      state.storage = payload;
    },


  },
  actions: {

  },
  modules: {

  }
})

