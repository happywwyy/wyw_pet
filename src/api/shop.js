import request from './config'

// 获取商品列表
export const getProducts = (page = 1) => {
  return request({
    url: '/api/products',
    method: 'get',
    params: { page }
  })
}

// 获取商品搜索建议
export const getSuggestProducts = (keyword) => {
  return request({
    url: '/api/products/suggest',
    method: 'get',
    params: { keyword }
  })
}

// 获取热门商品
export const getHotProducts = () => {
  return request({
    url: '/api/products/hot',
    method: 'get'
  })
}

