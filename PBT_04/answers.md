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

## PHẦN C — SUY LUẬN 

### Câu C1 — Flexbox vs Grid

1. Navigation bar ngang (logo + menu + buttons)
- Lựa chọn: Flexbox
- Giải thích: 
    - Thanh điều hướng thường nằm trên một hàng duy nhất.
    - Flexbox lý tưởng để phân bổ không gian theo một chiều, cho phép căn chỉnh các phần tử (logo bên trái, menu ở giữa, nút bấm bên phải) một cách linh hoạt bằng thuộc tính `justify-content`.

2. Lưới ảnh Instagram (3 cột đều nhau, số ảnh không biết trước)
- Lựa chọn: Grid (hoặc kết hợp với Flexbox cho từng item)
- Giải thích: 
    - CSS Grid là công cụ hoàn hảo để tạo lưới hai chiều (cột và hàng) với số lượng phần tử không xác định. 
    - Có thể sử dụng grid-template-columns: `repeat(3, 1fr)` để đảm bảo 3 cột luôn bằng nhau.

3. Layout blog: main content + sidebar
- Lựa chọn: Grid (hoặc Flexbox)
- Giải thích: 
    - Layout này yêu cầu kiểm soát bố cục theo cả chiều ngang và dọc của toàn trang. 
    - Grid cho phép bạn chia cột chính xác, một cách dễ dàng và rõ ràng hơn.

4. Footer với 4 cột thông tin (Về chúng tôi, Liên kết, Hỗ trợ, Liên hệ)
- Lựa chọn: Flexbox (hoặc Grid)
- Giải thích: 
    - Các cột trong footer thường là các khối nội dung xếp cạnh nhau trên màn hình lớn và xếp chồng lên nhau trên màn hình nhỏ. 
    - Flexbox với flex-wrap: `wrap` hoặc Grid với `repeat(4, 1fr)` đều hoạt động tốt, nhưng Flexbox thường nhẹ nhàng hơn cho các phần tử ngang đơn giản này.

5. Card sản phẩm (ảnh trên, text giữa, nút dưới — nút luôn dính đáy)
- Lựa chọn: Kết hợp cả hai (hoặc Flexbox toàn phần)
- Giải thích:
    - Sử dụng Flexbox với `flex-direction: column` cho toàn bộ card để các phần tử (ảnh, text, nút) xếp chồng lên nhau.
    - Sử dụng thuộc tính `margin-top: auto` hoặc `flex-grow` cho nút bấm để đẩy nó luôn dính xuống đáy card, bất kể chiều cao của nội dung text bên trên có thay đổi.

### Câu C2  — Debug Flexbox

1. Lỗi 1: Cards không đều chiều cao — nút "Mua" bị nhảy lên/xuống
- Nguyên nhân:
    - Các `.card` trong Flexbox có chiều cao mặc định phụ thuộc vào nội dung bên trong (`align-items: stretch`).
    - Khi tiêu đề hoặc mô tả của các card có độ dài khác nhau, chiều cao của card sẽ khác nhau, dẫn đến vị trí của nút "Mua" bị xô lệch.

- Sửa code:

    ```css
    .card-container {
    display: flex;
    flex-wrap: wrap;
    }

    .card {
    width: 30%;
    margin: 1.5%;
    display: flex; 
    flex-direction: column;  
    }

    .card img { 
    width: 100%; 
    }

    .card h3 { 
    font-size: 18px; 
    }

    .card .description {
    flex-grow: 1; 
    }

    .card .btn { 
    padding: 10px; 
    margin-top: auto;
    }
    ```

2. Lỗi 2: Canh giữa nội dung trong container 100vh
- Nguyên nhân: 
    - `display: flex` trên `.hero` mặc định theo chiều ngang (`row`). 
    - Để căn giữa cả 2 chiều, cần chỉ định hướng trục chính và thêm các thuộc tính căn chỉnh.
- Sửa code:

    ```css
    .hero {
    height: 100vh;
    display: flex;
    justify-content: center; 
    align-items: center;     
    }

    .hero-content {
    text-align: center;
    }
    ```

3. Lỗi 3: Sidebar bị co lại khi content quá dài
- Nguyên nhân: 
    - Trong Flexbox, giá trị mặc định của thuộc tính `flex-shrink` là `1`, là các phần tử sẽ bị co lại để vừa với màn hình khi nội dung vượt quá kích thước cho phép. 
    - Content quá dài sẽ lấn át không gian của sidebar.
- Sửa code

    ```css
    .layout { 
    display: flex; 
    }

    .sidebar { 
    width: 250px; 
    flex-shrink: 0; 
    }

    .content { 
    flex: 1; 
    }
    ```