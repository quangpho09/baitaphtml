# 🌤️ Weather App

Ứng dụng thời tiết sử dụng Async JavaScript & Fetch API.

## 📋 Chức năng

- ✅ Nhập tên thành phố → Hiển thị thời tiết hiện tại
- ✅ 3 States: Loading, Success, Error
- ✅ Lưu lịch sử tìm kiếm vào LocalStorage
- ✅ Click lịch sử → Tìm lại

## 🔗 API Sử dụng

### Tùy chọn 1: wttr.in (Không cần API key)
```
GET https://wttr.in/{city}?format=j1
```

Ví dụ:
```javascript
const response = await fetch('https://wttr.in/Hanoi?format=j1');
const data = await response.json();

// Response structure:
data.current_condition[0].temp_C        // Nhiệt độ
data.current_condition[0].humidity      // Độ ẩm
data.current_condition[0].description   // Mô tả
```

### Tùy chọn 2: Open-Meteo API (Miễn phí, không cần key)
```
GET https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current_weather=true
```

Lưu ý: Open-Meteo cần tọa độ GPS, nên cần reverse geocoding.

## 📦 Cấu trúc file

```
weather_app/
├── index.html      # HTML template
├── style.css       # Styling
├── app.js          # Logic (TODO: Implement)
└── README.md       # Hướng dẫn (file này)
```

## 🚀 Cách chạy

1. Mở file `index.html` trong browser
2. Hoặc dùng Live Server (VS Code extension)

## 📝 TODO - Các bước implement

### Step 1: Implement API call
```javascript
// Trong weatherAPI.getWeatherByCity()
const response = await fetch(`https://wttr.in/${city}?format=j1`);

if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
}

const data = await response.json();
return {
    city: data.nearest_area[0].areaName[0].value,
    country: data.nearest_area[0].country[0].value,
    temperature: data.current_condition[0].temp_C,
    humidity: data.current_condition[0].humidity,
    description: data.current_condition[0].weatherDesc[0].value,
    // ... thêm fields khác
};
```

### Step 2: Map weather description → icon
```javascript
const iconMap = {
    'Sunny': '☀️',
    'Partly cloudy': '⛅',
    'Cloudy': '☁️',
    'Rainy': '🌧️',
    'Stormy': '⛈️',
    // ... thêm mapping
};
```

### Step 3: Hiển thị success state
```javascript
// Trong ui.showSuccess(weatherData)
document.getElementById('cityName').textContent = weatherData.city;
document.getElementById('tempValue').textContent = weatherData.temperature;
// ... điền các element khác
```

## ✅ Điểm chấm

- **5đ:** Gọi API thành công + parse JSON
- **5đ:** 3 states (Loading/Success/Error) hoạt động đúng
- **5đ:** Lịch sử + LocalStorage

## 🔍 Testing

### Test Success
```
1. Nhập "Hanoi" → Click Tìm
2. Phải hiện thông tin thời tiết
3. "Hanoi" phải xuất hiện trong lịch sử
```

### Test Error
```
1. Nhập "XYZ123" (thành phố không tồn tại)
2. Phải hiện "Thành phố không tồn tại"
3. Tắt wifi → Nhập "Hanoi" → Phải hiện "Mất kết nối Internet"
```

### Test Loading
```
1. Nhập city → spinner phải xuất hiện 1-2 giây
2. Data phải load hoàn toàn rồi mới hide spinner
```

## 💡 Tips

- Dùng `response.ok` để kiểm tra status 2xx
- `response.json()` cũng trả Promise, cần `await`
- LocalStorage key không được có space
- Hiển thị icon phù hợp với mô tả thời tiết

## 📚 Tham khảo

- [Fetch API MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [LocalStorage MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [wttr.in API docs](https://wttr.in/)
