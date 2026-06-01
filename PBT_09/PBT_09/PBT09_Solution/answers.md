# PHIẾU BÀI TẬP 09 - ANSWERS
## DOM MANIPULATION & EVENTS

---

## PHẦN A — KIỂM TRA ĐỌC HIỂU (15 điểm)

### Câu A1 (5đ) — DOM Tree

#### 1. Vẽ DOM Tree

```
#app (div)
├── header
│   ├── h1 "Todo App"
│   └── nav
│       ├── a.active "All"
│       ├── a "Active"
│       └── a "Completed"
└── main
    ├── form#todoForm
    │   ├── input#todoInput
    │   └── button "Add"
    └── ul#todoList
        ├── li.todo-item "Learn HTML"
        └── li.todo-item.completed "Learn CSS"
```

#### 2. Queryselector cho mỗi yêu cầu:

```javascript
// Chọn thẻ <h1>
document.querySelector("h1")

// Chọn input trong form
document.querySelector("#todoForm input")
// hoặc
document.querySelector("#todoInput")

// Chọn tất cả .todo-item
document.querySelectorAll(".todo-item")

// Chọn link đang active
document.querySelector("a.active")
// hoặc
document.querySelector("nav a.active")

// Chọn <li> đầu tiên trong #todoList
document.querySelector("#todoList li")

// Chọn tất cả <a> bên trong <nav>
document.querySelectorAll("nav a")
```

---

### Câu A2 (5đ) — innerHTML vs textContent

#### Sự khác nhau:

| Thuộc tính | Mục đích | An toàn | Xử lý HTML |
|-----------|---------|--------|-----------|
| `innerHTML` | Lấy/set nội dung bao gồm HTML tags | ❌ Nguy hiểm (XSS) | ✅ Parse HTML |
| `textContent` | Lấy/set chỉ text thuần (không tags) | ✅ An toàn | ❌ Không parse |

#### Khi nào dùng?

- **`innerHTML`**: Khi muốn render HTML structure (nhưng chỉ từ dữ liệu tin cậy)
  ```javascript
  // Dữ liệu từ database, trusted source
  element.innerHTML = "<strong>Tiêu đề</strong>";
  ```

- **`textContent`**: Khi chỉ hiển thị text, hoặc dữ liệu từ user input
  ```javascript
  // Dữ liệu từ user - LUÔN dùng textContent
  element.textContent = userInput;
  ```

#### Lỗ hổng XSS:

**Tại sao `innerHTML` nguy hiểm?**
- Nếu user input chứa code JavaScript hoặc event handlers, `innerHTML` sẽ parse và thực thi nó
- Attacker có thể steal cookies, session tokens, redirect trang...

**Ví dụ minh họa:**
```javascript
// ❌ NGUY HIỂM - Không làm
const userInput = document.querySelector("#search").value;
document.querySelector("#result").innerHTML = userInput;

// Giả sử user nhập: <img src=x onerror="alert('Hacked!')">
// innerHTML sẽ parse tag <img> và chạy onerror event

// ✅ CÁCH SỬA - 1. Dùng textContent
document.querySelector("#result").textContent = userInput;

// ✅ CÁCH SỬA - 2. Dùng createElement (nếu cần render structure)
const div = document.createElement("div");
div.textContent = userInput; // Nội dung safe
document.querySelector("#result").appendChild(div);

// ✅ CÁCH SỬA - 3. Sanitize HTML (nếu thực sự cần)
// Dùng thư viện như DOMPurify
// const clean = DOMPurify.sanitize(userInput);
// element.innerHTML = clean;
```

---

### Câu A3 (5đ) — Event Bubbling

#### Khi click vào button (KHÔNG uncomment):

```
Output:
BUTTON
INNER
OUTER
```

**Giải thích:** Event bubbles từ button → inner div → outer div

#### Khi uncomment `e.stopPropagation()`:

```
Output:
BUTTON
```

**Giải thích:** `stopPropagation()` ngừng event bubbling tại button, không propagate lên parent

---

## PHẦN C — DEBUG & PHÂN TÍCH (15 điểm)

### Câu C1 (8đ) — Debug DOM Code

#### 7 Lỗi tìm được:

1. **Line: `addEventListener("onclick", ...)` - LỖI**
   - ❌ `addEventListener("onclick", ...)` ← sai tên event
   - ✅ `addEventListener("click", ...)`

2. **Line: `countDisplay = count` - LỖI**
   - ❌ Gán giá trị số vào element
   - ✅ `countDisplay.textContent = count`

3. **Line: `historyList.innerHTML = null` - LỖI (tuy hoạt động nhưng xấu)**
   - ❌ `innerHTML = null` - dùng string `""` tốt hơn
   - ✅ `historyList.innerHTML = ""`
   - Hoặc tốt nhất: `historyList.replaceChildren()` (ES2021)

4. **Line: `item.remove;` - LỖI**
   - ❌ Gọi method mà không có `()`
   - ✅ `item.remove()`

5. **Line: `count = localStorage.getItem("count")` - LỖI (logic)**
   - ❌ `getItem()` trả về string, không convert sang number
   - ✅ `count = parseInt(localStorage.getItem("count")) || 0`

6. **Line: `localStorage.getItem("history")` - LỖI (logic)**
   - ❌ Lấy HTML từ localStorage và set trực tiếp XSS risk!
   - ✅ Nên lưu JSON array, parse lại, rebuild bằng `createElement`

7. **Load history nhưng KHÔNG check null - LỖI (logic)**
   - ❌ Nếu localStorage trống, `getItem()` trả `null` → UI bị lỗi
   - ✅ Phải check `if (stored)` trước khi dùng

#### Code đã sửa:

```javascript
const countDisplay = document.querySelector(".count");
const historyList = document.getElementById("history");

let count = 0;

document.querySelector("#incrementBtn").addEventListener("click", function() {
    count++;
    countDisplay.textContent = count;  // ✅ Sửa: textContent thay innerHTML
    addHistory(`Count changed to ${count}`);
});

document.querySelector("#decrementBtn").addEventListener("click", function() {  // ✅ Sửa: "click" thay "onclick"
    count--;
    countDisplay.textContent = count;
});

document.querySelector("#resetBtn").addEventListener("click", () => {
    count = 0;
    countDisplay.textContent = count;  // ✅ Sửa: textContent thay =
    historyList.innerHTML = "";  // ✅ Sửa: "" thay null
});

function addHistory(message) {
    const li = document.createElement("li");
    li.textContent = message;
    li.addEventListener("click", function() {
        deleteHistory(this);
    });
    historyList.append(li);
}

function deleteHistory(element) {
    element.remove();  // ✅ Sửa: remove() thay removeChild
}

document.querySelector("#clearHistory").addEventListener("click", () => {
    const items = historyList.querySelectorAll("li");
    items.forEach(item => {
        item.remove();  // ✅ Sửa: thêm ()
    });
});

window.addEventListener("beforeunload", () => {
    localStorage.setItem("count", count);
    localStorage.setItem("history", JSON.stringify(getAllHistory()));  // ✅ JSON thay innerHTML
});

function getAllHistory() {
    const items = [];
    historyList.querySelectorAll("li").forEach(li => {
        items.push(li.textContent);
    });
    return items;
}

window.addEventListener("load", () => {
    const stored = localStorage.getItem("count");  // ✅ Check null
    if (stored) {
        count = parseInt(stored) || 0;  // ✅ parseInt
        countDisplay.textContent = count;
        
        const history = JSON.parse(localStorage.getItem("history") || "[]");  // ✅ JSON parse
        history.forEach(msg => {
            addHistory(msg);
        });
    }
});
```

---

### Câu C2 (7đ) — Performance

#### 1. Tại sao 1000 event listeners riêng lẻ là BAD PRACTICE?

**Vấn đề:**
- Mỗi element có 1 listener → Tổng 1000 listeners trong memory
- Tốn RAM, tốn CPU khi cleanup (remove listener)
- Khó quản lý, dễ leak memory
- Page load chậm

**Event Delegation giải quyết:**
- Chỉ bind 1 listener trên parent (ví dụ `#list`)
- Tất cả click từ children sẽ bubble lên → parent listener xử lý
- Check `e.target` để biết click vào element nào
- Chỉ tốn 1 listener trong memory, tiết kiệm 99% memory!

**Ví dụ so sánh:**

```javascript
// ❌ BAD: 1000 listeners
const items = document.querySelectorAll(".item");
items.forEach(item => {
    item.addEventListener("click", handleClick);  // 1000 lần!
});

// ✅ GOOD: Event Delegation (1 listener)
document.querySelector("#list").addEventListener("click", (e) => {
    if (e.target.classList.contains("item")) {
        handleClick(e.target);
    }
});
```

---

#### 2. Refactor dùng DocumentFragment

**Code cũ (1000 lần reflow):**
```javascript
for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;
    document.body.appendChild(div);   // ← Reflow mỗi lần!
}
// Tổng: 1000 reflow = rất chậm
```

**Code tối ưu (1 lần reflow):**
```javascript
const fragment = document.createDocumentFragment();

for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;
    fragment.appendChild(div);  // Thêm vào fragment (off-DOM)
}

document.body.appendChild(fragment);  // ← Chỉ 1 lần reflow!
```

**Tại sao nhanh hơn?**
- **Reflow** = Browser tính lại layout → Đắt về performance
- Mỗi `appendChild()` lên DOM là 1 reflow
- `DocumentFragment` là node giả (off-DOM) → `appendChild()` vào nó KHÔNG reflow
- Khi append fragment lên DOM, browser merge tất cả con → 1 reflow duy nhất
- **Tốc độ:** 1000 reflow → 1 reflow = ~1000x nhanh hơn!

**Đo hiệu năng:**
```javascript
console.time("without fragment");
// Code cũ ở đây
console.timeEnd("without fragment");  // Khoảng 500-1000ms

console.time("with fragment");
// Code tối ưu ở đây
console.timeEnd("with fragment");  // Khoảng 5-10ms
```

---

