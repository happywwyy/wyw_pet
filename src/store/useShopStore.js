import { create } from 'zustand'
import { getProducts } from '../api/shop'

export const useShopStore = create((set, get) => ({
    products: [],
    pages: 1,
    loading: false,
    initialized: false,
    fetchMore: async () => {
        // 如果还在请求中，不再发起新的请求
        if (get().loading) return
        set({ loading: true }) // 请求中
        try {
            const res = await getProducts(get().pages)
            console.log('API响应:', res)
            
            // 安全地获取数据，确保是数组
            let newProducts = []
            
            if (res && res.data) {
                // 如果有res.data，使用它
                newProducts = Array.isArray(res.data) ? res.data : []
            } else if (Array.isArray(res)) {
                // 如果res本身就是数组
                newProducts = res
            } else {
                console.warn('意外的API响应格式:', res)
            }
            
            console.log('处理后的商品数据:', newProducts)
            
            // 拿到之前的状态
            set((state) => {
                const currentProducts = Array.isArray(state.products) ? state.products : []
                return {
                    products: [...currentProducts, ...newProducts],
                    pages: state.pages + 1,
                    loading: false,
                    initialized: true
                }
            })
        } catch (error) {
            console.error('获取商品列表失败:', error)
            set({ loading: false, initialized: true })
        }
    },
    reset: () => {
        set({
            products: [],
            pages: 1,
            loading: false,
            initialized: false
        })
    }
}))
