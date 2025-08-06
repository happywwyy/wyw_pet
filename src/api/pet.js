import axios from './config'

// 获取宠物列表
export const getPets = () => {
  return axios.get('/pets')
}

// 添加宠物
export const addPet = (petData) => {
  return axios.post('/pets', petData)
}

// 更新宠物信息
export const updatePet = (id, petData) => {
  return axios.put(`/pets/${id}`, petData)
}

// 删除宠物
export const deletePet = (id) => {
  return axios.delete(`/pets/${id}`)
}

// 获取宠物详情
export const getPetDetail = (id) => {
  return axios.get(`/pets/${id}`)
}