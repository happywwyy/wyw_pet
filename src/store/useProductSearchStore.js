// 商品搜索全局共享状态
import { create } from 'zustand'
import { getSuggestProducts, getHotProducts } from '@/api/shop'

const useProductSearchStore = create((set, get) => {
    // 从localStorage读取搜索历史
    const searchHistory = JSON.parse(localStorage.getItem('productSearchHistory')) || []
    
    return {
        searchHistory,
        suggestList: [], // suggest 返回 list
        hotList: [], // hot 返回 list
        
        // 添加搜索历史
        addSearchHistory: (keyword) => {
            const history = get().searchHistory || []
            const newHistory = [keyword, ...history.filter(item => item !== keyword)].slice(0, 10)
            localStorage.setItem('productSearchHistory', JSON.stringify(newHistory))
            set({ searchHistory: newHistory })
        },
        
        // 清除搜索历史
        clearSearchHistory: () => {
            localStorage.removeItem('productSearchHistory')
            set({ searchHistory: [] })
        },
        
        // 设置建议列表
        setSuggestList: async (keyword) => {
            try {
                const res = await getSuggestProducts(keyword)
                console.log(res)
                const data = res.data || res || []
                set({ suggestList: Array.isArray(data) ? data : [] })
            } catch (error) {
                console.error('获取搜索建议失败:', error)
                set({ suggestList: [] })
            }
        },
        
        // 设置热门列表
        setHotList: async () => {
            try {
                const res = await getHotProducts()
                console.log(res)
                const data = res.data || res || []
                set({ hotList: Array.isArray(data) ? data : [] })
            } catch (error) {
                console.error('获取热门商品失败:', error)
                set({ hotList: [] })
            }
        }
    }
})

export default useProductSearchStore
