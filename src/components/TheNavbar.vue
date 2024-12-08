<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container">
      <router-link class="navbar-brand" to="/">
        <img src="../assets/logo.png" alt="Logo" class="logo">
      </router-link>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Trang chủ</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/products">Sản phẩm</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">Giới thiệu</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/contact">Liên hệ</router-link>
          </li>
        </ul>

        <div class="d-flex align-items-center ms-auto  ">
          <router-link to="/cart" class="cart-btn me-3">
            <i class="fas fa-shopping-cart"></i>
            <span 
            v-if="cartItemCount > 0" 
            class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
          >
            {{ cartItemCount }}
          </span>
          </router-link>
          <!-- Hiển thị khi chưa đăng nhập -->
          <template v-if="!isLoggedIn">
            <router-link to="/login" class="login-btn">
              <i class="fas fa-user"></i>
              Đăng nhập
            </router-link>
          </template>

          <!-- Hiển thị khi đã đăng nhập -->
          <template v-else>
            <div class="user-menu">
              <span class="username">Xin chào, {{ fullname }}</span>
              <button @click="handleLogout" class="logout-btn">
                <i class="fas fa-sign-out-alt"></i>
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
import { logout } from '../store/auth' // Import hàm `logout` từ file auth trong thư mục store
import Swal from 'sweetalert2' // Import thư viện SweetAlert2 để sử dụng popup đẹp và tiện dụng

export default {
  name: 'TheNavbar',
  
  props: {
    cartItemCount: {
      type: Number,
      default: 0
    }
  },// Định nghĩa tên của component
  data() {
    return {
      isLoggedIn: false, // Trạng thái đăng nhập của người dùng, mặc định là chưa đăng nhập
      fullname: '' // Tên đầy đủ của người dùng, mặc định là chuỗi rỗng
    }
  },
  created() {
    this.checkLoginStatus() // Kiểm tra trạng thái đăng nhập khi component được tạo
  },
  mounted() {
    this.checkLoginStatus() // Kiểm tra trạng thái đăng nhập sau khi component được render lên giao diện
  },
  methods: {
    // Phương thức kiểm tra trạng thái đăng nhập
    checkLoginStatus() {
      const userStr = localStorage.getItem('user') // Lấy thông tin user từ localStorage
      if (userStr) {
        const user = JSON.parse(userStr) // Parse chuỗi JSON thành object
        this.isLoggedIn = true // Nếu tồn tại thông tin, đặt trạng thái là đã đăng nhập
        this.fullname = user.fullname // Lấy tên đầy đủ của người dùng từ object
        console.log('User data:', user) // Ghi log ra console để debug
      } else {
        this.isLoggedIn = false // Nếu không có thông tin, đặt trạng thái là chưa đăng nhập
        this.fullname = '' // Đặt tên đầy đủ là chuỗi rỗng
      }
    },
    // Phương thức xử lý đăng xuất
    async handleLogout() {
      const result = await Swal.fire({
        title: 'Xác nhận', // Tiêu đề popup
        text: 'Bạn có chắc chắn muốn đăng xuất?', // Nội dung popup
        icon: 'question', // Biểu tượng câu hỏi
        showCancelButton: true, // Hiển thị nút hủy
        confirmButtonText: 'Đăng xuất', // Nội dung nút xác nhận
        cancelButtonText: 'Hủy', // Nội dung nút hủy
        confirmButtonColor: '#d33', // Màu nút xác nhận
        cancelButtonColor: '#3085d6', // Màu nút hủy
      })

      if (result.isConfirmed) { // Nếu người dùng xác nhận đăng xuất
        logout() // Gọi hàm logout từ store để xử lý logic đăng xuất
        this.isLoggedIn = false // Cập nhật trạng thái đăng nhập
        this.fullname = '' // Xóa tên đầy đủ của người dùng

        await Swal.fire({ // Hiển thị popup thông báo đăng xuất thành công
          icon: 'success', // Biểu tượng thành công
          title: 'Đã đăng xuất', // Tiêu đề thông báo
          text: 'Đăng xuất thành công!', // Nội dung thông báo
          timer: 1500, // Tự động đóng sau 1.5 giây
          showConfirmButton: false // Không hiển thị nút xác nhận
        })

        this.$router.push('/login') // Chuyển hướng người dùng về trang đăng nhập
      }
    }
  },
  watch: {
    // Theo dõi sự thay đổi của route
    $route() {
      this.checkLoginStatus() // Khi route thay đổi, kiểm tra lại trạng thái đăng nhập
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

.logo {
  height: 40px;
}

.nav-link {
  color: #333;
  font-weight: 500;
  padding: 0.5rem 1rem;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #abc0ac;
}

.nav-buttons {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.login-btn, .logout-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.login-btn {
  background-color: #abc0ac;
  color: black;
  text-decoration: none;
}

.login-btn:hover {
  background-color: #45a049;
  color: white;
}

.logout-btn {
  background-color: #dc3545;
  color: white;
}

.logout-btn:hover {
  background-color: #c82333;
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.username {
  color: #333;
  font-weight: 500;
}

@media (max-width: 991px) {
  .nav-buttons {
    margin-top: 1rem;
  }
  
  .user-menu {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style> 