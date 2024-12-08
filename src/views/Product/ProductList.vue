<template>
  <div class="product-page">
    <div class="container py-5">
      <!-- Header Section -->
      <div class="header-section mb-5">
        <h2 class="text-center main-title">Sản Phẩm Của Chúng Tôi</h2>
        <p class="text-center text-muted">Khám phá các sản phẩm chất lượng cao của chúng tôi</p>
      </div>

      <!-- Filter Section -->
      <div class="filter-section mb-4">
    <div class="row justify-content-between align-items-center">
      <div class="col-md-4">
        <div class="filter-box">
          <i class="fas fa-filter me-2"></i>
          <select v-model="selectedCategory" class="form-select custom-select">
            <option value="">Tất cả danh mục</option>
            <option value="smartphone">Điện thoại</option>
            <option value="laptop">Laptop</option>
            <option value="tablet">Máy tính bảng</option>
            <option value="headphone">Tai nghe</option>
          </select>
        </div>
      </div>
      <div class="col-md-4 text-end">
        <span class="results-count">
          Hiển thị {{ filteredProducts.length }} sản phẩm
        </span>
      </div>
    </div>
  </div>

      <!-- Products Grid -->
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        <div v-for="product in filteredProducts" :key="product.id" class="col">
          <ProductBox :product="product" @add-to-cart="handleAddToCart" />
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredProducts.length === 0" class="text-center py-5">
        <i class="fas fa-box-open fs-1 text-muted mb-3"></i>
        <p class="text-muted">Không tìm thấy sản phẩm nào trong danh mục này</p>
      </div>
    </div>
  </div>
</template>

<script>
import ProductBox from '@/components/ProductBox.vue'
import products from '@/data/product'

export default {
  name: 'ProductList',
  components: {
    ProductBox
  },
  data() {
    return {
      products,
      selectedCategory: ''
    }
  },
  methods: {
      handleAddToCart(product) {
        this.$emit('add-to-cart', product)
        this.$router.push('/cart')
      }
  },
  computed: {
    // Lấy unique categories từ data
    categories() {
      return [...new Set(this.products.map(product => product.category))]
    },
    filteredProducts() {
      if (this.selectedCategory) {
        return this.products.filter(product => product.category === this.selectedCategory)
      }
      return this.products
    }
  }
}
</script>

<style scoped>
.product-page {
  background-color: #f8f9fa;
  min-height: 100vh;
}

.main-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.filter-section {
  background-color: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.filter-box {
  display: flex;
  align-items: center;
  background-color: #f8f9fa;
  padding: 0.5rem 1rem;
  border-radius: 8px;
}

.custom-select {
  border: none;
  background-color: transparent;
  padding-left: 0.5rem;
  cursor: pointer;
}

.custom-select:focus {
  box-shadow: none;
  border: none;
}

.results-count {
  color: #6c757d;
  font-size: 0.9rem;
}

/* Animation cho các sản phẩm */
.col {
  opacity: 0;
  animation: fadeIn 0.5s ease forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Delay animation cho từng sản phẩm */
.col:nth-child(1) { animation-delay: 0.1s; }
.col:nth-child(2) { animation-delay: 0.2s; }
.col:nth-child(3) { animation-delay: 0.3s; }
.col:nth-child(4) { animation-delay: 0.4s; }

@media (max-width: 768px) {
  .filter-section {
    padding: 1rem;
  }
  
  .results-count {
    margin-top: 1rem;
    text-align: left;
  }
}
</style> 