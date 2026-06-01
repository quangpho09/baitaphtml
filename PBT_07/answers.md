# PHẦN A — KIỂM TRA ĐỌC HIỂU

## Câu A1 — var / let / const

### Dự đoán kết quả:

**Đoạn 1:**
```javascript
console.log(x);  // Output: undefined
var x = 5;
```
**Giải thích:** Hoisting - biến `var` được nâng lên đầu scope, nhưng giá trị chỉ gán khi chạy đến dòng khai báo.

**Đoạn 2:**
```javascript
console.log(y);  // Output: ReferenceError: Cannot access 'y' before initialization
let y = 10;
```
**Giải thích:** `let` có Temporal Dead Zone (TDZ) - không thể truy cập trước khai báo.

**Đoạn 3:**
```javascript
const z = 15;
z = 20;          // Output: TypeError: Assignment to constant variable
console.log(z);
```
**Giải thích:** `const` không thể gán lại giá trị.

**Đoạn 4:**
```javascript
const arr = [1, 2, 3];
arr.push(4);
console.log(arr);  // Output: [1, 2, 3, 4]
```
**Giải thích:** `const` ngăn gán lại tham chiếu, nhưng không ngăn sửa nội dung của object/array.

**Đoạn 5:**
```javascript
let a = 1;
{
    let a = 2;
    console.log("Trong block:", a);    // Output: Trong block: 2
}
console.log("Ngoài block:", a);        // Output: Ngoài block: 1
```
**Giải thích:** `let` có block scope - biến `a` trong block khác biệt với `a` ngoài.

---

## Câu A2 — Data Types & Coercion

### Dự đoán kết quả:

```javascript
console.log(typeof null);              // "object" (lỗi lịch sử JS)
console.log(typeof undefined);         // "undefined"
console.log(typeof NaN);              // "number"
console.log("5" + 3);                 // "53" (string concatenation)
console.log("5" - 3);                 // 2 (numeric coercion)
console.log("5" * "3");              // 15 (numeric coercion)
console.log(true + true);            // 2 (true = 1)
console.log([] + []);                // "" (empty string)
console.log([] + {});                // "[object Object]"
console.log({} + []);                // "[object Object]" hoặc 0
```

**Giải thích sự khác nhau giữa `"5" + 3` và `"5" - 3`:**
- Toán tử `+` có 2 mục đích: cộng số hoặc nối chuỗi. Nếu có bất kỳ operand nào là string → nối chuỗi
- Toán tử `-` chỉ dùng cho số → luôn convert string thành number

---

## Câu A3 — So sánh == vs ===

### Dự đoán kết quả:

```javascript
console.log(5 == "5");                // true (coercion)
console.log(5 === "5");               // false (strict, khác type)
console.log(null == undefined);       // true (special case)
console.log(null === undefined);      // false (khác type)
console.log(NaN == NaN);             // false (NaN không bằng chính nó)
console.log(0 == false);             // true (false coerce to 0)
console.log(0 === false);            // false (khác type)
console.log("" == false);            // true (cả 2 falsy, coerce bằng nhau)
```

**Quy tắc:** **Nên dùng `===` (strict equality)** vì:
- An toàn hơn, tránh type coercion bất ngờ
- Rõ ràng ý định so sánh
- Hiệu suất tốt hơn (không cần convert)

---

## Câu A4 — Truthy & Falsy

### Tất cả giá trị Falsy trong JavaScript:
1. `false`
2. `0`
3. `-0`
4. `0n` (BigInt)
5. `""` (empty string)
6. `null`
7. `undefined`
8. `NaN`

### Dự đoán kết quả:

```javascript
if ("0") console.log("A");           // In A ("0" là string, truthy)
if ("") console.log("B");            // Không in (empty string, falsy)
if ([]) console.log("C");            // In C (array là object, truthy)
if ({}) console.log("D");            // In D (object là truthy)
if (null) console.log("E");          // Không in (null, falsy)
if (0) console.log("F");             // Không in (0, falsy)
if (-1) console.log("G");            // In G (-1 là truthy)
if (" ") console.log("H");           // In H (space, string non-empty, truthy)
```

---

## Câu A5 — Template Literals

### Viết lại bằng Template Literal:

**Cách 1:**
```javascript
var greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;
```

**Cách 2:**
```javascript
var url = `https://api.example.com/users/${userId}/orders?page=${page}`;
```

**Cách 3:**
```javascript
var html = `<div class="card">
    <h2>${title}</h2>
    <p>${description}</p>
    <span>Giá: ${price}đ</span>
</div>`;
```

---

# PHẦN C — SUY LUẬN

## Câu C1 — Debug JavaScript

### Tất cả lỗi trong code:

```javascript
// LỖI 1: Thiếu dấu chấm phẩy (style, không nghiêm trọng)
// LỖI 2: Dùng = thay vì == hoặc === trong if
// LỖI 3: giaBan là string nhưng dùng làm number
// LỖI 4: Sử dụng var trong loop gây hoisting

function tinhGiaGiamGia(giaBan, phanTramGiam) {
    // LỖI 1: giaBan có thể là string, cần convert
    if (typeof giaBan !== 'number' || giaBan < 0) {
        return "Lỗi: Giá bán không hợp lệ";
    }
    
    if (phanTramGiam < 0 || phanTramGiam > 100) {
        return "Phần trăm giảm không hợp lệ"; // Thêm dấu chấm phẩy
    }
    
    var giamGia = giaBan * phanTramGiam / 100;
    let giaSauGiam = giaBan - giamGia;
    
    // LỖI 2: Dùng = (gán) thay vì === hoặc ==
    if (giaSauGiam === 0) {
        console.log("Sản phẩm miễn phí!");
    }
    
    return giaSauGiam;
}

// Test
const gia = tinhGiaGiamGia(100000, 20);  // LỖI 3 CẬP NHẬT: truyền số thay vì string
console.log("Giá sau giảm: " + gia + "đ");

const gia2 = tinhGiaGiamGia(50000, 110);
console.log("Giá: " + gia2);

// LỖI 4: var trong loop gây hoisting, tất cả callback share cùng i
// Sửa: dùng let thay vì var
for (let i = 0; i < 5; i++) {  // Thay var thành let
    setTimeout(function() {
        console.log("Item " + i);  // Sẽ in Item 0,1,2,3,4
    }, 1000);
}
```

### Giải thích lỗi chi tiết:

| Lỗi | Vị trí | Mô tả | Cách sửa |
|-----|--------|-------|---------|
| 1 | Tham số `giaBan` | Input là string "100000" nhưng code dùng làm number | Validate type hoặc convert: `Number(giaBan)` |
| 2 | `if (giaSauGiam = 0)` | Dùng assignment `=` thay vì comparison `==` hoặc `===` | Dùng `===` hoặc `==` |
| 3 | Call function | Truyền string "100000" thay vì number 100000 | Truyền `100000` không có ngoặc kép |
| 4 | Loop với `var` | `var` hoisting + shared reference, callback lấy i=5 khi chạy | Thay `var` thành `let` |

**Lỗi ẩn về var:**
- `var i` được hoisting lên đầu scope global
- Tất cả 5 callback share cùng `i`
- Khi callback chạy sau 1000ms, `i` đã là 5
- Kết quả: in "Item 5" năm lần

Sửa bằng `let` vì `let` có block scope - mỗi iteration có `i` riêng.

---
