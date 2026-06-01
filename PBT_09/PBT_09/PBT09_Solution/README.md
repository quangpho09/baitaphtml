# 📋 PHIẾU BÀI TẬP 09 - DOM Manipulation & Events

## 📁 Cấu trúc folder

```
PBT09_Solution/
├── answers.md                    # Phần A (Kiểm tra đọc hiểu) + Phần C (Debug & Phân tích)
├── todo_app/                     # Bài B1: Todo App hoàn chỉnh
│   ├── index.html
│   ├── style.css
│   └── app.js
├── product_catalog/              # Bài B2: Interactive Product Catalog
│   ├── index.html
│   ├── style.css
│   └── app.js
├── form_validator/               # Bài B3: Form Validator
│   ├── index.html
│   ├── style.css
│   └── app.js
├── keyboard_app/                 # Bài B4: Keyboard Shortcuts & Accessibility
│   ├── index.html
│   ├── style.css
│   └── app.js
├── screenshots/                  # Folder chứa screenshots (tối thiểu 2 ảnh/app)
├── videos/                       # Folder chứa video OBS
└── README.md                     # File này
```

---

## 🚀 Hướng dẫn chạy từng bài

### Bài B1: Todo App

**Chức năng:**
- ✅ Thêm todo bằng form (Enter hoặc click nút)
- ✅ Xóa todo
- ✅ Toggle completed (click vào text)
- ✅ Edit todo (double-click hoặc nút sửa)
- ✅ Filter: All / Active / Completed
- ✅ Đếm items left
- ✅ Clear all completed
- ✅ LocalStorage persistence

**Điểm nổi bật:**
- Event Delegation: Tất cả events bind trên `#todoList`
- `createElement` thay vì `innerHTML` để tránh XSS
- LocalStorage để persist data

---

### Bài B2: Product Catalog

**Chức năng:**
- ✅ Render 15 products từ array JS (KHÔNG hardcode HTML)
- ✅ Search realtime (event `input`)
- ✅ Filter by category (buttons)
- ✅ Sort: Giá ↑↓, Tên A-Z, Rating cao nhất
- ✅ Click product → Modal chi tiết
- ✅ Add to cart → Badge counter
- ✅ Dark mode toggle

**Điểm nổi bật:**
- 100% content render bằng JavaScript
- Event Delegation cho grid
- Dark mode với localStorage
- Modal tạo bằng JS

---

### Bài B3: Form Validator

**Chức năng:**
- ✅ Name: 2-50 ký tự, real-time validation
- ✅ Email: Regex validate, real-time error message
- ✅ Password: Strength meter (weak/medium/strong)
  - Yếu (đỏ): < 8 ký tự
  - Trung bình (vàng): 8+ ký tự, chữ + số
  - Mạnh (xanh): 8+ ký tự, chữ hoa + thường + số + ký tự đặc biệt
- ✅ Confirm password: Real-time check
- ✅ Phone: Auto-format `0901-234-567`
- ✅ Terms checkbox
- ✅ Submit button disabled đến khi tất cả valid
- ✅ Show success modal

**Điểm nổi bật:**
- Real-time validation (event `input`)
- Password strength visualization
- Phone number auto-formatting
- Success modal với dữ liệu nhập

---

### Bài B4: Keyboard Shortcuts & Accessibility

**Chức năng:**
- ✅ Gallery:
  - **← →** để chuyển ảnh
  - **1-9** để nhảy đến ảnh
  - **Space** để play/pause slideshow
  - **Click ảnh** để fullscreen
  - **Escape** để đóng modal
  
- ✅ Command Palette:
  - **Ctrl+K** mở ô tìm kiếm (giống VS Code)
  - Gõ keyword → lọc commands
  - **↑↓** để select, **Enter** execute, **Escape** close

- ✅ Accessibility:
  - **Tab** focus navigation
  - **Aria labels** trên tất cả interactive elements
  - **Focus ring** visible
  - **Screen reader support**

**Điểm nổi bật:**
- Hoàn chỉnh keyboard navigation
- Command palette tìm kiếm thời gian thực
- ARIA attributes cho accessibility
- Focus management

---

## 🔧 Công nghệ sử dụng

- **HTML5** - Semantic markup
- **CSS3** - Flexbox, Grid, Gradients, Transitions
- **Vanilla JavaScript** - KHÔNG dùng jQuery hay framework
- **LocalStorage** - Persistence

---

## 💡 Điểm đặt biệt

### 1. **Event Delegation (Todo App & Product Catalog)**
```javascript
// ✅ GOOD - Event delegation
list.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-delete')) {
        deleteItem(e.target);
    }
});

// ❌ BAD - Bind trên từng element
items.forEach(item => {
    item.addEventListener('click', handler);
});
```

### 2. **XSS Prevention (Form Validator)**
```javascript
// ✅ SAFE - Dùng textContent hoặc createElement
div.textContent = userInput; // Không parse HTML

// ❌ DANGEROUS - innerHTML từ user input
div.innerHTML = userInput; // Execute script!
```

### 3. **Real-time Validation (Form Validator)**
```javascript
input.addEventListener('input', () => {
    validateField();
    updateUI();
    checkFormValidity();
});
```

### 4. **Keyboard Shortcuts (Keyboard App)**
```javascript
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        previousImage();
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        openPalette();
    }
});
```

---

## 📝 Yêu cầu nộp bài

- [ ] File `answers.md` - Phần A + C đầy đủ
- [ ] Folder `todo_app/` + `product_catalog/` + `form_validator/` + `keyboard_app/`
  - Mỗi folder phải có: `index.html` + `style.css` + `app.js`
  - Code phải chạy được trực tiếp (KHÔNG cần build)
- [ ] Folder `screenshots/` - Ít nhất 2 ảnh/app
- [ ] Folder `videos/` - Video OBS demo (10-15 phút)
- [ ] Ít nhất **5 commits** git (1 commit/bài)

---

## 🎓 Kiến thức cần hiểu

### DOM Selectors
```javascript
document.querySelector()          // Chọn 1 element
document.querySelectorAll()       // Chọn tất cả
document.getElementById()         // By ID
document.getElementsByClassName() // By class (live)
```

### DOM Manipulation
```javascript
element.textContent    // Text thuần
element.innerHTML      // HTML code
element.classList      // Add/remove/toggle class
element.appendChild()   // Thêm child
element.removeChild()   // Xóa child
element.remove()       // Xóa element
```

### Event Listeners
```javascript
element.addEventListener('event', handler)
element.removeEventListener('event', handler)
e.preventDefault()     // Chặn hành động mặc định
e.stopPropagation()    // Dừng event bubbling
e.target               // Element được click
e.currentTarget        // Element có listener
```

### Event Delegation
```javascript
container.addEventListener('click', (e) => {
    const item = e.target.closest('.item');
    if (item) {
        // Xử lý item
    }
});
```

---

## 🐛 Debugging Tips

1. **Console.log()** - Kiểm tra giá trị
2. **Console errors** - Kiểm tra tab Console
3. **Inspect Element** - F12 để xem DOM
4. **Network tab** - Kiểm tra localStorage
5. **Breakpoints** - Tạm dừng code

---

## 📚 Tài liệu tham khảo

- [MDN: DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
- [MDN: Events](https://developer.mozilla.org/en-US/docs/Web/API/Event)
- [MDN: querySelector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)
- [MDN: classList](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList)
- [MDN: LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

---

## 📞 Liên hệ & Hỗ trợ

Nếu có vấn đề:
1. Kiểm tra browser console (F12)
2. Kiểm tra file path (index.html, style.css, app.js)
3. Xem trong folder có `app.js` không?
4. Clear browser cache (Ctrl+Shift+Delete)

---

**Chúc bạn hoàn thành bài tập! 🎉**
