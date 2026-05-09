# 📋 PHIẾU BÀI TẬP 05
# **CSS RESPONSIVE & SCSS — Responsive Design, Media Queries, Sass**

## PHẦN A — KIỂM TRA ĐỌC HIỂU 

### Câu A1  — Viewport & Mobile-First

1. Thẻ `<meta viewport>` chuẩn và giải thích thuộc tính.

        ```html
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        ```
    Giải thích:
    - `name="viewport"`: Khai báo thẻ này dùng để điều khiển vùng hiển thị trên thiết bị di động.
    - `width="device-width"`: Dùng để đặt chiều rộng viewport bằng đúng chiều rộng trên màn hình thiết bị.
    - `initial-sacle=1.0`: Có nghĩa là mức zoom ban đầu khi mở trang ra là 100%, không phóng to hay thu nhỏ.

2. Nếu THIẾU thẻ `<meta viewport>, iPhone sẽ: 
- Giẩ định trang web rộng khoảng 980px như desktop, rồi tự thu nhỏ toàn bộ trang lại để vừa màn hình điện thoại.
- Hậu quả:
    - Chữ rất nhỏ.
    - Nút bấm khó nhấn.
    - Người dùng phải zoom mới đọc được
    - UX kém

> Nguồn tham chiếu: 13_creating_responsive_layouts.ms - Viewport Meta Tag — Không thể thiếu

3. Sự khác nhau Mobile-First và Desktop-First
- Mobile-First: Viết CSS cho mobile trước. Sau đó dùng `@media (min-width:...)` để mở rộng cho màn hình lớn hơn.

    ```css
    .container {
        width: 100%;
        font-size: 14px;
    }

    @media (min-width: 768px) {
        .container {
            width: 750px;
            font-size: 18px;
        }
    }
    ```

- Desktop-First: Viết CSS cho desktop trước. Sau đó dùng `@media (max-width:...)` để chỉnh cho màn hình nhỏ hơn.

    ```css
    .container {
        width: 1200px;
        font-size: 18px;
    }

    @media (max-width: 768px) {
        .container {
            width: 100%;
            font-size: 14px;
        }
    }
    ```

- Mobile-First được khuyên dùng vì:
    - Mobile tải ít CSS hơn -> nhanh hơn
    - Buộc lập trình viên ưu tiên nội dung quan trọng trước.
    - Google và performance tools đánh giá cao hơn.

> Nguồn tham chiếu: 13_creating_responsive_layouts.md - Mobile-First vs Desktop-First

### Câu A2 — Breakpoints

| Tên | Min-width | Thiết bị điển hình | Ví dụ lưới sản phẩm|
|---|---|---|---|
| **Mobile** | < 576px | iPhone SE, các điện thoại nhỏ | 1 cột |
| **Mobile L** | ≥ 576px | iPhone Plus, điện thoại ngang | 2 cột | 
| **Tablet** | ≥ 768px | iPad dọc, tablet | 2 cột |
| **Desktop** | ≥ 992px | Laptop nhỏ | 3 cột |
| **Desktop L** | ≥ 1200px | Desktop, laptop lớn | 4 cột |
| **Desktop XL** | ≥ 1400px | Màn hình 4K, ultrawide | 5-6 cột |

> Nguồn tham chiếu: 13_creating_responsive_layouts.md - Breakpoints chuẩn

### Câu A3 — Media Queries

| Chiều rộng màn hình | `.container` width |
| ------------------- | ------------------ |
| 375px (iPhone SE)   | `100%`             |
| 600px               | `540px`            |
| 800px               | `720px`            |
| 1000px              | `960px`            |
| 1400px              | `1140px`           |

### Câu A4 — SCSS Basics

1. Variables (`$primary-color`)
- Dùng để lưu màu sắc, font, sapcing... để sửa 1 chỗ là toàn bộ tự đổi.
- Ví dụ:

    ```SCSS
    $primary-color: #7c3aed;
    $radius: 8px;

    .button {
        background: $primary-color;
        border-radius: $radius;
    }
    ```

    Nếu đổi

    ```SCSS
    $primary-color: red;
    ```
    -> tất cả chỗ dùng `$primary-color` sẽ đổi theo

2. Nesting(CSS lồng nhau)
- Cho phép viết CSS theo cấu trúc HTML, dễ đọc hơn CSS thường.
- Ví dụ:

    ```SCSS
    .navbar {
        background: black;
        
        .logo {
            color: white;
        }

        a {
            color: gray;

            &:hover {
                color: yellow;
            }
        }
    }
    ```

    ```CSS
    .navbar { background: black; }
    .navbar .logo { color: white; }
    .navbar a { color: gray; }
    .navbar a:hover { color: yellow; }
    ```
3. Mixins (`@mixin`, `@inclue`)
- Mixin giống hàm CSS dùng để tái sử dụng code nhiều lần.
    - `@mixin` -> định nghĩa
    - `@include` -> sử dụng
- Ví dụ:

    ```SCSS
    @mixin flex-center {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .box {
        @include flex-center;
        height: 200px;
    }
    ```

    ```CSS
    .box {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 200px;
    }
    ```

4. `@extend` / Inheritance
- Dùng để kế thừa style từ class khác
- Ví dụ:

    ```SCSS
    .button {
    padding: 10px;
    border-radius: 6px;
    }

    .button-primary {
        @extend .button;
        background: blue;
        color: white;
    }
    ```

    ```CSS
    .button,
    .button-primary {
        padding: 10px;
        border-radius: 6px;
    }

    .button-primary {
        background: blue;
        color: white;
    }
    ```

Trình duyệt không đọc được file `.scss` vì SCSS không phải CSS chuẩn của browser.

Để chuyển SCSS -> CSS thì cần compile SCSS thành CSS bằng SCSS compiler.


