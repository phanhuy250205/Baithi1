<template>
  <div class="home">
    <!-- Banner Section -->
    <div class="banner">
      <h1>Welcome to Home Page</h1>
    </div>

    <!-- Featured Products Section -->
    <div class="container py-5">
      <div class="section-title text-center mb-5">
        <h2>Sản Phẩm Nổi Bật</h2>
        <p class="text-muted">Khám phá những sản phẩm bán chạy nhất của chúng tôi</p>
      </div>

      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        <div v-for="product in featuredProducts" :key="product.id" class="col">
          <ProductBox :product="product" />
        </div>
      </div>

      <div class="text-center mt-5">
        <router-link to="/products" class="btn btn-outline-primary">
          Xem tất cả sản phẩm
          <i class="fas fa-arrow-right ms-2"></i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import ProductBox from '@/components/ProductBox.vue'
import products from '@/data/product'

export default {
  name: 'HomeView',
  components: {
    ProductBox
  },
  computed: {
    featuredProducts() {
      return products.slice(0, 4)
    }
  }
}
</script>

<style scoped>
.home {
  background-color: #f8f9fa;
}

.banner {
  height: 400px;
  background: url(https://i.pinimg.com/236x/36/74/2a/36742a392b7d9508b649fb4a48d3e318.jpg);
  background-size: cover;
  background-position: center;
  object-fit: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  margin-bottom: 2rem;
}

.banner h1 {
  font-size: 3rem;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.section-title h2 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.btn-outline-primary {
  padding: 10px 30px;
  border-color: #abc0ac;
  color: #abc0ac;
  transition: all 0.3s;
}

.btn-outline-primary:hover {
  background-color: #abc0ac;
  border-color: #abc0ac;
  color: white;
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
  .banner h1 {
    font-size: 2rem;
  }
  
  .section-title h2 {
    font-size: 2rem;
  }
}
</style> 