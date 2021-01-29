// 由于在服务端渲染期间运行的是同一个实例
// 所以需要把 state 定义为一个函数，防止数据冲突
export const state = () => {
  return {
    // 当前登录用户的状态
    user: null,
  }
}

export const mutation = {
  setUser(state, data) {
    state.user = data
  },
}

export const action = {}
