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

## PHẦN C — DEBUG & PHÂN TÍCH

### Câu C1 — Debug DOM Code

Danh sách lỗi đã sửa (ít nhất 7 lỗi)
1. Sai event `"onclick"`
```javascript
addEventListener("onclick", ...)
```

→ phải là:
```javascript
addEventListener("click", ...)
```

2. Gán lại cho const
```javascript
countDisplay = count;
```

`countDisplay` là `const` nên không thể gán lại.

→ đúng:
```javascipt
countDisplay.textContent = count;
```

3. Dùng innerHTML để hiển thị số
```javascipt
countDisplay.innerHTML = count;
```

Nên dùng:
```javascipt
countDisplay.textContent = count;
```
an toàn và phù hợp hơn.

4. `historyList.innerHTML = null`
```javascipt
historyList.innerHTML = null;
```

→ nên là:
```javascipt
historyList.innerHTML = "";
```

5. Sai khi remove item
```javascipt
item.remove;
```

Thiếu `()`.
→ đúng:
```javascipt
item.remove();
```

6. Không load lại history từ `localStorage`
Code chỉ load `count` mà không load history.

→ thêm:
```javascipt
historyList.innerHTML = localStorage.getItem("history") || "";
```

7. count lấy từ `localStorage` là `string`
```javascript
count = localStorage.getItem("count");
```

→ cần ép kiểu:
```javascript
count = Number(localStorage.getItem("count")) || 0;
```

8. Các `<li>` load từ `localStorage` bị mất event click
Sau khi reload trang, click vào history sẽ không xóa được.

→ cần gắn lại event:
```javascript
items.forEach(item => {
    item.addEventListener("click", function () {
        deleteHistory(this);
    });
});
```

9. `append()` có thể gây không tương thích trên trình duyệt cũ
```javascript
historyList.append(li);
```

→ ổn định hơn:
```javascript
historyList.appendChild(li);
```

10. Không kiểm tra giá trị null khi localStorage rỗng
Nếu chưa có dữ liệu sẽ bị `null`.

→ dùng:
```javascript
|| ""
```
hoặc
```javascript
|| 0
```
### Câu C2 — Performance

1. Vì sao bind event lên 1000 elements riêng lẻ là BAD PRACTICE?

#### Ví dụ BAD PRACTICE:

```javascript
const items = document.querySelectorAll(".item");

items.forEach(item => {
    item.addEventListener("click", () => {
        console.log(item.textContent);
    });
});
```

#### Nếu có 1000 elements thì sẽ tạo:

* 1000 event listeners
* 1000 function objects trong memory
* Browser phải quản lý rất nhiều listeners

#### Hậu quả:

* Tốn memory
* Mỗi listener chiếm bộ nhớ riêng.
* Giảm performance
* Browser phải xử lý nhiều listeners khi event xảy ra.
* Khó maintain

#### Nếu thêm element động sau này:

```javascript
const newDiv = document.createElement("div");
```

thì phải bind event lại cho element mới.

#### Event Delegation giải quyết thế nào?

Thay vì gắn event cho từng element:

→ chỉ gắn 1 event lên parent.

Ví dụ:

```javascript
document.body.addEventListener("click", function(event) {

    if (event.target.classList.contains("item")) {
        console.log(event.target.textContent);
    }

});
```

##### Cơ chế hoạt động

Event trong DOM có cơ chế:

```text
Bubbling
```

Event từ element con sẽ nổi lên (bubble) tới parent.

Ví dụ:

```text
div → body → html → document
```

Nên chỉ cần listener ở parent là đủ.

##### Ưu điểm của Event Delegation

###### ✅ Ít memory hơn

Chỉ có:

```javascript
1 listener
```

thay vì 1000 listeners.

---

###### ✅ Performance tốt hơn

Browser xử lý ít event handlers hơn.

---

###### ✅ Hỗ trợ dynamic elements

Element thêm mới vẫn hoạt động:

```javascript
const div = document.createElement("div");
div.className = "item";
document.body.appendChild(div);
```

Không cần bind lại event.

2. Refactor bằng DocumentFragment

#### Code gốc (BAD)

```javascript
for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;

    document.body.appendChild(div);
}
```

Vấn đề:

```javascript
appendChild()
```

được gọi 1000 lần.

Mỗi lần append:

* DOM thay đổi
* Browser có thể:

  * recalculation style
  * layout
  * repaint
  * reflow

=> rất chậm.

#### Refactor dùng DocumentFragment

```javascript
const fragment = document.createDocumentFragment();

for (let i = 0; i < 1000; i++) {

    const div = document.createElement("div");
    div.textContent = `Item ${i}`;

    fragment.appendChild(div);
}

document.body.appendChild(fragment);
```

3. Tại sao nhanh hơn?

#### DocumentFragment là DOM ảo tạm thời

Các element được thêm vào:

```javascript
fragment.appendChild(div)
```

KHÔNG render ngay trên page.

Browser chưa cần:

* repaint
* reflow
* layout calculation

---

#### Chỉ render 1 lần duy nhất

Khi:

```javascript
document.body.appendChild(fragment);
```

toàn bộ 1000 elements được insert cùng lúc.

→ chỉ gây:

```text
1 reflow
1 repaint
```

thay vì:

```text
1000 reflows
1000 repaints
```

#### Kết luận

##### Event Delegation

* Giảm số lượng listeners
* Tiết kiệm memory
* Tăng performance
* Hỗ trợ dynamic elements

#####  DocumentFragment

* Tránh nhiều lần reflow/repaint
* Batch DOM updates
* Render nhanh hơn đáng kể khi thêm nhiều elements
