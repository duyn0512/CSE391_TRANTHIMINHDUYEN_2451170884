# 📋 PHIẾU BÀI TẬP 07
# **JAVASCRIPT BASICS — Variables, Data Types, Control Structures**

## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 — var / let / const

#### **Đoạn 1**
```javascript
console.log(x);
var x = 5;
```
- Dự đoán Output: `undefined`

- Giải thích cơ chế: Biến khai báo bằng `var` có cơ chế Hoisting (nâng biến). Trình biên dịch sẽ tự động đẩy phần khai báo `var x`; lên đầu phạm vi nhưng giữ nguyên giá trị gán ở vị trí cũ, khiến hoisting trả về giá trị mặc định là `undefined` (đây là một bẫy của var).

#### **Đoạn 2**
```javaScript
console.log(y);
let y = 10;
```

- Dự đoán Output: `ReferenceError: Cannot access 'y' before initialization`

- Giải thích cơ chế: Biến khai báo bằng `let` không dùng được trước khi khai báo. Khoảng không gian từ đầu khối cho đến dòng khai báo biến được gọi là Temporal Dead Zone (TDZ) - Vùng chết tạm thời. Cố tình truy cập biến trong vùng này sẽ kích hoạt lỗi `R`eferenceError`.

#### **Đoạn 3**
```javaScript
const z = 15;
z = 20;
console.log(z);
```

- Dự đoán Output: `TypeError: Assignment to constant variable.`

- Giải thích cơ chế: Từ khóa `const` dùng để khai báo hằng số có giá trị không thay đổi (ngăn chặn hành vi reassign - gán lại giá trị mới). Việc viết lệnh `z = 20` sẽ lập tức kích hoạt lỗi `TypeError` và hệ thống sẽ dừng chương trình ngay tại dòng gán lỗi.

#### **Đoạn 4**
```javaScript
const arr = [1, 2, 3];
arr.push(4);
console.log(arr);
```

- Dự đoán Output: `[1, 2, 3, 4]`

- Giải thích cơ chế: Đây là một đặc tính quan trọng cần lưu ý: `cons`t với Object/Array chỉ ngăn chặn việc đổi reference (địa chỉ ô nhớ) chứ CÓ THỂ thay đổi nội dung bên trong (mutate). Hành động `arr.push(4)` chỉ chỉnh sửa các phần tử của mảng chứ không gán lại mảng mới hoàn toàn, nên code chạy bình thường.

#### **Đoạn 5**
```javaScript
let a = 1;
{
    let a = 2;
    console.log("Trong block:", a);
}
console.log("Ngoài block:", a);
```

- Dự đoán Output:
    - Plaintext
    - Trong block: 2
    - Ngoài block: 1

- Giải thích cơ chế: Từ khóa `let` tuân thủ nghiêm ngặt phạm vi khối — Block Scope `{}`. Biến `let a = 2` nằm bên trong cặp dấu `{}` hoàn toàn độc lập và cô lập với biến `let a = 1` ở ngoài. Khi thoát khỏi khối lệnh `{}` đó, biến bên trong bị giải phóng và lệnh log ngoài cùng sẽ lấy giá trị của biến `a` ở outer scope (bằng 1).

#### Bảng so sánh Dự đoán vs Kết quả thực tế

| Đoạn code | Dự đoán Output | Kết quả chạy thực tế (Node.js) | Giải thích bản chất (So sánh) |
| :--- | :--- | :--- | :--- |
| **Đoạn 1**:<br>`var x = 5` | `undefined` | `undefined` | **Khớp dữ liệu**. Biến `var` bị ảnh hưởng bởi cơ chế **Hoisting**, đẩy phần khai báo lên đầu phạm vi nên khi log trước khi gán sẽ ra `undefined`. |
| **Đoạn 2**:<br>`let y = 10` | `ReferenceError` | `ReferenceError: Cannot access 'y' before initialization` | **Khớp dữ liệu**. Biến `let` nằm trong **Temporal Dead Zone (TDZ)** nên không thể truy cập trước dòng khai báo. |
| **Đoạn 3**:<br>`const z = 15` | `TypeError` | `TypeError: Assignment to constant variable.` | **Khớp dữ liệu**. `const` là hằng số, cấm hành vi gán lại giá trị (`reassign`) bằng dấu `=`. |
| **Đoạn 4**:<br>`const arr = [...]` | `[1, 2, 3, 4]` | `[1, 2, 3, 4]` | **Khớp dữ liệu**. `const` bảo vệ địa chỉ ô nhớ (reference) chứ không cấm chỉnh sửa nội dung (mutate) bên trong Array. |
| **Đoạn 5**:<br>`let a = 1; {let a = 2}` | `Trong: 2`<br>`Ngoài: 1` | `Trong block: 2`<br>`Ngoài block: 1` | **Khớp dữ liệu**. `let` có **Block Scope `{}`**. Biến `a` ở trong độc lập hoàn toàn với biến `a` ở ngoài block. |

### Câu A2 — Data Types & Coercion

1. Dự đoán kết quả Output
```javaScript
console.log(typeof null);              // "object"
console.log(typeof undefined);         // "undefined"
console.log(typeof NaN);              // "number"
console.log("5" + 3);                 // "53"
console.log("5" - 3);                 // 2
console.log("5" * "3");              // 15
console.log(true + true);            // 2
console.log([] + []);                // "" (chuỗi rỗng)
console.log([] + {});                // "[object Object]"
console.log({} + []);                // "[object Object](hoặc 0 tùy môi trường console)
```

2. Giải thích tại sao `"5" + 3` và `"5" - 3` cho kết quả khác nhau

-  Trình tự xử lý của toán tử cộng (`+`):
    - Toán tử `+` trong JavaScript quá tải (overloaded) với hai vai trò: **Phép cộng số học** VÀ **Phép nối chuỗi (String concatenation)**.
    - **Quy tắc ưu tiên:** Nếu **một trong hai** vế của phép cộng `+` là một `string`, JavaScript sẽ ưu tiên biến vế còn lại thành `string` rồi thực hiện hành vi nối chuỗi.
    - Trong biểu thức `"5" + 3`, do vế trái là chuỗi `"5"` nên số `3` ở vế phải lập tức bị ép kiểu thành chuỗi `"3"`. Kết quả là chuỗi `"53"` được sinh ra bằng cách ghép hai chuỗi lại với nhau.

- Trình tự xử lý của toán tử trừ (`-`):
    - Khác hoàn toàn với toán tử cộng, toán tử trừ `-` **CHỈ có một vai trò duy nhất** là toán tử toán học (trừ hai số). Nó hoàn toàn không có khái niệm "trừ chuỗi văn bản".
    - **Quy tắc ưu tiên:** Khi gặp toán tử `-`, JavaScript bắt buộc phải tìm cách ép kiểu cả hai vế về dạng số (`number`) để thực hiện phép toán.
    -  Trong biểu thức `"5" - 3`, chuỗi `"5"` được tự động chuyển đổi một cách tường minh thành số `5`. Kết quả phép tính trở thành phép toán số học thông thường: `5 - 3 = 2`.
