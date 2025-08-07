import axios from 'axios'

// 开发环境下不设置baseURL，让Vite mock插件处理
// axios.defaults.baseURL = 'http://localhost:5174'

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token') || ''
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

axios.interceptors.response.use((data) => {
  return data.data
})

export default axios