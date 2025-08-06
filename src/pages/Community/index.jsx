import useTitle from '@/hooks/useTitle'
import { Button } from 'react-vant'

const Community = () => {
  useTitle('宠物社区 - 毛球伴侣')
  
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>🐾 宠物社区</h1>
      <p style={{ color: '#666', marginTop: '20px' }}>
        与其他宠物主人交流分享养宠经验
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

export default Community