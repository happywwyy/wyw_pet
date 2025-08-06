import useTitle from '@/hooks/useTitle'
import { Button } from 'react-vant'
import { useParams } from 'react-router-dom'

const Detail = () => {
  const { id } = useParams()
  useTitle('宠物详情 - 毛球伴侣')
  
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>🐾 宠物详情</h1>
      <p style={{ color: '#666', marginTop: '20px' }}>
        宠物ID: {id}
      </p>
      <p style={{ color: '#999', fontSize: '14px', marginTop: '10px' }}>
        详情页面功能开发中...
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

export default Detail