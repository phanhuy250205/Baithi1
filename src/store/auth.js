// Danh sách người dùng giả lập (mock data) để mô phỏng cơ sở dữ liệu
const users = [
    {
        username: "phanhuy",
        password: "1234",
        fullname: "Phan Huy",
        // role: "admin",
    }
]

// Hàm đăng nhập giả lập (fake login)
// Nhận vào tên tài khoản và mật khẩu, trả về một Promise
export const fakelogin = async (username, password) => {
    await new Promise(resolve => setTimeout(resolve, 1000))

    const user = users.find(u => u.username === username && u.password === password)
    
    if (user) {
        const userData = {
            username: user.username,
            fullname: user.fullname,
            role: user.role
        }
        localStorage.setItem('user', JSON.stringify(userData))
        return userData
    }

    throw new Error('Invalid credentials')
}

// Hàm kiểm tra trạng thái đăng nhập
export const checkAuthStatus = () => {
    const userStr = localStorage.getItem('user') // Lấy thông tin người dùng từ localStorage
    if (!userStr) return null // Nếu không có thông tin, trả về null
    try {
        return JSON.parse(userStr) // Chuyển đổi chuỗi JSON thành object và trả về
    } catch (error) {
        return null // Nếu có lỗi khi parse JSON, trả về null
    }
}

// Hàm đăng xuất
export const logout = () => {
    localStorage.removeItem('user') // Xóa thông tin người dùng khỏi localStorage
}

// Hàm lưu thông tin người dùng vào localStorage
export const saveUserToStorage = (user) => {
    localStorage.setItem('user', JSON.stringify(user)) // Lưu object người dùng dưới dạng chuỗi JSON
}
//Kiểm tra trạng thái đăng nhập 
