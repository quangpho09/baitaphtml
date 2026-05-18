
# PHẦN A — KIỂM TRA ĐỌC HIỂU

## Câu A1 — 3 cách nhúng CSS

### 1. Inline CSS
```html
<p style="color:red;">Hello</p>
```

Ưu điểm:
- Nhanh
- Ghi trực tiếp trên element

Nhược điểm:
- Khó bảo trì
- Code rối

Khi dùng:
- Test nhanh

---

### 2. Internal CSS
```html
<style>
p{
 color:blue;
}
</style>
```

Ưu điểm:
- Quản lý dễ hơn inline

Nhược điểm:
- Chỉ dùng cho 1 trang

Khi dùng:
- Trang nhỏ

---

### 3. External CSS
```html
<link rel="stylesheet" href="style.css">
```

Ưu điểm:
- Chuyên nghiệp
- Tái sử dụng

Nhược điểm:
- Cần file riêng

Khi dùng:
- Dự án thực tế

---

Nếu cả 3 cùng áp dụng:
INLINE thắng vì specificity cao hơn.

---

## Câu A2 — Selectors

1. h1 → ShopTLU
2. .price → 25.990.000đ và 45.990.000đ
3. #app header → toàn bộ phần header
4. nav a:first-child → Home
5. .product.featured h2 → MacBook Pro
6. article > p → tất cả thẻ p trong article
7. a[href="/"] → Home
8. .top-bar.dark h1 → ShopTLU

---

## Câu A3 — Box Model

### Trường hợp 1
Chiều rộng hiển thị:
400 + 20x2 + 5x2 = 450px

Không gian chiếm:
450 + 10x2 = 470px

---

### Trường hợp 2
Chiều rộng hiển thị:
400px

Content thực tế:
400 - 40 - 10 = 350px

Không gian chiếm:
400 + 20 = 420px

---

### Margin Collapse
25px và 40px không cộng.

Khoảng cách:
40px

Vì margin collapse chỉ lấy margin lớn hơn.

Nếu:
-10px và 40px

=> khoảng cách = 30px

---

## Câu A4 — Specificity

Rule A:
(0,0,1)

Rule B:
(0,1,0)

Rule C:
(1,0,0)

Rule D:
(0,1,1)

Element màu đỏ vì ID mạnh nhất.

Nếu inline:
màu cam.

Nếu Rule A thêm !important:
màu đen vì !important ưu tiên cao.

---

# PHẦN C

## Câu C1

Sidebar:
300 + 40 + 2 = 342px

Content:
660 + 60 + 2 = 722px

Tổng:
1064px > 960px

Layout bị vỡ vì vượt container.

### Cách sửa 1
Dùng:
box-sizing:border-box;

### Cách sửa 2
Giảm width content.

Ví dụ:
content width = 556px

---

## Câu C2

### Sản phẩm A
font-size: 20px
color: green

### Mô tả sản phẩm
color: blue

### Sản phẩm B
font-size: 20px
color: blue

### Mô tả sản phẩm B
color: green

Giải thích:
.highlight có !important nên thắng.
