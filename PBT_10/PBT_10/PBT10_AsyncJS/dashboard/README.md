# 📊 Multi-API Dashboard

Dashboard tổng hợp dữ liệu từ 6 APIs khác nhau, sử dụng `Promise.allSettled()`.

## 📋 Chức năng

- ✅ Gọi **6 APIs song song** dùng `Promise.allSettled()`
- ✅ Mỗi widget có **trạng thái riêng** (loading/success/error)
- ✅ 1 API lỗi không ảnh hưởng widget khác
- ✅ Hiển thị thời gian fetch: "Data loaded in X ms"
- ✅ Nút "Refresh All" để tải lại tất cả

## 🔗 APIs Sử dụng

| Widget | API | Endpoint |
|--------|-----|----------|
| 👥 Users | JSONPlaceholder | GET /users |
| 📝 Posts | JSONPlaceholder | GET /posts |
| 🌤️ Weather | Open-Meteo | GET /forecast (Hanoi) |
| 🌍 Countries | REST Countries | GET /vietnam |
| 🎲 Random Users | RandomUser.me | GET /api |
| 🐕 Dogs | Dog.ceo | GET /breeds/image/random |

## 📦 Cấu trúc file

```
dashboard/
├── index.html      # 6 widget cards
├── style.css       # Grid layout + widget styling
├── app.js          # Promise.allSettled logic - TODO
└── README.md       # Hướng dẫn (file này)
```

## 🚀 Cách chạy

1. Mở `index.html` trong browser
2. Hoặc dùng Live Server

## 📝 TODO - Implement Promise.allSettled

### Hiểu Promise.allSettled

```javascript
// Promise.allSettled luôn trả Promise fulfilled
// Không bao giờ reject, dù có API lỗi

const results = await Promise.allSettled([
    Promise.resolve(1),
    Promise.reject('error'),
    Promise.resolve(3)
]);

// Result:
// [
//   { status: 'fulfilled', value: 1 },
//   { status: 'rejected', reason: 'error' },
//   { status: 'fulfilled', value: 3 }
// ]

// Kiểm tra từng result:
results.forEach(result => {
    if (result.status === 'fulfilled') {
        console.log('Success:', result.value);
    } else {
        console.log('Error:', result.reason);
    }
});
```

### Implement loadDashboard

```javascript
async function loadDashboard() {
    const startTime = Date.now();

    // Gọi 6 APIs song song
    const results = await Promise.allSettled([
        dashboardAPIs.getUsers(),
        dashboardAPIs.getPosts(),
        dashboardAPIs.getWeather(),
        dashboardAPIs.getCountries(),
        dashboardAPIs.getRandomUsers(),
        dashboardAPIs.getDogImages()
    ]);

    // [0] = Users
    if (results[0].status === 'fulfilled') {
        dashboardUI.renderUsers(results[0].value);
    } else {
        dashboardUI.setWidgetError('users', results[0].reason.message);
    }

    // [1] = Posts
    if (results[1].status === 'fulfilled') {
        dashboardUI.renderPosts(results[1].value);
    } else {
        dashboardUI.setWidgetError('posts', results[1].reason.message);
    }

    // ... tương tự cho 4 widget còn lại

    // Hiển thị load time
    const loadTime = Date.now() - startTime;
    dashboardUI.elements.loadTime.textContent = `⏱️ Tải trong ${loadTime}ms`;
}
```

### Widget States

**Loading state:**
- Hiện skeleton loader
- Status dot: orange + spinning

**Success state:**
- Render dữ liệu
- Status dot: green, không spin

**Error state:**
- Hiện error message
- Status dot: red
- Không ảnh hưởng widget khác

## ✅ Điểm chấm

- **5đ:** Gọi 3+ APIs song parallel
- **5đ:** Promise.allSettled + xử lý từng result
- **5đ:** Loading state + error handling + load time display

## 🔍 Testing

### Test Promise.allSettled
```
1. Mở trang → Tất cả 6 widgets hiển thị loading
2. Wait 2-3 giây → Data load từng widget
3. Kiểm tra load time (e.g., "⏱️ Tải trong 2345ms")
```

### Test Error Handling
```
1. Mở DevTools → Network → Throttle (Slow 3G)
2. Tắt wifi → Click "Refresh All"
3. ✅ 1 widget lỗi → error message
4. ✅ 5 widget khác vẫn load OK
5. Bật wifi → Click "Refresh All" → Recover
```

### Test Widget States
```
1. Loading: Skeleton visible, status dot spinning
2. Success: Data rendered, status dot green
3. Error: Error message visible, status dot red
```

### Test Parallel Requests
```
1. Mở DevTools → Network tab
2. Click "Refresh All"
3. ✅ 6 requests đều parallel (cùng 1 lúc)
4. ✅ Không serial (chờ cái trước xong rồi gọi cái sau)
```

## 💡 Tips

- `Promise.allSettled` luôn resolve, không bao giờ reject
- Dùng `status` field để kiểm tra `'fulfilled'` hoặc `'rejected'`
- Parallel: `Promise.allSettled([p1, p2, p3])` gọi tất cả ngay
- Serial: `await p1; await p2; await p3;` chờ cái trước
- Để measure load time: `const start = Date.now(); ... const ms = Date.now() - start;`

## 📚 Tham khảo

- [Promise.allSettled - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled)
- [Fetch API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/)
- [Open-Meteo Weather API](https://open-meteo.com/)
- [REST Countries](https://restcountries.com/)

## 🔗 API Docs

### Open-Meteo Weather
```
GET https://api.open-meteo.com/v1/forecast?latitude=21.0285&longitude=105.8542&current_weather=true

Response:
{
    current_weather: {
        temperature: 32,
        wind_speed: 5,
        weather_code: 0
    }
}
```

### REST Countries
```
GET https://restcountries.com/v3.1/name/vietnam

Response: Array of country objects
```

### RandomUser.me
```
GET https://randomuser.me/api/?results=3

Response:
{
    results: [
        {
            name: { first: "...", last: "..." },
            email: "..."
        }
    ]
}
```

### Dog.ceo
```
GET https://dog.ceo/api/breeds/image/random/4

Response:
{
    message: ["url1", "url2", "url3", "url4"],
    status: "success"
}
```
