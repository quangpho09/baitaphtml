# ANSWERS.md

## PHẦN A

### Câu A1
| Kích thước | <768px | 768px-991px | >=992px |
|---|---|---|---|
| Số cột | 1 | 2 | 4 |
| Layout | 4 hàng | 2x2 | 1 hàng 4 cột |

- col-md-6: từ breakpoint md trở lên chiếm 6/12 cột.
- Không cần col-sm-12 vì Bootstrap mobile-first, mặc định sẽ chiếm toàn bộ chiều rộng.

### Câu A2
1. d-none d-md-block: Ẩn dưới md, hiện dạng block từ md trở lên.
2. mt-3, mb-3, ms-3, me-3, px-4.
3. container: fixed width; container-fluid: full width; container-md: full width tới md rồi fixed.

## PHẦN C

### C1
1. Cài Sass, sửa biến $primary trong Bootstrap source rồi build lại.
2. Dùng Sass variables giúp đồng bộ toàn bộ hệ thống màu.

### C2
- Bootstrap ít CSS hơn.
- Tốc độ phát triển nhanh hơn.
- CSS thuần tùy biến mạnh hơn.
- Nên dùng Bootstrap cho dashboard, MVP.
- Không nên dùng khi cần giao diện độc đáo.
