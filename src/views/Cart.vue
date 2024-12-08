<template>
    <div class="container py-5">
      <h2 class="mb-4">Giỏ hàng của bạn</h2>
  
      <div class="row">
        <!-- Product List Section -->
        <div class="col-lg-8">
          <template v-if="cartStore.items.length > 0">
            <div 
              class="card mb-3" 
              v-for="item in cartStore.items" 
              :key="item.id"
            >
              <div class="card-body">
                <div class="row align-items-center">
                  <!-- Product Image -->
                  <div class="col-md-2">
                    <img 
                      :src="item.image" 
                      :alt="item.name" 
                      class="img-fluid rounded product-image"
                    >
                  </div>
  
                  <!-- Product Info -->
                  <div class="col-md-4">
                    <h5 class="card-title">{{ item.name }}</h5>
                    <p class="text-danger mb-0">{{ formatPrice(item.price) }}đ</p>
                  </div>
  
                  <!-- Quantity Controls -->
                  <div class="col-md-4">
                    <div class="quantity-control">
                      <button 
                        class="btn btn-outline-secondary"
                        @click="handleDecreaseQuantity(item)"
                        :disabled="item.quantity <= 1"
                      >
                        <i class="fas fa-minus"></i>
                      </button>
  
                      <input 
                        type="number" 
                        class="form-control text-center" 
                        v-model.number="item.quantity"
                        min="1"
                        max="99"
                        @change="handleQuantityChange(item)"
                      >
  
                      <button 
                        class="btn btn-outline-secondary"
                        @click="handleIncreaseQuantity(item)"
                        :disabled="item.quantity >= 99"
                      >
                        <i class="fas fa-plus"></i>
                      </button>
                    </div>
                  </div>
  
                  <!-- Remove Button -->
                  <div class="col-md-2 text-end">
                    <button 
                      class="btn btn-outline-danger"
                      @click="handleRemoveItem(item)"
                    >
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </template>
  
          <!-- Empty Cart -->
          <div v-else class="empty-cart-container">
            <i class="fas fa-shopping-cart empty-cart-icon"></i>
            <h4>Giỏ hàng trống</h4>
            <p class="text-muted">Hãy thêm sản phẩm vào giỏ hàng của bạn</p>
            <router-link to="/products" class="btn btn-primary mt-3">
              Tiếp tục mua sắm
            </router-link>
          </div>
        </div>
  
        <!-- Checkout Summary Section -->
        <div class="col-lg-4">
          <div class="card checkout-card">
            <div class="card-body">
              <h5 class="card-title mb-4">
                <i class="fas fa-receipt me-2"></i>
                Thông tin đơn hàng
              </h5>
              
              <!-- Order Details -->
              <div class="order-details">
                <!-- Items Count -->
                <div class="d-flex justify-content-between mb-3">
                  <span class="text-muted">
                    <i class="fas fa-shopping-basket me-2"></i>
                    Số lượng sản phẩm:
                  </span>
                  <span class="fw-medium">{{ cartStore.items.length }} sản phẩm</span>
                </div>

                <!-- Subtotal -->
                <div class="d-flex justify-content-between mb-3">
                  <span class="text-muted">
                    <i class="fas fa-calculator me-2"></i>
                    Tạm tính:
                  </span>
                  <span class="fw-medium">{{ formatPrice(cartStore.subtotal) }}đ</span>
                </div>
                
                <!-- Shipping Fee -->
                <div class="d-flex justify-content-between mb-3">
                  <span class="text-muted">
                    <i class="fas fa-truck me-2"></i>
                    Phí vận chuyển:
                  </span>
                  <span class="fw-medium">{{ formatPrice(cartStore.shippingFee) }}đ</span>
                </div>
                
                <hr class="my-4">
                
                <!-- Total -->
                <div class="d-flex justify-content-between mb-4 total-section">
                  <strong>
                    <i class="fas fa-money-bill-wave me-2"></i>
                    Tổng cộng:
                  </strong>
                  <strong class="text-danger fs-5">
                    {{ formatPrice(cartStore.finalTotal) }}đ
                  </strong>
                </div>

                <!-- Checkout Button -->
                <button 
                  class="btn btn-success w-100 checkout-btn"
                  :disabled="!cartStore.items.length"
                  @click="handleCheckout"
                >
                  <i class="fas fa-credit-card me-2"></i>
                  Thanh toán ngay
                </button>

                <!-- Additional Info -->
                <div class="additional-info mt-3">
                  <div class="secure-payment">
                    <i class="fas fa-lock me-2"></i>
                    <small class="text-muted">Thanh toán an toàn & bảo mật</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { useCartStore } from '../store/cart'
  import { storeToRefs } from 'pinia'
  import Swal from 'sweetalert2'
  
  export default {
    name: 'CartView',
  
    setup() {
      const cartStore = useCartStore()
      const { items, subtotal, finalTotal } = storeToRefs(cartStore)
  
      return {
        cartStore,
        items,
        subtotal,
        finalTotal
      }
    },
  
    methods: {
      formatPrice(price) {
        return price.toLocaleString('vi-VN')
      },
  
      async handleRemoveItem(item) {
        try {
          const result = await Swal.fire({
            title: 'Xác nhận xóa',
            text: 'Bạn có chắc muốn xóa sản phẩm này?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy',
            confirmButtonColor: '#dc3545'
          })
  
          if (result.isConfirmed) {
            this.cartStore.removeFromCart(item.id)
            Swal.fire('Đã xóa!', 'Sản phẩm đã được xóa khỏi giỏ hàng.', 'success')
          }
        } catch (error) {
          console.error('Error removing item:', error)
          Swal.fire('Lỗi!', 'Không thể xóa sản phẩm.', 'error')
        }
      },
  
      handleQuantityChange(item) {
        const quantity = Math.max(1, Math.min(99, item.quantity))
        this.cartStore.updateQuantity(item.id, quantity)
      },
  
      handleIncreaseQuantity(item) {
        this.cartStore.increaseQuantity(item.id)
      },
  
      handleDecreaseQuantity(item) {
        this.cartStore.decreaseQuantity(item.id)
      },
  
      async handleCheckout() {
        await Swal.fire({
          title: 'Đang phát triển',
          text: 'Chức năng thanh toán đang được phát triển!',
          icon: 'info'
        })
      }
    },
  
    created() {
      this.cartStore.loadFromStorage()
    }
  }
  </script>
  
  <style scoped>
  .quantity-control {
    width: 150px;
    display: flex;
    align-items: center;
  }
  
  .quantity-control input {
    width: 60px;
    text-align: center;
    -moz-appearance: textfield;
  }
  
  .quantity-control input::-webkit-inner-spin-button,
  .quantity-control input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  .product-image {
    max-height: 100px;
    object-fit: cover;
  }
  
  .checkout-card {
    position: sticky;
    top: 2rem;
    border-radius: 15px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    background: #fff;
  }
  
  .card-title {
    color: #2c3e50;
    font-weight: 600;
    padding-bottom: 1rem;
    border-bottom: 2px solid #f8f9fa;
  }
  
  .order-details {
    padding: 0.5rem 0;
  }
  
  .total-section {
    background-color: #f8f9fa;
    padding: 1rem;
    margin: 0 -1rem;
    border-radius: 10px;
  }
  
  .checkout-btn {
    padding: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.5px;
    border-radius: 8px;
  }
  
  .additional-info {
    text-align: center;
    padding-top: 1rem;
    border-top: 1px dashed #dee2e6;
  }
  
  .secure-payment {
    color: #6c757d;
  }
  
  .secure-payment i {
    color: #28a745;
  }
  
  .empty-cart-container {
    text-align: center;
    padding: 3rem 0;
  }
  
  .empty-cart-icon {
    font-size: 3rem;
    color: #6c757d;
    margin-bottom: 1rem;
  }
  
  .btn-success {
    background-color: #abc0ac;
    border-color: #abc0ac;
    transition: all 0.3s ease;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  }
  
  .btn-success:hover:not(:disabled) {
    background-color: #45a049;
    border-color: #45a049;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }
  
  @media (max-width: 991.98px) {
    .checkout-card {
      position: static;
      margin-top: 2rem;
    }
  
    .quantity-control {
      margin: 1rem auto;
    }
  }
  </style>