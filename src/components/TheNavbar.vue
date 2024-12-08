<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container">
      <!-- Logo -->
      <router-link class="navbar-brand" to="/">
        <img src="../assets/logo.png" alt="Logo" class="logo">
      </router-link>

      <!-- Toggle button for mobile -->
      <button 
        class="navbar-toggler" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <!-- Main Navigation -->
        <ul class="navbar-nav">
          <li v-for="item in navigationItems" :key="item.path" class="nav-item">
            <router-link :to="item.path" class="nav-link">
              {{ item.name }}
            </router-link>
          </li>
        </ul>

        <!-- Cart & User Section -->
        <div class="d-flex align-items-center ms-auto">
          <!-- Shopping Cart -->
          <router-link to="/cart" class="cart-btn me-3 position-relative">
            <i class="fas fa-shopping-cart"></i>
            <span 
              v-if="cartCount > 0" 
              class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            >
              {{ cartCount }}
            </span>
          </router-link>

          <!-- User Authentication -->
          <template v-if="!isLoggedIn">
            <router-link to="/login" class="login-btn">
              <i class="fas fa-user me-2"></i>
              Đăng nhập
            </router-link>
          </template>

          <template v-else>
            <div class="user-menu">
              <span class="username">Xin chào, {{ fullname }}</span>
              <button @click="handleLogout" class="logout-btn">
                <i class="fas fa-sign-out-alt me-2"></i>
                Đăng xuất
              </button>
            </div>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { useCartStore } from '../store/cart'  // Sửa đường dẫn thành stores
import { storeToRefs } from 'pinia'
import { logout } from '../store/auth'
import Swal from 'sweetalert2'

export default {
  name: 'TheNavbar',
  
  setup() {
    const cartStore = useCartStore()
    const { cartCount } = storeToRefs(cartStore)
    
    return {
      cartStore,
      cartCount
    }
  },

  data() {
    return {
      isLoggedIn: false,
      fullname: '',
      navigationItems: [
        { path: '/', name: 'Trang chủ' },
        { path: '/products', name: 'Sản phẩm' },
        { path: '/about', name: 'Giới thiệu' },
        { path: '/contact', name: 'Liên hệ' }
      ]
    }
  },

  created() {
    this.initializeNavbar()
  },

  mounted() {
    this.initializeNavbar()
  },

  methods: {
    initializeNavbar() {
      this.checkLoginStatus()
      this.cartStore.loadFromStorage()
    },

    checkLoginStatus() {
      try {
        const userStr = localStorage.getItem('user')
        if (userStr) {
          const user = JSON.parse(userStr)
          this.isLoggedIn = true
          this.fullname = user.fullname || 'Người dùng'
        } else {
          this.isLoggedIn = false
          this.fullname = ''
        }
      } catch (error) {
        console.error('Error checking login status:', error)
        this.handleLogout()
      }
    },

    async handleLogout() {
      try {
        const result = await this.showLogoutConfirmation()
        
        if (result.isConfirmed) {
          await this.performLogout()
        }
      } catch (error) {
        console.error('Error during logout:', error)
        this.showErrorMessage()
      }
    },

    async showLogoutConfirmation() {
      return Swal.fire({
        title: 'Xác nhận đăng xuất',
        text: 'Bạn có chắc chắn muốn đăng xuất?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Đăng xuất',
        cancelButtonText: 'Hủy',
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#6c757d',
      })
    },

    async performLogout() {
      logout()
      this.isLoggedIn = false
      this.fullname = ''
      this.cartStore.clearCart()

      await Swal.fire({
        icon: 'success',
        title: 'Đã đăng xuất',
        text: 'Hẹn gặp lại bạn!',
        timer: 1500,
        showConfirmButton: false
      })

      this.$router.push('/login')
    },

    showErrorMessage() {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Có lỗi xảy ra khi đăng xuất'
      })
    }
  },

  watch: {
    '$route'() {
      this.checkLoginStatus()
    },
    cartCount(newCount) {
      console.log('Cart count updated:', newCount)
    }
  }
}
</script>

<style scoped>
.navbar {
  padding: 1rem;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* Logo styles */
.logo {
  height: 40px;
  width: auto;
}

/* Navigation links */
.nav-link {
  color: #333;
  font-weight: 500;
  padding: 0.5rem 1rem;
  transition: color 0.3s;

  
}

/* Shopping cart */
.cart-btn {
  color: #333;
  font-size: 1.2rem;
  text-decoration: none;
  transition: color 0.3s;
  padding: 0.5rem;

 
}

.badge {
  font-size: 0.7rem;
  padding: 0.35em 0.65em;
}

/* Authentication buttons */
.login-btn {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: #abc0ac;
  color: black;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 500;
  transition: all 0.3s;

  
}

.login-btn:hover {
  background-color: #abc0ac;
}

/* User menu */
.user-menu {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.username {
  color: #333;
  font-weight: 500;
}

.logout-btn {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;

  
}

/* Responsive styles */
@media (max-width: 991.98px) {
  .nav-buttons {
    margin-top: 1rem;
    flex-direction: column;
    align-items: flex-start;
  }
  
  .user-menu {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }

  .logout-btn {
    width: 100%;
  }
}
</style>