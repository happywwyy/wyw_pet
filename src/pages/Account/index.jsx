import useTitle from '@/hooks/useTitle'
import { Button } from 'react-vant'

const Account = () => {
  useTitle('我的账户 - 毛球伴侣')
  
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>👤 我的账户</h1>
      <p style={{ color: '#666', marginTop: '20px' }}>
        个人信息、设置、帮助等功能
      </p>
      <p style={{ color: '#999', fontSize: '14px', marginTop: '10px' }}>
        功能开发中...
      </p>
      <Button 
        type="primary" 
        style={{ marginTop: '30px' }}
        onClick={() => window.history.back()}
      >
        返回首页
      </Button>
    </div>
  )
}

export default Account