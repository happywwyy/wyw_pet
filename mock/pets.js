// 宠物数据模拟
let pets = [
  {
    id: 1,
    name: '小白',
    type: '猫咪',
    breed: '英国短毛猫',
    age: 2,
    gender: '雌性',
    color: '白色',
    weight: 3.5,
    avatar: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=200&h=200&fit=crop&crop=face',
    description: '温顺可爱的小白猫，喜欢晒太阳和玩毛线球',
    vaccinated: true,
    sterilized: false,
    adoptionDate: '2022-03-15',
    owner: {
      name: '张小明',
      phone: '13888888888'
    }
  },
  {
    id: 2,
    name: '大黄',
    type: '狗狗',
    breed: '金毛寻回犬',
    age: 3,
    gender: '雄性',
    color: '金黄色',
    weight: 28.5,
    avatar: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=200&h=200&fit=crop&crop=face',
    description: '活泼友善的金毛犬，很喜欢游泳和捡球',
    vaccinated: true,
    sterilized: true,
    adoptionDate: '2021-08-20',
    owner: {
      name: '李小红',
      phone: '13999999999'
    }
  },
  {
    id: 3,
    name: '花花',
    type: '兔子',
    breed: '荷兰兔',
    age: 1,
    gender: '雌性',
    color: '黑白相间',
    weight: 1.2,
    avatar: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=200&h=200&fit=crop&crop=face',
    description: '可爱的小兔子，喜欢吃胡萝卜和青菜',
    vaccinated: true,
    sterilized: false,
    adoptionDate: '2023-01-10',
    owner: {
      name: '王小华',
      phone: '13777777777'
    }
  }
]

export default [
  // 获取宠物列表
  {
    url: '/api/pets',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: pets,
        message: '获取成功'
      }
    }
  },
  
  // 添加宠物
  {
    url: '/api/pets',
    method: 'post',
    response: (req) => {
      const newPet = {
        id: Date.now(),
        ...req.body,
        avatar: req.body.avatar || 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=200&h=200&fit=crop&crop=face'
      }
      pets.push(newPet)
      return {
        code: 0,
        data: newPet,
        message: '添加成功'
      }
    }
  },
  
  // 更新宠物信息
  {
    url: /\/api\/pets\/(\d+)/,
    method: 'put',
    response: (req) => {
      const id = parseInt(req.url.match(/\/api\/pets\/(\d+)/)[1])
      const index = pets.findIndex(pet => pet.id === id)
      if (index !== -1) {
        pets[index] = { ...pets[index], ...req.body }
        return {
          code: 0,
          data: pets[index],
          message: '更新成功'
        }
      }
      return {
        code: 1,
        message: '宠物不存在'
      }
    }
  },
  
  // 删除宠物
  {
    url: /\/api\/pets\/(\d+)/,
    method: 'delete',
    response: (req) => {
      const id = parseInt(req.url.match(/\/api\/pets\/(\d+)/)[1])
      const index = pets.findIndex(pet => pet.id === id)
      if (index !== -1) {
        pets.splice(index, 1)
        return {
          code: 0,
          message: '删除成功'
        }
      }
      return {
        code: 1,
        message: '宠物不存在'
      }
    }
  },
  
  // 获取宠物详情
  {
    url: /\/api\/pets\/(\d+)/,
    method: 'get',
    response: (req) => {
      const id = parseInt(req.url.match(/\/api\/pets\/(\d+)/)[1])
      const pet = pets.find(pet => pet.id === id)
      if (pet) {
        return {
          code: 0,
          data: pet,
          message: '获取成功'
        }
      }
      return {
        code: 1,
        message: '宠物不存在'
      }
    }
  }
]