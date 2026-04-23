# PHIẾU BÀI TẬP 01

# **HTML5 FUNDAMENTALS - Cấu trúc, Semantic, Tables & Links**

---

## PHẦN A - ĐỌC HIỂU

### Câu A1 - HTTP & Browser

#### 1. Khi gõ 'https://shopee.vn' vào trình duyệt và nhấn Enter, có 7 bước xảy ra:

   **Bước 1**: Trình duyệt nhận URL người dùng nhập
   Khi bạn gõ 'https://shopee.vn' vào thanh địa chỉ và bấm Enter, Chrome hiểu rằng bạn đang thực hiện một yêu cầu truy cập vào website Shopee.

   > Nguồn tham chiếu: 01-introduction_html1_universe.md - Cuộc Hành Trình 0.3 Giây Xuyên Đại Dương

   **Bước 2**: DNS Lookup - Tìm địa chỉ IP của shopee.vn
   Đây là bước xác định nơi gửi yêu cầu.
   Trình duyệt cần biết máy chủ của Shopee nằm ở đâu. Vì máy tính chỉ đọc được các dãy số (IP), nên nó sẽ tra cứu danh bạ DNS để đổi tên miền shopee.vn thành địa chỉ IP vật lý của server.

   > Nguồn tham chiếu: 01_introduction_html1_universe.md - 1.1 Kiến trúc Client-Server - "Nhà hàng online"

   **Bước 3**: Trình duyệt gửi HTTP Request đến server Shopee
   Sau khi có IP, trình duyệt gửi một "đơn đặt hàng" (Phương thức GET) yêu cầu nội dung trang Web.

   > Nguồn tham chiếu: 01_introduction_html1_universe.md - 1.2. HTTP - Ngôn ngữ để Client và Server hiểu nhau

   **Bước 4**: Dữ liệu di chuyển qua hạ tầng Internet
   Yêu cầu xuất phát từ thiết bị, đi qua router WiFi, qua nhà mạng VNPT và chạy xuyên cáp quang dưới đáy biển để tới Data Center của Shopee.

   > Nguồn tham chiếu: 01_introduction_html1_universe.md - "Cuộc Hành Trình 0.3 Giây Xuyên Đại Dương"

   **Bước 5**: Server tiếp nhận và xử lý yêu cầu
   Tại Server sẽ tiếp nhận yêu cầu, truy xuất dữ liệu từ Database và chuẩn bị các file cần thiết để phản hồi cho người dùng.

   > Nguồn tham chiếu: 01_introduction_html1_universe.md - 1.1. Kiến trúc Client - Server - "Nhà hàng online"

   **Bước 6**: Server gửi HTTP Response ngược lại cho trình duyệt
   Server gửi về mã trạng thái kèm theo gói dữ liệu gồm HTML, CSS, JavaScript và hình ảnh thông qua con đường Internet cũ.

   > Nguồn tham chiếu: 01_introduction_html1_universe.md - 1.2. HTTP - Ngôn ngữ để Client và Server hiểu nhau

   **Bước 7**: Trình duyệt thực hiện Rendering để hiển thị giao diện
   Trình duyệt nhận file đóng vai trò "kiến trúc sư": Đọc cấu trúc HTML, áp dụng thiết kế CSS và chạy logic JavaScript để hiển thị trang Shopee hoàn chỉnh trên màn hình.

   > Nguồn tham chiếu: 01_introduction_html1_universe.md - 1.3. Browser Rendering - Từ Code thành Hình ảnh

#### 2.

- Trong DevTools của Chrome, tab **Network** cho thấy các thông tin:
  Quan sát toàn bộ quá trình trao đổi dữ liệu (Requests/Responses) giữa trình duyệt và máy chủ, từ đó kiểm tra xem website tải nhanh hay chậm và xác định file nào đang chiếm nhiều dung lượng nhất.

> Nguồn tham chiếu: 01_introduction_html1_universe.md - 4.3. Developer Tools(F12) - "Kính hiển vi" cho website

- [Screenshot tab Network:](screenshots/network_analysis.png)

   1 - Status Code của request đầu tiên:
   2 - Tổng thời gian load trang
   3 - Một request trả về file CSS

### Câu A2 - Semantic HTML

#### 1. Trang web bị Google đánh giá SEO thấp vì:

   - Sử dụng quá nhiều thẻ `<div>` vô nghĩa vì thế Google nó không hiểu đâu là nội dung chính, đâu là điều hướng.

   > Nguồn tham chiếu: 04_visible_part_html.md - Tại sao không dùng 'div' cho mọi thứ?

#### 2. Các lỗi semantic:

- Phần đầu trang `<header>`: `<div class="header">`;
- Danh sách menu: `<div menu="menu">`;
- Phần thân trang `<main>`: `<div class="main">`;
- Mỗi sản phẩm: `<div class="product">`;
- Phần cuối trang `<footer>`: `<div class="footer">`.

> Nguồn tham chiếu: 04_visible_part_html.md - Bản đồ Semantic Elements

**Sửa lỗi**

```html
<header>
  <div class="logo">ShopTLU</div>
  <nav>
    <ul>
      <li><a href="/">Trang chủ</a></li>
      <li><a href="/product">Sản phẩm</a></li>
    </ul>
  </nav>
</header>
<main>
  <article class="product">
    <h2>iPhone 16Pro</h2>
    <strong>25.990.000</strong>
    <figure>
      <img src="iphone.jpg" alt="iPhone 16Pro" />
    </figure>
  </article>
</main>
<footer>&copy; 2026 ShopTLU</footer>
```

### Câu A3 - Block vs Inline

- Kết quả hiển thị

      ```text
      -------------------------
      | Hộp 1                 |
      | Text A Text B         |
      | Hộp 2                 |
      | Text C Text D         |
      | Hộp 3                 |
      -------------------------

      ```

- Giải thích:
  - Đối với các thẻ `<div>` thì render ra trên browser text trong các thẻ sẽ xuống dòng vì vậy các nội dung như Hộp 1, Hộp 2 và Hộp 3 mới ở mỗi cái 1 dòng, tương tự với nội dung được bao bọc trong các thẻ đó.
  - Đối với các thẻ `<span>` hoàn toàn có thể render trên cùng 1 dòng với thẻ nội dung khác vì vậy các nội dung "Text A Text B", "Text C Text D" mới có thể đứng cùng 1 hàng.
  - Đối với thẻ `<strong>` tương tự như `<span>` nhưng thẻ này cso nhiệm vụ in đậm text bên trong và nói cho browser biết đây là nội dung cần chú ý.

### Câu A4 - Table

- Sự khác nhau giữa các thẻ `<thead>`,`<tbody>`,`<tfoot>`:

   - `<thead>`: Dùng để thể hiện tiêu đề của bảng, thường chỉ đuợc dùng 1 lần để ghi nội dung tiêu đề.

   -`<tbody>`: Dùng để chứa nội dung chính của bảng, có thể được dùng nhiều lần trong 1 bảng để chia dữ liệu thành các nhóm. 

   -`<tfoot>`: Dùng để thể hiện các dong tổng kết các dữ liệu trong bảng(tổng tiền, tổng sinh viên, etc), thường xuất hiện ở dưới cùng của bảng.

- Việc không sử dụng `<table>` để làm layout website là 1 quy tắc, bởi sử dụng bảng để làm layout website sẽ đem đến các hậu quả sau:

   - Browser hiện đại sẽ hiểu cả trang web của chúng ta là 1 cái bảng khổng lồ, nó sẽ không biết đâu là thanh điều hướng, đâu là tiêu đề, etc. Dẫn tới đánh giá SEO thấp.

   - Cực kì khó để trang web có thể đáp ứng trên đa nền tảng (mobile, desktop), bởi bảng là thiết kế cấu trúc dạng hàng và cột vì vậy những hàng và cột hiển thị trên màn hình máy tính. Lại rất khó để có thể thiết kế chúng xếp trồng lên nhau để hiển thị trên một thiết bị màn hình nhỏ như điện thoại.

   - Tốc độ trải trang chậm bởi trang web phải đợi tất cả dữ liệu trong bảng được tải trước khi có thể hiển thị lên cho người dùng.

> Nguồn tham chiếu: 05_tables_hyperlinks.md - Table-Bảng dữ liệu

## PHẦN B - THỰC HÀNH CODE

### Bài B3 - Debug HTML

- Lỗi 1:
  - Dòng 1: Khai báo `<!DOCTYPPE>` thiếu html
  - Cách sửa: Sửa thành `<!DOCTYPE html>`

- Lỗi 2:
  - Dòng 4: Thẻ `<title>` chưa đóng và nằm sai vị trí với thẻ meta
  - Cách sửa: Đóng thẻ `<title>` và đưa meta lên trước

- Lỗi 3:
  - Dòng 5: Meta charset viết thiếu dấu gạch ngang
    -Cách sửa: Sửa thành utf-8

- Lỗi 4:
  - Dòng 8: Thẻ `<h1>` đóng sai bằng `<h1>`
    -Cách sửa: Sửa thành `</h1>`

- Lỗi 5:
  - Dòng 11: Thẻ `<a>` đóng sai bằng `<a>`
  - Cách sửa: Sửa thành `</a>`

- Lỗi 6:
  - Dòng 11&12: Thuộc tính `href` thiếu phần mở rộng `.html`
  - Cách sửa: Sửa thành `index.html` và `products.html`.

- Lỗi 7:
  - Dòng 18: Thẻ `<img>` thiếu dấu ngoặc kép cho thuộc tính và thiếu thuộc tính `alt`
  - Cách sửa: Sửa thành `<img src="iphone.jpg" alt="...">`

- Lỗi 8:
  - Dòng 20: Thẻ `<b>` và `<p>` đóng sai thứ tự (lồng nhau sai)
  - Cách sửa: Sửa thành `<p>...<b>...</b></p>`

- Lỗi 9:
  - Dòng 25-28: Bảng dữ liệu không dùng `<th>` cho tiêu đề (Lỗi Semantic)
  - Cách sửa: Thay `<td>` hàng đầu bằng `<th>`

- Lỗi 10:
  - Dòng 34: Sử dụng 2 thẻ `<main>` trong một trang (Lỗi Semantic)
  - Cách sửa: Đổi thẻ `<main>` thứ hai thành `<aside>`.

- Lỗi 11:
  - Dòng 39: Thẻ `<footer>` chưa đóng
  - Cách sửa: Thêm thẻ `</footer>` ở cuối.

- Lỗi 12:
  - Dòng 41: Thiếu thẻ đóng `</html> `
  - Cách sửa: Thêm `</html>` để kết thúc tài liệu

### Bài B4 - Phân tích trang web thật
1. Semantic tag:

   - 3 thẻ semantic HTML5 mà trang `shopee.vn` sử dụng:

      [Thẻ `<header>` bọc phần navbar và thanh tìm kiếm đầu trang.](screenshots/shopee_header_nav.jpg)

      [Thẻ `<section>` dùng để phân chia các khối danh mục và bộ sưu tập sản phẩm.](screenshots/shopee_header_nav.jpg)

      [Thẻ `<footer>` bao toàn bộ thông tin hỗ trợ, thanh toán và bản quyền.](screenshots/shopee_footer.jpg)

   - 2 thẻ mà trang không dùng đúng semantic (dựa trên thực tế DevTools):

      [Thẻ `<div>` với class `navbar-wrapper` được dùng để điều hướng thay vì dùng thẻ `<nav>`.](screenshots/shopee_header_nav.jpg)

      [Thẻ `<div>` có `id="main"` được dùng bao bọc nội dung chính thay vì dùng thẻ `<main>`.](screenshots/shopee_header_nav.jpg)

2. `<table>`

   Không tìm thấy thẻ `<table>` trên trang chủ do Shopee ưu tiên sử dụng hệ thống **Flexbox** và các thẻ `<div>` lồng nhau.

3. Phân tích thẻ `<form>` tìm kiếm

   - [Thẻ `<form>` không có `action` và `method`](screenshots/shopee_header_nav.jpg). Vậy nên:

      * `action` mặc định chứa URL hiện tại của trang web.
      * `method` mặc định là `GET`.


   **2 input types được sử dụng là:** `text` (để nhập từ khóa) và `hidden` (để chứa các tham số ẩn như tracking hoặc loại tìm kiếm).

## PHẦN C - SUY LUẬN

### Câu C1 - Thiết kế kiến trúc

```html
<!DOCTYPE html>
<html lang="vi">
<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chi tiết sản phẩm - iPhone 16</title> <!--dùng để đặt tiêu đề cho trang web, được xuất hiện trên tab của browser -->
</head>
<body>
   <header><!-- sử dụng thẻ header để thể hiện đây là phần đầu trang web chứa logo và các thanh công cụ -->
      <div class="logo">
         <a href="#">ShopLogo</a><!-- sử dụng thẻ a để khi khách hàng ấn vào logo là có thể chuyển tới homepage, vì chưa có URL nên tạm thời để href=#-->
      </div>

      <nav aria-label="main-nav-bar"> <!--Sử dụng thẻ nav vì đây là thanh điều hướng-->
         <l> <!--Sử dụng thẻ l vì thanh điều hướng đi theo danh mục-->
            <li><a href="#">Trang chủ</a></li>
            <li><a href="#">Danh mục sản phẩm</a></li>

         </l>
      </nav>
   </header>

   <nav aria-label="Breadcrumb"> <!--Sử dụng thẻ nav vì breadcrumb là một thanh điều hướng-->
      <ol><!--Sử dụng thẻ ol vì danh mục đi theo thứ tự-->
         <li><a href="#">Trang chủ</a></li>
         <li><a href="#">Điện thoại</a></li>
         <li><a href="#">iPhone 16</a></li>
      </ol>
   </nav>

   <main> <!--Sử dụng thẻ main vì sản phẩm là phần chính của trang-->
      <section class="product-detail">
         <section class="product-gallery" aria-label="Ảnh sản phẩm"><!--Sử dụng thẻ section để chia các phần nội dung của sản phẩm-->
            <h2>Hình ảnh sản phẩm</h2>
            <div class="gallery-list">
               <img src="images/iphone16-1.jpg" alt="iPhone 16 - ảnh 1"> <!--Sử dụng thẻ img để chứa ảnh và tiêu đề ảnh-->
               <img src="images/iphone16-2.jpg" alt="iPhone 16 - ảnh 2">
               <img src="images/iphone16-3.jpg" alt="iPhone 16 - ảnh 3">
               <img src="images/iphone16-4.jpg" alt="iPhone 16 - ảnh 4">
               <img src="images/iphone16-5.jpg" alt="iPhone 16 - ảnh 5">
            </div>
         </section>

         <section class="product-info" aria-labelledby="product-name">
            <h1 id="product-name">iPhone 16</h1><!--Sử dụng thẻ h để hiển thị nổi bật tên sản phẩm-->

            <p class="price"> <!--Sử dụng thẻ p để bọc nội dung giá tiền-->
               <data value="25990000">25.990.000đ</data> <!--Sử dụng thẻ data để chứa dữ liệu giá tiền sp-->
            </p>

            <p class="rating" aria-label="Đánh giá 4 trên 5 sao">
               <span aria-hidden="true">★★★★☆</span>
               <span>4.0/5</span>
               <span>(128 đánh giá)</span>
            </p>

            <p class="description">
               iPhone 16 sở hữu thiết kế hiện đại, hiệu năng mạnh mẽ, camera nâng cấp và thời lượng pin tối ưu cho nhu cầu sử dụng hằng ngày.
            </p>
         </section>

         <section class="product-specs" aria-labelledby="specs-title">
            <h2 id="specs-title">Thông số kỹ thuật</h2>
            <table><!--Sử dụng thẻ table vì thông số kĩ thuật được thể hiện theo dạng bảng-->
               <thead> <!--Thẻ tiêu đề bảng-->
                  <tr>
                     <th>Thông số</th>
                     <th>Chi tiết</th>
                  </tr>
               </thead>
               <tbody><!--Thẻ nội dung đề bảng-->
                  <tr>
                     <td>Màn hình</td>
                     <td>6.1 inch OLED</td>
                  </tr>
                  <tr>
                     <td>Chip xử lý</td>
                     <td>Apple A18</td>
                  </tr>
                  <tr>
                     <td>Camera</td>
                     <td>48MP + 12MP</td>
                  </tr>
                  <tr>
                     <td>Bộ nhớ</td>
                     <td>256GB</td>
                  </tr>
               </tbody>
            </table>
         </section>

         <section class="product-reviews" aria-labelledby="reviews-title">
            <h2 id="reviews-title">Đánh giá / Bình luận</h2>

            <article class="review">
               <h3>Nguyễn Văn A</h3>
               <p>Máy đẹp, hiệu năng tốt, chụp ảnh rất ổn.</p>
            </article>
         </section>
      </section>

      <aside class="similar-products">
         <h2 id="similar-title">Sản phẩm tương tự</h2>

         <article class="similar-item"><!--Sử dụng thẻ article để chứa preview của sp khác -->
            <img src="images/iphone15.jpg" alt="iPhone 15">
            <h3>iPhone 15</h3>
            <p>22.990.000đ</p>
         </article>
   </main>

   <footer><!--Các thông tin và liên kết khác ở cuối trang nên dùng footer e-->
      <p>&copy; 2026 ShopPhone. All rights reserved.</p>
      <nav aria-label="Liên kết chân trang">
         <ul>
            <li><a href="#">Chính sách bảo hành</a></li>
            <li><a href="#">Chính sách đổi trả</a></li>
            <li><a href="#">Hỗ trợ khách hàng</a></li>
         </ul>
      </nav>
   </footer>
</body>
</html>
```

### Câu C2 - So sánh & Tranh luận

Việc cho rằng dùng `<div>` kết hợp `class` là đủ nhưng thực chất là một tư duy sai lầm trong phát triển web hiện đại. Đầu tiên, về mặt SEO(Tối ưu hoá công cụ tìm kiếm), các thuật toán của Geogle hay Bing sử dụng thẻ Semantic để xác định trọng tâm nội dung. Nếu mọi thứ là `<div>`, robot tìm kiếm sẽ gặp khó khăn trong việc phân biệt đâu là tiêu đề chính, đâu là nội dung phụ, dẫn đến việc xêp hạng trang web bị ảnh hưởng tiêu cực. Thứ hai là **Asscessibility**, những người khiếm thị sử dụng trình đọc màn hình (Screen Reader) dựa vào các thẻ như `<nav>`, `<main>`, `<footer>` để di chuyển nhanh giữa các phần. Một trang web toàn `<div>` sẽ khiến họ bị "Mắc kẹt" vì không có điểm tựa đầu hướng.

Ví dụ cụ thể: Dùng thẻ `<time datetime="2026-04-22">`, trình duyệt và các ứng dụng lịch có thể tự động nhận diện và đề xuất lưu sự kiện cho người dùng. Nếu chỉ dùng `<div>22/04/2026</div>`, đó đơn thuần chỉ là một dòng chữ vô tri, máy tính không thể hiểu đó là một mốc thời gian để xử lý thông minh.

Tuy nhiên, `<div>` không hoàn toàn bị loại bỏ. Trong thực tế, `<div>` vẫn là lựa chọn đúng đắn khi đóng vai trò là thẻ bao bọc (container) thuần túy cho mục đích trang trí hoặc dàn trang bằng CSS (như Flexbox/Grid). Khi một khối dữ liệu không mang ý nghĩa nội dung cụ thể (ví dụ: một khối để tạo khoảng cách, hoặc một lớp phủ màu mờ trên ảnh), việc dùng `<div>` giúp giữ cho cấu trúc Semantic của trang không bị nhiễu bởi các thành phần "vô nghĩa" về mặt văn bản. Tóm lại, dùng đúng thẻ không tốn thời gian học, nó là tiêu chuẩn để tạo ra một sản phẩm chuyên nghiệp.
