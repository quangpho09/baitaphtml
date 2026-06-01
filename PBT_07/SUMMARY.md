# 📊 PHIẾU BÀI TẬP 07 - TỔNG HỢP HOÀN THÀNH

## 🎯 Mục tiêu bài tập
Kiểm tra kiến thức về JavaScript Basics:
- Variables: var vs let vs const
- Data Types & Type Coercion
- Control Structures: if/else, for, switch
- Functions & Error Handling

---

## 📝 PHẦN A - KIỂM TRA ĐỌC HIỂU (25 điểm)

### ✅ Câu A1: var / let / const (5đ)
**File:** `var_let_const.js`
- [x] Giải thích hoisting với `var`
- [x] Giải thích Temporal Dead Zone (TDZ) với `let`
- [x] Giải thích const: không gán lại nhưng có thể sửa nội dung
- [x] Giải thích block scope của `let` vs function scope của `var`

**Kết quả chính:**
```
var: hoisting (undefined), function scope
let: TDZ (ReferenceError), block scope  ✓
const: TypeError (không gán lại), block scope ✓
```

---

### ✅ Câu A2: Data Types & Coercion (5đ)
**File:** `answers.md`
- [x] `typeof null` → "object" (bug lịch sử)
- [x] Type coercion rules:
  - `"5" + 3` → "53" (string concat)
  - `"5" - 3` → 2 (numeric coercion)
  - `"5" * "3"` → 15 (numeric coercion)
- [x] `typeof NaN` → "number"

**Quy tắc:** Operator `+` ưu tiên string, `-/*` ưu tiên number

---

### ✅ Câu A3: == vs === (5đ)
**File:** `answers.md`
- [x] `5 == "5"` → true (coercion)
- [x] `5 === "5"` → false (strict equality)
- [x] Khuyến cáo: **Dùng `===` để tránh bug**

---

### ✅ Câu A4: Truthy & Falsy (5đ)
**File:** `answers.md`
- [x] Falsy values: `false, 0, -0, 0n, "", null, undefined, NaN` (8 giá trị)
- [x] Truthy: Tất cả giá trị khác
- [x] `"0"` là truthy (string non-empty)
- [x] `[]`, `{}` là truthy (objects)

---

### ✅ Câu A5: Template Literals (5đ)
**File:** `answers.md`
- [x] Viết lại 3 cách nối chuỗi bằng backtick
- [x] Sử dụng `${variable}` cho interpolation
- [x] Hỗ trợ multi-line strings

**Ví dụ:**
```javascript
const greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;
```

---

## 💻 PHẦN B - THỰC HÀNH CODE (55 điểm)

### ✅ Bài B1: Máy tính đơn giản (15đ)
**File:** `calculator.js`
- [x] Hàm `calculate(num1, operator, num2)`
- [x] Hỗ trợ 6 operator: `+, -, *, /, %, **`
- [x] Validate input: kiểm tra type number
- [x] Validate operator: kiểm tra hợp lệ
- [x] Xử lý edge case: chia cho 0
- [x] Test cases đầy đủ

**Edge Cases Xử Lý:**
- Division by zero: "Lỗi: Không thể chia cho 0"
- Invalid operator: "Lỗi: Operator 'X' không hợp lệ"
- Non-number input: "Lỗi: Input không phải số"

---

### ✅ Bài B2: Xử lý dữ liệu sinh viên (15đ)
**File:** `student_data.js`
- [x] Tính GPA: `math×0.4 + physics×0.3 + cs×0.3`
- [x] Phân loại: Giỏi(≥8), Khá(≥6.5), Trung bình(≥5), Yếu(<5)
- [x] In bảng kết quả (tên, GPA, xếp loại)
- [x] Đếm số SV mỗi loại
- [x] Tìm SV GPA cao nhất + thấp nhất
- [x] Tính TB toàn lớp theo từng môn
- [x] **Bonus:** TB theo giới tính (Nam/Nữ)

**Output:**
```
| STT | Tên    | TB   | Xếp loại    |
|-----|--------|------|-------------|
| 1   | An     | 8.0  | Giỏi        |
...
Giỏi: 2, Khá: 3, Trung bình: 2, Yếu: 1
```

---

### ✅ Bài B3: Game Đoán số (15đ)
**File:** `guess_number.html` + `guess.js`
- [x] Random số 1-100
- [x] Nhập số qua `prompt()`
- [x] Gợi ý "Cao hơn" / "Thấp hơn"
- [x] Giới hạn 7 lượt
- [x] Validate input: chỉ nhận số 1-100
- [x] Phát hiện số đã đoán rồi
- [x] Hiển thị danh sách số đã đoán
- [x] UI đẹp với CSS gradient + responsive

**Features:**
- ✓ Game logic chính xác
- ✓ Validate input toàn diện
- ✓ Ghi nhớ số đã đoán
- ✓ Tính số lần đoán
- ✓ UI/UX thân thiện

---

### ✅ Bài B4: FizzBuzz nâng cao (10đ)
**File:** `fizzbuzz.js`
- [x] **Classic:** In 1-100 với Fizz/Buzz
- [x] **Custom:** Hàm `customFizzBuzz(n, rules)`
- [x] Rules: mảng `[{divisor, word}, ...]`
- [x] Hoạt động với bất kỳ bộ rule nào
- [x] Test cases: 6 test khác nhau

**Ví dụ Custom:**
```javascript
customFizzBuzz(30, [
    { divisor: 3, word: "Fizz" },
    { divisor: 5, word: "Buzz" },
    { divisor: 7, word: "Jazz" }
]);
// 21 → FizzJazz, 15 → FizzBuzz, 35 → BuzzJazz
```

---

## 🧠 PHẦN C - SUY LUẬN (20 điểm)

### ✅ Câu C1: Debug JavaScript (10đ)
**File:** `answers.md`

**6+ Lỗi tìm được:**
1. ❌ `giaBan` truyền string "100000" → cần validate type
2. ❌ `if (giaSauGiam = 0)` dùng `=` thay vì `===`
3. ❌ `var` trong loop gây hoisting + shared reference
4. ❌ Callback lấy `i=5` khi chạy (closure bug)
5. ❌ Thiếu dấu chấm phẩy (style)
6. ❌ Không validate `giaBan` là number

**Sửa:** Dùng `let` thay `var`, dùng `===` thay `=`

---

### ✅ Câu C2: Tính hóa đơn nhà hàng (10đ)
**File:** `restaurant_bill.js`

**Quy tắc giảm giá:**
- ✅ Tổng > 500K → 10%
- ✅ Tổng > 1 triệu → 15%
- ✅ Ngày thứ 3 (Wednesday) → +5% thêm
- ✅ VAT: 8%
- ✅ Tip: 5% (optional)

**Output:** Hóa đơn chi tiết dạng box

```
╔══════════════════════════════════════╗
║        HÓA ĐƠN NHÀ HÀNG           ║
║ 1. Phở bò      x2    @65k  = 130k  ║
║ ...                                  ║
║ Tổng cộng:              200.000đ    ║
║ Giảm giá (0%):           0đ         ║
║ VAT (8%):                16.000đ    ║
║ Tip (5%):                10.000đ    ║
║ THANH TOÁN:              226.000đ   ║
╚══════════════════════════════════════╝
```

**Test Cases:** 6 test khác nhau (cộng, giảm giá kép, không tip, v.v.)

---

## 🎬 PHẦN D - VIDEO OBS (25 điểm)
**Status:** ⏳ Cần quay thêm (đã chuẩn bị tất cả code)

**Nội dung cần giải thích:**
1. Hoisting: `console.log(x); var x = 5;` → undefined
2. TDZ: `console.log(y); let y = 10;` → ReferenceError
3. Const: gán lại → TypeError, nhưng sửa nội dung OK
4. Type Coercion: 5 ví dụ quan trọng
5. == vs ===: strict equality
6. Viết hàm, chạy Node.js

---

## 📊 THỐNG KÊ

| Phần | Nội dung | Điểm | Status |
|------|----------|------|--------|
| A | Kiểm tra đọc hiểu | 25 | ✅ |
| B1 | Calculator | 15 | ✅ |
| B2 | Student Data | 15 | ✅ |
| B3 | Guess Game | 15 | ✅ |
| B4 | FizzBuzz | 10 | ✅ |
| C1 | Debug | 10 | ✅ |
| C2 | Restaurant Bill | 10 | ✅ |
| D | Video OBS | 25 | ⏳ |
| **TỔNG** | | **125** | **80% ✅** |

---

## 🛠️ CÁCH SỬ DỤNG

### Chạy từng bài:
```bash
# A1
node var_let_const.js

# B1
node calculator.js

# B2
node student_data.js

# B3
# Mở file: guess_number.html trong trình duyệt

# B4
node fizzbuzz.js

# C2
node restaurant_bill.js
```

---

## 📌 KIẾN THỨC CHÍNH

✅ **var/let/const:** Scope, hoisting, TDZ  
✅ **Type Coercion:** Quy tắc convert type  
✅ **== vs ===:** Strict equality quan trọng  
✅ **Truthy/Falsy:** 8 falsy values  
✅ **Template Literals:** String interpolation  
✅ **Functions:** Validate input, xử lý edge cases  
✅ **Loops:** for, array processing  
✅ **Error Handling:** Try-catch, return error messages  

---

## 💾 FILE STRUCTURE

```
PHIEUBAITAP07/
│
├── 📄 answers.md               (A1-A5 + C1)
├── 📄 var_let_const.js         (A1 thực hành)
├── 📄 calculator.js             (B1)
├── 📄 student_data.js           (B2)
├── 📄 guess_number.html         (B3)
├── 📄 guess.js                  (B3 logic)
├── 📄 fizzbuzz.js               (B4)
├── 📄 restaurant_bill.js        (C2)
├── 📄 README.md                 (Hướng dẫn)
├── 📄 SUMMARY.md                (File này)
├── 📄 .gitignore                (Git config)
└── 📁 screenshots/              (Ảnh kết quả)
```

---

## ✨ ĐẶC ĐIỂM NỔI BẬT

🎯 **Hoàn thiện:** Tất cả bài tập B1-B4, A1-A5, C1-C2  
🎨 **UI/UX:** B3 có giao diện đẹp, responsive  
🛡️ **Validate:** Kiểm tra input toàn diện ở tất cả bài  
📊 **Test Cases:** Mỗi bài có 5-6 test case khác nhau  
📝 **Documentation:** Code có comment chi tiết  
🔍 **Debugging:** Giải thích hành vi bất ngờ  

---

## 🎓 YÊU CẦU THÊM

✅ Tất cả file JS chạy được trực tiếp (Node.js hoặc Browser)  
✅ Không dùng thư viện ngoài (vanilla JavaScript)  
✅ Validate input đầy đủ, xử lý edge cases  
✅ Code có comment giải thích  
✅ Output rõ ràng, dễ hiểu  

---

**Hoàn thành: 100% nội dung code + lý thuyết**  
**Còn lại: Quay video OBS để hoàn tất 100 điểm**

*Good luck! 🚀*
