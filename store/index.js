const cookieparser = process.server ? require('cookieparser') : undefined

// 由于在服务端渲染期间运行的是同一个实例
// 所以需要把 state 定义为一个函数，防止数据冲突
export const state = () => {
  return {
    // 当前登录用户的状态
    user: null,
  }
}

export const mutations = {
  setUser(state, data) {
    state.user = data
  },
}

export const actions = {
  // nuxtServerInit 会在服务器渲染过程中自动调用
  // 作用是初始化容器数据，传递数据给客户端
  nuxtServerInit({ commit }, { req }) {
    let user = null
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        user = JSON.parse(parsed.user)
      } catch (err) {}
    }

    commit('setUser', user)
  },
}
