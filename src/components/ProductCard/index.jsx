import styles from './card.module.css'
import { useEffect, useRef } from 'react'

const ProductCard = (props) => {
    const { image, name, description, price, originalPrice, sales, rating, width, height } = props
    const imgRef = useRef(null)
    
    useEffect(() => {
        const observer = new IntersectionObserver(([entry], obs) => {
            if (entry.isIntersecting) {
                const img = entry.target
                const oImg = document.createElement('img')
                oImg.src = img.dataset.src // 体验更好，避免用户等待
                oImg.onload = () => {
                    img.src = img.dataset.src
                }
                obs.unobserve(img) // 回收
            }
        })
        if (imgRef.current) observer.observe(imgRef.current)
    }, [])
    
    return (
        <div className={styles.card}>
            <div className={styles.imageContainer} style={{ height: height * 0.6 }}>
                <img 
                    data-src={image} 
                    className={styles.img} 
                    ref={imgRef}
                    alt={name}
                />
            </div>
            <div className={styles.content}>
                <h3 className={styles.name}>{name}</h3>
                <p className={styles.description}>{description}</p>
                <div className={styles.priceContainer}>
                    <span className={styles.price}>¥{price}</span>
                    <span className={styles.originalPrice}>¥{originalPrice}</span>
                </div>
                <div className={styles.meta}>
                    <span className={styles.sales}>已售{sales}+</span>
                    <span className={styles.rating}>⭐ {rating}</span>
                </div>
            </div>
        </div>
    )
}

export default ProductCard

