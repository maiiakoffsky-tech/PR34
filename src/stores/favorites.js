import { defineStore } from 'pinia'

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    items: JSON.parse(localStorage.getItem('favorites_items')) || []
  }),
  getters: {
    count: (state) => state.items.length
  },
  actions: {
    toggleFavorite(product) {
      const index = this.items.findIndex((i) => i.id === product.id)
      if (index !== -1) {
        this.items.splice(index, 1)
      } else {
        this.items.push(product)
      }
      localStorage.setItem('favorites_items', JSON.stringify(this.items))
    }
  }
})