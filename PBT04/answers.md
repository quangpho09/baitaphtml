# ANSWERS.md

## PHẦN A

### A1. 5 Loại Positioning

| Position | Vẫn chiếm chỗ trong flow? | Tham chiếu vị trí | Cuộn theo trang? | Use case |
|----------|---------------------------|-------------------|------------------|----------|
| static | Có | Vị trí mặc định | Có | Layout thông thường |
| relative | Có | So với vị trí gốc của chính nó | Có | Dịch chuyển nhẹ, làm mốc cho absolute |
| absolute | Không | Parent gần nhất có position ≠ static | Có | Badge, tooltip |
| fixed | Không | Viewport | Không | Header, nút back to top |
| sticky | Có | Parent scroll container | Dính khi đạt ngưỡng | Sidebar, menu |

Nearest positioned ancestor = phần tử cha gần nhất có position relative/absolute/fixed/sticky.
Absolute tham chiếu body khi không tìm thấy ancestor phù hợp.

### A2. Flexbox vs Grid

TH1:
[1][2][3][4]

TH2:
[1][2]
[3][4]
[5][6]

TH3:
1      2      3
(căn giữa theo chiều dọc)

TH4:
[200px][1fr][200px]

TH5:
[1][2][3]
[4][5][6]
[7]

## PHẦN C

### C1

1. Navbar → Flexbox
2. Instagram Grid → Grid
3. Blog + Sidebar → Grid
4. Footer 4 cột → Grid
5. Product Card → Kết hợp Grid/Flex, thường Flexbox

### C2

Lỗi 1:
Nguyên nhân: card cao thấp khác nhau.
Sửa:
.card{display:flex;flex-direction:column}
.btn{margin-top:auto}

Lỗi 2:
.hero{
height:100vh;
display:flex;
justify-content:center;
align-items:center;
}

Lỗi 3:
.sidebar{
width:250px;
flex-shrink:0;
}
