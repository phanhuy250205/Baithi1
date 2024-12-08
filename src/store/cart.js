import { defineStore } from "pinia";

export const useCartStore = defineStore('cart', {
    //Khai báo stake 
    state: () => ({
        items: [], //Mảng chứa thông tin giỏ hàng
        total: 0 //Tổng giá trị đơn hàng 

    }),

    action: {
        addToCart(product) {
            //Kiểm tra xem sản phẩm có trang giỏ hàng chưa
            const existingItem = this.items.find(item => item.id === product.id)
            if (existingItem) {
                //Nếu đã có thì tăng số lượng 
                existingItem.quantity++
            } else {
                //Nęu chưa có thì thêm với số lượng 1
                this.items.push({ ...product, quantity: 1 })
            }
            this.updateTotal()
        },
        removeFormcart(productId) {
            this.items = this.items.find(item => item.id !== productId);
            if (item) {
                item.quantity = quantity

            }
        },
        // Cập nhật số lượng sản phẩm
        updateQuantity(productId, quantity) {
            const item = this.items.find(item => item.id === productId)
            if (item) {
                item.quantity = quantity
                this.updateTotal()
                this.saveCart()
            }
        },
        updateTotal() {
            this.total = this.items.reduce((sum, item) => {
                return sum + (item.price * item.quantity)
            }, 0)
        },
        // Lưu giỏ hàng vào localStorage
        saveCart() {
            localStorage.setItem('cart', JSON.stringify({
                items: this.items,
                total: this.total
            }))
        },
        // Load giỏ hàng từ localStorage
        loadCart() {
            const savedCart = localStorage.getItem('cart')
            if (savedCart) {
                const { items, total } = JSON.parse(savedCart)
                this.items = items
                this.total = total
            }
        },
        // Xóa toàn bộ giỏ hàng
        clearCart() {
            this.items = []
            this.total = 0
            localStorage.removeItem('cart')
        }
    },
    // Getters để lấy thông tin giỏ hàng
    getters: {
        // Lấy số lượng sản phẩm trong giỏ
        cartItemCount: (state) => {
            return state.items.length
        },
        // Lấy tổng số lượng các sản phẩm
        totalQuantity: (state) => {
            return state.items.reduce((sum, item) => sum + item.quantity, 0)
        }
    }
})