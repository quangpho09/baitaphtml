# 📋 PHIẾU BÀI TẬP 05 — ANSWERS
# CSS Responsive & SCSS

---

## PHẦN A — KIỂM TRA ĐỌC HIỂU

---

### Câu A1 — Viewport & Mobile-First

#### 1. Thẻ `<meta viewport>` chuẩn

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

**Giải thích từng thuộc tính:**

| Thuộc tính | Giá trị | Ý nghĩa |
|---|---|---|
| `name="viewport"` | — | Xác định đây là thẻ meta điều khiển viewport |
| `content` | chuỗi các cặp key=value | Nội dung cấu hình viewport |
| `width=device-width` | Chiều rộng thiết bị | Đặt chiều rộng viewport bằng chiều rộng thực của màn hình thiết bị |
| `initial-scale=1.0` | 1.0 (100%) | Tỉ lệ zoom mặc định khi trang được tải, không zoom in/out |

#### 2. Nếu THIẾU thẻ này, iPhone hiển thị như thế nào?

Nếu thiếu thẻ `<meta viewport>`, iPhone sẽ:
- **Hiển thị trang như desktop**: mặc định viewport width = **980px** (giả lập màn hình rộng)
- **Thu nhỏ toàn bộ trang** để vừa màn hình nhỏ → chữ, ảnh đều rất nhỏ, phải zoom tay để đọc
- **Media queries không hoạt động đúng**: vì trình duyệt nghĩ chiều rộng là 980px nên các query `(max-width: 768px)` sẽ không trigger
- Trải nghiệm người dùng rất tệ — layout desktop bị nén vào màn hình nhỏ

#### 3. Mobile-First vs Desktop-First

**Mobile-First** — Viết CSS cho mobile trước, thêm breakpoint `min-width` để mở rộng:

```css
/* Mobile-First: CSS mặc định = mobile */
.container {
    display: flex;
    flex-direction: column;
    font-size: 14px;
}

/* Mở rộng lên tablet khi màn hình >= 768px */
@media (min-width: 768px) {
    .container {
        flex-direction: row;
        font-size: 16px;
    }
}
```

**Desktop-First** — Viết CSS cho desktop trước, thêm breakpoint `max-width` để thu nhỏ:

```css
/* Desktop-First: CSS mặc định = desktop */
.container {
    display: flex;
    flex-direction: row;
    font-size: 16px;
}

/* Thu nhỏ xuống mobile khi màn hình <= 767px */
@media (max-width: 767px) {
    .container {
        flex-direction: column;
        font-size: 14px;
    }
}
```

**Tại sao Mobile-First được khuyên dùng?**
- 📱 **Xu hướng thực tế**: >60% traffic web đến từ mobile
- ⚡ **Performance**: mobile tải CSS tối thiểu, desktop load thêm nếu cần
- 🧠 **Ưu tiên nội dung**: buộc developer suy nghĩ về nội dung thiết yếu nhất
- 🔗 **Cascading tự nhiên hơn**: thêm complexity dần thay vì override

---

### Câu A2 — Breakpoints chuẩn

| Breakpoint | Pixel | Thiết bị đại diện | Grid sản phẩm |
|---|---|---|---|
| **xs** | < 576px | iPhone SE, mobile nhỏ | 1 cột |
| **sm** | ≥ 576px | Mobile lớn (iPhone Pro Max) | 1–2 cột |
| **md** | ≥ 768px | iPad, tablet | 2–3 cột |
| **lg** | ≥ 992px | iPad Pro, laptop nhỏ | 3–4 cột |
| **xl** | ≥ 1200px | Desktop, laptop | 4 cột |
| **xxl** | ≥ 1400px | Màn hình lớn, 4K | 4–6 cột |

> **Nguồn:** Bootstrap 5 breakpoint system

---

### Câu A3 — Media Queries — Điền bảng

```css
.container { width: 100%; padding: 10px; }
@media (min-width: 576px) { .container { width: 540px; } }
@media (min-width: 768px) { .container { width: 720px; } }
@media (min-width: 992px) { .container { width: 960px; } }
@media (min-width: 1200px) { .container { width: 1140px; } }
```

| Chiều rộng màn hình | `.container` width | Lý do |
|---|---|---|
| **375px** (iPhone SE) | `100%` (= 375px) | Không match bất kỳ min-width nào (375 < 576) |
| **600px** | `540px` | Match `min-width: 576px`, chưa đủ 768px |
| **800px** | `720px` | Match `min-width: 768px`, chưa đủ 992px |
| **1000px** | `960px` | Match `min-width: 992px`, chưa đủ 1200px |
| **1400px** | `1140px` | Match `min-width: 1200px` (lớn nhất) |

> **Lưu ý:** CSS Cascade — rule sau overrides rule trước khi cùng specificity. Với `min-width`, màn hình càng rộng sẽ match nhiều rule hơn, rule cuối cùng match sẽ thắng.

---

### Câu A4 — SCSS Basics

#### 4 tính năng chính của SCSS

**1. Variables (`$primary-color`)**
Lưu trữ giá trị tái sử dụng — màu sắc, font, kích thước. Thay đổi 1 chỗ, áp dụng toàn bộ.

```scss
$primary-color: #2563eb;
$font-size-base: 16px;
$border-radius: 8px;

.button {
    background-color: $primary-color;
    font-size: $font-size-base;
    border-radius: $border-radius;
}
```

**2. Nesting (lồng nhau)**
Viết CSS theo cấu trúc HTML, dễ đọc, tránh lặp lại selectors.

```scss
.card {
    padding: 16px;
    border: 1px solid #ddd;

    .card-title {
        font-size: 18px;
        font-weight: bold;
    }

    .card-body {
        color: #666;
    }

    &:hover {
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
}
```

**3. Mixins (`@mixin` / `@include`)**
Tái sử dụng block CSS, có thể nhận tham số như function.

```scss
@mixin flex-center($direction: row) {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: $direction;
}

.hero {
    @include flex-center(column);
    height: 100vh;
}

.navbar {
    @include flex-center(row);
}
```

**4. `@extend` / Inheritance**
Kế thừa toàn bộ styles từ một selector khác, tránh lặp code.

```scss
%button-base {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.btn-primary {
    @extend %button-base;
    background: #2563eb;
    color: white;
}

.btn-secondary {
    @extend %button-base;
    background: #e5e7eb;
    color: #333;
}
```

#### Tại sao trình duyệt KHÔNG đọc được `.scss`?

Trình duyệt chỉ hiểu **CSS thuần** (CSS3). SCSS là **superset** của CSS với cú pháp mở rộng (biến, nesting, mixin…) — đây là ngôn ngữ **preprocessor**, cần biên dịch trước.

**Bước chuyển SCSS → CSS:**

```bash
# Cài Sass (Node.js)
npm install -g sass

# Compile một lần
sass style.scss style.css

# Compile tự động khi có thay đổi (watch mode)
sass --watch style.scss:style.css

# Compile cả folder
sass --watch scss/:css/
```

---

## PHẦN C — PHÂN TÍCH

---

### Câu C1 — Phân tích trang Shopee (shopee.vn)

#### Phân tích tại 3 kích thước màn hình

**Mobile (375px):**
- Navigation: Logo + icon search + icon cart + icon hamburger ☰ (menu ẩn sidebar)
- Grid sản phẩm: **2 cột** (Shopee dùng 2 cột ngay từ mobile)
- Ẩn trên mobile: Top navigation bar (Bán hàng, Tải app, v.v.), category sidebar, banner phụ
- Font size: Nhỏ hơn, tên sản phẩm truncate 2 dòng

**Tablet (768px):**
- Navigation: Hiện thanh search rộng hơn, vẫn còn một số icon
- Grid sản phẩm: **4 cột**
- Category bar xuất hiện ngang bên dưới header
- Banner chiếm toàn chiều rộng

**Desktop (1440px):**
- Navigation: Đầy đủ — logo, search bar lớn, đăng nhập/đăng ký, giỏ hàng, thông báo
- Grid sản phẩm: **6 cột**
- Sidebar category bên trái xuất hiện
- Footer đầy đủ với nhiều cột thông tin

#### Media queries Shopee sử dụng (từ DevTools):

```css
/* Shopee dùng nhiều breakpoints tùy component */
@media (max-width: 767px) { /* mobile adjustments */ }
@media (min-width: 768px) and (max-width: 1199px) { /* tablet */ }
@media (min-width: 1200px) { /* desktop full */ }
```

---

### Câu C2 — Responsive Strategy: Trang Đặt bàn Nhà hàng

#### Wireframe 3 kích thước

**Mobile (< 768px):**
```
┌────────────────────────┐
│  LOGO        ☰         │
├────────────────────────┤
│   HERO IMAGE (100vw)   │
│  "Đặt bàn ngay"        │
├────────────────────────┤
│  FORM ĐẶT BÀN          │
│  [Ngày] [Giờ]          │
│  [Số người]            │
│  [Ghi chú...]          │
│  [ĐẶT BÀN]             │
├────────────────────────┤
│  MENU MÓN ĂN           │
│  [Ảnh 1]  [Ảnh 2]      │  ← 2 cột
│  [Ảnh 3]  [Ảnh 4]      │
│  [Ảnh 5]  [Ảnh 6]      │
├────────────────────────┤
│  BẢN ĐỒ (100% width)   │
│  (iframe 250px height) │
├────────────────────────┤
│  FOOTER (1 cột)        │
│  SĐT: 1900 xxxx        │
└────────────────────────┘
```

**Tablet (768px – 1199px):**
```
┌──────────────────────────────────┐
│  LOGO    Nav links    SĐT đặt bàn│
├──────────────────────────────────┤
│      HERO IMAGE (full width)      │
│   "Nhà hàng XYZ — Đặt bàn ngay" │
├──────────────────────────────────┤
│  FORM ĐẶT BÀN (2 cột fields)     │
│  [Ngày]  [Giờ]  [Số người] [OK]  │
├──────────────────────────────────┤
│  MENU MÓN ĂN — 3 cột             │
│  [Ảnh 1] [Ảnh 2] [Ảnh 3]        │
│  [Ảnh 4] [Ảnh 5] [Ảnh 6]        │
├──────────────────────────────────┤
│  BẢN ĐỒ (100% width, 350px tall) │
├──────────────────────────────────┤
│  FOOTER (2 cột)                   │
└──────────────────────────────────┘
```

**Desktop (≥ 1200px):**
```
┌────────────────────────────────────────────────────┐
│  LOGO    Thực đơn  Về chúng tôi  Liên hệ   📞 SĐT │
├────────────────────────────────────────────────────┤
│              HERO IMAGE (full width)                │
│         "Nhà hàng XYZ — Fine Dining"               │
│         [ĐẶT BÀN NGAY]                             │
├────────────────────────────────────────────────────┤
│  FORM ĐẶT BÀN (inline, 1 hàng ngang)               │
│  [Ngày ▼] [Giờ ▼] [Người ▼] [Ghi chú...] [ĐẶT]   │
├──────────────────┬─────────────────────────────────┤
│  MENU MÓN ĂN     │  BẢN ĐỒ GOOGLE MAPS             │
│  (3 cột, 6 ảnh)  │  (chiếm 40% width, 400px tall)  │
│  [1][2][3]       │                                  │
│  [4][5][6]       │                                  │
├──────────────────┴─────────────────────────────────┤
│  FOOTER (4 cột: Về NHÀ HÀNG | MENU | GIỜ MỞ CỬA | MAP) │
└────────────────────────────────────────────────────┘
```

#### CSS Skeleton Mobile-First

```css
/* ========== RESET & BASE ========== */
* { box-sizing: border-box; margin: 0; padding: 0; }

/* ========== HEADER ========== */
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
}
.header .hamburger { display: block; }
.header nav { display: none; }

/* ========== HERO ========== */
.hero {
    width: 100%;
    height: 50vh;
    object-fit: cover;
}

/* ========== BOOKING FORM ========== */
.booking-form {
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
    padding: 24px 16px;
}

/* ========== FOOD GRID ========== */
.food-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    padding: 16px;
}

/* ========== MAP ========== */
.map-section { width: 100%; height: 250px; }
.map-section iframe { width: 100%; height: 100%; }

/* ========== FOOTER ========== */
.footer {
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 32px 16px;
}

/* ========== TABLET (≥ 768px) ========== */
@media (min-width: 768px) {
    .booking-form {
        grid-template-columns: repeat(2, 1fr);
    }

    .food-grid {
        grid-template-columns: repeat(3, 1fr);
    }

    .map-section { height: 350px; }

    .footer {
        grid-template-columns: repeat(2, 1fr);
    }
}

/* ========== DESKTOP (≥ 1200px) ========== */
@media (min-width: 1200px) {
    .header .hamburger { display: none; }
    .header nav { display: flex; gap: 32px; }

    .hero { height: 70vh; }

    .booking-form {
        grid-template-columns: repeat(5, 1fr);
        align-items: end;
    }

    .content-layout {
        display: grid;
        grid-template-columns: 60% 40%;
        gap: 32px;
        padding: 48px;
    }

    .map-section { height: 400px; }

    .footer {
        grid-template-columns: repeat(4, 1fr);
    }
}
```

---

## PHẦN B3 — Lệnh Compile SCSS

```bash
# Cài đặt Sass
npm install -g sass

# Compile một lần
sass scss/style.scss css/style.css

# Watch mode (tự động compile khi thay đổi)
sass --watch scss/style.scss:css/style.css

# Compile với source map
sass --watch scss/style.scss:css/style.css --source-map

# Compile minified (production)
sass scss/style.scss css/style.min.css --style=compressed
```
