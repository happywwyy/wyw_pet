// 宠物商品mock数据
const productCategories = {
  food: ['狗粮', '猫粮', '零食', '营养品', '罐头', '湿粮'],
  toys: ['玩具球', '逗猫棒', '咬胶', '毛绒玩具', '智能玩具', '训练玩具'],
  clothes: ['宠物衣服', '雨衣', '毛衣', '背心', '帽子', '鞋子'],
  accessories: ['牵引绳', '项圈', '胸背带', '宠物包', '水碗', '食盆'],
  care: ['洗护用品', '美容工具', '指甲剪', '梳子', '牙刷', '清洁剂'],
  health: ['驱虫药', '营养膏', '钙片', '维生素', '益生菌', '护眼液']
}

const brands = ['皇家', 'Hill\'s', '冠能', '麦富迪', '比瑞吉', '伟嘉', '好主人', '宝路', '珍宝', '康多乐']
const colors = ['红色', '蓝色', '粉色', '黄色', '绿色', '紫色', '黑色', '白色', '橙色', '灰色']

// 生成随机商品数据
function generateProduct(id) {
  const categoryKeys = Object.keys(productCategories)
  const category = categoryKeys[Math.floor(Math.random() * categoryKeys.length)]
  const products = productCategories[category]
  const product = products[Math.floor(Math.random() * products.length)]
  const brand = brands[Math.floor(Math.random() * brands.length)]
  const color = colors[Math.floor(Math.random() * colors.length)]
  
  const width = Math.floor(Math.random() * 200) + 200 // 200-400
  const height = Math.floor(Math.random() * 300) + 200 // 200-500
  
  const price = Math.floor(Math.random() * 500) + 20 // 20-520
  const originalPrice = price + Math.floor(Math.random() * 100) + 10 // 比价格高10-110
  
  return {
    id,
    name: `${brand} ${product}`,
    description: `优质${product}，适合猫咪和狗狗使用，${color}款式，品质保证`,
    price: price,
    originalPrice: originalPrice,
    image: `https://picsum.photos/${width}/${height}?random=${id}`,
    category: category,
    brand: brand,
    color: color,
    width: width,
    height: height,
    sales: Math.floor(Math.random() * 10000) + 100,
    rating: (Math.random() * 2 + 3).toFixed(1), // 3.0-5.0
    stock: Math.floor(Math.random() * 1000) + 10
  }
}

// 热门商品关键词
const hotKeywords = [
  '狗粮', '猫粮', '玩具', '牵引绳', '宠物衣服', 
  '零食', '洗护', '营养品', '项圈', '宠物包'
]

export default [
  // 获取商品列表
  {
    url: '/api/products',
    method: 'get',
    response: (req) => {
      const page = parseInt(req.query.page) || 1
      const pageSize = 20
      const products = []
      
      for (let i = (page - 1) * pageSize; i < page * pageSize; i++) {
        products.push(generateProduct(i + 1))
      }
      
      return {
        code: 200,
        data: products,
        message: 'success'
      }
    }
  },
  
  // 获取搜索建议
  {
    url: '/api/products/suggest',
    method: 'get',
    response: (req) => {
      const keyword = req.query.keyword || ''
      const suggestions = []
      
      // 模拟搜索建议
      Object.values(productCategories).flat().forEach(product => {
        if (product.includes(keyword) && suggestions.length < 10) {
          suggestions.push(product)
        }
      })
      
      return {
        code: 200,
        data: suggestions,
        message: 'success'
      }
    }
  },
  
  // 获取热门商品
  {
    url: '/api/products/hot',
    method: 'get',
    response: () => {
      return {
        code: 200,
        data: hotKeywords.map((keyword, index) => ({
          id: index + 1,
          name: keyword,
          searchCount: Math.floor(Math.random() * 10000) + 1000
        })),
        message: 'success'
      }
    }
  }
]

