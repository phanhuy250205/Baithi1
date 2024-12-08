import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    total: 0,
    shippingFee: 30000
  }),

  getters: {
    cartCount: (state) => {
      // Thêm kiểm tra mảng rỗng
      return state.items?.length > 0 
        ? state.items.reduce((sum, item) => sum + item.quantity, 0)
        : 0
    },

    subtotal: (state) => {
      // Thêm kiểm tra mảng rỗng
      return state.items?.length > 0
        ? state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        : 0
    },

    finalTotal: (state) => {
      return state.subtotal + state.shippingFee
    }
  },

  actions: {
    addToCart(product) {
      try {
        if (!product || !product.id) {
          throw new Error('Invalid product')
        }

        const existingItem = this.items.find(item => item.id === product.id)
        if (existingItem) {
          existingItem.quantity = Math.min(99, existingItem.quantity + 1)
        } else {
          this.items.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
          })
        }
        this.updateTotal()
        this.saveToStorage()
        return true
      } catch (error) {
        console.error('Error adding to cart:', error)
        return false
      }
    },

    removeFromCart(productId) {
      try {
        if (!productId) return false
        
        const initialLength = this.items.length
        this.items = this.items.filter(item => item.id !== productId)
        
        if (this.items.length !== initialLength) {
          this.updateTotal()
          this.saveToStorage()
          return true
        }
        return false
      } catch (error) {
        console.error('Error removing from cart:', error)
        return false
      }
    },

    updateQuantity(productId, quantity) {
      try {
        if (!productId || typeof quantity !== 'number') return false

        const item = this.items.find(item => item.id === productId)
        if (item) {
          item.quantity = Math.max(1, Math.min(99, quantity))
          this.updateTotal()
          this.saveToStorage()
          return true
        }
        return false
      } catch (error) {
        console.error('Error updating quantity:', error)
        return false
      }
    },

    increaseQuantity(productId) {
      try {
        const item = this.items.find(item => item.id === productId)
        if (item && item.quantity < 99) {
          item.quantity++
          this.updateTotal()
          this.saveToStorage()
          return true
        }
        return false
      } catch (error) {
        console.error('Error increasing quantity:', error)
        return false
      }
    },

    decreaseQuantity(productId) {
      try {
        const item = this.items.find(item => item.id === productId)
        if (item && item.quantity > 1) {
          item.quantity--
          this.updateTotal()
          this.saveToStorage()
          return true
        }
        return false
      } catch (error) {
        console.error('Error decreasing quantity:', error)
        return false
      }
    },

    updateTotal() {
      this.total = this.subtotal + this.shippingFee
    },

    saveToStorage() {
      try {
        const cartData = {
          items: this.items,
          total: this.total,
          updatedAt: new Date().toISOString()
        }
        localStorage.setItem('cart', JSON.stringify(cartData))
      } catch (error) {
        console.error('Error saving cart:', error)
      }
    },

    loadFromStorage() {
      try {
        const savedCart = localStorage.getItem('cart')
        if (savedCart) {
          const { items, total } = JSON.parse(savedCart)
          this.items = Array.isArray(items) ? items : []
          this.total = typeof total === 'number' ? total : 0
        } else {
          this.clearCart()
        }
      } catch (error) {
        console.error('Error loading cart:', error)
        this.clearCart()
      }
    },

    clearCart() {
      this.items = []
      this.total = 0
      localStorage.removeItem('cart')
    }
  }
})