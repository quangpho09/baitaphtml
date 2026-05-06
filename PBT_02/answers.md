# ANSWERS - PHẦN A & C

## A1
1. type="email" → Ô nhập text, kiểm tra có @ → Form đăng ký
2. type="password" → Ẩn ký tự → Nhập mật khẩu
3. type="number" → Ô số có spinner → Nhập số lượng
4. type="date" → Chọn ngày → Ngày sinh
5. type="tel" → Nhập số điện thoại → Liên hệ
6. type="url" → Kiểm tra URL → Website
7. type="range" → Thanh kéo → Đánh giá
8. type="checkbox" → Tick chọn → Đồng ý điều khoản
9. type="radio" → Chọn 1 → Giới tính
10. type="file" → Upload file → Ảnh đại diện

## A2
1. required + empty → Không submit
2. email sai → Báo lỗi format
3. number > max → Không hợp lệ
4. pattern sai → Không submit
5. minlength không đủ → Không submit

## A3
1. label giúp screen reader đọc đúng field
2. fieldset nhóm input liên quan (VD: thông tin cá nhân)
3. aria-label dùng khi không có label, không nên dùng nếu đã có label

## A4
1. lazy loading giúp tải nhanh, không dùng khi ảnh quan trọng above-the-fold
2. nhiều source để tương thích trình duyệt (mp4, webm, ogg)
3. alt mô tả ảnh

## A5
- img: ảnh đơn giản
- figure: có caption

## C1
(viết tóm tắt)
- thiếu label
- thiếu required
- password không validate
- checkbox không có input
- phone nên type tel

## C2
1. CCCD: ^\d{12}$
   STK: ^\d{10,15}$
2. Không đủ an toàn → cần backend
3. confirm password, check DB, logic phức tạp
4. bypass JS, hack dữ liệu
