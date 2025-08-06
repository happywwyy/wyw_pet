import { create } from 'zustand'
import { getPets, addPet, updatePet, deletePet } from '../api/pet'

export const usePetStore = create((set, get) => ({
  pets: [],
  loading: false,
  
  // 获取宠物列表
  fetchPets: async () => {
    set({ loading: true })
    try {
      const res = await getPets()
      set({ 
        pets: res.data || res,
        loading: false 
      })
    } catch (error) {
      console.error('获取宠物列表失败:', error)
      set({ loading: false })
    }
  },
  
  // 添加宠物
  addPet: async (petData) => {
    set({ loading: true })
    try {
      const res = await addPet(petData)
      const newPet = res.data || res
      set((state) => ({ 
        pets: [...state.pets, newPet],
        loading: false 
      }))
      return newPet
    } catch (error) {
      console.error('添加宠物失败:', error)
      set({ loading: false })
      throw error
    }
  },
  
  // 更新宠物
  updatePet: async (id, petData) => {
    set({ loading: true })
    try {
      const res = await updatePet(id, petData)
      const updatedPet = res.data || res
      set((state) => ({
        pets: state.pets.map(pet => 
          pet.id === id ? updatedPet : pet
        ),
        loading: false
      }))
      return updatedPet
    } catch (error) {
      console.error('更新宠物失败:', error)
      set({ loading: false })
      throw error
    }
  },
  
  // 删除宠物
  deletePet: async (id) => {
    set({ loading: true })
    try {
      await deletePet(id)
      set((state) => ({
        pets: state.pets.filter(pet => pet.id !== id),
        loading: false
      }))
    } catch (error) {
      console.error('删除宠物失败:', error)
      set({ loading: false })
      throw error
    }
  }
}))