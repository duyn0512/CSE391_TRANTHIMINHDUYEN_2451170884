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
    new Promise(resolve => setTimeout(() => resolve({ userEmail: email }), 1000));

const getUserProfilePromise = (email) => 
    new Promise(resolve => setTimeout(() => resolve({ name: "Minh Duyen", age: 20 }), 1000));

const getUserPostsPromise = (profileName) => 
    new Promise(resolve => setTimeout(() => resolve(["Post 1", "Post 2", "Post 3"]), 1000));

const getPostCommentsPromise = (post) => 
    new Promise(resolve => setTimeout(() => resolve(["Comment A", "Comment B"]), 1000));

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