import {
    memo,
    useRef,
    useState,
    useEffect,
    useMemo
} from 'react'
import { debounce } from '@/utils'
import { ArrowLeft, Close } from '@react-vant/icons'
import styles from './search.module.css'
import { useNavigate } from 'react-router-dom'

const ProductSearchBox = (props) => {
    const [query, setQuery] = useState("")
    const { handleQuery } = props
    const navigate = useNavigate()
    
    // 非受控组件
    const queryRef = useRef(null)
    
    const handleChange = (e) => {
        let val = e.currentTarget.value
        setQuery(val)
    }
    
    const clearQuery = () => {
        setQuery("")
        queryRef.current.value = ""
        queryRef.current.focus()
    }
    
    // 防抖处理
    const handleQueryDebounce = useMemo(() => {
        return debounce(handleQuery, 300)
    }, [handleQuery])
    
    const displayStyle = query ? { display: 'block' } : { display: 'none' }
    
    useEffect(() => {
        console.log(query, '/////')
        handleQueryDebounce(query)
    }, [query, handleQueryDebounce])

    return (
        <div className={styles.wrapper}>
            <ArrowLeft onClick={() => navigate(-1)} /> 
            <input 
                type="text" 
                className={styles.ipt}
                placeholder='搜索宠物用品'
                ref={queryRef}
                onChange={handleChange}
            />
            {/* 移动端用户体验 */}
            <Close onClick={clearQuery} style={displayStyle}/>
        </div>
    )
}

export default memo(ProductSearchBox)

