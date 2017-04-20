
export const state = {
  isSuccess : false,
  isError : false,
  loggedUser: localStorage.getItem('token') || null,
  isUserAdmin: localStorage.getItem('isAdmin') || null,
  modalClass: {
    'modal': true,
    'is-active': false
  }
}

export const getters = {
  getSuccess(state) {
    return state.isSuccess
  },
  getError(state) {
    return state.isError
  },
  getIsUserAdmin(state) {
    return state.isUserAdmin
  },
  getLoggedUser(state) {
    return state.loggedUser
  },
  getModalClass(state) {
    return state.modalClass
  }
}

export const mutations = {
  SET_ISSUCCESS(state, value) {
    state.isSuccess = value
  },
  SET_ISERROR(state, value) {
    state.isError = value
  },
  SET_MODALACTIVE(state) {
    state.modalClass['is-active'] = true
  },
  SET_MODALINACTIVE(state) {
    state.modalClass['is-active'] = false
  }
}

export const actions = {
  setSuccess({commit}, value) {
    commit('SET_ISSUCCESS', value)
  },
  setError({commit}, value) {
    commit('SET_ISERROR', value)
  },
  setModalActive({commit}) {
    commit('SET_MODALACTIVE')
  },
  setModalInactive({commit}) {
    commit('SET_MODALINACTIVE')
  }
}