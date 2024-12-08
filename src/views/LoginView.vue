<template>
  <div class="login-container">
    <div class="login-box">
      <div class="logo-container">
        <img src="../assets/logo.png" alt="Logo" class="logo">
      </div>
      
      <h1 class="text-1xl font-bold text-gray-700 mb-4 text-center">Đăng Nhập</h1>
      
      <form class="login-form" @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Tài khoản</label>
          <input 
            type="text" 
            id="username" 
            class="form-control"
            placeholder="Nhập tài khoản"
            v-model="username"
            required
          >
        </div>

        <div class="form-group">
          <label for="password">Mật khẩu</label>
          <input 
            type="password" 
            id="password" 
            class="form-control"
            placeholder="Nhập mật khẩu"
            v-model="password"
            required
          >
        </div>

        <div class="remember-me">
          <input type="checkbox" id="remember">
          <label for="remember">Ghi nhớ đăng nhập</label>
        </div>

        <button type="submit" class="login-btn" :disabled="isLoading">
          {{ isLoading ? 'Đang đăng nhập...' : 'Đăng Nhập' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { fakelogin } from '../store/auth'
import Swal from 'sweetalert2'

export default {
  name: 'LoginView',
  data() {
    return {
      username: '',
      password: '',
      isLoading: false
    }
  },
  methods: {
    async handleLogin() {
      if (!this.username || !this.password) {
        Swal.fire({
          icon: 'warning',
          title: 'Thông báo',
          text: 'Vui lòng nhập đầy đủ thông tin!'
        })
        return
      }

      this.isLoading = true
      try {
        const userData = await fakelogin(this.username, this.password)
        console.log('Login successful:', userData) // Debug line

        await Swal.fire({
          icon: 'success',
          title: 'Thành công',
          text: 'Đăng nhập thành công!',
          timer: 1500,
          showConfirmButton: false
        })

        this.$router.push('/')
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: 'Tên đăng nhập hoặc mật khẩu không đúng!'
        })
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.login-box {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo-container {
  text-align: center;
  margin-bottom: 2rem;
}

.logo {
  width: 120px;
  height: auto;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-size: 0.9rem;
}

.form-control {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem 0;
}

.login-btn {
  width: 100%;
  padding: 0.75rem;
  background-color: #abc0ac;
  color: black;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-btn:hover {
  background-color: #45a049;
}

.login-btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style> 