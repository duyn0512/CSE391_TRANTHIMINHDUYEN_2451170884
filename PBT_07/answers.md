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