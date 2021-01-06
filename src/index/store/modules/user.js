
const user = {
  state: {
    token: '',
  },

  mutations: {
    setToken(state, data) {
      state.token = data
    },
  },

  actions: {
    login({ commit }, formData) {
      return new Promise((resolve) => {
        commit('setToken', 'token123456789')
        resolve()
      })
    },
  },
}

export default user
