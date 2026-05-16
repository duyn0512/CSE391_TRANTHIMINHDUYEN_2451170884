# 📋 PHIẾU BÀI TẬP 06
# **CSS FRAMEWORKS — Bootstrap 5 / TailwindCSS**

## 🅱️ TRACK A — BOOTSTRAP 5

### PHẦN A — ĐỌC HIỂU

#### Câu A1 — Grid System

1. Bảng layout theo kích thước màn hình
    | Kích thước           | `< 768px`    | `768px - 991px` | `≥ 992px`    |
    | -------------------- | ------------ | --------------- | ------------ |
    | Số cột mỗi box chiếm | 12 cột       | 6 cột           | 3 cột        |
    | Box layout           | 1 box / hàng | 2 box / hàng    | 4 box / hàng |


2. Minh hoạ layout

    A. Màn hình nhỏ (`< 768px`)
        Do dùng `col-12` nên mỗi box chiếm toàn bộ chiều ngang.

        ```text
        +-------------------+
        | Box 1             |
        +-------------------+
        | Box 2             |
        +-------------------+
        | Box 3             |
        +-------------------+
        | Box 4             |
        +-------------------+
        ```

    B. Tablet (`768px - 991px`)
        Do dùng `col-md-6` nên mỗi box chiếm 6/12 cột → 2 box mỗi hàng.

        ```text
        +-----------+-----------+
        | Box 1     | Box 2     |
        +-----------+-----------+
        | Box 3     | Box 4     |
        +-----------+-----------+
        ```

    C. Desktop (`≥ 992px`)
        Do dùng `col-lg-3` nên mỗi box chiếm 3/12 cột → 4 box trên 1 hàng.

        ```text
        +------+------+------+------+
        | Box1| Box2| Box3| Box4|
        +------+------+------+------+
        ```

3. Câu hỏi thêm
    - `col-md-6` nghĩa là gì?
    * `md` = medium screen (màn hình trung bình, từ 768px)
    * `6` = chiếm 6/12 cột của grid system

=> `col-md-6` nghĩa là: Khi màn hình từ 768px trở lên, phần tử sẽ chiếm 6 cột trong tổng 12 cột.

4. Không cần viết `col-sm-12`vì: 

- Bootstrap hoạt động theo kiểu **mobile-first**.

- Trong code đã có:

    ```html
    col-12
    ```

Điều này đã áp dụng mặc định cho mọi kích thước màn hình nhỏ.

- Nghĩa là:

    * `<576px` → 12 cột
    * `576px - 767px` → vẫn 12 cột
    * đến khi gặp `md` thì mới đổi sang 6 cột

- Vì vậy không cần viết thêm:

    ```html
    col-sm-12
    ```
do `col-12` đã bao phủ luôn kích thước nhỏ (`sm`).

#### Câu A2 — Utilities & Components

1. Giải thích class `d-none d-md-block`

-  Ý nghĩa

    ```html id="8dj4ow"
    d-none d-md-block
    ```

    * `d-none` → ẩn element (`display: none`)
    * `d-md-block` → từ màn hình `md` trở lên thì hiển thị dạng `block`

- Element hiển thị khi:

    | Kích thước màn hình | Trạng thái                  |
    | ------------------- | --------------------------- |
    | `< 768px`           | Ẩn                          |
    | `≥ 768px`           | Hiển thị (`display: block`) |


- Ví dụ

    ```html id="48gcrv"
    <div class="d-none d-md-block">
        Nội dung này chỉ hiện trên tablet và desktop
    </div>
    ```

    ---

2. Liệt kê 5 spacing utilities và giải thích

- Bootstrap spacing utilities dùng để tạo khoảng cách bằng margin (`m`) và padding (`p`).

- Cú pháp chung:

    ```text id="48s26v"
    {property}{side}-{size}
    ```

    * `m` = margin
    * `p` = padding

- Các hướng

    | Ký hiệu | Ý nghĩa      |
    | ------- | ------------ |
    | `t`     | top          |
    | `b`     | bottom       |
    | `s`     | start (left) |
    | `e`     | end (right)  |
    | `x`     | trái + phải  |
    | `y`     | trên + dưới  |

- Ví dụ 5 utility phổ biến

    1. `mt-3`

        ```html id="8azplv"
        <div class="mt-3"></div>
        ```

        * `m` = margin
        * `t` = top
        * `3` = kích thước mức 3

        => Tạo margin phía trên.

    2. `px-4`

        ```html id="2a3o4u"
        <div class="px-4"></div>
        ```

        * `p` = padding
        * `x` = trái + phải
        * `4` = mức spacing 4

        => Tạo padding trái và phải.

    3. `mb-auto`

        ```html id="w0y6qe"
        <div class="mb-auto"></div>
        ```

        * `m` = margin
        * `b` = bottom
        * `auto` = tự động

        => Margin-bottom tự động.

    4. `py-2`

        ```html id="vxr9lh"
        <div class="py-2"></div>
        ```

        * Padding trên và dưới mức 2.

    5. `ms-5`

        ```html id="7z2gm2"
        <div class="ms-5"></div>
        ```

        * Margin bên trái (start) mức 5.

3. Sự khác nhau giữa `.container`, `.container-fluid`, `.container-md`

    | Class              | Đặc điểm                                           |
    | ------------------ | -------------------------------------------------- |
    | `.container`       | Có chiều rộng cố định theo từng breakpoint         |
    | `.container-fluid` | Luôn full chiều ngang màn hình (`width: 100%`)     |
    | `.container-md`    | Full width ở màn hình nhỏ, cố định từ `md` trở lên |



- `.container`

    ```html id="4qqx4z"
    <div class="container"></div>
    ```

    * Responsive theo breakpoint.
    * Có max-width thay đổi theo kích thước màn hình.
    * Thường dùng nhất.


- `.container-fluid`

    ```html id="4s7qgw"
    <div class="container-fluid"></div>
    ```

    * Luôn chiếm 100% chiều ngang.
    * Dùng cho layout full màn hình.


- `.container-md`

    ```html id="nm0s8j"
    <div class="container-md"></div>
    ```

    * `<768px` → full width
    * `≥768px` → hoạt động giống `.container`

- Minh hoạ

    - `.container`

        ```text id="q2gmnh"
        |    nội dung cố định giữa màn hình    |
        ```

    - `.container-fluid`

        ```text id="f8h1u4"
        |nội dung kéo full toàn màn hình|
        ```

    - `.container-md`

        ```text id="vjlwm4"
        Mobile: full width
        Desktop: fixed width
        ```

