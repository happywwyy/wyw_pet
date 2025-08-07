import ProductSearchBox from "@/components/ProductSearchBox"
import useProductSearchStore from "@/store/useProductSearchStore"
import styles from './search.module.css'
import {
    useState,
    useEffect,
    memo
} from 'react'
import { Delete } from '@react-vant/icons'
import useTitle from '@/hooks/useTitle'

const HotListItems = memo((props) => {
    console.log('-------', props)
    const { hotList, onItemClick } = props
    
    if (!Array.isArray(hotList) || hotList.length === 0) {
        return null
    }
    
    return (
        <div className={styles.hot}>
            <h2>🔥 热门推荐</h2>
            <div className={styles.hotGrid}>
                {
                    hotList.map((item) => (
                        <div 
                            key={item.id} 
                            className={styles.hotItem}
                            onClick={() => onItemClick(item.name)}
                        >
                            {item.name}
                        </div>
                    ))
                }
            </div>
        </div>
    )
})

const SearchHistoryItems = memo((props) => {
    const { searchHistory, onItemClick, onClearHistory } = props
    
    if (!Array.isArray(searchHistory) || searchHistory.length === 0) return null
    
    return (
        <div className={styles.history}>
            <div className={styles.historyHeader}>
                <h2>📝 搜索历史</h2>
                <button 
                    className={styles.clearButton}
                    onClick={onClearHistory}
                >
                    <Delete className={styles.clearIcon} />
                    清除
                </button>
            </div>
            <div className={styles.historyList}>
                {
                    searchHistory.map((item, index) => (
                        <div 
                            key={index} 
                            className={styles.historyItem}
                            onClick={() => onItemClick(item)}
                        >
                            {item}
                        </div>
                    ))
                }
            </div>
        </div>
    )
})

const ShopSearch = () => {
    const [query, setQuery] = useState("")
    const {
        hotList,
        setHotList,
        suggestList,
        setSuggestList,
        searchHistory,
        addSearchHistory,
        clearSearchHistory
    } = useProductSearchStore()

    useTitle('搜索商品 - 毛球伴侣')

    useEffect(() => {
        setHotList()
    }, [setHotList])

    // 处理搜索查询
    const handleQuery = (query) => {
        console.log('debounce后', query)
        setQuery(query)
        if (!query) {
            return
        }
        setSuggestList(query)
    }

    // 处理点击搜索项
    const handleItemClick = (keyword) => {
        addSearchHistory(keyword)
        // 这里可以跳转到搜索结果页面或执行搜索
        console.log('搜索:', keyword)
    }

    // 处理清除历史记录
    const handleClearHistory = () => {
        clearSearchHistory()
    }

    const suggestListStyle = {
        display: query === "" ? 'none' : 'block'
    }

    return (
        <div className={styles.container}>
            <ProductSearchBox handleQuery={handleQuery} />
            <div className={styles.wrapper}>
                {/* 搜索历史 */}
                <SearchHistoryItems 
                    searchHistory={searchHistory}
                    onItemClick={handleItemClick}
                    onClearHistory={handleClearHistory}
                />
                
                {/* 热门推荐 */}
                <HotListItems 
                    hotList={hotList}
                    onItemClick={handleItemClick}
                /> 
                
                {/* 搜索建议 */}
                {Array.isArray(suggestList) && suggestList.length > 0 && (
                    <div className={styles.suggest} style={suggestListStyle}>
                        <h2>🔍 搜索建议</h2>
                        {
                           suggestList.map((item, index) => (
                                <div 
                                    key={index} 
                                    className={styles.suggestItem}
                                    onClick={() => handleItemClick(item)}
                                >
                                    {item}
                                </div>
                           )) 
                        }
                    </div>
                )}
            </div>
        </div>
    )
}

export default ShopSearch
