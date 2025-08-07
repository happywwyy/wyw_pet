import { create } from 'zustand'
import { doLogin, doRegister, updateUserProfile, uploadAvatar } from '../api/user'

export const useUserStore = create((set, get) => ({
  user: null, // 用户信息
  isLogin: false, // 是否登录
  loading: false, // 加载状态
  
  // 初始化用户状态，检查本地token
  initUser: () => {
    const token = localStorage.getItem('token')
    if (token) {
      // 这里可以验证token是否有效
      set({ isLogin: true })
    }
  },
  
  // 登录
  login: async ({ username = "", password = "" }) => {
    set({ loading: true })
    try {
      const res = await doLogin({ username, password })
      console.log('登录响应:', res)
      
      if (res.data && res.data.token) {
        const { token, data: user } = res.data
        localStorage.setItem('token', token)
        set({
          user: user || { username },
          isLogin: true,
          loading: false
        })
        return { success: true }
      } else {
        set({ loading: false })
        return { success: false, message: '登录失败' }
      }
    } catch (error) {
      console.error('登录失败:', error)
      set({ loading: false })
      return { success: false, message: error.message || '登录失败' }
    }
  },
  
  // 注册
  register: async ({ username = "", password = "", confirmPassword = "" }) => {
    if (password !== confirmPassword) {
      return { success: false, message: '两次输入的密码不一致' }
    }
    
    set({ loading: true })
    try {
      const res = await doRegister({ username, password })
      console.log('注册响应:', res)
      
      if (res.data && res.data.token) {
        const { token, data: user } = res.data
        localStorage.setItem('token', token)
        set({
          user: user || { username },
          isLogin: true,
          loading: false
        })
        return { success: true }
      } else {
        set({ loading: false })
        return { success: false, message: '注册失败' }
      }
    } catch (error) {
      console.error('注册失败:', error)
      set({ loading: false })
      return { success: false, message: error.message || '注册失败' }
    }
  },
  
  // 退出登录
  logout: () => {
    localStorage.removeItem('token')
    set({
      user: null,
      isLogin: false
    })
  },
  
  // 更新用户信息
  updateProfile: async (profileData) => {
    set({ loading: true })
    try {
      const res = await updateUserProfile(profileData)
      if (res.data) {
        set(state => ({
          user: { ...state.user, ...res.data },
          loading: false
        }))
        return { success: true }
      }
    } catch (error) {
      console.error('更新用户信息失败:', error)
      set({ loading: false })
      return { success: false, message: error.message || '更新失败' }
    }
  },
  
  // 上传头像
  uploadUserAvatar: async (file) => {
    set({ loading: true })
    try {
      const res = await uploadAvatar(file)
      if (res.data && res.data.avatarUrl) {
        set(state => ({
          user: { ...state.user, avatar: res.data.avatarUrl },
          loading: false
        }))
        return { success: true, avatarUrl: res.data.avatarUrl }
      }
    } catch (error) {
      console.error('头像上传失败:', error)
      set({ loading: false })
      return { success: false, message: error.message || '上传失败' }
    }
  }
}))

