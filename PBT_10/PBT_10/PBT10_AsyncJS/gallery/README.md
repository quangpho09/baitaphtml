# 📸 Infinite Scroll Gallery

Ứng dụng hiển thị ảnh với infinite scroll và lazy loading.

## 📋 Chức năng

- ✅ Load 20 ảnh đầu tiên khi mở trang
- ✅ **Infinite scroll:** Scroll xuống → Tự động load 20 ảnh tiếp
- ✅ **Lazy loading:** Ảnh chỉ load khi xuất hiện trong viewport
- ✅ Click ảnh → Mở lightbox modal
- ✅ Lightbox: Prev/Next buttons, Keyboard navigation (arrows, ESC)
- ✅ Responsive grid: 4 cột (desktop), 2 cột (tablet), 1 cột (mobile)

## 🔗 API Sử dụng

### Tùy chọn 1: JSONPlaceholder Photos
```
GET https://jsonplaceholder.typicode.com/photos?_page=1&_limit=20
```

Response:
```javascript
{
    albumId: 1,
    id: 1,
    title: "accusamus beatae ad facilis cum similique qui sunt",
    url: "https://via.placeholder.com/600/92c952",
    thumbnailUrl: "https://via.placeholder.com/150/92c952"
}
```

### Tùy chọn 2: Lorem Picsum
```
GET https://picsum.photos/v2/list?page=1&limit=20
```

## 📦 Cấu trúc file

```
gallery/
├── index.html      # HTML + lightbox modal
├── style.css       # Grid + responsive + lightbox
├── app.js          # Infinite scroll + lazy loading - TODO
└── README.md       # Hướng dẫn (file này)
```

## 🚀 Cách chạy

1. Mở `index.html` trong browser
2. Hoặc dùng Live Server

## 📝 TODO - Các bước implement

### Step 1: Fetch photos từ API
```javascript
async loadPhotos(page) {
    const response = await fetch(
        `${this.baseURL}/photos?_page=${page}&_limit=${this.itemsPerPage}`
    );
    
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }
    
    return await response.json();
}
```

### Step 2: Tạo IntersectionObserver cho lazy loading
```javascript
// Khi ảnh xuất hiện trong viewport → load thật
lazyLoader.init = function() {
    this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;  // Thay placeholder
                img.classList.remove('loading');
                this.observer.unobserve(img);
            }
        });
    });
};
```

### Step 3: Tạo IntersectionObserver cho infinite scroll
```javascript
infiniteScroll.init = function() {
    this.observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            loadMorePhotos();
        }
    });
    
    this.observer.observe(document.querySelector('#loadTrigger'));
};
```

### Step 4: Render ảnh với lazy loading
```javascript
addPhotos(photos) {
    photos.forEach(photo => {
        const item = document.createElement('div');
        item.className = 'gallery-item loading';
        
        const img = document.createElement('img');
        img.dataset.src = photo.url;  // Lưu vào data-src
        img.alt = photo.title;
        img.src = photo.thumbnailUrl;  // Hiển thị placeholder
        
        item.appendChild(img);
        this.elements.gallery.appendChild(item);
        lazyLoader.observeImage(img);
    });
}
```

### Step 5: Lightbox navigation
```javascript
function updateLightboxImage() {
    const photo = galleryAPI.allPhotos[currentPhotoIndex];
    ui.elements.lightboxImage.src = photo.url;
}

ui.elements.lightboxImage.onclick = (e) => {
    e.stopPropagation();
};
```

## ✅ Điểm chấm

- **5đ:** Load photos + hiển thị grid
- **5đ:** Infinite scroll (auto load when scroll to bottom)
- **5đ:** Lazy loading images + Lightbox modal

## 🔍 Testing

### Test Infinite Scroll
```
1. Mở trang → Hiện 20 ảnh đầu
2. Scroll xuống → "⏳ Đang tải ảnh..." hiểu
3. Wait 1-2 giây → Thêm 20 ảnh tiếp
4. Repeat scroll & auto load
```

### Test Lazy Loading
```
1. Mở DevTools → Network tab
2. Mở trang → Không tải tất cả ảnh lúc đầu
3. Scroll xuống → Ảnh mới load khi appear
4. Kiểm tra Request có lazy-loaded không
```

### Test Lightbox
```
1. Click ảnh → Lightbox mở
2. Click prev/next → Chuyển ảnh
3. Press arrow keys → Chuyển ảnh
4. Press ESC → Đóng lightbox
5. Click background → Đóng lightbox
```

### Test Responsive
```
1. Desktop (4 cột) → OK
2. Tablet 768px (2 cột) → OK
3. Mobile 480px (1 cột) → OK
```

## 💡 Tips

- IntersectionObserver dùng để detect khi element visible
- Dùng `data-*` attribute để lưu thông tin (data-src, data-id)
- `classList` methods: add(), remove(), toggle()
- Event delegation: `e.target` để biết click cái gì
- `e.stopPropagation()` để chặn event bubbling

## 📚 Tham khảo

- [Fetch API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [IntersectionObserver - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [JSONPlaceholder Photos](https://jsonplaceholder.typicode.com/photos)
- [CSS Grid - MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)
