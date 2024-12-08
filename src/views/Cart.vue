<template>
    <div class="container py-5">
      <!-- ... template giữ nguyên ... -->
    </div>
  </template>
  
  <script>
  export default {
    name: 'Cart',
    data() {
      return {
        cartItems: []
      }
    },
    methods: {
      updateQuantity(item) {
        // Cập nhật số lượng
        if (item.quantity < 1) item.quantity = 1
        // Emit để cập nhật số lượng trên navbar
        this.$emit('update-cart')
        this.saveCart()
      },
      removeItem(item) {
        if (confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
          this.cartItems = this.cartItems.filter(i => i.id !== item.id)
          this.$emit('update-cart')
          this.saveCart()
        }
      },
      saveCart() {
        localStorage.setItem('cart', JSON.stringify({
          items: this.cartItems,
          count: this.cartItems.reduce((sum, item) => sum + item.quantity, 0)
        }))
      }
    },
    mounted() {
      // Load giỏ hàng từ localStorage
      const savedCart = localStorage.getItem('cart')
      if (savedCart) {
        const { items } = JSON.parse(savedCart)
        this.cartItems = items
      }
    }
  }
  </script>