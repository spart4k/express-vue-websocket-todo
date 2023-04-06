import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    stage: null,
    phoneStatus: 'droped',
    session: null,
    level: 1,
    progress: [0, 0, 0, 0, 0, 0],
    currentLesson: 1,
    appList: [],
    time: null
  },
  mutations: {
    setSession(state, session) {
      state.session = session
    },
    setLevel(state, level) {
      state.level = level
    },
    setProgress(state, payload) {
      const arr = [...state.progress]
      arr[payload[0] - 1] = payload[1]
      state.progress = arr
    },
    setCurrentLesson(state, lesson) {
      state.currentLesson = lesson
    },
    changeStage(state, type) {
      console.log(type)
      if (type === 'increase') {
        state.stage++
      }
      if (type === 'decrease') {
        state.stage--
      }
      if (type === 'reset') {
        state.stage = null
      }
    },
    changePhoneStatus(state, status) {
      state.phoneStatus = status
    },
    setAppList(state, list) {
      state.appList = list
    },
    setTime(state, value) {
      state.time = value
    }
  },
  actions: {
    updateSession({ commit }, session) {
      commit('setSession', session)
    },
    updateLevel({ commit }, level) {
      commit('setLevel', level)
    },
    updateProgress({ commit }, payload) {
      commit('setProgress', payload)
    },
    updateCurrentLesson({ commit }, lesson) {
      commit('setCurrentLesson', lesson)
    },
  },
  modules: {

  },
})

export default store;
export const useStore = () => store
