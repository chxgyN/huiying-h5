import { register, getUserToken, getUserInfo } from '@/api/user'

const state = {
  token: localStorage.getItem('token') || '',
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
}

const getters = {
  getToken: state => state.token,
  getUser: state => state.user,
}

const mutations = {
  // 身份token 
  SET_TOKEN: (state, token) => {
    state.token = token
    localStorage.setItem('token', token)
  },
  // 用户信息
  SET_USER: (state, user) => {
    state.user = user
    localStorage.setItem('user', JSON.stringify(user))
  },
}

const actions = {
  // user register
  async register({ commit }, form) {
    const { account, password, code } = form

    const res = await register({ account, password, code })

    if (res.code === 200) {
      commit('SET_TOKEN', res.data.token)
    }
    return res
  },

  // user login
  async login({ commit }, form) {
    const { account, password } = form

    const res = await getUserToken({ account, password })
    // console.log(res);

    if (res.code === 200) {
      commit('SET_TOKEN', res.data.token)
    }
    return res
  },

  // get user info 当前用户信息，根据用户 token 获取
  async getInfo({ commit }) {

    const res = await getUserInfo();
    
    // console.log("##"+JSON.stringify(res));

    if (res.code === 200) {
      commit('SET_USER', res.data)
    }

    return res
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
