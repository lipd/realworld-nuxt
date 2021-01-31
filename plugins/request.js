import axios from 'axios'

export const request = axios.create({
  baseURL: 'https://conduit.productionready.io',
})

// 插件必须使用默认成员导出
export default ({ store }) => {
  // 请求拦截器 => 任何请求都要经过拦截器
  // 我们可以在拦截器中做一些公共业务处理，比如统一设置 token
  request.interceptors.request.use(
    function(config) {
      const { user } = store.state
      if (user && user.token) {
        config.headers.Authorization = `Token ${user.token}`
      }
      return config
    },
    function(err) {
      return Promise.reject(err)
    },
  )
  // 响应拦截器
}
