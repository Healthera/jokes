import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const server: string = `http://localhost:3050`;

export default new Vuex.Store({
  state: {
    jokes: [],
    randomJoke: {}
  },
  mutations: {
    SET_JOKES (state, jokes) {
      state.jokes = jokes
    },
    SET_RANDOM_JOKE (state, joke) {
      state.randomJoke = joke
    },
    ADD_JOKE (state, joke) {
      state.jokes = [...state.jokes, joke]
    },
    DELETE_JOKE (state, joke) {
      state.jokes = state.jokes.filter((currentJoke: any) => currentJoke.id !== joke.id);
    }
  },
  actions: {
    loadJokes({ commit }) {
      axios
        .get(`${server}/jokes`)
        .then(r => r.data)
        .then(jokes => {
          commit('SET_JOKES', jokes)
        })
    },
    loadRandomJoke({ commit }, filter) {
      axios
        .get(`${server}/jokes?random=true${filter ? '&filter='+filter: ''}`)
        .then(r => r.data)
        .then(joke => {
          commit('SET_RANDOM_JOKE', joke)
        })
    },
    addNewJoke({ commit }, payload) {
      axios
        .post(`${server}/jokes`, payload)
        .then(r => r.data)
        .then(joke => {
          commit('ADD_JOKE', joke)
        })
    },
    deleteJoke({ commit }, payload) {
      axios
        .delete(`${server}/jokes?id=${payload.id}`)
        .then(r => r.data)
        .then(joke => {
          commit('DELETE_JOKE', joke)
        })
    }

  },
});
