# 📋 PHIẾU BÀI TẬP 02
# **HTML5 FORMS & MEDIA — Biểu mẫu, Validation & Đa phương tiện**

## PHẦN A — KIỂM TRA ĐỌC HIỂU (25 điểm)

### Câu A1 (5đ) — Input Types

Dưới đây là 10 input types phổ biến trong HTML5 kèm theo mô tả và ứng dụng cụ thể cho trang E-commerce dựa trên tài liệu bạn cung cấp:

1. `type="email"` 

    - Giao diện: Ô nhập văn bản, tự động hiển thị bàn phím tối ưu cho email trên di động (có sẵn phím @).

    - Validation: Tự động kiểm tra định dạng email hợp lệ (phải có @ và tên miền).

    - Use case: Dùng cho Form đăng ký/đăng nhập tài khoản mua hàng.

2. `type="password"` 

    - Giao diện: Các ký tự nhập vào sẽ bị ẩn đi (thay bằng dấu chấm hoặc dấu sao) để bảo mật.

    - Validation: Thường kết hợp với `minlength` hoặc `pattern` để bắt buộc mật khẩu mạnh.

    - Use case: Dùng để khách hàng thiết lập mật khẩu bảo vệ tài khoản.

3. `type="number"` 

    - Giao diện: Ô nhập số kèm theo hai nút mũi tên tăng/giảm ở bên cạnh.

    - Validation: Giới hạn số lượng tối thiểu (min) hoặc tối đa (max) mà khách có thể mua.

    - Use case: Dùng để khách hàng chọn số lượng sản phẩm trong giỏ hàng.

4. `type="tel"` 

    - Giao diện: Hiển thị bàn phím số (numpad) trên các thiết bị cảm ứng.

    - Validation: Kết hợp với thuộc tính `attern` để kiểm tra đúng định dạng số điện thoại (ví dụ: 10 số).

    - Use case: Dùng để nhập Số điện thoại nhận hàng trong form thanh toán.

5. `type="date"` 

    - Giao diện: Hiển thị một bảng lịch (Date picker) để người dùng chọn ngày tháng năm.

    - Validation: Có thể giới hạn ngày sớm nhất hoặc muộn nhất bằng `min` và `max`.

    - Use case: Dùng để khách hàng chọn ngày giao hàng hoặc nhập ngày sinh để nhận ưu đãi.

6. `type="file"` 

    - Giao diện: Một nút bấm (thường ghi "Choose File") để mở cửa sổ chọn tệp từ máy tính.

    - Validation: Dùng thuộc tính `accept` để chỉ cho phép chọn định dạng ảnh như `.jpg`, `.png`.

    - Use case: Dùng khi khách hàng muốn tải ảnh feedback sản phẩm để nhận xu.

7. `type="checkbox"` 

    - Giao diện: Một ô vuông nhỏ để tích chọn, có thể chọn nhiều ô cùng lúc.

    - Validation: Thường đi kèm với `required` cho các mục bắt buộc.

    - Use case: Dùng cho mục "Tôi đồng ý với điều khoản dịch vụ" hoặc chọn bộ lọc (Size: S, M, L).

8. `type="search"` 

    - Giao diện: Ô nhập văn bản thường có thêm nút "X" ở cuối để xóa nhanh nội dung đã nhập.

    - Validation: Không có validation đặc biệt, nhưng trình duyệt sẽ hiểu đây là truy vấn tìm kiếm.

    - Use case: Dùng cho thanh tìm kiếm sản phẩm ở đầu trang web.

9. `type="range"` 

    - Giao diện: Một thanh trượt (Slider) để chọn giá trị trong một khoảng.

    - Validation: Xác định mức thấp nhất (min) và cao nhất (max) của thanh trượt.

    - Use case: Dùng để khách hàng lọc sản phẩm theo khoảng giá một cách nhanh chóng.

10. `type="url"` 

    - Giao diện: Ô nhập văn bản tương tự text nhưng tối ưu cho địa chỉ web.

    - Validation: Tự động kiểm tra xem người dùng có nhập đúng định dạng `http:// hoặc https://` không.

    - Use case: Dùng trong form dành cho người bán hàng để liên kết với website cá nhân của họ.

> Nguồn tham chiếu: 07_forms_interactive.md - Các Input Types HTML5

### Câu A2 - Validation Attributes

Dự đoán kết quả khi bấm Submit:

- Trường hợp 1: Trình duyệt sẽ chặn lại và hiển thị thông báo yêu cầu người dùng phải nhập dữ liệu vào ô này. Điều này xảy ra vì thuộc tính `required` đã biến ô nhập liệu thành bắt buộc, không được phép để trống khi gửi form.

- Trường hợp 2: Trình duyệt sẽ báo lỗi định dạng không hợp lệ. Do input được đặt là `type="email"`, trình duyệt sẽ tự động kiểm tra xem nội dung có chứa ký tự `@` và phần tên miền đúng chuẩn hay không, mà chuỗi "abc" thì hoàn toàn thiếu các yếu tố này.

- Trường hợp 3: Form sẽ không được gửi đi và xuất hiện cảnh báo rằng giá trị nhập vào phải nhỏ hơn hoặc bằng 10. Nguyên nhân là do thuộc tính `max="10"` đã thiết lập giới hạn trần cho ô số, nên con số 15 bị coi là vi phạm quy tắc.

- Trường hợp 4: Trình duyệt sẽ hiển thị thông báo lỗi yêu cầu người dùng nhập đúng định dạng mong muốn. Ở đây, thuộc tính `pattern="[0-9]{10}"` sử dụng biểu thức chính quy để ép người dùng chỉ được nhập đúng 10 chữ số, nên khi bạn nhập cả chữ cái lẫn số như "abc123", nó sẽ bị từ chối.

- Trường hợp 5: Một thông báo lỗi sẽ xuất hiện cho biết mật khẩu quá ngắn. Với thuộc tính `minlength="8"`, trình duyệt yêu cầu chuỗi nhập vào phải có ít nhất 8 ký tự, trong khi "123" chỉ có 3 ký tự nên không đạt yêu cầu tối thiểu.

> Nguồn tham chiếu: 07_forms_interactive.md - HTML5 Validation Attributes

### Câu A3 - Accessibility

1. Tại sao `<label for="email">` quan trọng cho người dùng screen reader?

    - Xác định chức năng: Người dùng sử dụng trình đọc màn hình (screen reader) sẽ không thể biết một ô nhập liệu dùng để làm gì nếu nó không được gắn nhãn.

    - Liên kết trực tiếp: Khi dùng cặp thẻ `<label for="ID_input">`, trình duyệt sẽ tạo ra một liên kết logic giữa nhãn và ô nhập liệu.

    - Thông báo bằng giọng nói: Khi người dùng di chuyển con trỏ vào ô nhập liệu, screen reader sẽ đọc to nội dung bên trong thẻ `<label>` (ví dụ: "Email:"), giúp họ hiểu chính xác dữ liệu cần nhập.

2. Khi nào dùng `<fieldset>` + `<legend>`?

    - Khi nào dùng: Hai thẻ này được dùng để nhóm các trường thông tin có liên quan lại với nhau trong một form lớn.

    - Tác dụng: `<fieldset>` tạo ra một khung bao quanh nhóm, còn `<legend>` đóng vai trò là tiêu đề cho nhóm đó, giúp form có cấu trúc mạch lạc hơn.

    - Ví dụ cụ thể:

    ```html

    <fieldset>
        <legend>Thông tin giao hàng</legend>
        <label for="name">Họ và tên</label>
        <input type="text" id="name">
        <br>
        <label for="address">Địa chỉ:</label>
        <input type="text" id="address">
    </fieldset>

    ```
3. Khi nào dùng `aria-label`? Tại sao KHÔNG nên dùng khi đã có `<label>`?

    - Khi nào dùng `aria-label`: Dùng khi bạn có một phần tử tương tác (như nút bấm) nhưng không muốn hiển thị văn bản hướng dẫn ra màn hình.

        Ví dụ: Một nút bấm chỉ có biểu tượng giỏ hàng 🛒 cần `aria-label="Đặt hàng"` để screen reader có thể đọc được mục đích của nút đó.

    - Tại sao KHÔNG dùng chung với `<label>`:

        - Gây nhiễu: `aria-label` sẽ ghi đè (override) nội dung của `<label>` đối với trình đọc màn hình.

        - Dư thừa: Nếu đã có `<label>` hiển thị rõ ràng cho mọi người cùng thấy, việc thêm `a`ria-label` là không cần thiết và có thể gây xung đột hoặc nhầm lẫn cho các thiết bị hỗ trợ người khuyết tật.

        - Ưu tiên chuẩn HTML: Theo lời khuyên từ các chuyên gia (như anh Hùng trong tài liệu), việc dùng đúng các thẻ HTML chuẩn như `<label>` luôn là ưu tiên hàng đầu trước khi tính đến các thuộc tính ARIA bổ trợ.

> Nguồn tham chiếu: 07_forms_interactive.md - Accessibility

### Câu A4 - Media

1. Thuộc tính `loading="lazy"` trên thẻ `<img>`

    - Giải thích: Đây là thuộc tính giúp trình duyệt trì hoãn việc tải hình ảnh cho đến khi người dùng cuộn trang đến gần vị trí của ảnh đó.

    - Cải thiện:

        - Tốc độ tải trang ban đầu: Giảm lượng dữ liệu phải tải ngay lập tức, giúp trang web hiện ra nhanh hơn.

        - Tiết kiệm băng thông: Trình duyệt sẽ không tải ảnh nếu người dùng không bao giờ cuộn đến đó.

    - Khi nào KHÔNG nên dùng: Không nên dùng cho các hình ảnh nằm ở phần đầu trang (Above the fold) — nơi người dùng nhìn thấy ngay khi vừa mở web. Việc dùng `lazy load` ở đây sẽ làm ảnh hiện ra chậm hơn, gây cảm giác lag.

2. Cung cấp nhiều `<source>` trong thẻ `<video>`

    - Vì mỗi trình duyệt (Chrome, Safari, Firefox) hỗ trợ các định dạng nén video khác nhau. Khi bạn cung cấp nhiều `<source>`, trình duyệt sẽ tự động chọn định dạng đầu tiên mà nó hỗ trợ để phát.

    - 3 format video web phổ biến:

        - MP4 (.mp4): Định dạng phổ biến nhất, hỗ trợ hầu hết mọi trình duyệt.

        - WebM (.webm): Định dạng hiện đại, dung lượng nhẹ, thường dùng cho Chrome và Firefox.

        - Ogg (.ogv): Định dạng mã nguồn mở.

3. Thuộc tính alt trên `<img>` và cách viết tốt

    - Mục đích: Cung cấp nội dung văn bản thay thế nếu ảnh không hiển thị được và quan trọng nhất là để trình đọc màn hình (screen reader) đọc cho người khiếm thị hiểu nội dung ảnh.

    - Viết alt tốt cho 3 trường hợp cụ thể:

        - Ảnh sản phẩm iPhone 16:

            Cách viết: alt="iPhone 16 Pro Max màu titan tự nhiên góc nhìn nghiêng".

            Lý do: Cần mô tả rõ tên sản phẩm và đặc điểm chính để khách hàng hình dung được.

        - Ảnh trang trí (Decorative):

            Cách viết: alt="" (để trống nội dung bên trong dấu ngoặc kép).

            Lý do: Nếu ảnh chỉ để làm đẹp và không mang thông tin quan trọng, việc để trống alt giúp trình đọc màn hình bỏ qua, tránh làm phiền người dùng.

        - Ảnh biểu đồ doanh thu Q1/2026:

            Cách viết: alt="Biểu đồ cột hiển thị doanh thu quý 1 năm 2026 tăng trưởng 15% so với cùng kỳ năm trước".

            Lý do: Phải tóm tắt được thông điệp chính hoặc số liệu quan trọng mà biểu đồ đang muốn truyền tải.

> Nguồn tham chiếu: 06_graphics_multimedia.md – Images (alt, lazy loading), Video & Audio (multiple sources) & 07_forms_interactive.md – HTML5 Validation (required, types, patterns), Accessibility (label, fieldset, aria).

### Câu A5 - So sánh `<figure>` vs `<img>`

1. Cách 1: Sử dụng thẻ `<img>` đơn thuần

    - Cách này dùng khi hình ảnh chỉ đóng vai trò minh họa hoặc là một phần bổ trợ cho nội dung văn bản xung quanh mà không cần tiêu đề giải thích riêng.

    - Khi nào dùng: Dùng cho các hình ảnh mang tính trang trí, các icon, hoặc ảnh nằm trong một đoạn văn mà ý nghĩa đã được giải thích rõ bằng chữ.

        Ví dụ thực tế 1: Ảnh đại diện (Avatar) trong trang Profile cá nhân. Bức ảnh này chỉ cần thuộc tính alt để trình đọc màn hình biết đó là ảnh của ai, không cần chú thích bên dưới vì tên người dùng đã hiển thị ở tiêu đề bên cạnh.

        Ví dụ thực tế 2: Icon tính năng (ví dụ: hình chiếc xe tải nhỏ cạnh dòng chữ "Giao hàng miễn phí"). Hình ảnh này chỉ để làm đẹp và hỗ trợ thị giác, không cần ghi chú thêm bên dưới.

2. Cách 2: Sử dụng thẻ `<figure>` và `<figcaption>`

    - Cách này dùng khi hình ảnh là một đơn vị nội dung độc lập, cần có tiêu đề hoặc chú thích đi kèm để người dùng hiểu rõ ngữ cảnh.

    - Khi nào dùng: Dùng khi bạn muốn nhóm ảnh và chú thích thành một khối thống nhất. Nếu bạn di chuyển khối này đi chỗ khác trong bài viết, nội dung của nó vẫn tự có ý nghĩa riêng.

        Ví dụ thực tế 1: Danh sách sản phẩm E-commerce. Như ví dụ của bạn, việc dùng `<figure>` giúp bao bọc cả ảnh sản phẩm và phần giá tiền/tên sản phẩm. Điều này rất tốt cho SEO và người dùng vì nó khẳng định: "Tấm ảnh này và dòng giá tiền này thuộc về nhau".

        Ví dụ thực tế 2: Biểu đồ hoặc Ảnh minh họa bài học. Trong một bài blog về kỹ thuật, một tấm ảnh chụp màn hình về lỗi Git cần có chú thích: "Hình 1: Lỗi command not found khi gõ sai lệnh git". Điều này giúp người dùng (và cả trình đọc màn hình) dễ dàng theo dõi mục đích của tấm ảnh.

> Nguồn tham chiếu: 07_forms_interactive.md - 🖼️ Images — Responsive và tối ưu

## PHẦN C - PHÂN TÍCH & SUY LUẬN

### Câu C1 - Debug Form

1. Lỗi 1: 
    - Dòng 2 - Input "Tên" không có `<label for="...">` vi phạm accessibility.
    - **Sửa:** 
        ```html
            <label for="fullname">Tên:</lable>
            <input type="text" id="fullname" name="fullname" required>
        ```
2. Lỗi 2: 
    - Dòng 4 - Input "Email" thiếu thuộc tính `name` để gửi dữ liệu và thiếu `<lable>`.
    - **Sửa:**
        ```html
            <label for="email">Email</label>
            <input type="email" id="eamil" name="email" requirred>
        ```
3. Lỗi 3: 
    - Dòng 6  - Input "Mật khẩu" thiếu `<label>` và định dang `id`.
    - **Sửa:**
        ```html
            <label for="pwd">Mật khẩu</label>
            <input type="passwork" id="pwd" name="pwd" required>
        ```
4. Lỗi 4: 
    - Dòng 7 - Ô "Nhập lại mật khẩu" thiếu `<label>` và định danh `id`.
    - **Sửa:**
        ```html
            <label for="re-pwd">Nhập lại:</label>
            <input type="passwork" id="re-pwd" name="re-pwd" required>
        ```
5. Lỗi 5: 
    - Dòng 9 - Dùng `type="text"` cho điện thoại là sai, thiếu `<label>` và thuộc tính `name`.
    - **Sửa:**
        ```html
            <label for="tel">Số điện thoại:</label>
            <input type="tel" id="tel" name="tel">
        ```
6. Lỗi 6,7: 
    - Dòng 11 - Thẻ `<select>` thiếu `<label>, id, name`. 
    - Dòng 12 - Các thẻ `<option>` thiếu thuộc tính `value` để server xử lý
    - **Sửa:**
        ```html
            <label for="city">Thành phố:<label>
            <select id="city" name="city">
                <option value="hn">Hà Nội</option>
                <option value="hcm">TP.HCM</option>
            </select>
        ```
7. Lỗi 8: 
    - Dòng 15 - Thẻ `<label>` đứng độc lập, thiếu thẻ `<input type="checkbox">` tương ứng.
    - **Sửa:**
        ```html
            <input type="checkbox" id="check" name="check">
            <label for="check">Tôi đồng ý điều khoản</label>
        ```
> Nguồn tham chiếu: 07_forms_interactive.md - 🌐 Big Picture — Anatomy của một Form

### Câu C2 - Thiết kế chiến lược Validation

1. Regex cho CMND/CCCD và Số tài khoản
    
    - CMND/CCCD: `pattern="[0-9]{12}"`
    - Số tài khoản: `pattern="[0-9]{10,15}"`

2. HTML5 Validation không có đủ an toàn cho ngân hàng vì dễ bị vô hiệu hoá.

3. Ba loại Validation HTML5 KHÔNG THỂ làm được(Phải dùng JavaScript)

    - Comditional Validation
    - Comparison Validation
    - Asynchronous Validation

4. Hai rủi ro bảo mật nếu chỉ validtion trên Froontend mà không validation Backend:

    - Tấn công SQL Injection/XSS
    - Sai lệch dữ liệu hệ thống