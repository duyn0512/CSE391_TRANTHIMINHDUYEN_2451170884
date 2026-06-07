# 🌐 BÀI TẬP NỀN TẢNG PHÁT TRIỂN WEB

## 👤 Thông Tin Sinh Viên

- **Họ và tên:** Trần Thị Minh Duyên
- **Mã sinh viên:** 2451170884
- **Lớp:** 66KTPM1
- **Trường:** Đại học Thủy lợi

## Cấu trúc dự án

```
CSE391_TRANTHIMINHDUYEN_2451170884/
├── README.md                    ← Thông tin SV + tiến độ
├── PBT_01/
│   ├── debug.html
│   ├── products.html
│   ├── profile.html
│   ├── screenshorts/            ← Chụp kết quả
│   └── answers.md               ← Trả lời câu hỏi lý thuyết
├── PBT_02/
│   ├── checkout.html
│   ├── media.html
│   ├── register.html
│   ├── validation_test.html
│   ├── screenshorts/            ← Chụp kết quả
│   └── answers.md               ← Trả lời câu hỏi lý thuyết
├── PBT_03/
│   ├── boxmodel_lab.html
│   ├── debug_layout.html
│   ├── profile.html
│   ├── selectors_test.html
│   ├── specificity.html
│   ├── boxmodel.css
│   ├── debug_layout.css
│   ├── style.css
│   ├── specificity.css
│   ├── screenshorts/            ← Chụp kết quả
│   └── answers.md               ← Trả lời câu hỏi lý thuyết
├── PBT_04/
│   ├── flexbox_layout.html
│   ├── flexbox.css
│   ├── grid_layout.html
│   ├── grid.css
│   ├── positioning.html
│   ├── positioning.css
│   ├── screenshorts/            ← Chụp kết quả
│   ├── answers.md               ← Trả lời câu hỏi lý thuyết
│   └── images/                  ← Ảnh dùng cho toàn PBT
├── PBT_05/
│   ├── scss/
│   │   ├── animations.html
│   │   ├── animations.css
│   │   ├── responsive.html
│   │   ├── responsive.css
│   │   ├── answers.md               ← Trả lời câu hỏi lý  thuyết
│   ├── screenshorts/            ← Chụp kết quả
│   └── images/                  ← Ảnh dùng cho toàn PBT
├── PBT_06/
│   ├── bootstrap_dashboard.html
│   ├── bootstrap_landing.html
│   ├── screenshorts/            ← Chụp kết quả
│   └── answers.md               ← Trả lời câu hỏi lý thuyết
├── PBT_07/
│   ├── guess_number.html
│   ├── calculator.js
│   ├── fizzbuzz.js
│   ├── guess.js
│   ├── restaurant.js
│   ├── student_data.js
│   ├── var_let_const.js
│   ├── screenshorts/            ← Chụp kết quả
│   └── answers.md               ← Trả lời câu hỏi lý thuyết
├── PBT_08/
│   ├── higher_order.js
│   ├── product_manager.js
│   ├── shopping_cart.js
│   ├── screenshorts/            ← Chụp kết quả
│   └── answers.md               ← Trả lời câu hỏi lý thuyết
├── PBT_09/
│   ├── form_validator/
│   │     ├── index.html
│   │     ├── style.css
│   │     └── app.js
│   ├── keyboard_app/
│   │     ├── index.html
│   │     ├── style.css
│   │     └── app.js
│   ├── product_catalog/
│   │     ├── index.html
│   │     ├── style.css
│   │     └── app.js
│   ├── todo_app/
│   │     ├── index.html
│   │     ├── style.css
│   │     └── app.js
│   ├── screenshorts/            ← Chụp kết quả
│   └── answers.md               ← Trả lời câu hỏi lý thuyết

```

### 🔹 PBT_01: Làm quen với cấu trúc HTML cơ bản và các thẻ thông dụng

- **Nội dung thực hành:**
  - `profile.html`: Xây dựng trang thông tin cá nhân cơ bản, sử dụng các thẻ tiêu đề (`<h1>` đến `<h6>`), thẻ đoạn văn (`<p>`), thẻ danh sách và chèn hình ảnh/liên kết.
  - `products.html`: Thiết kế danh sách hiển thị sản phẩm, áp dụng cấu trúc thẻ danh sách (`<ul>`, `<ol>`, `<li>`) hoặc bảng (`<table>`) để tổ chức dữ liệu trực quan.
  - `debug.html`: Bài tập thực hành phát hiện, gỡ lỗi sai cấu trúc thẻ HTML, chuẩn hóa tài liệu theo tiêu chuẩn W3C.
- **Thành phần bài làm:**
  - Lời giải chi tiết lý thuyết & Câu hỏi củng cố: [PBT_01/answers.md](./PBT_01/answers.md)
  - Kết quả hiển thị giao diện thực tế: Thư mục ảnh chụp [PBT_01/screenshots/](./PBT_01/screenshots/)
  - Video thực hành OBS (Code-along & thuyết minh cơ chế hoạt động của Form): Đính kèm link trong file `answers.md`

### 🔹 PBT_02: Biểu mẫu (Forms), Validation & Đa phương tiện (Media)

- **Nội dung thực hành:**
  - `validation_test.html`: Thử nghiệm tính năng tự động kiểm tra dữ liệu (Native Validation) của HTML5 với các thuộc tính `required`, `pattern`, `min/max`, và `minlength` để so sánh giữa dự đoán lý thuyết và thực tế.
  - `register.html`: Thiết kế Form đăng ký tài khoản E-Commerce chuẩn Accessibility, chia nhỏ bằng 3 cặp thẻ `<fieldset>` + `<legend>` (Thông tin cá nhân, Tài khoản, Thông tin giao hàng) kết hợp các ràng buộc dữ liệu nâng cao bằng Regex Pattern.
  - `media.html`: Xây dựng trang giới thiệu sản phẩm tích hợp đa phương tiện bao gồm hình ảnh responsive (`<figure>` + `<figcaption>` + `loading="lazy"`), nhúng video YouTube (`<iframe>`), thẻ phát video/audio gốc (`<video>`, `<audio>`) và nhúng mã nguồn hình ảnh vector độc lập (`<svg>`).
  - `checkout.html`: Thiết kế cấu trúc bảng giỏ hàng phức tạp (`<table>`, `<tfoot>`, `colspan`) đi kèm form thanh toán nâng cao áp dụng các thẻ đặc biệt của HTML5 như `<datalist>`, `<output>`, `<meter>`, `<progress>` và thanh trượt `<input type="range">`.
- **Thành phần bài làm:**
  - Lời giải lý thuyết đọc hiểu (Phần A) & Bài tập phân tích cấu trúc, debug form, tư duy thiết kế bảo mật ngân hàng (Phần C): [PBT_02/answers.md](./PBT_02/answers.md)
  - Ảnh chụp minh họa kết quả kiểm thử dữ liệu thành công/thất bại: Thư mục ảnh chụp [PBT_02/screenshots/](./PBT_02/screenshots/)
  - Video thực hành OBS (Code-along & thuyết minh cơ chế hoạt động của Form): Đính kèm link trong file `answers.md`

### 🔹 PBT_03: Định dạng giao diện với CSS Core, Box Model & Độ ưu tiên (Specificity)

- **Nội dung thực hành:**
  - `selectors_test.html`: Thử nghiệm cơ chế hoạt động và phạm vi tác động của 8 loại CSS Selectors cơ bản dựa trên cấu trúc cây phân cấp HTML mẫu để đối chiếu giữa dự đoán lý thuyết và hiển thị thực tế.
  - `profile.html` & `style.css`: Nâng cấp trang thông tin cá nhân từ PBT_01 bằng liên kết External CSS; áp dụng Reset Border-Box toàn cục, thiết kế dải màu chuyển sắc (Background Gradient), định dạng bảng dữ liệu kỹ năng nâng cao (`border-collapse`, `tr:nth-child(even)`, `tr:hover`) và xử lý các trạng thái tương tác của thanh điều hướng (`:hover`, `.active`).
  - `boxmodel_lab.html` & `boxmodel.css`: Phòng thí nghiệm cấu trúc hộp (Box Model Layout); trực quan hóa sự khác biệt về kích thước render thực tế giữa hai thuộc tính `content-box` và `border-box` thông qua sơ đồ DevTools Diagram, đồng thời thực hành tính toán chia cột tỷ lệ chính xác cho hệ thống bố cục 3 cột (Tổng 1000px).
  - `specificity.html` & `specificity.css`: Trận chiến độ ưu tiên (Specificity Battle); xây dựng hệ thống 10 CSS Rules khác nhau cùng tác động vào một phần tử văn bản, tính toán trọng số điểm (a, b, c) để phân tích cơ chế ghi đè thuộc tính và tầm ảnh hưởng của cờ `!important` hay thuộc tính Inline Style.
  - `debug_layout.html` & `debug_layout.css`: Phân tích và gỡ lỗi hiện tượng vỡ giao diện (phần tử bị đẩy xuống dòng) do sai lệch kích thước vùng đệm (Padding) và đường viền (Border) khi dùng `content-box`; thực thi 2 giải pháp xử lý triệt để (sử dụng `border-box` và tính toán lại kích thước thủ công).
- **Thành phần bài làm:**
  - Lời giải lý thuyết nhúng CSS, tính toán chiều rộng hình ảnh/khoảng cách (Margin Collapse) (Phần A) & Phân tích chuỗi kế thừa Cascade/Inheritance Puzzle (Phần C): [PBT_03/answers.md](./PBT_03/answers.md)
  - Ảnh chụp sơ đồ cấu trúc hộp hiển thị trong thẻ Computed của trình duyệt: Thư mục ảnh chụp [PBT_03/screenshots/](./PBT_03/screenshots/)
  - Video thực hành OBS (Thuyết minh tính toán kích thước hộp, so sánh Content-box/Border-box và demo hiện tượng thu hẹp khoảng cách Margin): Đính kèm link trong file `answers.md`

### 🔹 PBT_04: Hệ thống bố cục nâng cao với Positioning, Flexbox & CSS Grid

- **Nội dung thực hành:**
  - `positioning.html` & `positioning.css`: Thiết kế trang mô phỏng tương tác không gian (Positioning Playground) kiểm chứng 5 thuộc tính vị trí (`static`, `relative`, `absolute`, `fixed`, `sticky`); tích hợp thanh điều hướng cố định trên cùng (Fixed Header), thanh bộ lọc dính theo trang (Sticky Sidebar), nhãn trạng thái sản phẩm nổi bật (Absolute Badge "HOT" lồng trong Relative Card) và nút cuộn nhanh lên đầu trang (Fixed Floating Button).
  - `flexbox_layout.html` & `flexbox.css`: Xây dựng hệ thống giao diện Flexbox đa hướng; thiết kế thanh điều hướng ngang căn giữa hoàn hảo theo cả trục dọc và trục ngang (`justify-content`, `align-items: center`), kết hợp mạng lưới hiển thị 8 thẻ sản phẩm đa hàng (`flex-wrap: wrap`, `calc(25% - 20px)`) ứng dụng kỹ thuật đẩy nút tương tác tự động dính đáy thẻ bằng `margin-top: auto` và hiệu ứng chuyển động mượt mà khi hover (`transform: translateY`).
  - `grid_layout.html` & `grid.css`: Thiết kế cấu trúc tổng thể trang thương mại điện tử hoàn chỉnh (E-Commerce Layout) bằng lưới không gian 2 chiều CSS Grid; phân chia vùng hiển thị 3 cột phức tạp (`grid-template-columns: 200px 1fr 200px`), xử lý các vùng mở rộng tràn chiều ngang (Header, Hero Banner, Footer sử dụng `grid-column: 1 / -1` hoặc `grid-template-areas`) và tích hợp lưới con (Sub-grid) hiển thị danh sách sản phẩm đồng đều.
- **Thành phần bài làm:**
  - Lời giải lý thuyết phân tích 5 loại Positioning, vẽ sơ đồ tư duy dự đoán 5 trường hợp chia cột Flex/Grid (Phần A) & Tiểu luận phân tích chiến lược chọn giải pháp layout thực tế kèm gỡ lỗi chuyên sâu về đồng đều chiều cao thẻ, căn giữa Hero content, hiện tượng co rút Sidebar (Phần C): [PBT_04/answers.md](./PBT_04/answers.md)
  - Ảnh chụp minh họa trạng thái cố định phần tử khi cuộn trang và cấu trúc các đường phân ranh giới lưới: Thư mục ảnh chụp [PBT_04/screenshots/](./PBT_04/screenshots/)

### 🔹 PBT_05: Thiết kế giao diện thích ứng Responsive Design & Tối ưu cấu trúc CSS với SCSS/Sass

- **Nội dung thực hành:**
  - `responsive.html` & `responsive.css`: Xây dựng trang hiển thị sản phẩm hoàn chỉnh ứng dụng triết lý Mobile-First Layout; thiết kế hệ thống hiển thị co giãn theo 3 phân khúc màn hình (Mobile hiển thị lưới 1 cột kèm menu ẩn Hamburger, Tablet mở rộng lưới 2 cột kèm thanh bộ lọc Dropdown ngang, Desktop đạt độ rộng tối đa chia lưới 4 cột kết hợp hiển thị thanh Sidebar cố định và thanh quảng cáo Ads Bar).
  - `animations.html` & `animations.css`: Thiết lập phòng thí nghiệm chuyển động tương tác (CSS Transitions & Animations); phát triển 5 hiệu ứng giao diện mượt mà bao gồm nâng nhẹ thẻ sản phẩm (`translateY`), mở rộng nút bấm mượt mà (`scale`), phóng to hình ảnh nội bộ trong khung viền (`overflow: hidden`), tạo vòng xoay tải trang vô hạn (`@keyframes spin`) và hiệu ứng xuất hiện mờ dần khi cuộn trang (`@keyframes fadeIn`).
  - Thư mục `scss/`: Tái cấu trúc (Refactor) toàn bộ mã nguồn CSS sang tiền xử lý SCSS/Sass; thiết lập hệ thống quản lý mã nguồn module hóa thông qua việc phân chia ít nhất 3 tệp tin thành phần (`_variables.scss`, `_mixins.scss`, `_components.scss`) lồng vào tệp cấu trúc chính `style.scss`[cite: 4]. Tối ưu hóa việc sử dụng biến số toàn cục, cấu trúc viết lồng thẻ (Nesting), bộ chọn lớp cha (`&`) và xây dựng các hàm tái dụng khuôn mẫu (`@mixin`, `@include`) để biên dịch tự động ra tệp CSS đích
- **Thành phần bài làm:**
  - Lời giải lý thuyết cấu hình thuộc tính thẻ `<meta viewport>`, phân tích bảng giá trị điểm gãy tiêu chuẩn (Breakpoints Grid Bootstrap) (Phần A) & Báo cáo phân tích thực tế hành vi Responsive của trang web thương mại điện tử lớn kèm sơ đồ phác thảo Wireframe hệ thống đặt bàn nhà hàng đa thiết bị (Phần C): [PBT_05/answers.md](./PBT_05/answers.md)
  - Ảnh chụp minh họa giao diện co giãn tại 3 kích thước chuẩn (375px, 768px, 1200px) và ảnh chụp phân tích mã nguồn tệp CSS trang web thực tế: Thư mục ảnh chụp [PBT_05/screenshots/](./PBT_05/screenshots/)

### 🔹 PBT_06: Tối ưu hóa giao diện với CSS Framework — Bootstrap 5 (Track A)

- **Nội dung thực hành:**
  - `bootstrap_landing.html`: Xây dựng trang đích thương mại điện tử (E-Commerce Landing Page) áp dụng hệ thống tiện ích 100% Bootstrap Classes mà không sử dụng CSS tùy chỉnh; tích hợp thanh điều hướng thích ứng (`navbar-expand-lg`), trình trình chiếu ảnh động lồng văn bản (`carousel`), lưới sản phẩm đa hàng co giãn theo thiết bị (`row`, `col-12 col-md-6 col-lg-3`) và hộp thoại hiển thị nhanh thông tin sản phẩm (`modal`) kích hoạt tự động qua cơ chế thuộc tính dữ liệu (`data-bs-toggle`).
  - `bootstrap_dashboard.html`: Thiết kế giao diện trang quản trị viên (Admin Dashboard); bố cục thanh thực đơn cố định bên trái (`position-fixed`, `list-group`), thanh công cụ trên cùng tích hợp hộp danh sách thả xuống (`dropdown`), khu vực hiển thị số liệu gồm các thẻ thông tin đa màu sắc (`card` + `bg-primary/success...`), bảng dữ liệu đơn hàng dạng sọc xen kẽ (`table-striped`, `table-hover`) và cụm câu hỏi thường gặp dạng đóng/mở (`accordion`).
- **Thành phần bài làm:**
  - Lời giải bài tập phân tích sơ đồ chia lưới Grid System theo breakpoints, giải thích các lớp tiện ích Spacing/Display (Phần A) & Tiểu luận quy trình tùy biến màu sắc chủ đạo qua biến SASS và so sánh hiệu năng phát triển giữa CSS thuần với Bootstrap (Phần C): [PBT_06/answers.md](./PBT_06/answers.md)
  - Ảnh chụp minh họa giao diện phản hồi chính xác tại 3 kích thước màn hình và hoạt động tương tác của hộp thoại Modal: Thư mục ảnh chụp [PBT_06/screenshots/](./PBT_06/screenshots/)

### 🔹 PBT_07: Bản chất ngôn ngữ JavaScript Core, Kiểu dữ liệu & Cấu trúc điều khiển

- **Nội dung thực hành:**
  - `var_let_const.js`: Phòng thí nghiệm cơ chế khởi tạo biến; thực nghiệm hành vi Hoisting với `var`, vùng chết tạm thời (Temporal Dead Zone - TDZ) với `let`, tính chất bất biến tham chiếu (Reference Immutability) của mảng/đối tượng với `const` và phạm vi khối lệnh Block Scope.
  - `calculator.js`: Xây dựng hàm xử lý toán học đa năng `calculate(num1, operator, num2)`; thực hiện các phép tính cơ bản đến nâng cao (`+`, `-`, `*`, `/`, `%`, `**`) đi kèm logic bẫy lỗi và kiểm soát dữ liệu đầu vào nghiêm ngặt (chia cho 0, toán tử lạ, dữ liệu phi số).
  - `student_data.js`: Lập trình hệ thống phân tích dữ liệu mảng cấu trúc phức tạp; tính toán điểm trung bình theo trọng số môn học, phân loại học lực (`if/else` lồng), thống kê số lượng học sinh theo học lực, truy vết thủ khoa/á khoa và tính toán điểm trung bình toàn diện theo giới tính bằng vòng lặp thuần.
  - `guess_number.html` & `guess.js`: Phát triển trò chơi tương tác đoán số (Mini Game 1-100) vận hành trực tiếp trên trình duyệt qua `prompt()` và `alert()`; tích hợp bộ đếm giới hạn 7 lượt chơi, cơ chế chống trùng lặp giá trị đã đoán và bẫy lỗi biểu thức đầu vào.
  - `fizzbuzz.js`: Triển khai thuật toán FizzBuzz biến thể cấu trúc dữ liệu; phát triển hàm `customFizzBuzz(n, rules)` có khả năng tiếp nhận linh hoạt một mảng quy tắc chia hết (Divisor & Word Mapping) để tự động xuất chuỗi ký tự chuẩn hóa[cite: 6].
  - `restaurant_bill.js`: Lập trình module tính hóa đơn nhà hàng tự động; thiết lập công thức tích lũy bậc thang (Giảm 10% khi > 500k, 15% khi > 1 triệu), cộng dồn ưu đãi ngày Thứ Ba đặc biệt, tính thuế VAT 8% và tiền Tip tùy chọn để kết xuất bảng biên lai ký tự (Text-art Box)
- **Thành phần bài làm:**
  - Lời giải lý thuyết dự đoán Type Coercion, cơ chế ép kiểu tự động của toán tử `+` và `-`, so sánh công thức ép kiểu lỏng `==` với so sánh nghiêm ngặt `===`, phân định tập hợp giá trị Falsy, chuyển đổi chuỗi Template Literals (Phần A) & Báo cáo gỡ lỗi mã nguồn tìm 6 lỗi logic (Lỗi gán nhầm `=` trong câu điều kiện, gộp chuỗi sai kiểu và lỗi Scope của `var` trong hàm bất đồng bộ `setTimeout`): [PBT_07/answers.md](./PBT_07/answers.md)
  - Ảnh chụp kết quả biên dịch logic thông qua Terminal Node.js và giao diện tương tác Game trên Web: Thư mục ảnh chụp [PBT_07/screenshots/](./PBT_07/screenshots/)

### 🔹 PBT_08: Hàm nâng cao, Xử lý mảng (Array Methods) & Mô hình đối tượng trong JavaScript

- **Nội dung thực hành:**
  - `product_manager.js`: Xây dựng module quản lý dữ liệu kho hàng E-Commerce sử dụng 100% các phương thức mảng lặp phẳng và nâng cao (`map`, `filter`, `reduce`, `sort`, `find`) thay thế hoàn toàn cho vòng lặp truyền thống; lập trình các bộ hàm lọc sản phẩm theo danh mục và khoảng giá, sắp xếp động theo giá tiền, truy vết sản phẩm có giá thấp nhất theo từng danh mục riêng biệt, kết xuất chuỗi định dạng tiền tệ quốc gia (`.toLocaleString()`) và bộ máy tìm kiếm chuỗi không phân biệt hoa thường (Case-insensitive Search).
  - `shopping_cart.js`: Phát triển module giỏ hàng khép kín (Shopping Cart Module) ứng dụng mẫu thiết kế đóng gói dữ liệu **Closure** để tạo phạm vi biến tư nhân (Private Scope); triển khai các phương thức cốt lõi như thêm/xóa/cập nhật số lượng vật phẩm, tính tổng tiền tích hợp xử lý mã giảm giá bậc thang (`SALE10`, `SALE20`, `FREESHIP`) và thiết kế hàm in giao diện giỏ hàng dạng bảng ký tự (Text-art Box) trực quan ra Terminal.
  - `higher_order.js`: Phòng thí nghiệm hàm bậc cao (Higher-Order Functions Playground); lập trình thuật toán nối chuỗi xử lý logic liên tục `pipe()`, xây dựng hàm lưu trữ kết quả tính toán vùng nhớ đệm `memoize()` để tối ưu hóa hiệu năng, thiết kế hàm trì hoãn kích hoạt sự kiện `debounce()` kiểm soát hành vi người dùng, và module tự động thử lại khi tác vụ bất đồng bộ gặp lỗi `retry()`.
- **Thành phần bài làm:**
  - Lời giải bài tập so sánh 3 biến thể khai báo hàm (Declaration, Expression, Arrow) liên quan đến cơ chế bẫy Hoisting, dự đoán chuỗi tăng giá trị Closure và phân tích bản chất phạm vi biến `var` / `let` trong hàm bất đồng bộ `setTimeout`, viết mã một dòng với Arrow Function, giải mã bẫy sao chép nông (Shallow Copy Property Gotcha) của toán tử Spread trên Object (Phần A); Mã nguồn tối ưu hóa (Refactor) chuỗi lặp rác lồng nhau bằng lập trình hàm và module thư viện tự chế `miniArray` mô phỏng thuật toán gốc của `map`, `filter`, `reduce` (Phần C): [PBT_08/answers.md](./PBT_08/answers.md)
  - Ảnh chụp kết quả kiểm thử các hàm tính toán, xử lý logic giỏ hàng và dữ liệu bộ nhớ đệm Cache trên Terminal: Thư mục ảnh chụp [PBT_08/screenshots/](./PBT_08/screenshots/)

### 🔹 PBT_09: Tương tác cấu trúc cây tài liệu DOM & Xử lý sự kiện nâng cao trong Trình duyệt

- **Nội dung thực hành:**
  - Thư mục `todo_app/`: Phát triển ứng dụng quản lý công việc (Todo App) hoàn chỉnh tương tác thời gian thực; tích hợp đầy đủ tính năng CRUD (Thêm, Xóa qua nút ❌, Đổi trạng thái hoàn thành bằng cách toggle class `completed`, Chỉnh sửa nội dung trực tiếp bằng thao tác Double-click). Hệ thống áp dụng cơ chế bộ đếm động, bộ lọc hiển thị ba trạng thái (All / Active / Completed), dọn dẹp hàng loạt và đồng bộ hóa dữ liệu bền vững qua `LocalStorage` để tránh mất dữ liệu khi làm mới trang.
  - Thư mục `product_catalog/`: Xây dựng trang danh mục sản phẩm động (Interactive Product Catalog) với dữ liệu gồm 12 sản phẩm khai báo hoàn toàn từ mảng JavaScript[cite: 8]; triển khai công cụ tìm kiếm tức thời (Real-time Search) qua sự kiện `input`, bộ lọc danh mục, cơ chế sắp xếp đa tiêu chí (Giá, Tên, Đánh giá), thiết kế hộp thoại Modal chi tiết bằng mã DOM thuần, tích hợp nhãn số lượng giỏ hàng (Cart Badge) và chế độ nền tối (Dark Mode Toggle) trên `<body>`.
  - Thư mục `form_validator/`: Thiết lập hệ thống kiểm tra dữ liệu biểu mẫu đăng ký thành viên (Real-time Form Validator); bẫy sự kiện gõ phím để xác thực độ dài tên, cấu trúc Email qua biểu thức chính quy (Regex), xây dựng thanh đo độ mạnh mật khẩu (Password Strength Meter) thay đổi màu sắc trực quan, kiểm tra khớp mật khẩu nhắc lại và tự động định dạng số điện thoại theo cấu trúc phân tách `0901-234-567`.
  - Thư mục `keyboard_app/`: Phát triển ứng dụng hỗ trợ điều hướng phím tắt và khả năng tiếp cận (Accessibility Gallery & Command Palette); tích hợp phím mũi tên `← / →`, phím số `1-9`, `Space` và `Escape` để kiểm soát thư viện ảnh, đồng thời xây dựng thanh lệnh thông minh (Command Palette) kích hoạt nhanh bằng tổ hợp phím `Ctrl+K`.
- **Thành phần bài làm:**
  - Lời giải bài tập vẽ sơ đồ cây DOM Tree, viết biểu thức bộ chọn `querySelectorAll` tối ưu, phân tích lỗ hổng bảo mật XSS nguy hại của thuộc tính `innerHTML` kèm giải pháp thay thế bằng `textContent`, dự đoán chuỗi lan truyền sự kiện nổi bọt (Event Bubbling) và tác động chặn dòng của `stopPropagation()` (Phần A); Báo cáo gỡ lỗi mã nguồn ứng dụng Counter History tìm 7 lỗi logic (Sửa cơ chế lắng nghe `onclick` sai cú pháp, xử lý biến hằng số bị gán lại, hàm loại bỏ nút chưa kích hoạt và bẫy đồng bộ dữ liệu) cùng giải pháp tối ưu hóa hiệu năng render 1000 phần tử giảm thiểu Reflow bằng `DocumentFragment` (Phần C): [PBT_09/answers.md](./PBT_09/answers.md)
  - Ảnh chụp giao diện hoạt động thực tế, sơ đồ xác thực biểu mẫu và thanh lệnh điều hướng phím tắt: Thư mục ảnh chụp [PBT_09/screenshots/](./PBT_09/screenshots/)

  ### 🔹 PBT_10: Lập trình bất đồng bộ, Thao tác kết nối API & Cơ chế vận hành Event Loop

- **Nội dung thực hành:**
  - Thư mục `weather_app/`: Phát triển ứng dụng tra cứu thời tiết thời gian thực bằng cách kết nối hệ thống API trực tiếp (`wttr.in` hoặc `Open-Meteo`); xử lý đồng bộ giao diện qua 3 trạng thái bắt buộc (Trạng thái chờ tải kèm hiệu ứng xoay Spinner, Trạng thái thành công hiển thị các chỉ số khí tượng và Trạng thái lỗi bẫy ngắt mạng hoặc sai từ khóa), kết hợp lưu trữ 5 thành phố tra cứu gần nhất qua `LocalStorage`.
  - Thư mục `user_directory/`: Xây dựng module quản lý người dùng chuẩn hóa kiến trúc phân lớp, thao tác đầy đủ các phương thức HTTP RESTful CRUD (`GET`, `POST`, `PUT`, `DELETE`) kết nối tới dữ liệu mẫu của `JSONPlaceholder`; thiết lập lớp xử lý dữ liệu mạng (API Layer) độc lập với lớp kết xuất giao diện (UI Layer), tích hợp thanh tải khung xương (Skeleton Loader), hộp thoại xác nhận hủy tệp và hiển thị thông báo Toast thông minh.
  - Thư mục `gallery/`: Thiết kế thư viện hình ảnh hiệu năng cao ứng dụng kỹ thuật cuộn vô hạn (Infinite Scroll) tự động tải 20 ảnh tiếp theo khi người dùng cuộn xuống đáy trang; tối ưu hóa tài nguyên trình duyệt bằng giải pháp tải ảnh chậm (Lazy Loading) qua bộ giám sát vùng nhìn `IntersectionObserver`, đi kèm hiệu ứng hộp sáng phóng to hình ảnh (Lightbox Modal) và dàn trang lưới phản hồi (Responsive Grid).
  - Thư mục `dashboard/`: Lập trình bảng điều khiển tổng hợp dữ liệu (Multi-API Dashboard) xử lý song song và đồng thời ít nhất 3 dịch vụ API độc lập sử dụng cấu trúc `Promise.allSettled()`; cô lập trạng thái lỗi của từng khối tiện ích (Widget Error Isolation) nhằm đảm bảo hệ thống không bị sập diện rộng khi một dịch vụ gặp sự cố, tích hợp nút làm mới toàn bộ và bộ đếm thời gian phản hồi mạng theo miligiây.
- **Thành phần bài làm:**
  - Lời giải bài tập dự đoán chuỗi thứ tự ghi log của hàng đợi tác vụ vi mô/vĩ mô (Microtask/Macrotask Queue) điều phối bởi Event Loop, phân tích chi tiết bản chất luồng dữ liệu trả về của `fetch()` và lý do ép kiểu `response.json()` cần `await`, giải mã mã lỗi HTTP chuẩn, mô tả sơ đồ vòng đời Promise và giải pháp triệt tiêu rác mã lồng bằng `async/await` (Phần A); Bản thiết kế chiến lược xử lý lỗi chuyên sâu (Xử lý Timeout bằng `Promise.race`, giải thuật tự động thử lại `fetchWithRetry` khi mất kết nối) và bảng so sánh ngữ cảnh sử dụng thực tế của bốn phương thức tập hợp `.all()`, `.allSettled()`, `.race()`, `.any()` (Phần C): [PBT_10/answers.md](./PBT_10/answers.md)
  - Ảnh chụp minh họa đầy đủ 3 trạng thái giao diện (Loading, Success, Error) và kết quả phân tích cấu trúc mạng của từng Mini-app: Thư mục ảnh chụp [PBT_10/screenshots/](./PBT_10/screenshots/)
  