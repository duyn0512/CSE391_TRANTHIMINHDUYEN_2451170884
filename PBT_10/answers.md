# 📋 PHIẾU BÀI TẬP 10

# **ASYNC JAVASCRIPT & API INTEGRATION**

## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 — Sync vs Async

```javascript
console.log("1 - Start");

setTimeout(() => console.log("2 - Timeout 0ms"), 0);

Promise.resolve().then(() => console.log("3 - Promise"));

console.log("4 - End");

setTimeout(() => console.log("5 - Timeout 100ms"), 100);

Promise.resolve().then(() => {
  console.log("6 - Promise 2");
  setTimeout(() => console.log("7 - Nested timeout"), 0);
});
```

1. Dự đoán thứ tự output

   ```text
   1 - Start
   4 - End
   3 - Promise
   6 - Promise 2
   2 - Timeout 0ms
   7 - Nested timeout
   5 - Timeout 100ms
   ```

2. Giải thích cơ chế Event Loop, Microtask Queue, Macrotask Queue

- Microtask Queue (Hàng đợi vi tác vụ): Chứa các callback có độ ưu tiên cao, cụ thể là các `.then()`, `.catch()`, `.finally()` của Promise và `queueMicrotask()`.

- Macrotask Queue / Task Queue (Hàng đợi tác vụ): Chứa các callback của setTimeout, setInterval, các sự kiện I/O, DOM events.

- Event Loop (Vòng lặp sự kiện): Trọng tài giám sát hệ thống và hoạt động theo nguyên tắc:
  - Chạy hết toàn bộ code đồng bộ trong Call Stack.

  - Kiểm tra và chạy SẠCH SẼ tất cả các tác vụ đang có trong Microtask Queue cho đến khi rỗng. Nếu trong lúc chạy lại sinh ra Microtask mới, nó cũng sẽ được xử lý luôn trong phiên này.

  - Lấy MỘT macrotask duy nhất từ Macrotask Queue bỏ vào Call Stack để chạy.

  - Quay lại bước 2 (vòng lặp vô hạn).

### Câu A2 — Fetch API

```javascript
async function getData() {
  try {
    const response = await fetch("https://api.example.com/data");

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed:", error.message);
    return null;
  }
}
```

1. `await fetch(...)` — `fetch` trả về gì? Tại sao cần `await`?

- Hàm `fetch()` trả về một Promise, bên trong Promise này chứa một đối tượng Response (luồng phản hồi HTTP thô, chứa headers, status, ok... nhưng chưa có body dữ liệu hoàn chỉnh).

- Cần từ khóa `await` để tạm dừng thực thi hàm async getData, đợi cho đến khi Promise của fetch được giải quyết (resolve) xong thì mới gán giá trị Response thực tế vào biến response. Nếu không có await, biến response sẽ chỉ là một Promise đang ở trạng thái Pending.

2. `response.ok` — Khi nào `false`? Liệt kê 3 status codes tương ứng.

- `response.ok` là một thuộc tính boolean. Nó sẽ trả về `true` nếu HTTP status code nằm trong khoảng từ 200 đến 299 (thành công). Ngược lại, nó trả về `false` khi server phản hồi về các mã lỗi nằm ngoài khoảng này.

- 3 status codes khiến `response.ok` thành `false`:
  - 404 (Not Found — Không tìm thấy tài nguyên).

  - 500 (Internal Server Error — Lỗi hệ thống phía máy chủ).

  - 403 (Forbidden — Bị từ chối truy cập do không có quyền).

3. `response.json()` — Tại sao cần `await` lần nữa?

- Phương thức `response.json()` không trả về trực tiếp dữ liệu định dạng Object. Do thân dữ liệu (body) của phản hồi từ server truyền về theo dạng luồng dữ liệu thô (Stream), việc đọc và ép kiểu toàn bộ luồng dữ liệu này thành định dạng JSON là một tác vụ bất đồng bộ tốn thời gian.

- Vì vậy, `response.json()` trả về một Promise. Chúng ta bắt buộc phải sử dụng await lần hai để đợi quá trình parse dữ liệu hoàn tất rồi mới gán dữ liệu hoàn chỉnh vào biến data.

4. `try...catch` — Catch những lỗi gì?
   Khối `try...catch` này sẽ bắt được các nhóm lỗi sau:

- Network Error (Lỗi kết nối): Mất mạng, đứt cáp, sai domain (khiến fetch bị reject ngay lập tức).

- Lỗi HTTP status do ta tự ném (404, 500, 403...): Bản thân `fetch` không coi mã 404 hay 500 là lỗi hệ thống (nó vẫn resolve). Tuy nhiên, nhờ đoạn code `if (!response.ok) { throw new Error(...) }` mà chúng ta chủ động ném lỗi ra, do đó catch sẽ bắt được.

- JSON Parse Error (Lỗi cú pháp JSON): Khi server phản hồi thành công (mã 200) nhưng body trả về là text thuần hoặc HTML lỗi chứ không phải chuỗi chuẩn JSON. Khi đó `response.json()` sẽ ném lỗi và lọt vào khối `catch`.

### Câu A3 — Promise States

1. Sơ đồ 3 trạng thái của Promise

```text
                  ┌────────────────────────┐
                  │        PENDING         │ (Trạng thái ban đầu,
                  │   (Đang chờ xử lý)     │  chưa quyết định)
                  └───────────┬────────────┘
                              │
              ┌───────────────┴───────────────┐
              ▼                               ▼
    [Thao tác thành công]            [Thao tác thất bại / Lỗi]
    resolve(value)                   reject(error)
              │                               │
              ▼                               ▼
  ┌───────────────────────┐       ┌───────────────────────┐
  │       FULFILLED       │       │       REJECTED        │
  │ (Hoàn thành xuất sắc) │       │   (Bị từ chối/Lỗi)    │
  └───────────────────────┘       └───────────────────────┘
```

2. Callback Hell là gì?

- Callback Hell (hay còn gọi là Pyramid of Doom - Kim tự tháp hủy diệt) là hiện tượng các hàm callback bị lồng vào nhau quá nhiều tầng để xử lý các tác vụ bất đồng bộ liên tiếp (kết quả của hàm trước là đầu vào của hàm sau).
- Hậu quả làm cho cấu trúc mã nguồn bị thụt lề sâu về phía bên phải, cực kỳ khó đọc, khó bảo trì, khó debug và việc quản lý, bắt lỗi (try...catch) trở nên phức tạp.

3. Ví dụ 4 cấp Callback HellQuy trình thực hiện tuần tự: Đăng nhập $\rightarrow$ Lấy Profile $\rightarrow$ Lấy danh sách bài viết $\rightarrow$ Lấy bình luận của bài viết đầu tiên.

```javascript
// Giả lập các hàm nhận callback truyền thống
function loginUser(email, password, callback) {
  setTimeout(() => {
    callback({ userEmail: email });
  }, 1000);
}
function getUserProfile(email, callback) {
  setTimeout(() => {
    callback({ name: "Minh Duyen", age: 20 });
  }, 1000);
}
function getUserPosts(profileName, callback) {
  setTimeout(() => {
    callback(["Post 1", "Post 2", "Post 3"]);
  }, 1000);
}
function getPostComments(post, callback) {
  setTimeout(() => {
    callback(["Comment A", "Comment B"]);
  }, 1000);
}

// Thực thi chuỗi bất đồng bộ — Callback Hell (Cấp 4 lồng nhau)
loginUser("duyen@example.com", "123456", (user) => {
  console.log("Logged in:", user.userEmail);

  getUserProfile(user.userEmail, (profile) => {
    console.log("Profile fetched for:", profile.name);

    getUserPosts(profile.name, (posts) => {
      console.log("Posts found:", posts);

      getPostComments(posts[0], (comments) => {
        console.log("Comments of first post:", comments);
        // Code bắt đầu tạo thành hình mũi tên gãy khúc hướng sang phải
      });
    });
  });
});
```

4. Refactor thành Async/Await gọn gàng
   Để sử dụng được async/await, trước hết cần chuyển đổi (promisify) các hàm trên thành các hàm trả về Promise:

```javascript
const loginUserPromise = (email, password) =>
  new Promise((resolve) =>
    setTimeout(() => resolve({ userEmail: email }), 1000),
  );

const getUserProfilePromise = (email) =>
  new Promise((resolve) =>
    setTimeout(() => resolve({ name: "Minh Duyen", age: 20 }), 1000),
  );

const getUserPostsPromise = (profileName) =>
  new Promise((resolve) =>
    setTimeout(() => resolve(["Post 1", "Post 2", "Post 3"]), 1000),
  );

const getPostCommentsPromise = (post) =>
  new Promise((resolve) =>
    setTimeout(() => resolve(["Comment A", "Comment B"]), 1000),
  );

// Tiến hành xử lý tuần tự bằng Async/Await gọn gàng
async function runWorkflow() {
  try {
    const user = await loginUserPromise("duyen@example.com", "123456");
    console.log("Logged in:", user.userEmail);

    const profile = await getUserProfilePromise(user.userEmail);
    console.log("Profile fetched for:", profile.name);

    const posts = await getUserPostsPromise(profile.name);
    console.log("Posts found:", posts);

    const comments = await getPostCommentsPromise(posts[0]);
    console.log("Comments of first post:", comments);
  } catch (error) {
    console.error("Có lỗi xảy ra trong chuỗi xử lý:", error);
  }
}

runWorkflow();
```

## PHẦN C — PHÂN TÍCH

### Câu C1 — Error Handling Strategy

1. Network Errors (Mất kết nối mạng giữa chừng)

- Cách xử lý: \* Kỹ thuật: Khi mất mạng, hàm `fetch()` sẽ tự động ném ra (`throw`) một `TypeError: Failed to fetch`. Ta cần dùng khối `try...catch` để bắt lỗi này.

- Trải nghiệm người dùng (UX): Sử dụng sự kiện hệ thống `window.addEventListener('offline')` để hiển thị một thanh thông báo (Toast/Banner) thông báo "Mất kết nối Internet". Đồng thời, tạm khóa các nút bấm thanh toán hoặc gửi đơn hàng để tránh dữ liệu bị xung đột. Khi có mạng lại (`online`), tự động đồng bộ hoặc kích hoạt lại tác vụ.

2. API Errors (Server trả về mã trạng thái đặc biệt)

- Hàm `fetch()` của JavaScript không tự động nhảy vào khối `catch` khi gặp các mã lỗi HTTP như 404 hay 500 (nó vẫn tính là kết nối thành công). Ta phải tự kiểm tra thuộc tính `response.ok`.

- Lỗi 404 (Not Found): Thường xảy ra khi xem một sản phẩm đã bị xóa hoặc sai ID đường dẫn.
  - Xử lý: Điều hướng người dùng về trang lỗi 404 Custom chỉn chu hoặc hiển thị thông báo "Sản phẩm này hiện không còn tồn tại".

- Lỗi 500 (Internal Server Error): Lỗi hệ thống từ phía Backend (Database sập, lỗi code server).
  - Xử lý: Hiển thị thông báo chung chung có tính xoa dịu: "Hệ thống đang quá tải, vui lòng thử lại sau ít phút". Tuyệt đối không hiện thị lỗi thô (stack trace) của server lên giao diện Client để đảm bảo bảo mật.

- Lỗi 429 (Too Many Requests): Người dùng hoặc Bot đang spam gửi request quá nhanh (Rate Limit).
  - Xử lý: Đọc header `Retry-After` từ Server trả về (nếu có) để biết cần đợi bao nhiêu giây, sau đó vô hiệu hóa nút gửi của người dùng và hiển thị đồng hồ đếm ngược: "Bạn thao tác quá nhanh. Vui lòng đợi X giây".

3. Timeout (API phản hồi quá chậm > 10 giây)
   Để tránh ứng dụng rơi vào trạng thái chờ vô hạn khi mạng chập chờn, ta sử dụng `AbortController` tích hợp sẵn trong trình duyệt để hủy request sau một khoảng thời gian quy định.

```javascript
/**
 * Hàm fetch kèm cơ chế tự động hủy nếu quá thời gian (Timeout)
 * @param {string} url - Đường dẫn API
 * @param {number} ms - Thời gian chờ tối đa (miliseconds)
 */
async function fetchWithTimeout(url, ms = 10000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), ms);

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(id); // Xóa bộ đếm nếu fetch thành công trước thời hạn
    return response;
  } catch (error) {
    clearTimeout(id);
    if (error.name === "AbortError") {
      throw new Error(`Yêu cầu bị hủy do quá thời gian phản hồi (${ms}ms)`);
    }
    throw error;
  }
}
```

4. Retry Logic (Tự động thử lại khi lỗi kết nối)
   Đối với các lỗi mang tính tạm thời (như rớt mạng cục bộ trong 1-2 giây), việc tự động thử lại (Retry) ngầm sẽ giúp người dùng không bị gián đoạn trải nghiệm.

```javaScript
/**
 * Hàm fetch tích hợp cơ chế tự động thử lại khi gặp lỗi Network
 * @param {string} url - Đường dẫn API
 * @param {number} maxRetries - Số lần thử lại tối đa
 * @param {number} delay - Thời gian chờ giữa các lần thử lại (ms)
 */
async function fetchWithRetry(url, maxRetries = 3, delay = 1000) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            const response = await fetch(url);

            // Nếu kết nối thành công nhưng gặp lỗi Server (5xx), có thể cấu hình để retry luôn tại đây
            if (!response.ok && response.status >= 500) {
                throw new Error(`Server Error: ${response.status}`);
            }

            return await response.json(); // Thành công thì trả kết quả luôn
        } catch (error) {
            const isLastAttempt = i === maxRetries - 1;
            if (isLastAttempt) {
                throw new Error(`Thất bại sau ${maxRetries} lần thử lại. Chi tiết: ${error.message}`);
            }
            console.warn(`Lần thử thứ ${i + 1} thất bại. Đang thử lại sau ${delay}ms...`);
            // Chờ một khoảng thời gian trước khi vào vòng lặp kế tiếp
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}
```

### Câu C2 — Promise Combinators Comparison

| Method              | Khi nào resolve?                                                                                                                            | Khi nào reject?                                                                                          | Use case thực tế trong E-Commerce                                                                                                                                                                                                        |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`.all()`**        | Khi **tất cả** các Promise truyền vào đều resolve thành công.                                                                               | Chỉ cần **1** Promise đầu tiên bị reject (Cơ chế _Short-circuit_).                                       | Tải trang **Chi tiết sản phẩm**: Cần chạy song song API thông tin sản phẩm, API hình ảnh, API bảng size. Nếu 1 cái lỗi, trang không thể hiển thị đúng cấu trúc -> Hủy toàn bộ để báo lỗi trang.                                          |
| **`.allSettled()`** | Khi **tất cả** các Promise đều **đã chạy xong** (không quan tâm thành công hay thất bại). Không bao giờ rơi vào trạng thái reject tổng thể. | Không bao giờ bị reject. Trả về một mảng chứa trạng thái (`fulfilled` hoặc `rejected`) của từng Promise. | Tải dữ liệu **Dashboard / Trang chủ**: Chạy song song API Banner quảng cáo, API Khuyến mãi, API Tin tức. Cái nào lỗi thì ẩn đi hoặc báo lỗi ở Widget đó, các phần khác vẫn hiển thị bình thường.                                         |
| **`.race()`**       | Khi có **1 Promise đầu tiên** trong mảng hoàn thành (Dù thành công hay thất bại).                                                           | Khi có **1 Promise đầu tiên** trong mảng bị thất bại trước tất cả các cái còn lại.                       | **Cơ chế Timeout cho Request**: Đua giữa API lấy dữ liệu sản phẩm với một Promise hẹn giờ `setTimeout` ném ra lỗi. Nếu API chạy quá 5 giây không xong, Promise hẹn giờ sẽ "thắng" và ném lỗi timeout.                                    |
| **`.any()`**        | Khi có **1 Promise đầu tiên** trong mảng resolve **thành công**.                                                                            | Khi **tất cả** các Promise trong mảng đều bị reject. Trả về lỗi `AggregateError`.                        | **Lấy dữ liệu từ nguồn dự phòng (Fallback CDN)**: Gọi API lấy danh sách sản phẩm từ 3 máy chủ CDN khác nhau (Singapore, Việt Nam, HongKong). Chỉ cần 1 server phản hồi nhanh nhất và thành công là lấy luôn, mặc kệ các server khác lỗi. |

**Ví dụ mã nguồn kịch bản thực tế (E-Commerce Scenario)**

1. Kịch bản `Promise.all`: Tải trọn gói thông tin đơn hàng cần thanh toán

```javascript
async function loadCheckoutPage(orderId) {
  try {
    // Bắt buộc cả 3 luồng dữ liệu phải có đủ thì mới cho người dùng nhấn "Thanh toán"
    const [orderDetail, userWallet, shippingFee] = await Promise.all([
      fetch(`/api/order/${orderId}`).then((r) => r.json()),
      fetch(`/api/user/wallet`).then((r) => r.json()),
      fetch(`/api/shipping/calculate`).then((r) => r.json()),
    ]);

    console.log("Đủ điều kiện thanh toán:", {
      orderDetail,
      userWallet,
      shippingFee,
    });
  } catch (error) {
    // Chỉ cần 1 trong 3 API trên sập, quá trình checkout bị chặn đứng hoàn toàn để tránh rủi ro
    console.error(
      "Không thể tiến hành thanh toán do thiếu dữ liệu hệ thống:",
      error,
    );
  }
}
```

2. Kịch bản `Promise.allSettled`: Tải các khối thành phần trang cá nhân (Profile Dashboard)

```javascript
async function loadUserProfile() {
  const promises = [
    fetch("/api/user/rewards").then((r) => r.json()), // Điểm thưởng tích lũy
    fetch("/api/user/voucher-wallet").then((r) => r.json()), // Kho Voucher cá nhân
    fetch("/api/user/history-orders").then((r) => r.json()), // Lịch sử mua hàng
  ];

  const results = await Promise.allSettled(promises);

  // Xử lý hiển thị độc lập, lỗi phần nào chặn phần đó, không ảnh hưởng toàn trang
  if (results[0].status === "fulfilled") renderRewards(results[0].value);
  else renderRewardsError("Không thể tải điểm thưởng");

  if (results[1].status === "fulfilled") renderVouchers(results[1].value);
  else renderVouchersError("Không thể tải ví voucher");

  if (results[2].status === "fulfilled") renderOrderHistory(results[2].value);
  else renderOrderHistoryError("Không thể tải lịch sử mua hàng");
}
```

3. Kịch bản `Promise.race`: Giới hạn thời gian phản hồi của cổng thanh toán (Gateway Timeout)

```javascript
function timeoutPromise(ms) {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Cổng thanh toán phản hồi quá lâu")), ms),
  );
}

async function processPayment(paymentData) {
  try {
    // Đua giữa API thanh toán thực tế và một Promise đếm ngược 8 giây
    const quickPaymentResponse = await Promise.race([
      fetch("/api/payment/execute", {
        method: "POST",
        body: JSON.stringify(paymentData),
      }).then((r) => r.json()),
      timeoutPromise(8000),
    ]);

    alert("Thanh toán thành công!");
  } catch (error) {
    // Nếu quá 8 giây mà API chưa xong, timeoutPromise thắng cuộc và nhảy vào đây
    alert(`Giao dịch thất bại: ${error.message}`);
  }
}
```

4. Kịch bản `Promise.any`: Tải danh sách sản phẩm từ các Server phân phối (Multi-Region CDN)

```javascript
async function fetchProductsFromFastestCDN() {
  const cdnNodes = [
    "https://cdn-vietnam.example.com/products",
    "https://cdn-singapore.example.com/products",
    "https://cdn-tokyo.example.com/products",
  ];

  try {
    // Chỉ cần node CDN nào chạy nhanh nhất và trả về 200 OK trước là lấy ngay lập tức
    const fastestData = await Promise.any(
      cdnNodes.map((url) =>
        fetch(url).then((res) => {
          if (!res.ok) throw new Error("Node sập");
          return res.json();
        }),
      ),
    );
    console.log("Đã tải dữ liệu từ CDN phản hồi nhanh nhất:", fastestData);
  } catch (aggregateError) {
    // Chỉ lọt vào đây khi toàn bộ tất cả các node CDN đồng loạt bị sập hoàn toàn
    console.error(
      "Tất cả các nguồn dữ liệu CDN đều không phản hồi:",
      aggregateError.errors,
    );
  }
}
```
