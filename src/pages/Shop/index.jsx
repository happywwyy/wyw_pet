import { useShopStore } from '@/store/useShopStore'
import { useEffect } from 'react'
import ProductWaterfall from '@/components/ProductWaterfall'
import { Search } from '@react-vant/icons'
import { useNavigate } from 'react-router-dom'
import styles from './shop.module.css'
import useTitle from '@/hooks/useTitle'

const Shop = () => {
    const { loading, products, fetchMore, initialized } = useShopStore()
    const navigate = useNavigate()
    
    useTitle('宠物商城 - 毛球伴侣')
    
    useEffect(() => {
        console.log('Shop组件加载，开始获取商品数据')
        fetchMore()
    }, [])
    
    useEffect(() => {
        console.log('商品数据更新:', products.length, '个商品')
    }, [products])
    
    const handleSearch = () => {
        navigate('/shop/search')
    }
    
    return (
        <div className={styles.container}>
            {/* 搜索栏 */}
            <div className={styles.searchBar}>
                <div className={styles.searchBox} onClick={handleSearch}>
                    <Search className={styles.searchIcon} />
                    <span className={styles.searchPlaceholder}>搜索宠物用品...</span>
                </div>
            </div>
            
            {/* 商品瀑布流 */}
            <ProductWaterfall 
                products={products} 
                fetchMore={fetchMore} 
                loading={loading} 
            />
        </div>
    )
}

export default Shop