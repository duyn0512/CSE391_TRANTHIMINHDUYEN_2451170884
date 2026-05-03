# 📋 PHIẾU BÀI TẬP 04
# **CSS LAYOUT — Positioning, Flexbox & Grid**

## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 — 5 Loại Positioning.

1. Bảng tổng hợp các giá trị Position

    | Position | Vẫn chiếm chỗ trong flow? | Tham chiếu vị trí | Cuộn theo trang? | Use case |
    |---|---|---|---|---|
    | `static` | Có | Không dùng | Có | Mặc định — không cần viết |
    | `relative` | Có | Vị trí gốc của nó | Có | Làm anchor cho absolute con, dịch nhẹ |
    | `absolute` | Không | Cha `relative` gần nhất | Có | Badge, dropdown, tooltip, overlay |
    | `fixed` | Không | Viewport | Không (luôn cố định) | Chat button, cookie banner, header cố định |
    | `sticky` | Có → Không | Viewport (khi dính) | Không (khi đã dính) | Sticky header, sticky table header, sidebar |

2. Giải đáp câu hỏi thêm

    - Thuộc tính `absolute` sẽ tham chiếu tới `<html>` (trang) khi không có bất kỳ phần tử tổ tiên nào có thuộc tính `position` được khai báo khác `static`. Khi đó, phần tử sẽ bay ra khỏi luồng và bám vào toàn bộ trang.

    - Phần tử `absolute` sẽ tham chiếu tới phần tử cha gần nhất có thuộc tính `position` được khai báo khác `static` (như `relative`, `absolute`, `fixed`, hoặc `sticky`).

    - Khái niệm này chỉ phần tử cha, ông hoặc tổ tiên gần nhất của phần tử hiện tại mà có thuộc tính `position` mang giá trị khác `static`. Tổ tiên này đóng vai trò là hệ quy chiếu (gốc tọa độ) cho phần tử con.

> Nguồn tham chiếu: 12_css_positioning.md - 🌐 Big Picture — 5 giá trị Position & ⚙️ Core Technical Truth

### Câu A2 — Flexbox vs Grid

1. Trường hợp 1
- Khai báo: `.container { display: flex; } .item { flex: 1; }` với 4 items.
- Dự đoán bố cục: 4 items sẽ trải dài thành 1 hàng ngang, mỗi item chiếm chiều rộng bằng nhau.
- Sơ đồ bố cục:
    +---------------------------------------+
    | Item 1 | Item 2 | Item 3 | Item 4 |  |
    +---------------------------------------+

2. Trường hợp 2
- Khai báo: `.container { display: flex; flex-wrap: wrap; } .item { width: 45%; margin: 2.5%; }` với 6 items.
- Dự đoán bố cục: Gồm 3 hàng, mỗi hàng sẽ có 2 items.
- Sơ đồ bố cục: 
    +-----------------------------------+
    |    Item 1     |     Item 2        |
    +-----------------------------------+
    |    Item 3     |     Item 4        |
    +-----------------------------------+
    |    Item 5     |     Item 6        |
    +-----------------------------------+

3. Trường hợp 3
- Khai báo: `.container { display: flex; justify-content: space-between; align-items: center; }` với 3 items.
- Dự đoán bố cục: 3 items nằm trên 1 hàng(item 1 ở sát bên trái, item 3 ở sát bên phải, item 2 ở chính giữa), các item được căn giữa theo chiều dọc.
- Sơ đồ bố cục: 
    +-------------------------------------------------------+
    | Item 1            Item 2            Item 3            |
    +-------------------------------------------------------+

4. Trường hợp 4
- Khai báo: Khai báo: `.container { display: grid; grid-template-columns: 200px 1fr 200px; gap: 20px; }` với 3 items.
- Dự đoán bố cục: 1 hàng, chia làm 3 cột với độ rộng lần lượt là 200px, phần còn lại (1fr), và 200px.
- Sơ đồ bố cục: 
    +-------------------------------------------------------------+
    | Col 1: 200px | Col 2: 1fr (Phần còn lại) | Col 3: 200px |
    |    Item 1    |          Item 2           |    Item 3    |
    +-------------------------------------------------------------+

5. Trường hợp 5
- Khai báo:  `.container { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }` với 7 items.
- Dự đoán bố cục: Gồm 3 hàng 3 cột, item 7 ở hàng 3 cột 1.
- Sơ đồ bố cục:
    +-------------------------------------------+
    |  Item 1  |  Item 2  |  Item 3  |          | -> Hàng 1
    +-------------------------------------------+
    |  Item 4  |  Item 5  |  Item 6  |          | -> Hàng 2
    +-------------------------------------------+
    |  Item 7  |  (trống) |  (trống) |          | -> Hàng 3
    +-------------------------------------------+

