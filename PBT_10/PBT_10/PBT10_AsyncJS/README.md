# PHIẾU BÀI TẬP 10 - ASYNC JAVASCRIPT & API INTEGRATION

📚 Bài tập về Async JavaScript, Fetch API, và tích hợp nhiều APIs.

## 📋 Cấu trúc thư mục

```
PBT10_AsyncJS/
├── answers.md              # ĐÁP ÁN Phần A + C
├── README.md               # File này
├── weather_app/            # Bài B1: Weather App
│   ├── index.html
│   ├── style.css
│   ├── app.js
│   └── README.md
├── user_directory/         # Bài B2: User Directory (CRUD)
│   ├── index.html
│   ├── style.css
│   ├── app.js
│   └── README.md
├── gallery/                # Bài B3: Infinite Scroll Gallery
│   ├── index.html
│   ├── style.css
│   ├── app.js
│   └── README.md
├── dashboard/              # Bài B4: Multi-API Dashboard
│   ├── index.html
│   ├── style.css
│   ├── app.js
│   └── README.md
├── screenshots/            # Thư mục lưu screenshot
│   ├── weather_app/
│   ├── user_directory/
│   ├── gallery/
│   └── dashboard/
└── videos/                 # Thư mục lưu video OBS
```

## 🎯 Yêu cầu nộp bài

- [ ] **answers.md** - Đáp án Phần A (A1, A2, A3) + Phần C (C1, C2)
- [ ] **weather_app/** - Bài B1 (5+5+5 = 15đ)
- [ ] **user_directory/** - Bài B2 (20đ)
- [ ] **gallery/** - Bài B3 (15đ)
- [ ] **dashboard/** - Bài B4 (15đ)
- [ ] **screenshots/** - Mỗi app: Loading, Success, Error states
- [ ] **videos/** - Video OBS thực hành (25đ) - Bắt buộc

## 📝 Phần A - Kiểm tra đọc hiểu (15đ)

### A1 (5đ) - Sync vs Async
- Dự đoán thứ tự output của code
- Giải thích Event Loop, Microtask Queue, Macrotask Queue

### A2 (5đ) - Fetch API
- Giải thích từng dòng code
- `response.ok`, `response.json()`, error handling

### A3 (5đ) - Promise States
- Vẽ sơ đồ Promise lifecycle
- Callback Hell vs async/await

**→ File: `answers.md`**

## 💻 Phần B - Thực hành Code (65đ)

### B1 - Weather App (15đ)
🔗 **API:** wttr.in hoặc Open-Meteo

**Chức năng:**
- Input city name → Fetch weather data
- Show: Temperature, Humidity, Description, Icon
- 3 States: Loading (spinner), Success (data), Error
- LocalStorage: Lưu lịch sử 5 thành phố gần nhất
- Click lịch sử → Tìm lại

**Chấm:** 
- 5đ: API fetch + JSON parse
- 5đ: 3 states UI
- 5đ: LocalStorage history

**→ Folder: `weather_app/`**

---

### B2 - User Directory CRUD (20đ)
🔗 **API:** JSONPlaceholder (/users)

**Chức năng:**
- **READ:** Load users → Display table
- **CREATE:** Form → POST → Add to list
- **UPDATE:** Click Edit → Form pre-fill → PUT
- **DELETE:** Click Delete → Confirm → Remove
- **SEARCH:** Filter by name/email (client-side)
- **Loading:** Skeleton loader
- **Error:** Toast notifications

**Code requirement:**
```javascript
const api = {
    async getUsers() { ... },
    async createUser(data) { ... },
    async updateUser(id, data) { ... },
    async deleteUser(id) { ... }
};

const ui = {
    renderUsers(users) { ... },
    showLoading() { ... },
    showError(message) { ... }
};
```

**Chấm:**
- 5đ: Read + Render
- 5đ: Create + Update + Delete
- 5đ: Search + Error + Toast
- 5đ: Modal UX + Skeleton

**→ Folder: `user_directory/`**

---

### B3 - Infinite Scroll Gallery (15đ)
🔗 **API:** JSONPlaceholder Photos hoặc Lorem Picsum

**Chức năng:**
- Load 20 images initially
- **Infinite scroll:** Auto-load 20 more when scroll near bottom
- **Lazy loading:** Images load khi visible (IntersectionObserver)
- Click image → Lightbox modal
- Lightbox: Prev/Next buttons, Keyboard arrows
- **Responsive:** 4 cols (desktop), 2 cols (tablet), 1 col (mobile)

**Code requirement:**
```javascript
// IntersectionObserver cho infinite scroll
const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        loadMorePhotos();
    }
});
observer.observe(document.querySelector("#loadTrigger"));
```

**Chấm:**
- 5đ: Load + Grid display
- 5đ: Infinite scroll auto-load
- 5đ: Lazy loading + Lightbox

**→ Folder: `gallery/`**

---

### B4 - Multi-API Dashboard (15đ)
🔗 **APIs:** Minimum 3, tối đa 6

Gợi ý:
- JSONPlaceholder (Users, Posts)
- Open-Meteo (Weather)
- REST Countries (Country info)
- RandomUser.me (Random users)
- Dog.ceo (Random dog images)

**Chức năng:**
- Load **3+ APIs in parallel** dùng `Promise.all()` hoặc `Promise.allSettled()`
- **Mỗi widget:** Load state riêng (spinner), Success (data), Error
- **1 API lỗi không ảnh hưởng widget khác** → Dùng `Promise.allSettled()`
- Nút "Refresh All" → Reload tất cả
- Hiển thị load time: "Data loaded in X ms"

**Code requirement:**
```javascript
async function loadDashboard() {
    const results = await Promise.allSettled([
        fetch(api1).then(r => r.json()),
        fetch(api2).then(r => r.json()),
        fetch(api3).then(r => r.json())
    ]);
    
    results.forEach((result, index) => {
        if (result.status === "fulfilled") {
            renderWidget(index, result.value);
        } else {
            renderWidgetError(index, result.reason.message);
        }
    });
}
```

**Chấm:**
- 5đ: Parallel API calls
- 5đ: Promise.allSettled logic
- 5đ: Widget state + load time

**→ Folder: `dashboard/`**

---

## 📊 Phần C - Phân tích (20đ)

### C1 (10đ) - Error Handling Strategy
Thiết kế chiến lược xử lý lỗi E-Commerce app:
1. **Network errors** (mất mạng) → Xử lý thế nào?
2. **API errors** (500, 404, 429) → Xử lý từng loại
3. **Timeout** (API chậm) → Viết code `fetchWithTimeout()`
4. **Retry logic** (thử lại 3 lần) → Viết code `fetchWithRetry()`

Viết code + giải thích.

**→ File: `answers.md`**

### C2 (10đ) - Promise Methods
So sánh `.all()` vs `.allSettled()` vs `.race()` vs `.any()`:

| Method | Resolve | Reject | Use case |
|--------|---------|--------|----------|
| `.all()` | ??? | ??? | ??? |
| `.allSettled()` | ??? | ??? | ??? |
| `.race()` | ??? | ??? | ??? |
| `.any()` | ??? | ??? | ??? |

Viết ví dụ code thực tế cho mỗi method.

**→ File: `answers.md`**

---

## 🎬 Phần D - Video OBS (25đ)

**Đề bài:** Code-along "Fetch API — Gọi JSONPlaceholder"

**Yêu cầu video:**
1. 🎤 **Giới thiệu:** Tên, MSSV, lớp
2. 🎤 **Giải thích Sync vs Async:** "Sync = xếp hàng, Async = đặt số"
3. 💻 **Viết hàm async/await:**
   ```javascript
   async function getUsers() {
       try {
           const res = await fetch("https://...");
           if (!res.ok) throw new Error(`HTTP ${res.status}`);
           const users = await res.json();
           return users;
       } catch (error) {
           console.error("Error:", error);
           return [];
       }
   }
   ```
4. 🎤 **Giải thích từng dòng:**
   - `await fetch(...)` — tại sao cần await?
   - `response.ok` — khi nào false?
   - `response.json()` — tại sao cũng cần await?
   - `try...catch` — catch bắt lỗi gì?
5. 🎤 **Render users lên DOM** bằng `createElement`
6. 🎤 **Demo 3 states:**
   - Loading: "⏳ Đang tải..."
   - Success: Render danh sách users
   - Error: Tắt wifi → gọi API → show error (bật lại wifi)
7. 🎤 **Tổng kết:** async/await benefits vs callbacks

**Checklist video:**
- [ ] Webcam mặt SV góc phải dưới
- [ ] Gõ code từng dòng (không copy-paste)
- [ ] Demo live: Loading → Success → Error → Success
- [ ] Độ dài: 10-15 phút
- [ ] Âm thanh rõ ràng
- [ ] Tổng kết + giải thích concept

**File:** `videos/PBT10_HoTen_MaSV.mp4` (hoặc YouTube/Google Drive link)

---

## 📸 Screenshots (Bắt buộc)

Mỗi app phải có screenshot của 3 states:

```
screenshots/
├── weather_app/
│   ├── loading.png
│   ├── success.png
│   └── error.png
├── user_directory/
│   ├── loading.png
│   ├── success_crud.png
│   └── error.png
├── gallery/
│   ├── loading.png
│   ├── success_grid.png
│   └── lightbox.png
└── dashboard/
    ├── loading.png
    ├── success_all_widgets.png
    └── one_widget_error.png
```

---

## ✅ Checklist Nộp Bài

- [ ] **answers.md** (Part A + C)
- [ ] **weather_app/** + README
- [ ] **user_directory/** + README
- [ ] **gallery/** + README
- [ ] **dashboard/** + README
- [ ] **screenshots/** (3 states per app)
- [ ] **videos/** (OBS thực hành)
- [ ] **Ít nhất 5 commits** trên Git
- [ ] README.md nội bộ mỗi folder (API đã dùng, cách chạy)

---

## 🚀 Quick Start

### 1. Implement từng bài

```bash
# Mở weather_app
cd weather_app
# Mở index.html trong browser
# Implement app.js theo TODO comments

# Tương tự cho user_directory/, gallery/, dashboard/
```

### 2. Test từng app

```bash
# Weather App
- Input "Hanoi" → See weather data
- Check LocalStorage (F12 → Application)
- Tắt wifi → Check error state

# User Directory
- Load users từ API
- Create new user → See in list
- Edit user → Update in list
- Delete user → Remove from list
- Search users by name

# Gallery
- Open trang → Load 20 ảnh
- Scroll xuống → Auto-load 20 thêm
- Click ảnh → Lightbox mở
- Arrow keys / ESC → Navigate

# Dashboard
- Load tất cả 6 widgets
- 1 API lỗi (throttle) → Error in 1 widget, 5 others OK
- Refresh All → Load again
```

### 3. Record video OBS

```bash
# Setup OBS
- Source: Display / Window
- Webcam: Add as source (bottom right corner)
- Audio: Desktop + Mic
- Record: 10-15 minutes
- Export: MP4 format
```

### 4. Git commits

```bash
git init
git add .
git commit -m "Init: Bài tập 10 - Async JS & APIs"

git add weather_app/
git commit -m "Feature: Implement Weather App"

git add user_directory/
git commit -m "Feature: Implement User Directory CRUD"

git add gallery/
git commit -m "Feature: Implement Infinite Scroll Gallery"

git add dashboard/
git commit -m "Feature: Implement Multi-API Dashboard"

git add answers.md
git commit -m "Docs: Thêm đáp án Phần A & C"

# Total ≥ 5 commits
```

---

## 📚 Tài liệu tham khảo

### Đã học
- `tuan_5_javascript_dom_async/20_ajax_async.md`
- `tuan_5_javascript_dom_async/21_professional_dev_process.md`

### MDN Docs
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [async/await](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises)
- [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

### APIs Miễn phí (No API key)
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/)
- [wttr.in](https://wttr.in/)
- [Open-Meteo](https://open-meteo.com/)
- [REST Countries](https://restcountries.com/)
- [RandomUser.me](https://randomuser.me/)
- [Dog.ceo](https://dog.ceo/api/)
- [Lorem Picsum](https://picsum.photos/)

---

## 🎓 Learning Outcomes

Sau bài này, bạn sẽ hiểu:
- ✅ Async/await vs Promises vs Callbacks
- ✅ Event Loop, Microtask vs Macrotask
- ✅ Fetch API: GET, POST, PUT, DELETE
- ✅ Error handling với try...catch
- ✅ Promise.all() vs Promise.allSettled()
- ✅ IntersectionObserver cho infinite scroll & lazy loading
- ✅ LocalStorage API
- ✅ DOM manipulation & Event handling
- ✅ Responsive CSS Grid & Flexbox
- ✅ Git workflow & Professional code organization

---

**Chúc bạn hoàn thành bài tập! 🎉**

*Đừng quên commit thường xuyên + quay video demo!*
