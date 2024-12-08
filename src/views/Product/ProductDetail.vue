<template>
  <div class="container py-5">
    <div class="row" v-if="product">
      <!-- Hình ảnh sản phẩm -->
      <div class="col-md-6 mb-4">
        <img :src="product.image" :alt="product.name" class="img-fluid rounded">
      </div>

      <!-- Thông tin sản phẩm -->
      <div class="col-md-6">
        <h1 class="mb-3">{{ product.name }}</h1>
        
        <!-- Giá và giảm giá -->
        <div class="price-section mb-4">
          <span v-if="product.discount" class="text-decoration-line-through text-muted me-2">
            {{ formatPrice(product.price) }}đ
          </span>
          <span class="text-danger h3 mb-0">
            {{ formatPrice(calculateFinalPrice) }}đ
          </span>
          <span v-if="product.discount" class="badge bg-danger ms-2">
            -{{ product.discount }}%
          </span>
        </div>

        <!-- Số lượng -->
        <div class="quantity-section mb-4">
          <label class="form-label">Số lượng:</label>
          <div class="input-group" style="width: 200px;">
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

        <!-- Nút thêm vào giỏ -->
        <button 
          class="btn btn-success btn-lg w-100 mb-4" 
          @click="addToCart"
        >
          <i class="fas fa-shopping-cart me-2"></i>
          Thêm vào giỏ hàng
        </button>

        <!-- Thông tin chi tiết -->
        <div class="product-info">
          <h5 class="mb-3">Thông tin sản phẩm:</h5>
          <ul class="list-unstyled">
            <li class="mb-2"><strong>Thương hiệu:</strong> {{ product.brand }}</li>
            <li class="mb-2"><strong>Danh mục:</strong> {{ product.category }}</li>
            <li class="mb-2"><strong>Bảo hành:</strong> {{ product.warranty }}</li>
            <li class="mb-2">
              <strong>Tình trạng:</strong>
              <span :class="product.inStock ? 'text-success' : 'text-danger'">
                {{ product.inStock ? 'Còn hàng' : 'Hết hàng' }}
              </span>
            </li>
          </ul>

          <h5 class="mb-3">Mô tả:</h5>
          <p>{{ product.description }}</p>

          <h5 class="mb-3">Thông số kỹ thuật:</h5>
          <ul class="list-unstyled">
            <li v-for="(value, key) in product.detailedDescription" :key="key" class="mb-2">
              <strong>{{ key }}:</strong> {{ value }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Loading state -->
    <div v-else class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script>
import products from '@/data/product'

export default {
  name: 'ProductDetail',
  data() {
    return {
      product: null,
      quantity: 1
    }
  },
  computed: {
    calculateFinalPrice() {
      if (this.product && this.product.discount) {
        return this.product.price * (1 - this.product.discount / 100)
      }
      return this.product ? this.product.price : 0
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
    addToCart() {
      const cartItem = {
        productId: this.product.id,
        name: this.product.name,
        price: this.calculateFinalPrice,
        quantity: this.quantity,
        image: this.product.image
      }
      
      console.log('Thêm vào giỏ:', cartItem)
      this.quantity = 1
      
      // TODO: Emit event hoặc dispatch action để xử lý thêm vào giỏ hàng
    },
    loadProduct() {
      const id = parseInt(this.$route.params.id)
      this.product = products.find(p => p.id === id)
      
      if (!this.product) {
        this.$router.push('/404')
      }
    }
  },
  created() {
    this.loadProduct()
  }
}
</script>

<style scoped>
.img-fluid {
  max-height: 500px;
  object-fit: contain;
}

/* Ẩn mũi tên của input number */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

/* Style cho nút thêm vào giỏ */
.btn-success {
  background-color: #abc0ac;
  border-color: #abc0ac;
  transition: all 0.3s;
}

.btn-success:hover {
  background-color: #45a049;
  border-color: #45a049;
  transform: translateY(-2px);
}

/* Animation cho nút */
.btn-success:active {
  transform: translateY(0);
}
</style>