<template>
  <div class="card h-100">
    <!-- Hình ảnh sản phẩm -->
    <img :src="product.image" :alt="product.name" class="card-img-top">
    
    <div class="card-body d-flex flex-column">
      <!-- Tên và giá sản phẩm -->
      <h5 class="card-title">{{ product.name }}</h5>
      <div class="price-info mb-3">
        <!-- Giá gốc (nếu có giảm giá) -->
        <span v-if="product.discount" class="original-price text-decoration-line-through text-muted me-2">
          {{ formatPrice(product.price) }}đ
        </span>
        <!-- Giá sau giảm giá -->
        <span class="final-price text-danger fw-bold">
          {{ formatPrice(calculateFinalPrice) }}đ
        </span>
        <!-- Badge giảm giá -->
        <span v-if="product.discount" class="badge bg-danger ms-2">
          -{{ product.discount }}%
        </span>
      </div>

      <!-- Phần điều chỉnh số lượng -->
      <div class="quantity-wrapper mb-3">
        <label class="form-label">Số lượng:</label>
        <div class="input-group">
          <button 
            class="btn btn-outline-secondary" 
            type="button" 
            @click="decreaseQuantity"
            :disabled="quantity <= 1"
          >
            <i class="fas fa-minus"></i>
          </button>
          
          <input 
            type="number" 
            class="form-control text-center" 
            v-model.number="quantity"
            min="1" 
            max="99"
          >
          
          <button 
            class="btn btn-outline-secondary" 
            type="button" 
            @click="increaseQuantity"
            :disabled="quantity >= 99"
          >
            <i class="fas fa-plus"></i>
          </button>
        </div>
      </div>

      <!-- Các nút thao tác -->
      <div class="mt-auto">
        <div class="d-grid gap-2">
          <router-link 
            :to="{ name: 'productDetail', params: { id: product.id }}" 
            class="btn btn-outline-primary"
          >
            <i class="fas fa-eye"></i> Chi tiết
          </router-link>
          
          <button 
            class="btn btn-success" 
            type="button" 
            @click="handleAddToCart"
          >
            <i class="fas fa-shopping-cart"></i> Thêm vào giỏ
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useCartStore } from '@/store/cart'
import Swal from 'sweetalert2'

export default {
  name: 'ProductBox',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  
  setup() {
    const cartStore = useCartStore()
    return { cartStore }
  },

  data() {
    return {
      quantity: 1
    }
  },

  computed: {
    calculateFinalPrice() {
      if (this.product.discount) {
        return this.product.price * (1 - this.product.discount / 100)
      }
      return this.product.price
    }
  },

  methods: {
    formatPrice(price) {
      return price.toLocaleString('vi-VN')
    },

    increaseQuantity() {
      if (this.quantity < 99) {
        this.quantity++
      }
    },

    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--
      }
    },

    async handleAddToCart() {
      // Tạo object sản phẩm với số lượng
      const cartItem = {
        id: this.product.id,
        name: this.product.name,
        price: this.calculateFinalPrice, // Sử dụng giá sau giảm giá
        image: this.product.image,
        quantity: this.quantity
      }

      // Thêm vào giỏ hàng qua store
      this.cartStore.addToCart(cartItem)

      // Hiển thị thông báo thành công
      await Swal.fire({
        icon: 'success',
        title: 'Thành công!',
        text: 'Đã thêm sản phẩm vào giỏ hàng',
        showConfirmButton: false,
        timer: 1500
      })

      // Reset số lượng về 1
      this.quantity = 1
    }
  }
}
</script>

<style scoped>
/* Ẩn mũi tên của input number */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

/* Card styles */
.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: none;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

/* Image styles */
.card-img-top {
  height: 200px;
  object-fit: cover;
  border-top-left-radius: calc(0.375rem - 1px);
  border-top-right-radius: calc(0.375rem - 1px);
}

/* Title styles */
.card-title {
  font-size: 1rem;
  height: 2.4em;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

/* Price styles */
.price-info {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.original-price {
  font-size: 0.9rem;
}

.final-price {
  font-size: 1.1rem;
}

/* Button styles */
.btn-success {
  background-color: #abc0ac;
  border-color: #abc0ac;
  transition: all 0.3s ease;
}

.btn-success:hover {
  background-color: #45a049;
  border-color: #45a049;
  transform: translateY(-2px);
}

.btn-outline-primary:hover {
  transform: translateY(-2px);
}

/* Quantity input styles */
.quantity-wrapper .input-group {
  width: 120px;
  margin: 0 auto;
}

.quantity-wrapper input {
  text-align: center;
  border-left: 0;
  border-right: 0;
}

.quantity-wrapper .btn {
  z-index: 0;
}

/* Animation */
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.card:hover .btn-success {
  animation: pulse 1s infinite;
}
</style>