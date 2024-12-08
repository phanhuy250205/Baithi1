<template>
  <div id="app">
    <TheNavbar :cart-item-count="cartCount" />
    <router-view 
      @add-to-cart="handleAddToCart"
      @update-cart="updateCartCount"
    ></router-view>
  </div>
</template>

<script>
import TheNavbar from './components/TheNavbar.vue'

export default {
  name: 'App',
  components: {
    TheNavbar
  },
  data() {
    return {
      cartItems: [],
      cartCount: 0
    }
  },
  methods: {
    handleAddToCart(product) {
      // Kiểm tra sản phẩm đã có trong giỏ chưa
      const existingItem = this.cartItems.find(item => item.id === product.id)
      
      if (existingItem) {
        existingItem.quantity++
      } else {
        this.cartItems.push(product)
      }

      // Cập nhật số lượng
      this.updateCartCount()
      // Lưu vào localStorage
      this.saveCart()
    },
    updateCartCount() {
      this.cartCount = this.cartItems.reduce((sum, item) => sum + item.quantity, 0)
    },
    saveCart() {
      localStorage.setItem('cart', JSON.stringify({
        items: this.cartItems,
        count: this.cartCount
      }))
    },
    loadCart() {
      const savedCart = localStorage.getItem('cart')
      if (savedCart) {
        const { items, count } = JSON.parse(savedCart)
        this.cartItems = items
        this.cartCount = count
      }
    }
  },
  mounted() {
    // Load giỏ hàng khi khởi động
    this.loadCart()
  }
}
</script>