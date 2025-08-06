import useTitle from '@/hooks/useTitle'
import { Button } from 'react-vant'

const Login = () => {
  useTitle('登录 - 毛球伴侣')
  
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>🔐 用户登录</h1>
      <p style={{ color: '#666', marginTop: '20px' }}>
        登录功能开发中
      </p>
      <p style={{ color: '#999', fontSize: '14px', marginTop: '10px' }}>
        敬请期待...
      </p>
      <Button 
        type="primary" 
        style={{ marginTop: '30px' }}
        onClick={() => window.history.back()}
      >
        返回
      </Button>
    </div>
  )
}

export default Login