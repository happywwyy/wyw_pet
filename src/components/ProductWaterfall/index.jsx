import styles from './waterfall.module.css'
import { useRef, useState, useEffect } from 'react'
import ProductCard from '@/components/ProductCard'

const ProductWaterfall = (props) => {
    const {
        loading,
        products,
        fetchMore,
    } = props
    const [columns, setColumns] = useState([[], []])
    const [columnHeights, setColumnHeights] = useState([0, 0])

    useEffect(() => {
        // 初始化列高和商品数组
        const newColumns = [[], []]
        const newHeights = [0, 0]

        products.forEach(product => {
            // 找到当前高度较小的列
            const targetColumn = newHeights[0] <= newHeights[1] ? 0 : 1
            newColumns[targetColumn].push(product)
            // 累加列高度（商品卡片高度 = 图片高度 + 内容高度）
            newHeights[targetColumn] += (product.height * 0.6 + 120) // 图片高度*0.6 + 内容区域约120px
        })

        setColumns(newColumns)
        setColumnHeights(newHeights)
    }, [products])
    
    const loader = useRef(null)
    
    useEffect(() => {
        // 观察者模式，当加载器出现在视口时触发加载更多
        const observer = new IntersectionObserver(([entry], obs) => {
            console.log(entry)
            if (entry.isIntersecting) {
                fetchMore()
            }
        })
        if (loader.current) {
            observer.observe(loader.current)
        }
        return () => observer.disconnect()
    }, [fetchMore])
    
    return (
        <div className={styles.wrapper}>
            {products.length === 0 && !loading ? (
                <div className={styles.empty}>
                    <p>暂无商品数据</p>
                    <p>正在为您加载精选宠物用品...</p>
                </div>
            ) : (
                <>
                    <div className={styles.column}>
                        {columns[0].map(product => (
                            <ProductCard key={product.id} {...product} />
                        ))}
                    </div>
                    <div className={styles.column}>
                        {columns[1].map(product => (
                            <ProductCard key={product.id} {...product} />
                        ))}
                    </div>
                </>
            )}
            <div ref={loader} className={styles.loader}>
                {loading ? '加载中...' : products.length > 0 ? '上拉加载更多' : '点击重新加载'}
            </div>
        </div>
    )
}

export default ProductWaterfall

