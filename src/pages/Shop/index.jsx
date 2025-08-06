import useTitle from '@/hooks/useTitle'
import { Button } from 'react-vant'

const Shop = () => {
  useTitle('宠物商城 - 毛球伴侣')
  
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>🛍️ 宠物商城</h1>
      <p style={{ color: '#666', marginTop: '20px' }}>
        宠物用品、食品、玩具等商品即将上线
      </p>
      <p style={{ color: '#999', fontSize: '14px', marginTop: '10px' }}>
        敬请期待...
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

export default Shop