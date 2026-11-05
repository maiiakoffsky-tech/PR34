import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: JSON.parse(localStorage.getItem('cart_items')) || [],
    warningMessage: '',
    lastState: null
  }),
  
  getters: {
    count: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
    sum: (state) => state.items.reduce((total, item) => total + item.price * item.quantity, 0)
  },
  
  actions: {
    saveHistory() {
      this.lastState = JSON.parse(JSON.stringify(this.items))
    },

    addToCart(product) {
      this.warningMessage = ''
      
      // Проверка лимита (не больше 10)
      if (this.count >= 10) {
        this.warningMessage = 'Нельзя добавить больше 10 товаров!'
        return
      }

      this.saveHistory()
      const existing = this.items.find((i) => i.id === product.id)
      if (existing) {
        existing.quantity += 1
      } else {
        this.items.push({ 
          id: product.id, 
          name: product.name, 
          price: product.price, 
          quantity: 1 
        })
      }
      this.saveToLocalStorage()
    },

    removeFromCart(id) {
      this.saveHistory()
      this.items = this.items.filter((i) => i.id !== id)
      this.saveToLocalStorage()
    },

    updateQuantity(id, delta) {
      this.saveHistory()
      const item = this.items.find((i) => i.id === id)
      if (!item) return
      item.quantity += delta
      if (item.quantity <= 0) {
        this.removeFromCart(id)
      } else {
        this.saveToLocalStorage()
      }
    },

    clearCart() {
      this.saveHistory()
      this.items = []
      this.saveToLocalStorage()
    },

    undo() {
      if (this.lastState) {
        this.items = JSON.parse(JSON.stringify(this.lastState))
        this.lastState = null
        this.saveToLocalStorage()
      }
    },

    saveToLocalStorage() {
      localStorage.setItem('cart_items', JSON.stringify(this.items))
    }
  }
})