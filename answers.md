# PHIẾU BÀI TẬP 01

# **HTML5 FUNDAMENTALS - Cấu trúc, Semantic, Tables & Links**

---

## PHẦN A - ĐỌC HIỂU

### Câu A1 - HTTP & Browser

#### 1. Khi gõ 'https://shopee.vn' vào trình duyệt và nhấn Enter, có 7 bước xảy ra:

**Bước 1**: Trình duyệt nhận URL người dùng nhập
Khi bạn gõ 'https://shopee.vn' vào thanh địa chỉ và bấm Enter, Chrome hiểu rằng bạn đang thực hiện một yêu cầu truy cập vào website Shopee.

> Nguồn tham chiếu: 01-introduction_html1_universe.md - Cuộc Hành Trình 0.3 Giây Xuyên Đại Dương

<br>

**Bước 2**: DNS Lookup - Tìm địa chỉ IP của shopee.vn
Đây là bước xác định nơi gửi yêu cầu.
Trình duyệt cần biết máy chủ của Shopee nằm ở đâu. Vì máy tính chỉ đọc được các dãy số (IP), nên nó sẽ tra cứu danh bạ DNS để đổi tên miền shopee.vn thành địa chỉ IP vật lý của server.

> Nguồn tham chiếu: 01_introduction_html1_universe.md - 1.1 Kiến trúc Client-Server - "Nhà hàng online"

<br>

**Bước 3**: Trình duyệt gửi HTTP Request đến server Shopee
Sau khi có IP, trình duyệt gửi một "đơn đặt hàng" (Phương thức GET) yêu cầu nội dung trang Web.

> Nguồn tham chiếu: 01_introduction_html1_universe.md - 1.2. HTTP - Ngôn ngữ để Client và Server hiểu nhau

<br>

**Bước 4**: Dữ liệu di chuyển qua hạ tầng Internet
Yêu cầu xuất phát từ thiết bị, đi qua router WiFi, qua nhà mạng VNPT và chạy xuyên cáp quang dưới đáy biển để tới Data Center của Shopee.

> Nguồn tham chiếu: 01_introduction_html1_universe.md - "Cuộc Hành Trình 0.3 Giây Xuyên Đại Dương"

<br>

**Bước 5**: Server tiếp nhận và xử lý yêu cầu
Tại Server sẽ tiếp nhận yêu cầu, truy xuất dữ liệu từ Database và chuẩn bị các file cần thiết để phản hồi cho người dùng.

> Nguồn tham chiếu: 01_introduction_html1_universe.md - 1.1. Kiến trúc Client - Server - "Nhà hàng online"

<br>

**Bước 6**: Server gửi HTTP Response ngược lại cho trình duyệt
Server gửi về mã trạng thái kèm theo gói dữ liệu gồm HTML, CSS, JavaScript và hình ảnh thông qua con đường Internet cũ.

> Nguồn tham chiếu: 01_introduction_html1_universe.md - 1.2. HTTP - Ngôn ngữ để Client và Server hiểu nhau

<br>

**Bước 7**: Trình duyệt thực hiện Rendering để hiển thị giao diện
Trình duyệt nhận file đóng vai trò "kiến trúc sư": Đọc cấu trúc HTML, áp dụng thiết kế CSS và chạy logic JavaScript để hiển thị trang Shopee hoàn chỉnh trên màn hình.

> Nguồn tham chiếu: 01_introduction_html1_universe.md - 1.3. Browser Rendering - Từ Code thành Hình ảnh

<br>

#### 2.

- Trong DevTools của Chrome, tab **Network** cho thấy các thông tin:
  Quan sát toàn bộ quá trình trao đổi dữ liệu (Requests/Responses) giữa trình duyệt và máy chủ, từ đó kiểm tra xem website tải nhanh hay chậm và xác định file nào đang chiếm nhiều dung lượng nhất.

> Nguồn tham chiếu: 01_introduction_html1_universe.md - 4.3. Developer Tools(F12) - "Kính hiển vi" cho website

<br>

### Câu A2 - Semantic HTML

#### 1. Trang web bị Google đánh giá SEO thấp vì:
- Sử dụng quá nhiều thẻ `<div>` vô nghĩa vì thế Google nó không hiểu đâu là nội dung chính, đâu là điều hướng.

> Nguồn tham chiếu: 04_visible_part_html.md - Tại sao không dùng 'div' cho mọi thứ?

<br>

#### 2. Các lỗi semantic:
- Phần đầu trang `<header>`: `<div class="header">`;
- Danh sách menu: `<div menu="menu">`;
- Phần thân trang `<main>`: `<div class="main">`;
- Mỗi sản phẩm: `<div class="product">`;
- Phần cuối trang `<footer>`: `<div class="footer">`.

> Nguồn tham chiếu: 04_visible_part_html.md - Bản đồ Semantic Elements

<br>

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
<br>

### Câu A3 - Block vs Inline

- Kết quả hiển thị

<pre>
--------------------------------
|Hộp 1                         |
|Text A Text B                 |
|Hộp 2                         |
|Text C <strong>Text D</strong>                 |
|Hộp 3                         |
|                              |
|                              |
|                              |
--------------------------------
</pre>

- Giải thích:
    + Đối với các thẻ `<div>` thì render ra trên browser text trong các thẻ sẽ xuống dòng vì vậy các nội dung như Hộp 1, Hộp 2 và Hộp 3 mới ở mỗi cái 1 dòng, tương tự với nội dung được bao bọc trong các thẻ đó.
    + Đối với các thẻ `<span>` hoàn toàn có thể render trên cùng 1 dòng với thẻ nội dung khác vì vậy các nội dung "Text A Text B", "Text C Text D" mới có thể đứng cùng 1 hàng.
    + Đối với thẻ `<strong>` tương tự như `<span>` nhưng thẻ này cso nhiệm vụ in đậm text bên trong và nói cho browser biết đây là nội dung cần chú ý.
    