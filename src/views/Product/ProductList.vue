<template>
  <div class="product-page">
    <div class="container py-5">
      <!-- Phần tiêu đề -->
      <div class="header-section mb-5">
        <h2 class="text-center main-title">Sản Phẩm Của Chúng Tôi</h2>
        <p class="text-center text-muted">Khám phá các sản phẩm chất lượng cao của chúng tôi</p>
      </div>

      <!-- Phần lọc sản phẩm -->
      <div class="filter-section mb-4">
        <div class="row justify-content-between align-items-center">
          <!-- Dropdown chọn danh mục -->
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
          <!-- Hiển thị số lượng sản phẩm -->
          <div class="col-md-4 text-end">
            <span class="results-count">
              Hiển thị {{ filteredProducts.length }} sản phẩm
            </span>
          </div>
        </div>
      </div>

      <!-- Lưới sản phẩm -->
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        <div v-for="product in filteredProducts" :key="product.id" class="col">
          <!-- Truyền sản phẩm và lắng nghe sự kiện thêm vào giỏ -->
          <ProductBox 
            :product="product" 
            @add-to-cart="handleAddToCart" 
          />
        </div>
      </div>

      <!-- Hiển thị khi không có sản phẩm -->
      <div v-if="filteredProducts.length === 0" class="text-center py-5">
        <i class="fas fa-box-open fs-1 text-muted mb-3"></i>
        <p class="text-muted">Không tìm thấy sản phẩm nào trong danh mục này</p>
      </div>
    </div>
  </div>
</template>

<script>
import ProductBox from '@/components/ProductBox.vue'
import products from '@/data/product' // Import dữ liệu sản phẩm

export default {
  name: 'ProductList',
  components: {
    ProductBox // Đăng ký component ProductBox
  },
  data() {
    return {
      products, // Danh sách sản phẩm
      selectedCategory: '' // Danh mục đang được chọn
    }
  },
  methods: {
    // Xử lý khi nhận được sự kiện thêm vào giỏ từ ProductBox
    handleAddToCart(product) {
      // Emit sự kiện lên component cha (App.vue)
      this.$emit('add-to-cart', product)
      // Chuyển hướng đến trang giỏ hàng
      this.$router.push('/cart')
    }
  },
  computed: {
    // Lấy danh sách danh mục duy nhất từ sản phẩm
    categories() {
      return [...new Set(this.products.map(product => product.category))]
    },
    // Lọc sản phẩm theo danh mục đã chọn
    filteredProducts() {
      if (this.selectedCategory) {
        return this.products.filter(product => product.category === this.selectedCategory)
      }
      return this.products // Trả về tất cả nếu không chọn danh mục
    }
  }
}
</script>

<style scoped>
/* Style cho trang sản phẩm */
.product-page {
  background-color: #f8f9fa;
  min-height: 100vh;
}

/* Style cho tiêu đề */
.main-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 1rem;
}

/* Style cho phần lọc */
.filter-section {
  background-color: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* Style cho hộp lọc */
.filter-box {
  display: flex;
  align-items: center;
  background-color: #f8f9fa;
  padding: 0.5rem 1rem;
  border-radius: 8px;
}

/* Style cho dropdown */
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

/* Style cho số lượng kết quả */
.results-count {
  color: #6c757d;
  font-size: 0.9rem;
}

/* Animation cho sản phẩm */
.col {
  opacity: 0;
  animation: fadeIn 0.5s ease forwards;
}

/* Định nghĩa animation fadeIn */
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

/* Responsive */
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