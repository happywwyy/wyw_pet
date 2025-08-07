import request from './config'

// 用户登录
export const doLogin = (data) => {
  return request({
    url: '/api/login',
    method: 'post',
    data
  })
}

// 用户注册
export const doRegister = (data) => {
  return request({
    url: '/api/register',
    method: 'post',
    data
  })
}

// 获取用户信息
export const getUser = () => {
  return request({
    url: '/api/user',
    method: 'get'
  })
}

// 更新用户信息
export const updateUserProfile = (data) => {
  return request({
    url: '/api/user/profile',
    method: 'put',
    data
  })
}

// 上传头像
export const uploadAvatar = (file) => {
  const formData = new FormData()
  formData.append('avatar', file)
  
  return request({
    url: '/api/user/avatar',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

