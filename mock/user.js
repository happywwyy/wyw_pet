// 模拟JWT生成（简化版）
const generateToken = (user) => {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const payload = btoa(JSON.stringify({ user, exp: Date.now() + 86400000 })) // 24小时
  const signature = btoa('mock-signature')
  return `${header}.${payload}.${signature}`
}

// 模拟用户数据库
const users = [
  {
    id: 1,
    username: 'admin',
    password: '123456',
    nickname: '管理员',
    avatar: 'https://picsum.photos/80/80?random=admin',
    email: 'admin@example.com',
    phone: '13800138000'
  },
  {
    id: 2,
    username: 'user1',
    password: '123456',
    nickname: '宠物爱好者',
    avatar: 'https://picsum.photos/80/80?random=user1',
    email: 'user1@example.com',
    phone: '13800138001'
  }
]

export default [
  // 用户登录
  {
    url: '/api/login',
    method: 'post',
    timeout: 1000,
    response: (req) => {
      const { username, password } = req.body
      
      const user = users.find(u => u.username === username && u.password === password)
      
      if (!user) {
        return {
          code: 1,
          message: '用户名或密码错误'
        }
      }
      
      const token = generateToken({ id: user.id, username: user.username })
      const { password: _, ...userInfo } = user
      
      return {
        code: 0,
        message: '登录成功',
        data: {
          token,
          data: userInfo
        }
      }
    }
  },
  
  // 用户注册
  {
    url: '/api/register',
    method: 'post',
    timeout: 1000,
    response: (req) => {
      const { username, password } = req.body
      
      // 检查用户名是否已存在
      const existingUser = users.find(u => u.username === username)
      if (existingUser) {
        return {
          code: 1,
          message: '用户名已存在'
        }
      }
      
      // 创建新用户
      const newUser = {
        id: users.length + 1,
        username,
        password,
        nickname: `用户${users.length + 1}`,
        avatar: `https://picsum.photos/80/80?random=${users.length + 1}`,
        email: '',
        phone: ''
      }
      
      users.push(newUser)
      
      const token = generateToken({ id: newUser.id, username: newUser.username })
      const { password: _, ...userInfo } = newUser
      
      return {
        code: 0,
        message: '注册成功',
        data: {
          token,
          data: userInfo
        }
      }
    }
  },
  
  // 获取用户信息
  {
    url: '/api/user',
    method: 'get',
    response: (req) => {
      const token = req.headers['authorization']?.split(' ')[1]
      
      if (!token) {
        return {
          code: 401,
          message: '未授权'
        }
      }
      
      try {
        // 简化的token解析
        const payload = JSON.parse(atob(token.split('.')[1]))
        const user = users.find(u => u.id === payload.user.id)
        
        if (!user) {
          return {
            code: 404,
            message: '用户不存在'
          }
        }
        
        const { password: _, ...userInfo } = user
        
        return {
          code: 0,
          data: userInfo
        }
      } catch (error) {
        return {
          code: 401,
          message: 'Token无效'
        }
      }
    }
  },
  
  // 更新用户信息
  {
    url: '/api/user/profile',
    method: 'put',
    response: (req) => {
      const token = req.headers['authorization']?.split(' ')[1]
      const { nickname, email, phone } = req.body
      
      if (!token) {
        return {
          code: 401,
          message: '未授权'
        }
      }
      
      try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        const userIndex = users.findIndex(u => u.id === payload.user.id)
        
        if (userIndex === -1) {
          return {
            code: 404,
            message: '用户不存在'
          }
        }
        
        // 更新用户信息
        users[userIndex] = {
          ...users[userIndex],
          nickname: nickname || users[userIndex].nickname,
          email: email || users[userIndex].email,
          phone: phone || users[userIndex].phone
        }
        
        const { password: _, ...userInfo } = users[userIndex]
        
        return {
          code: 0,
          message: '更新成功',
          data: userInfo
        }
      } catch (error) {
        return {
          code: 401,
          message: 'Token无效'
        }
      }
    }
  },
  
  // 上传头像
  {
    url: '/api/user/avatar',
    method: 'post',
    response: (req) => {
      const token = req.headers['authorization']?.split(' ')[1]
      
      if (!token) {
        return {
          code: 401,
          message: '未授权'
        }
      }
      
      try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        const userIndex = users.findIndex(u => u.id === payload.user.id)
        
        if (userIndex === -1) {
          return {
            code: 404,
            message: '用户不存在'
          }
        }
        
        // 模拟头像上传，生成随机头像URL
        const avatarUrl = `https://picsum.photos/80/80?random=${Date.now()}`
        
        users[userIndex].avatar = avatarUrl
        
        return {
          code: 0,
          message: '头像上传成功',
          data: {
            avatarUrl
          }
        }
      } catch (error) {
        return {
          code: 401,
          message: 'Token无效'
        }
      }
    }
  }
]





