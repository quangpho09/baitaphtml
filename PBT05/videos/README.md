# Videos — PBT05

## Yêu cầu video OBS

**File:** `PBT05_HoTen_MaSV.mp4`
**Thời lượng:** 8–12 phút

## Nội dung cần quay

1. 🎤 Bắt đầu CSS Mobile-First:
   ```css
   .product-grid { display: grid; grid-template-columns: 1fr; gap: 16px; }
   ```

2. 🎤 Giải thích: tại sao code mặc định là mobile (1 cột)?

3. 🎤 Thêm breakpoint tablet:
   ```css
   @media (min-width: 768px) {
     .product-grid { grid-template-columns: repeat(2, 1fr); }
   }
   ```

4. 🎤 Giải thích `min-width` vs `max-width` — Mobile-First

5. 🎤 Thêm breakpoint desktop:
   ```css
   @media (min-width: 1024px) {
     .product-grid { grid-template-columns: repeat(4, 1fr); }
   }
   ```

6. 🎤 Demo live resize — kéo browser từ rộng → hẹp: 4→2→1 cột

7. 🎤 Mở DevTools → Toggle Device → iPhone, iPad, Desktop

8. 🎤 Thêm `<meta name="viewport">` và giải thích

## Checklist

- [ ] Đầu video: Giới thiệu tên + MSSV + lớp
- [ ] Webcam mặt SV ở góc phải dưới (OBS)
- [ ] Demo resize browser
- [ ] DevTools ở ≥ 3 kích thước
- [ ] Cuối video: Tổng kết Mobile-First

## Upload

Đặt file video tại: `videos/PBT05_HoTen_MaSV.mp4`
Hoặc upload lên YouTube/Drive và ghi link vào answers.md
