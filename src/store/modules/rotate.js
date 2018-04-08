import * as types from '../types'

const state = {
  rotateInfoArr: JSON.parse(localStorage.getItem('rotateInfoArr')) || {},
  rotateInfo: JSON.parse(localStorage.getItem('rotateInfo')) || {},
  rotateMenu: JSON.parse(localStorage.getItem('rotateMenu')) || { menuone: 0, menuonename: '', menutwo: 0, menutwoname: '' },
  rotateRecord: JSON.parse(localStorage.getItem('rotateInfo')) || {}
}

const actions = {

  setRotateInfoArr ({ commit }, res) {
    localStorage.setItem('rotateInfoArr', JSON.stringify(res))
    commit(types.SET_ROTATE_INFO_ARR, res)
  },
  setRotateInfo ({ commit }, res) {
    localStorage.setItem('rotateInfo', JSON.stringify(res))
    commit(types.SET_ROTATE_INFO, res)

    localStorage.setItem('rotateMenu', JSON.stringify({ menuone: 0, menuonename: '', menutwo: 0, menutwoname: '' }))
    commit(types.SET_ROTATE_MENU, { menuone: 0, menuonename: '', menutwo: 0, menutwoname: '' })
  },
  setRotateMenu ({ commit }, res) {
    localStorage.setItem('rotateMenu', JSON.stringify(res))
    commit(types.SET_ROTATE_MENU, res)
  },
  setRotateRecord ({ commit }, res) {
    localStorage.setItem('rotateRecord', JSON.stringify(res))
    commit(types.SET_ROTATE_RECORD, res)
  },
  removeRotateInfoArr ({ commit }) {
    localStorage.removeItem('rotateInfoArr')
    localStorage.removeItem('rotateInfo')
    localStorage.removeItem('rotateMenu')
    commit(types.SET_ROTATE_INFO_ARR, {})
    commit(types.SET_ROTATE_INFO, {})
    commit(types.SET_ROTATE_MENU, {})
  }
}

const getters = {
  rotateInfoArr: state => state.rotateInfoArr,
  rotateInfo: state => state.rotateInfo,
  rotateMenu: state => state.rotateMenu,
  rotateRecord: state => state.rotateRecord
}

const mutations = {
  [types.SET_ROTATE_INFO_ARR] (state, res) {
    state.rotateInfoArr = res
  },
  [types.SET_ROTATE_INFO] (state, res) {
    state.rotateInfo = res
  },
  [types.SET_ROTATE_MENU] (state, res) {
    state.rotateMenu = res
  },
  [types.SET_ROTATE_RECORD] (state, res) {
    state.rotateRecord = res
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
