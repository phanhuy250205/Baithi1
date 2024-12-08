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
          <!-- Nút giảm -->
          <button 
            class="btn btn-outline-secondary" 
            type="button" 
            @click="decreaseQuantity"
            :disabled="quantity <= 1"
            title="Giảm số lượng"
          >
            <i class="fas fa-minus"></i>
          </button>
          
          <!-- Input số lượng -->
          <input 
            type="number" 
            class="form-control text-center" 
            v-model.number="quantity"
            min="1" 
            max="99"
            :title="`Số lượng từ 1-99`"
          >
          
          <!-- Nút tăng -->
          <button 
            class="btn btn-outline-secondary" 
            type="button" 
            @click="increaseQuantity"
            :disabled="quantity >= 99"
            title="Tăng số lượng"
          >
            <i class="fas fa-plus"></i>
          </button>
        </div>
      </div>

      <!-- Các nút thao tác -->
      <div class="mt-auto">
        <div class="d-grid gap-2">
          <!-- Nút xem chi tiết -->
          <router-link 
            :to="{ name: 'productDetail', params: { id: product.id }}" 
            class="btn btn-outline-primary"
            title="Xem thông tin chi tiết sản phẩm"
          >
            <i class="fas fa-eye"></i> Chi tiết
          </router-link>
          
          <!-- Nút thêm vào giỏ -->
          <button 
            class="btn btn-success" 
            type="button" 
            @click="addToCart"
            title="Thêm sản phẩm vào giỏ hàng"
          >
            <i class="fas fa-shopping-cart"></i> Thêm vào giỏ
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductBox',
  props: {
    // Nhận thông tin sản phẩm từ component cha
    product: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      quantity: 1 // Số lượng mặc định là 1
    }
  },
  computed: {
    // Tính giá sau khi giảm giá
    calculateFinalPrice() {
      if (this.product.discount) {
        return this.product.price * (1 - this.product.discount / 100)
      }
      return this.product.price
    }
  },
  methods: {
    // Format giá tiền theo định dạng VND
    formatPrice(price) {
      return price.toLocaleString('vi-VN')
    },
    // Tăng số lượng
    increaseQuantity() {
      if (this.quantity < 99) {
        this.quantity++
      }
    },
    // Giảm số lượng
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--
      }
    },
    // Xử lý thêm vào giỏ hàng
    addToCart() {
      this.$emit('add-to-cart', {
        id: this.product.id,
        name: this.product.name,
        price: this.product.price,
        image: this.product.image,
        quantity: 1
      })
    }
  }
}
</script>

<style scoped>
/* Ẩn mũi tên mặc định của input number */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

/* Style cho card */
.card {
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}

/* Style cho hình ảnh */
.card-img-top {
  height: 200px;
  object-fit: cover;
}

/* Style cho tiêu đề */
.card-title {
  font-size: 1rem;
  height: 2.4em;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

/* Style cho nút thêm vào giỏ */
.btn-success {
  background-color: #abc0ac;
  border-color: #abc0ac;
}

.btn-success:hover {
  background-color: #45a049;
  border-color: #45a049;
}

/* Animation cho nút thêm vào giỏ */
.card:hover .btn-success {
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}
</style>