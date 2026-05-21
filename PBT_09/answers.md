# 📋 PHIẾU BÀI TẬP 09
# **DOM MANIPULATION & EVENTS**

## PHẦN A — KIỂM TRA ĐỌC HIỂU 

### Câu A1 — DOM Tree

1. DOM Tree cho HTML
```text
Document
└── html
    └── body
        └── div#app
            ├── header
            │   ├── h1
            │   │   └── "Todo App"
            │   └── nav
            │       ├── a.active
            │       │   └── "All"
            │       ├── a
            │       │   └── "Active"
            │       └── a
            │           └── "Completed"
            │
            └── main
                ├── form#todoForm
                │   ├── input#todoInput
                │   └── button[type="submit"]
                │       └── "Add"
                │
                └── ul#todoList
                    ├── li.todo-item
                    │   └── "Learn HTML"
                    │
                    └── li.todo-item.completed
                        └── "Learn CSS"
```

2. Các câu lệnh `querySelector`
```javascript
// Chọn thẻ <h1>
document.querySelector("h1");

// Chọn input trong form
document.querySelector("#todoForm input");

// Chọn tất cả .todo-item
document.querySelectorAll(".todo-item");

// Chọn link đang active
document.querySelector("a.active");

// Chọn <li> đầu tiên trong #todoList
document.querySelector("#todoList li");

// hoặc
document.querySelector("#todoList li:first-child");

// Chọn tất cả <a> bên trong <nav>
document.querySelectorAll("nav a");
```

### Câu A2 - innerHTML vs textContent


1. Sự khác nhau giữa `innerHTML` và `textContent`

| `innerHTML`                         | `textContent`          |
| ----------------------------------- | ---------------------- |
| Đọc/ghi nội dung có chứa HTML       | Đọc/ghi text thuần     |
| Browser sẽ parse HTML tags          | Không parse HTML       |
| Có thể render thẻ HTML              | Hiển thị nguyên văn    |
| Nguy cơ XSS nếu dùng với user input | An toàn hơn            |
| Dùng khi cần render HTML            | Dùng khi hiển thị text |

---

2. Ví dụ sử dụng

#### a) Dùng `innerHTML`

Khi muốn chèn HTML vào trang:

```javascript
const box = document.querySelector("#box");

box.innerHTML = "<h2>Hello DOM</h2>";
```

Kết quả:

```html
<h2>Hello DOM</h2>
```

→ Browser tạo thật sự thẻ `<h2>`.


#### b) Dùng `textContent`

Khi chỉ muốn hiển thị text:

```javascript
const box = document.querySelector("#box");

box.textContent = "<h2>Hello DOM</h2>";
```

Kết quả hiển thị trên trang:

```text
<h2>Hello DOM</h2>
```

→ Không tạo HTML, chỉ hiện text.

---

3. Câu hỏi bảo mật — XSS

#### XSS là gì?

XSS (Cross-Site Scripting) là lỗ hổng cho phép hacker chèn JavaScript độc hại vào website.

Nguyên nhân:

* `innerHTML` sẽ parse và chạy HTML/JS mà user nhập vào.
* Nếu không kiểm tra dữ liệu user → hacker có thể inject script.

#### Ví dụ nguy hiểm

User nhập:

```html
<img src=x onerror="alert('Hacked!')">
```

Code:

```javascript
const userInput = document.querySelector("#search").value;

document.querySelector("#result").innerHTML = userInput;
```

Khi browser render:

```html
<img src=x onerror="alert('Hacked!')">
```

* `src=x` lỗi
* Event `onerror` chạy
* JavaScript `alert('Hacked!')` được thực thi

→ Đây chính là XSS.

---

4. Cách sửa an toàn

Dùng `textContent` thay vì `innerHTML`:

```javascript
const userInput = document.querySelector("#search").value;

document.querySelector("#result").textContent = userInput;
```

Kết quả:

* Browser chỉ hiển thị text
* Không chạy script
* Không parse HTML

5. Kết luận

* `innerHTML`:

  * Render HTML
  * Mạnh nhưng nguy hiểm
  * Không dùng trực tiếp với user input

* `textContent`:

  * Chỉ xử lý text
  * An toàn hơn
  * Nên ưu tiên dùng cho dữ liệu người dùng nhập

### Câu A3 — Event Bubbling

1. Khi click vào button

HTML:

```html
<div id="outer">
    <div id="inner">
        <button id="btn">Click me</button>
    </div>
</div>
```

JavaScript:

```javascript
document.querySelector("#outer").addEventListener("click", () => {
    console.log("OUTER");
});

document.querySelector("#inner").addEventListener("click", () => {
    console.log("INNER");
});

document.querySelector("#btn").addEventListener("click", (e) => {
    console.log("BUTTON");
});
```


#### Output:

```text
BUTTON
INNER
OUTER
```


#### Giải thích

Khi click vào `<button>`:

1. Event xảy ra trên button trước
2. Sau đó event "bubble" lên cha gần nhất (`#inner`)
3. Rồi tiếp tục bubble lên (`#outer`)

Đây gọi là **Event Bubbling**.

Luồng:

```text
button → inner → outer
```

2. Nếu bỏ comment `e.stopPropagation()`

Code:

```javascript
document.querySelector("#btn").addEventListener("click", (e) => {
    console.log("BUTTON");
    e.stopPropagation();
});
```

---

#### Output mới:

```text
BUTTON
```

---

#### Giải thích

`e.stopPropagation()`:

* Chặn event bubbling
* Event không truyền lên cha nữa

Nên:

* `BUTTON` chạy
* `INNER` và `OUTER` không chạy

---

3. Kết luận

| Không dùng `stopPropagation()` | Có dùng `stopPropagation()` |
| ------------------------------ | --------------------------- |
| BUTTON → INNER → OUTER         | BUTTON                      |
| Event bubble lên cha           | Event bị chặn               |

