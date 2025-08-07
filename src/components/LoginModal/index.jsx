import { useState } from 'react'
import { 
  Popup, 
  Form, 
  Field, 
  Button, 
  Tabs, 
  Toast,
  Loading
} from 'react-vant'
import { useUserStore } from '@/store/useUserStore'
import styles from './login.module.css'

const LoginModal = ({ visible, onClose }) => {
  const [activeTab, setActiveTab] = useState('login')
  const { login, register, loading } = useUserStore()
  
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  })
  
  const [registerForm, setRegisterForm] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  })

  const handleLogin = async () => {
    if (!loginForm.username || !loginForm.password) {
      Toast.show({ message: '请输入用户名和密码', type: 'fail' })
      return
    }
    
    const result = await login(loginForm)
    if (result.success) {
      Toast.show({ message: '登录成功', type: 'success' })
      onClose()
    } else {
      Toast.show({ message: result.message || '登录失败', type: 'fail' })
    }
  }

  const handleRegister = async () => {
    if (!registerForm.username || !registerForm.password || !registerForm.confirmPassword) {
      Toast.show({ message: '请填写完整信息', type: 'fail' })
      return
    }
    
    if (registerForm.password !== registerForm.confirmPassword) {
      Toast.show({ message: '两次输入的密码不一致', type: 'fail' })
      return
    }
    
    const result = await register(registerForm)
    if (result.success) {
      Toast.show({ message: '注册成功', type: 'success' })
      onClose()
    } else {
      Toast.show({ message: result.message || '注册失败', type: 'fail' })
    }
  }

  const handleClose = () => {
    setLoginForm({ username: '', password: '' })
    setRegisterForm({ username: '', password: '', confirmPassword: '' })
    onClose()
  }

  return (
    <Popup
      visible={visible}
      onClose={handleClose}
      position="bottom"
      round
      className={styles.popup}
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>欢迎来到毛球伴侣</h2>
          <p>请登录或注册以继续使用</p>
        </div>
        
        <Tabs active={activeTab} onChange={setActiveTab} className={styles.tabs}>
          <Tabs.TabPane title="登录" name="login">
            <div className={styles.formContainer}>
              <Form>
                <Field
                  name="username"
                  label="用户名"
                  placeholder="请输入用户名"
                  value={loginForm.username}
                  onChange={(value) => setLoginForm(prev => ({ ...prev, username: value }))}
                  className={styles.field}
                />
                <Field
                  name="password"
                  type="password"
                  label="密码"
                  placeholder="请输入密码"
                  value={loginForm.password}
                  onChange={(value) => setLoginForm(prev => ({ ...prev, password: value }))}
                  className={styles.field}
                />
              </Form>
              
              <div className={styles.tips}>
                <p>测试账号：admin / 123456</p>
              </div>
              
              <Button
                type="primary"
                block
                size="large"
                onClick={handleLogin}
                loading={loading}
                className={styles.submitBtn}
              >
                登录
              </Button>
            </div>
          </Tabs.TabPane>
          
          <Tabs.TabPane title="注册" name="register">
            <div className={styles.formContainer}>
              <Form>
                <Field
                  name="username"
                  label="用户名"
                  placeholder="请输入用户名"
                  value={registerForm.username}
                  onChange={(value) => setRegisterForm(prev => ({ ...prev, username: value }))}
                  className={styles.field}
                />
                <Field
                  name="password"
                  type="password"
                  label="密码"
                  placeholder="请输入密码"
                  value={registerForm.password}
                  onChange={(value) => setRegisterForm(prev => ({ ...prev, password: value }))}
                  className={styles.field}
                />
                <Field
                  name="confirmPassword"
                  type="password"
                  label="确认密码"
                  placeholder="请再次输入密码"
                  value={registerForm.confirmPassword}
                  onChange={(value) => setRegisterForm(prev => ({ ...prev, confirmPassword: value }))}
                  className={styles.field}
                />
              </Form>
              
              <Button
                type="primary"
                block
                size="large"
                onClick={handleRegister}
                loading={loading}
                className={styles.submitBtn}
              >
                注册
              </Button>
            </div>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </Popup>
  )
}

export default LoginModal
