# PHIẾU BÀI TẬP 10 — ASYNC JAVASCRIPT & API INTEGRATION
## ĐÁP ÁN — PHẦN A + C

---

## PHẦN A — KIỂM TRA ĐỌC HIỂU (15 điểm)

### Câu A1 (5đ) — Sync vs Async

**Dự đoán thứ tự output:**

```
1 - Start
4 - End
3 - Promise
6 - Promise 2
2 - Timeout 0ms
7 - Nested timeout
5 - Timeout 100ms
```

**Giải thích:**

1. **Call Stack (Synchronous):** 
   - `console.log("1 - Start")` → In ra ngay
   - `console.log("4 - End")` → In ra ngay
   - Cả 2 setTimeout và Promise được đăng ký nhưng chưa thực thi

2. **Microtask Queue (Promises):**
   - Sau khi Call Stack rỗng, Event Loop kiểm tra Microtask Queue
   - `Promise.resolve().then()` → In ra `"3 - Promise"`
   - Callback trong Promise 2 thực thi → In ra `"6 - Promise 2"`
   - Bên trong Promise 2 có `setTimeout` → Đưa vào Macrotask Queue

3. **Macrotask Queue (setTimeout):**
   - Sau khi Microtask Queue trống, Event Loop lấy 1 Macrotask
   - `setTimeout(..., 0)` → In ra `"2 - Timeout 0ms"`
   - `setTimeout(..., 0)` từ trong Promise → In ra `"7 - Nested timeout"`
   - `setTimeout(..., 100)` → In ra `"5 - Timeout 100ms"` (sau ~100ms)

**Event Loop flow:**
```
┌─────────────────────┐
│   Call Stack        │ ← Thực thi code sync
├─────────────────────┤
│  Microtask Queue    │ ← Promises, queueMicrotask()
│                     │   (Thực thi hoàn toàn trước Macrotask)
├─────────────────────┤
│  Macrotask Queue    │ ← setTimeout, setInterval, fetch callback
│                     │   (Thực thi 1 task, rồi check Microtask)
└─────────────────────┘
```

---

### Câu A2 (5đ) — Fetch API

```javascript
async function getData() {
    try {
        const response = await fetch("https://api.example.com/data");
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed:", error.message);
        return null;
    }
}
```

**Giải thích từng dòng:**

1. **`await fetch(...)`**
   - `fetch()` trả về một **Promise** giải quyết với `Response` object
   - `await` tạm dừng hàm cho đến khi Promise giải quyết
   - `response` = object chứa headers, status, body (chưa parse)
   - Nếu network error (mất mạng) → Promise reject → `catch` block

2. **`response.ok`**
   - `response.ok` = `true` khi status trong khoảng 200-299
   - `false` khi status ≥ 400 (lỗi client/server)
   - **3 status codes tương ứng:**
     - `404` (Not Found) → `response.ok = false`
     - `500` (Internal Server Error) → `response.ok = false`
     - `401` (Unauthorized) → `response.ok = false`
   - Lưu ý: `fetch()` **không** reject khi status 404/500, chỉ reject khi network error

3. **`response.json()`**
   - Đọc response body (là streaming text) → parse JSON → return Promise
   - Cần `await` vì parsing là **async operation**
   - Nếu JSON invalid → Promise reject → `catch` block

4. **`try...catch` bắt:**
   - ✅ Network error: "Failed to fetch" (mất wifi)
   - ✅ HTTP error: `HTTP 404` (throw trong if block)
   - ✅ JSON parse error: "SyntaxError: Invalid JSON"
   - ❌ **KHÔNG** bắt `fetch()` reject vì status 404 (phải check `response.ok`)

---

### Câu A3 (5đ) — Promise States

```
┌──────────────────────────────────────┐
│         Promise Lifecycle            │
├──────────────────────────────────────┤
│                                      │
│   PENDING (Trạng thái chờ)           │
│        ↓                             │
│   (Hoàn thành thành công)            │
│        ↓                             │
│   FULFILLED (with value)             │
│      .then() callback                │
│                                      │
│        VỰC                           │
│                                      │
│   PENDING (Trạng thái chờ)           │
│        ↓                             │
│   (Hoàn thành thất bại)              │
│        ↓                             │
│   REJECTED (with reason/error)       │
│      .catch() callback               │
│                                      │
└──────────────────────────────────────┘
```

**Callback Hell:**

```javascript
// ❌ CALLBACK HELL (4 cấp)
function getData() {
    fetch("https://api.example.com/users")
        .then(res => res.json())
        .then(users => {
            users.forEach(user => {
                fetch(`https://api.example.com/users/${user.id}/posts`)
                    .then(res => res.json())
                    .then(posts => {
                        posts.forEach(post => {
                            fetch(`https://api.example.com/posts/${post.id}/comments`)
                                .then(res => res.json())
                                .then(comments => {
                                    console.log(comments);
                                })
                        })
                    })
            })
        })
}

// ✅ REFACTOR với ASYNC/AWAIT
async function getData() {
    try {
        const usersRes = await fetch("https://api.example.com/users");
        const users = await usersRes.json();
        
        for (const user of users) {
            const postsRes = await fetch(`https://api.example.com/users/${user.id}/posts`);
            const posts = await postsRes.json();
            
            for (const post of posts) {
                const commentsRes = await fetch(`https://api.example.com/posts/${post.id}/comments`);
                const comments = await commentsRes.json();
                console.log(comments);
            }
        }
    } catch (error) {
        console.error("Error:", error);
    }
}
```

**Lợi ích async/await:**
- Code đọc như code **synchronous** → dễ hiểu
- Error handling tập trung (`try...catch`)
- Tránh "pyramid of doom"

---

## PHẦN C — PHÂN TÍCH (20 điểm)

### Câu C1 (10đ) — Error Handling Strategy

**E-Commerce App — Chiến lược xử lý lỗi:**

#### 1️⃣ Network Errors (Mất mạng)

```javascript
async function fetchWithFallback(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        // catch bắt network error
        if (error instanceof TypeError && error.message === "Failed to fetch") {
            // Mất mạng
            console.error("❌ Mất kết nối Internet");
            
            // Chiến lược:
            // 1. Hiện thông báo "Kiểm tra kết nối Internet"
            // 2. Cho phép offline mode (dùng cached data)
            // 3. Auto-retry khi online trở lại
            
            throw new Error("NETWORK_ERROR");
        }
        throw error;
    }
}
```

**Xử lý:**
- Hiện toast/snackbar: "Kiểm tra kết nối Internet của bạn"
- Cache data cũ → hiển thị offline mode
- Listen `window.online` event → tự động retry

#### 2️⃣ API Errors (Server errors)

```javascript
async function fetchWithErrorHandling(url) {
    const response = await fetch(url);
    
    // Không throw tự động, kiểm tra status
    if (response.status === 404) {
        // NOT FOUND - Sản phẩm không tồn tại
        console.error("❌ Sản phẩm không tồn tại");
        throw new Error("PRODUCT_NOT_FOUND");
    }
    
    if (response.status === 500) {
        // INTERNAL SERVER ERROR - Server có vấn đề
        console.error("❌ Server đang bảo trì");
        throw new Error("SERVER_ERROR");
    }
    
    if (response.status === 429) {
        // TOO MANY REQUESTS - Rate limited
        console.error("❌ Quá nhiều yêu cầu, hãy chờ");
        throw new Error("RATE_LIMITED");
    }
    
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }
    
    return await response.json();
}
```

**Xử lý từng loại:**
- **404:** "Sản phẩm không tồn tại" → Redirect về trang chính
- **500:** "Máy chủ tạm bảo trì" → Hiện biểu tượng maintenance
- **429:** "Vui lòng chờ XY giây" → Countdown timer + disable button

#### 3️⃣ Timeout (API chậm)

```javascript
function fetchWithTimeout(url, timeoutMs = 10000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    
    return fetch(url, { signal: controller.signal })
        .then(response => {
            clearTimeout(timeoutId);
            return response;
        })
        .catch(error => {
            clearTimeout(timeoutId);
            
            if (error instanceof DOMException && error.name === "AbortError") {
                throw new Error(`TIMEOUT: Request took more than ${timeoutMs}ms`);
            }
            throw error;
        });
}

// Sử dụng:
try {
    const data = await fetchWithTimeout("https://api.slow.com/data", 5000);
    console.log(data);
} catch (error) {
    if (error.message.includes("TIMEOUT")) {
        console.error("❌ API đáp ứng quá chậm, vui lòng thử lại");
    }
}
```

#### 4️⃣ Retry Logic (Thử lại 3 lần)

```javascript
async function fetchWithRetry(url, maxRetries = 3, delayMs = 1000) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            console.log(`Attempt ${attempt}/${maxRetries}...`);
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error(`❌ Attempt ${attempt} failed:`, error.message);
            
            if (attempt === maxRetries) {
                // Lần cuối cùng → throw error
                throw new Error(`Failed after ${maxRetries} attempts: ${error.message}`);
            }
            
            // Chờ trước khi retry (exponential backoff)
            const waitTime = delayMs * Math.pow(2, attempt - 1); // 1s, 2s, 4s...
            console.log(`Waiting ${waitTime}ms before retry...`);
            await new Promise(resolve => setTimeout(resolve, waitTime));
        }
    }
}

// Sử dụng:
try {
    const data = await fetchWithRetry("https://api.example.com/data", 3, 1000);
    console.log("✅ Success:", data);
} catch (error) {
    console.error("❌ Final error:", error.message);
    showToast("Không thể tải dữ liệu, vui lòng thử lại sau");
}
```

---

### Câu C2 (10đ) — Promise.all vs Promise.allSettled vs Promise.race vs Promise.any

| Method | Khi nào resolve? | Khi nào reject? | Use case |
|--------|------------------|-----------------|----------|
| **`.all()`** | TẤT CẢ promises fulfilled | 1 promise reject | Phải có tất cả data (form gửi) |
| **`.allSettled()`** | Luôn (chờ tất cả kết thúc) | Không bao giờ reject | Dashboard 3 APIs, 1 API lỗi vẫn ok |
| **`.race()`** | 1 promise resolve/reject trước | 1 promise reject trước | Timeout race, fallback nhanh nhất |
| **`.any()`** | 1 promise resolve | TẤT CẢ reject | Try multiple sources, 1 thành công |

#### 1️⃣ Promise.all() — TẤT CẢ hoặc KHÔNG

```javascript
// ✅ Use case: Form đăng ký → upload ảnh + gửi data + gửi email
// Nếu 1 cái lỗi → toàn bộ thất bại

async function submitRegistration() {
    try {
        showLoading();
        
        const [imageUrl, userId, emailSent] = await Promise.all([
            uploadImage(file),           // Phải thành công
            createUser(userData),        // Phải thành công
            sendConfirmationEmail(email) // Phải thành công
        ]);
        
        console.log("✅ Registration complete!");
        return { imageUrl, userId, emailSent };
    } catch (error) {
        // 1 API lỗi → catch block
        console.error("❌ Registration failed:", error.message);
        // Không insert user vào DB, không upload ảnh
        throw error;
    }
}
```

#### 2️⃣ Promise.allSettled() — TẤT CẢ ĐỀU OK (1 lỗi vẫn được)

```javascript
// ✅ Use case: Dashboard với 3 widgets (weather, user, posts)
// Widget lỗi không ảnh hưởng widget khác

async function loadDashboard() {
    showLoading();
    
    const results = await Promise.allSettled([
        fetch("/api/weather").then(r => r.json()),
        fetch("/api/users").then(r => r.json()),
        fetch("/api/posts").then(r => r.json())
    ]);
    
    results.forEach((result, index) => {
        if (result.status === "fulfilled") {
            console.log(`✅ Widget ${index}:`, result.value);
            renderWidget(index, result.value);
        } else {
            console.error(`❌ Widget ${index} failed:`, result.reason.message);
            renderWidgetError(index, result.reason);
        }
    });
    
    hideLoading();
    // Dashboard vẫn hiển thị, 2 widget ok + 1 widget error
}
```

#### 3️⃣ Promise.race() — FIRST ONE WINS (hoặc FAILS)

```javascript
// ✅ Use case: Timeout mechanism
// Nếu API chậm hơn 5s → lấy cached data thay vì chờ

async function fetchWithTimeout() {
    const fetchPromise = fetch("/api/data").then(r => r.json());
    
    const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("TIMEOUT")), 5000)
    );
    
    try {
        return await Promise.race([fetchPromise, timeoutPromise]);
    } catch (error) {
        if (error.message === "TIMEOUT") {
            console.log("⏱️ API slow, using cached data");
            return getCachedData();
        }
        throw error;
    }
}

// ✅ Use case: Multiple CDN servers, use fastest
async function downloadFromFastest() {
    const mirrors = [
        fetch("https://cdn1.example.com/image.jpg"),
        fetch("https://cdn2.example.com/image.jpg"),
        fetch("https://cdn3.example.com/image.jpg")
    ];
    
    const firstResponse = await Promise.race(mirrors);
    return await firstResponse.blob();
    // Cái mirror nào trả về trước → dùng nó
}
```

#### 4️⃣ Promise.any() — 1 SUCCESS ENOUGH

```javascript
// ✅ Use case: Try multiple payment gateways
// Nếu gateway 1 lỗi → thử gateway 2 → nếu 2 cũng lỗi → thử gateway 3
// Miễn là 1 cái thành công

async function processPayment(amount) {
    const paymentMethods = [
        processViaStripe(amount),
        processViaPaypal(amount),
        processViaGooglePay(amount)
    ];
    
    try {
        const result = await Promise.any(paymentMethods);
        console.log("✅ Payment successful via:", result.provider);
        return result;
    } catch (error) {
        // error là AggregateError, chứa tất cả lỗi
        console.error("❌ All payment methods failed");
        console.error(error.errors); // Array of all rejections
        throw new Error("Unable to process payment");
    }
}

// ✅ Use case: Fetch từ nhiều API (fallback)
async function getWeatherFromAvailableAPI() {
    const apis = [
        fetch("https://weather-api-1.com/data").then(r => r.json()),
        fetch("https://weather-api-2.com/data").then(r => r.json()),
        fetch("https://weather-api-3.com/data").then(r => r.json())
    ];
    
    try {
        const data = await Promise.any(apis);
        return data; // API nào thành công trước → dùng cái đó
    } catch (error) {
        console.error("❌ All weather APIs unavailable");
        return null;
    }
}
```

---

## 📊 So sánh nhanh

```javascript
// Promise.all: Tất cả ok hoặc hết
await Promise.all([p1, p2, p3]);
// → [v1, v2, v3] hoặc ERROR

// Promise.allSettled: Chờ tất cả, kể cả lỗi
await Promise.allSettled([p1, p2, p3]);
// → [
//     { status: "fulfilled", value: v1 },
//     { status: "rejected", reason: e2 },
//     { status: "fulfilled", value: v3 }
//   ]

// Promise.race: Ai nhanh dùng ai
await Promise.race([p1, p2, p3]);
// → v1 (hoặc e1) — cái xong trước

// Promise.any: Chỉ cần 1 thành công
await Promise.any([p1, p2, p3]);
// → v1 (nếu p1 resolve trước)
// → ERROR nếu tất cả reject
```

---

**Hoàn thành: _____ / 35 điểm**
