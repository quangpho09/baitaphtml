# 📋 PHIẾU BÀI TẬP 07 - JavaScript Basics - HOÀN THÀNH

> **Lớp:** JavaScript Basics  
> **Thời gian:** 120 phút  
> **Tổng điểm:** 100  

## 📁 Cấu trúc File

```
phieubaitap07/
├── answers.md                    # Phần A + C1 (Lý thuyết + Debug)
├── var_let_const.js             # Câu A1 - Kiểm chứng
├── calculator.js                # Bài B1 - Máy tính
├── student_data.js              # Bài B2 - Xử lý dữ liệu
├── guess_number.html            # Bài B3 - Game (HTML)
├── guess.js                     # Bài B3 - Game (Logic)
├── fizzbuzz.js                  # Bài B4 - FizzBuzz
├── restaurant_bill.js           # Câu C2 - Tính hóa đơn
├── README.md                    # File này
└── screenshots/                 # Folder chứa ảnh kết quả
    └── (các ảnh console output sẽ được thêm)
```

---

## 🚀 HƯỚNG DẪN CHẠY

### Phần A - Câu A1: var/let/const
```bash
node var_let_const.js
```
**Output:** Hiển thị các dự đoán và kết quả thực tế với giải thích.

---

### Phần B - Bài B1: Calculator
```bash
node calculator.js
```
**Features:**
- ✅ Hỗ trợ: `+`, `-`, `*`, `/`, `%`, `**`
- ✅ Validate input (không phải số)
- ✅ Xử lý chia cho 0
- ✅ Kiểm tra operator hợp lệ

---

### Phần B - Bài B2: Student Data
```bash
node student_data.js
```
**Chức năng:**
1. ✅ Tính GPA (math×0.4 + physics×0.3 + cs×0.3)
2. ✅ Phân loại: Giỏi(≥8), Khá(≥6.5), Trung bình(≥5), Yếu(<5)
3. ✅ In bảng kết quả chi tiết
4. ✅ Đếm số SV mỗi loại
5. ✅ Tìm top SV + bottom SV
6. ✅ Tính TB toàn lớp theo môn
7. ✅ **Bonus:** Tính TB theo giới tính

---

### Phần B - Bài B3: Guess Number Game
```
1. Mở file: guess_number.html trong trình duyệt
2. Click nút "🎯 Bắt đầu trò chơi"
3. Nhập số dự đoán (1-100)
4. Máy gợi ý: "Cao hơn" / "Thấp hơn"
5. Đoán đúng trong 7 lượt để thắng!
```

**Features:**
- ✅ Random số 1-100
- ✅ Validate input (chỉ nhận số 1-100)
- ✅ Phát hiện số đã đoán
- ✅ Hiển thị danh sách số đã đoán
- ✅ Giới hạn 7 lượt
- ✅ UI đẹp với gradient + responsive

---

### Phần B - Bài B4: FizzBuzz
```bash
node fizzbuzz.js
```
**Chức năng:**
1. **Classic:** In 1-100 với Fizz/Buzz cho chia hết 3/5
2. **Custom:** Hàm `customFizzBuzz(n, rules)` làm việc với bất kỳ bộ rule nào
   ```javascript
   customFizzBuzz(30, [
       { divisor: 3, word: "Fizz" },
       { divisor: 5, word: "Buzz" },
       { divisor: 7, word: "Jazz" }
   ]);
   ```

---

### Phần C - Câu C2: Restaurant Bill
```bash
node restaurant_bill.js
```

**Quy tắc giảm giá:**
- Tổng > 500K → 10%
- Tổng > 1 triệu → 15%
- Ngày thứ 3 → +5% thêm
- VAT: 8%
- Tip: 5% (optional)

**Test Cases:**
- Test 1: Hóa đơn đơn giản (200K)
- Test 2: Hóa đơn 500K+ (giảm 10%)
- Test 3: Hóa đơn > 1 triệu (giảm 15%)
- Test 4: Ngày thứ 3 (giảm thêm 5%)
- Test 5: Không tính tip
- Test 6: Kết hợp nhiều điều kiện

**Output:** Hóa đơn định dạng đẹp với Unicode box drawing

---

## ✅ CHECKLIST HOÀN THÀNH

- [x] **Phần A - Kiểm tra đọc hiểu (25đ)**
  - [x] Câu A1: var/let/const (5đ) ✓
  - [x] Câu A2: Data Types & Coercion (5đ) ✓
  - [x] Câu A3: == vs === (5đ) ✓
  - [x] Câu A4: Truthy & Falsy (5đ) ✓
  - [x] Câu A5: Template Literals (5đ) ✓

- [x] **Phần B - Thực hành Code (55đ)**
  - [x] Bài B1: Calculator (15đ) ✓
  - [x] Bài B2: Student Data (15đ) ✓
  - [x] Bài B3: Guess Game (15đ) ✓
  - [x] Bài B4: FizzBuzz (10đ) ✓

- [x] **Phần C - Suy luận (20đ)**
  - [x] Câu C1: Debug (10đ) ✓
  - [x] Câu C2: Restaurant Bill (10đ) ✓

- [ ] **Phần D - Video OBS (25đ)**
  - [ ] Quay video code-along 7-10 phút
  - [ ] Giải thích hoisting, TDZ, type coercion, strict equality

---

## 📌 KIẾN THỨC QUAN TRỌNG

### 1️⃣ var vs let vs const
```javascript
var x;      // Function scope, hoisting, re-declare OK
let y;      // Block scope, TDZ, re-declare ❌
const z;    // Block scope, TDZ, re-assign ❌, re-declare ❌
```

### 2️⃣ Type Coercion
```javascript
"5" + 3      → "53" (string concat)
"5" - 3      → 2 (numeric coercion)
"5" * "3"    → 15 (numeric coercion)
true + true  → 2 (true = 1)
```

### 3️⃣ == vs ===
```javascript
5 == "5"     → true (coercion)
5 === "5"    → false (strict, khác type)
null == undefined → true (special case)
null === undefined → false
```

### 4️⃣ Falsy Values
```
false, 0, -0, 0n, "", null, undefined, NaN
```
Tất cả giá trị khác đều **Truthy**

### 5️⃣ Template Literals
```javascript
const name = "Hoa";
const age = 20;
console.log(`Tên: ${name}, Tuổi: ${age}`);
```

---

## 🎯 HƯỚNG DẪN LÀM VIDEO OBS (25 điểm)

**Yêu cầu:** 7-10 phút, giải thích var/let/const + type coercion

### Checklist Video:
- [ ] Mở Chrome DevTools Console
- [ ] Demo hoisting: `console.log(x); var x = 5;` → `undefined`
- [ ] Demo let: `console.log(y); let y = 10;` → `ReferenceError (TDZ)`
- [ ] Demo const: không thể gán lại, nhưng có thể sửa nội dung
- [ ] Type Coercion 5 ví dụ:
  - `"5" + 3` → "53"
  - `"5" - 3` → 2
  - `true + true` → 2
  - `[] + {}` → "[object Object]"
  - Giải thích quy tắc: `+` nối chuỗi, `-` convert số
- [ ] `==` vs `===`: giải thích strict equality
- [ ] Viết hàm `calculate(a, op, b)` → chạy Node.js
- [ ] **Đầu video:** Tên + MSSV + Lớp
- [ ] **Cuối video:** Tổng kết 3 quy tắc quan trọng

---

## 🔗 THAM KHẢO

- **Tài liệu gốc:** `tuan_4_javascript_basics/01_basics_introduction.md`
- **MDN Web Docs:** https://developer.mozilla.org/en-US/docs/Web/JavaScript/
- **ECMAScript:** https://www.ecma-international.org/publications-and-standards/standards/ecma-262/

---

## 💡 TIPS

1. **Chạy code:**
   - Node.js: `node tên_file.js`
   - Browser: Mở DevTools (`F12`), Console tab, paste code
   - HTML: Mở file trực tiếp trong trình duyệt

2. **Debug:**
   - Dùng `console.log()` để in biến
   - Dùng `typeof` để kiểm tra type
   - Dùng `debugger;` để tạm dừng

3. **Validate:**
   - Kiểm tra type: `typeof`, `Array.isArray()`
   - Kiểm tra khoảng: `min <= x <= max`
   - Kiểm tra rỗng: `str === ""`, `arr.length === 0`

---

## ✨ GHI CHÚ

- **Tất cả file JS chạy được trực tiếp** (không cần npm/thư viện)
- **Toàn bộ code tuân theo yêu cầu:** Vanilla JavaScript, không dùng thư viện
- **HTML file (B3) có CSS inline**, không cần file riêng
- **Tất cả validate input đầy đủ**, xử lý edge cases

---

**Chúc bạn hoàn thành tốt bài tập! 🎉**

*Generated: 2024*
