# PHIẾU BÀI TẬP 01
# **HTML5 FUNDAMENTAILS - Cáu trúc, Semantic, Tables & Links**

---

## PHẦN A - ĐỌC HIỂU

### Câu A1 - HTTP & Browser

#### 1. Khi gõ 'https: //shopee.vn' vào trình duyệt và nhấn Enter, có 7 bước xảy ra:

**Bước 1**: Trình duyệt nhận URL người dùng nhập

@nbsp@nbsp@nbsp; Khi bạn gõ 'https: //shopee.vn' vào thanh địa chỉ và bấm Enter, Chrome hiểu rằng bạn đang thực hiện một yêu cầu truy cập vào website Shopee.

> Nguồn tham chiếu: 01-introduction_html1_universe.md - Cuộc Hành Trình 0.3 Giây Xuyên Đại Dương

<br>

**Bước 2**: DND Lookup - Tìm địa chỉ IP của shopee.vn

@nbsp@nbsp@nbsp; Đây là bước xác định nơi gửi yêu cầu.

@nbsp@nbsp@nbsp; Trình duyệt cần biết máy chủ của Shopee nằm ở đâu. Vì máy tính chỉ đọc được các dãy số(IP), nên nó sẽ tra cứu danh bạ DND để đổi tên miền shopee.vn thành địa chỉ IP vật lý của server.

> Nguồn tham chiếu: 01_introduction_html1_universe.md - 1.1 Kiến trúc Client-Server - "Nhà hàng online"

<br>

**Bước 3**: Trình duyệt gửi HTTP Request đến server Shopee

@nbsp@nbsp@nbsp; Sau khi có IP, trình duyệt gửi một "đơn đặt hàng"(Phương thức GET) yêu cầu nội dung trang Web.

> Nguồn tham chiếu: 01_introduction_html1_universe.md - 1.2. HTTP - Ngôn ngữ để Client và Server hiểu nhau

<br>

**Bước 4**: Dữ liệu di chuyển qua hạ tầng Internet

@nbsp@nbsp@nbsp; Yêu cầu xuất phát từ thiết bị, đi qua router WiFi, qua nhà mạng VNPT và chạy xuyên cáp quang dưới đáy biển để tới Data Center của Shoppe.

> Nguồn tham chiếu: 01_introduction_html1_universe.md - "Cuộc Hành Trình 0.3 Giây Xuyên Đại Dương

<br>

**Bước 5**: Server tiếp nhận và xử lý yêu cầu

@nbsp@nbsp@mbsp; Tại Server sẽ tiếp nhận yêu cầu, truy xuất dữ liệu từ Database và chuẩn bị các file cần thiết để phản hồi cho người dùng

> Nguồn tham chiếu: 01_introduction_html1_universe.md - 1.1. Kiến trúc Client - Server - "Nhà hàng online"

<br>

**Bước 6**: Server gửi HTTP Response ngược lại cho trình duyệt

@nbsp@nbsp@nbsp; Server gửi về mã trạng thái kèm theo gói dữ liệu gồm HTML, CSS, JavaScript và hình ảnh thông qua con đường Internet cũ.

> Nguồn tham chiếu: 01_introduction_html1_universe.md - 1.2. HTTP - Ngôn ngữ để Client và Server hiểu nhau

<br>

**Bước 7**: Trình duyệt thực hiện Rendering để hiển thị giao diện

@nbsp@nbsp@nbsp; Trình duyệt nhận file đóng vai trò "kiến trúc sư": Đọc cấu trúc HTML, áp dụng thiết kế CSS và chạy logic JavaScript để hiển thị trang Shopee hoàn chỉnh trên màn hình.

> Nguồn tham chiếu: 01_introduction_html1_universe.md - 1.3. Browser Rendering - Từ Code thành Hình ảnh

<br>

#### 2.

@nbsp@nbsp@nbsp; - Trong DevTools của Chrome, tab **Network** cho thấy các thông tin:

@nbsp@nbsp@nbsp@nbsp; Quan sát toàn bộ quá trình trao đổi dữ liệu (Requests/Responses) giữa trình duyệt và máy chủ, từ đó kiểm tra xem website tải nhanh hay chậm và xác định file nào đang chiếm nhiều dung lượng nhất.

> Nguồn tham chiếu: 01_introduction_html1_universe.md - 4.3. Developer Tools(F12) - "Kính hiển vi" cho website

<br>

### Câu A2 - Semantic HTML

#### 1. Trang web bị Google đánh giá SEO thấp vì:

@nbsp@nbsp@nbsp; - Sử dụng quá nhiều thẻ <div> vô nghĩa vì thế Google nó không hiểu đâu là nội dung chính, đâu  là điều hướng.

> Nguồn tham chiếu: 04_visible_part_html.md - Tại sao không dùng '<div>' cho mọi thứ?

<br>

#### 2. Các lỗi semantic:

@nbsp@nbsp@nbsp; - Phần đầu trang <header>: <div class="header" >;

@nbsp@nbsp@nbsp; - Danh sách menu: <div menu="menu">;

@nbsp@nbsp@nbsp; - Phần thân trang <main>: <div class="main">;

@nbsp@nbsp@nbsp; - Mỗi sản phẩm: <div class="product">;

@nbsp@nbsp@nbsp; - Phần cuối trang <footer>: <div class="footer">.

> Nguồn tham chiếu: 04_visible_part_html.md - Bản đồ Semantic Elements

<br>

**Sửa lỗi**

```html
<header>
    <div class="logo">ShopTLU</div>
    <nav>
        <ul>
            <li><a heft="/">Trang chủ</a></li>
            <li><a heft="/product">Sản phẩm</a></li>
        </ul>
    </nav>
</header>
<main>
    <article class="product">
        <h2>iPhone 16Pro</h2>;
        <strong>25.990.000</strong>
        <figure>
            <img src="iphone.jpg" alt="iPhone 16Pro">
        </figure>
    </article>
</main>
<footer>&copy 2026 ShopTLU</footer>
```

<br>

### Câu A3 - Block vs Inline


