# ANSWERS.md — FULL CHI TIẾT

## PHẦN A

### A1 — HTTP & Browser
Quy trình:
1. DNS Lookup: domain → IP
2. TCP Handshake (3 bước)
3. TLS Handshake (HTTPS bảo mật)
4. Gửi HTTP Request
5. Server xử lý
6. Server trả HTTP Response (HTML, CSS, JS)
7. Browser parse HTML → DOM
8. Load CSS → CSSOM
9. Render Tree → Layout → Paint

Network tab:
- Status Code: trạng thái request (200, 404…)
- Time: thời gian load
- Resource: CSS, JS, Image

---

### A2 — Semantic HTML

Lỗi:
1. Dùng <div> thay vì <header>, <nav>
2. Không có <main>, <section>, <article>
3. Không có alt cho ảnh
4. Không dùng heading đúng chuẩn

→ SEO thấp vì Google không hiểu cấu trúc

---

### A3 — Block vs Inline

Kết quả hiển thị:

Hộp 1
Text A Text B
Hộp 2
Text C Text D
Hộp 3

Giải thích:
- div: block → xuống dòng
- span, strong: inline → cùng dòng

---

### A4 — Table

<thead>: tiêu đề
<tbody>: nội dung
<tfoot>: tổng kết

Không dùng table layout vì:
1. Không responsive
2. Khó bảo trì
3. SEO kém

---

## PHẦN C

### C1 — Cấu trúc HTML

<header>
<nav>...</nav>
</header>

<nav aria-label="breadcrumb">
<ol>
<li><a href="#">Trang chủ</a></li>
<li><a href="#">Điện thoại</a></li>
<li>iPhone 16</li>
</ol>
</nav>

<main>
<section>
<article>
<h1>Tên sản phẩm</h1>
<figure>Ảnh</figure>
<p>Giá</p>
</article>
</section>

<section>
<h2>Thông số</h2>
<table></table>
</section>

<section>
<h2>Bình luận</h2>
</section>
</main>

<aside>Sản phẩm liên quan</aside>

<footer></footer>

---

### C2 — Phản biện (~230 từ)

Semantic HTML đóng vai trò cực kỳ quan trọng trong phát triển web hiện đại. 
Thứ nhất, về SEO: các công cụ tìm kiếm như Google sử dụng semantic tags 
để hiểu cấu trúc nội dung. Ví dụ, <article> giúp xác định nội dung chính, 
<nav> xác định menu điều hướng. Nếu chỉ dùng <div>, crawler sẽ khó hiểu → 
giảm thứ hạng.

Thứ hai, về accessibility: screen reader dựa vào semantic để đọc nội dung. 
Ví dụ <header>, <main>, <footer> giúp người dùng khiếm thị hiểu layout.

Ví dụ: một trang sản phẩm dùng <article> sẽ giúp Google hiển thị tốt hơn 
trong kết quả tìm kiếm.

Tuy nhiên, <div> vẫn cần thiết khi:
- Không có thẻ semantic phù hợp
- Dùng cho layout CSS

Kết luận: semantic HTML giúp website chuyên nghiệp, dễ hiểu và chuẩn hơn.
