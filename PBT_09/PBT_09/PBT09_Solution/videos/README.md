# 🎬 Video Thực Hành OBS

## Yêu cầu Video

**Thời lượng:** 10-15 phút
**Format:** MP4 hoặc link YouTube/Drive

## Đề bài Video
"Mini Todo App từ Zero bằng DOM" - Code-along hoàn chỉnh

## Nội dung Video (Bắt buộc)

1. 🎤 **Giới thiệu** (1 phút)
   - Tên + MSSV + Lớp
   - Mục đích của video

2. 🎤 **HTML Skeleton** (2 phút)
   - Tạo form + input + button + ul
   - Giải thích structure

3. 🎤 **JavaScript Selectors** (1 phút)
   - querySelector cho form, input, list
   - Giải thích mỗi selector

4. 🎤 **Form Submit Event** (2 phút)
   - addEventListener("submit", ...)
   - Tại sao dùng "submit" thay vì "click"?
   - Demo: Không dùng e.preventDefault() → trang reload
   - Sau đó thêm e.preventDefault()

5. 🎤 **DOM Element Creation** (2 phút)
   - createElement("li")
   - appendChild()
   - Giải thích tạo node

6. 🎤 **Delete Button** (1 phút)
   - Thêm nút ❌ xóa
   - Bind event → li.remove()

7. 🎤 **Toggle Completed** (1 phút)
   - Click vào text → classList.toggle("completed")
   - Giải thích toggle

8. 🎤 **Demo Final** (2 phút)
   - Thêm 3 todos
   - Toggle 1 todo
   - Xóa 1 todo
   - Show kết quả

9. 🎤 **Tổng kết** (1 phút)
   - XSS risk của innerHTML
   - Tại sao dùng createElement
   - DOM Manipulation flow

## Checklist Video

- [ ] Đầu video: Giới thiệu tên + MSSV + lớp
- [ ] Webcam mặt SV ở góc phải dưới
- [ ] Gõ code từng dòng HTML → CSS → JS
- [ ] Demo: preventDefault trước/sau
- [ ] Demo: Thêm/xóa/toggle todo
- [ ] Cuối video: Tổng kết
- [ ] File naming: `PBT09_HoTen_MaSV.mp4`

## Sample Code (Từ video)

```javascript
const form = document.querySelector("#todoForm");
const input = document.querySelector("#todoInput");
const list = document.querySelector("#todoList");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!input.value.trim()) return;
    
    const li = document.createElement("li");
    li.textContent = input.value;
    
    li.addEventListener("click", () => {
        li.classList.toggle("completed");
    });
    
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.addEventListener("click", () => li.remove());
    li.appendChild(deleteBtn);
    
    list.appendChild(li);
    input.value = "";
    input.focus();
});
```

## Nộp Video

Có 3 cách:
1. **Upload file MP4** vào folder này
2. **Link YouTube**: Ghi link vào file `VIDEO_LINK.txt`
3. **Link Google Drive**: Ghi link vào file `VIDEO_LINK.txt`

Ví dụ file `VIDEO_LINK.txt`:
```
YouTube: https://www.youtube.com/watch?v=...
Google Drive: https://drive.google.com/file/d/...
```

---

**Lưu ý:** Video phải rõ ràng, giải thích từng bước, webcam visible ✅
