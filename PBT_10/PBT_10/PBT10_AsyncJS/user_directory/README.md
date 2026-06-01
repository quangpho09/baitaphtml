# 👥 User Directory - CRUD Operations

Ứng dụng quản lý danh sách người dùng với CRUD operations (Create, Read, Update, Delete).

## 📋 Chức năng

- ✅ **READ:** Load danh sách users từ API → Hiển thị dạng table
- ✅ **CREATE:** Form thêm user mới → POST lên API → Thêm vào danh sách
- ✅ **UPDATE:** Click "Edit" → Form pre-fill data → PUT lên API → Cập nhật
- ✅ **DELETE:** Click "Delete" → Confirm → DELETE API → Xóa khỏi danh sách
- ✅ **SEARCH:** Tìm kiếm theo tên/email (client-side filter)
- ✅ **Loading states:** Skeleton loader khi fetch
- ✅ **Error handling:** Toast notifications khi có lỗi

## 🔗 API Sử dụng

**JSONPlaceholder** - Fake REST API

```
GET    /users          ← Lấy danh sách users
GET    /users/:id      ← Lấy chi tiết 1 user
POST   /users          ← Tạo user mới
PUT    /users/:id      ← Cập nhật user
DELETE /users/:id      ← Xóa user
```

Base URL: `https://jsonplaceholder.typicode.com`

### Response structure:
```javascript
{
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    address: {
        city: "New York"
    }
}
```

## 📦 Cấu trúc file

```
user_directory/
├── index.html      # HTML template + Modal
├── style.css       # Styling + Responsive
├── app.js          # Logic (CRUD) - TODO
└── README.md       # Hướng dẫn (file này)
```

## 🚀 Cách chạy

1. Mở `index.html` trong browser
2. Hoặc dùng Live Server

## 📝 TODO - Các bước implement

### Step 1: Implement READ (api.getUsers)
```javascript
async getUsers() {
    const response = await fetch(`${this.baseURL}/users`);
    
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }
    
    return await response.json();
}
```

### Step 2: Implement CREATE (api.createUser)
```javascript
async createUser(data) {
    const response = await fetch(`${this.baseURL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: data.name,
            email: data.email,
            phone: data.phone,
            address: { city: data.city }
        })
    });
    
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }
    
    return await response.json();
}
```

### Step 3: Implement UPDATE (api.updateUser)
```javascript
async updateUser(id, data) {
    const response = await fetch(`${this.baseURL}/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: data.name,
            email: data.email,
            phone: data.phone,
            address: { city: data.city }
        })
    });
    
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }
    
    return await response.json();
}
```

### Step 4: Implement DELETE (api.deleteUser)
```javascript
async deleteUser(id) {
    const response = await fetch(`${this.baseURL}/users/${id}`, {
        method: 'DELETE'
    });
    
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }
    
    return await response.json();
}
```

## ✅ Điểm chấm

- **5đ:** Fetch + render danh sách users
- **5đ:** Create + Update + Delete hoạt động
- **5đ:** Search + Error handling + Toast
- **5đ:** Skeleton loading + Modal UX

## 🔍 Testing

### Test CREATE
```
1. Click "Thêm người dùng mới"
2. Điền form (tên, email, ...)
3. Click "Lưu"
4. ✅ User mới phải xuất hiện ở đầu bảng
5. ✅ Toast "Thêm thành công" phải hiển thị
```

### Test UPDATE
```
1. Click "Sửa" cạnh user
2. Form phải pre-fill data cũ
3. Thay đổi tên → Click "Lưu"
4. ✅ Bảng phải update tên
5. ✅ Toast "Cập nhật thành công"
```

### Test DELETE
```
1. Click "Xóa" → Confirm dialog
2. ✅ User phải disappear từ bảng
3. ✅ Toast "Xóa thành công"
```

### Test SEARCH
```
1. Type "John" → Bảng phải filter hiển thị users có tên John
2. Type email → Phải filter theo email
3. Clear search → Phải hiển thị tất cả
```

### Test LOADING
```
1. Reload trang
2. ✅ Skeleton loader phải hiển thị 1-2 giây
3. ✅ Data phải load hoàn toàn rồi mới hide skeleton
```

## 💡 Tips

- Dùng `event.preventDefault()` trong form để tránh page reload
- Để phân biệt Create vs Update: kiểm tra `userId` value
- Filter client-side: không cần gọi API
- POST/PUT body phải là JSON string
- DELETE không cần body nhưng vẫn cần `method: 'DELETE'`

## 📚 Tham khảo

- [Fetch API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/)
- [HTTP Methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)
