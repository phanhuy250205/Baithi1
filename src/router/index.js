import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductList from '../views/Product/ProductList.vue'
import ProductDetail from '../views/Product/ProductDetail.vue'
import LoginView from '../views/LoginView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/products',
    name: 'products',
    component: ProductList
  },
  {
    path: '/product/:id',
    name: 'productDetail',
    component: ProductDetail,
    props: true,
    beforeEnter: (to, from, next) => {
      // Kiểm tra đăng nhập trước khi vào trang chi tiết
      const isLoggedIn = localStorage.getItem('user') !== null
      if (!isLoggedIn) {
        next('/login')
      } else {
        next()
      }
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router 