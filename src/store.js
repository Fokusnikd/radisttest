import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const moment = require("moment");
export default new Vuex.Store({
  state: {
    user: null,
    error: null,
    dateTime: null,
    moment
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;

      state.dateTime = new Date(state.user.data.expiresIn);

      localStorage.setItem('user', JSON.stringify(state.user));
    },
    loadUser(state) {
      const user = localStorage.getItem('user');
      state.user = JSON.parse(user);
      state.dateTime = new Date(state.user.data.expiresIn);
      console.log(state.dateTime)
    },
    cleanUser(state) {
      const loginDate = state.moment().toDate();
      const userDate = new Date(state.user.data.expiresIn);
      if (loginDate > userDate) {
        localStorage.removeItem('user');
      }
    },

    setError(state, payload) {
      state.error = payload;
    },
    cleanError(state) {
      state.error = null;
    },

  },
  actions: {
    cleanError({
      commit
    }) {
      commit('cleanError');
    },
    loadUser({
      commit
    }) {
      commit('loadUser');

    },
    async cleanUser({
      commit
    }) {
      commit('cleanUser')
    },

    loginUser({
        commit
      },
      jsonUser
    ) {
      axios
        .post(`http://localhost:3000/login`, jsonUser, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(response => (commit('setUser', response)))

        .catch(response => (commit('setError', response)));
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
    userDateTime(state) {
      return state.dateTime;
    },
    error(state) {
      return state.error;
    }
  }
});