# 📋 PHIẾU BÀI TẬP 08
# **JAVASCRIPT FUNCTIONS, ARRAYS & OBJECTS**

## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 — Function Declaration vs Expression vs Arrow

#### Cách 1: Function Declaration (Khai báo hàm truyền thống)
```javascript
function tinhThueBaoHiem(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return {
        thue: thue,
        thuc_nhan: luong - thue
    };
}
```

#### Cách 2: Function Expression (Biểu thức hàm - Gán vào biến)

```javascript
const tinhThueBaoHiem = function(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return {
        thue: thue,
        thuc_nhan: luong - thue
    };
};
```

#### Cách 3: Arrow Function (Hàm mũi tên - Cú pháp hiện đại)

Dạng đầy đủ
```javascript
const tinhThueBaoHiem = (luong) => {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return { thue, thuc_nhan: luong - thue };
};
```
Dạng rút gọn
```javascript
const tinhThueBaoHiem = luong => ({
    thue: luong > 11000000 ? luong * 0.1 : 0,
    thuc_nhan: luong - (luong > 11000000 ? luong * 0.1 : 0)
});
```

#### Giải thích về Hoisting giữa 3 cách
- Có sự khác biệt rất lớn về Hoisting giữa cách 1 và hai cách còn lại:

    - Function Declaration (Cách 1): CÓ HOISTING. Trình biên dịch JavaScript sẽ tự động "đưa" định nghĩa của hàm lên đầu scope trước khi chạy code. Do đó, bạn có thể gọi hàm TRƯỚC khi khai báo nó trong file.

    - Function Expression & Arrow Function (Cách 2 & 3): KHÔNG CÓ HOISTING (khi đi kèm với `const` hoặc `let`). Biến chứa hàm chỉ được khởi tạo khi dòng code chạy đến nó. Do đó, bạn bắt buộc phải khai báo hàm TRƯỚC khi sử dụng.
- Ví dụ: 
    - Trường hợp dùng Function Declaration(Chạy thành công)
    ```javascript
    console.log(tinhThueBaoHiem(15000000)); 
    function tinhThueBaoHiem(luong) {
        const thue = luong > 11000000 ? luong * 0.1 : 0;
        return { thue, thuc_nhan: luong - thue };
    }
    ```

    - Trường hợp dùng Function Expression hoặc Arrow Function (Bị lỗi):
    ```javascript
    console.log(tinhThueBaoHiem(15000000)); 
    const tinhThueBaoHiem = (luong) => {
        const thue = luong > 11000000 ? luong * 0.1 : 0;
        return { thue, thuc_nhan: luong - thue };
    };
    ```
### Câu A2 — Scope & Closure

1. Dự đoán Output

#### Đoạn code 1:
```javaScript
console.log(c.increment());  // 1
console.log(c.increment());  // 2
console.log(c.increment());  // 3
console.log(c.decrement());  // 2
console.log(c.getCount());   // 2
```

#### Đoạn code 2:
```javaScript
// Output xuất hiện sau 100ms:
var: 3
var: 3
var: 3

// Output xuất hiện sau 200ms:
let: 0
let: 1
let: 2
```

2. Giải thích chi tiết
- Tại Đoạn 1: Sức mạnh của Closure
    - Hàm `counter()` tạo ra một vùng nhớ riêng cho biến `count = 0`. Khi hàm này trả về một object chứa 3 phương thức (`increment`, `decrement`, `getCount`), cả 3 hàm con này đều tạo thành các Closure.

    - Chúng cùng "găm" và dùng chung một tham chiếu đến biến `count` của scope cha, ngay cả khi hàm `counter()` đã chạy xong hoàn toàn. Do đó, giá trị của `count` được lưu giữ liên tục và cập nhật một cách nhất quán qua từng lời gọi hàm.

- Tại Đoạn 2: Sự khác nhau giữa `var` và `let` trong vòng lặp bất đồng bộ
    - Sự khác biệt cốt lõi nằm ở Phạm vi biến (Scope) của từ khóa `var` và `let` khi kết hợp với một tác vụ bất đồng bộ (`setTimeout`).

- Vòng lặp thứ nhất dùng `var` (In ra ba số 3)
    - Cơ chế hoạt động: Từ khóa `var` không có Block Scope (phạm vi khối lệnh `{}`) mà chỉ có Function/Global Scope. Do đó, xuyên suốt toàn bộ vòng lặp `for`, JavaScript chỉ khởi tạo duy nhất 1 biến `i` nằm ở scope cha.

    - Vấn đề bất đồng bộ: Vòng lặp `for`chạy với tốc độ cực nhanh, biến `i` tăng dần từ `0 -> 1 -> 2 -> 3` (khi `i = 3`, điều kiện lặp sai và dừng lại). Trong lúc đó, 3 hàm `setTimeout` chưa hề được kích hoạt mà chỉ đang xếp hàng chờ (100ms).

    - Kết quả: Khi hết 100ms, các hàm `callback () => console.log("var:", i)` đồng loạt thực thi. Do tất cả chúng đều trỏ chung vào duy nhất 1 biến `i` ở scope cha (lúc này đã mang giá trị `3`), kết quả in ra là cả 3 lần đều là `var: 3`.

- Vòng lặp thứ hai dùng `let` (In ra 0, 1, 2)
    - Cơ chế hoạt động: Từ khóa `let` hỗ trợ Block Scope nghiêm ngặt. Tại mỗi lượt lặp, JavaScript sẽ tự động tạo ra một biến `j` hoàn toàn mới nằm trong một block scope độc lập của lượt lặp đó.

    - Sự kết hợp với Closure:
        - Ở lượt lặp đầu tiên, hàm  `setTimeout` thứ nhất tạo ra một closure và "chụp" lại biến `j` riêng của lượt đó (đang có giá trị là 0).

        - Ở lượt lặp thứ hai, hàm `setTimeout` thứ hai chụp lại một biến `j` mới khác (đang có giá trị là 1).

        - Tương tự với lượt lặp cuối cùng.

    - Kết quả: Khi hết 200ms, các hàm callback chạy và gọi lại đúng biến `j` mà nó đã tự đóng gói và lưu giữ trong scope của riêng mình từ trước, tạo ra output tuần tự, chính xác: `let: 0`, `let: 1`, `let: 2` .

### Câu A3 — Array Methods

1. Lấy các số chẵn
```javaScript
const soChan = nums.filter(n => n % 2 === 0);
```
2. Nhân mỗi số với 3
```javaScript
const nhanBa = nums.map(n => n * 3);
```
3. Tính tổng tất cả
```javaScript
const tong = nums.reduce((sum, n) => sum + n, 0);
```
4. Tìm số đầu tiên > 7
```javaScript
const dauTienLonHonBay = nums.find(n => n > 7);
```
5. Kiểm tra CÓ số > 10 không
```javaScript
const coSoLonHonMuoi = nums.some(n => n > 10);
```
6. Kiểm tra TẤT CẢ đều > 0
```javaScript
const tatCaLonHonKhong = nums.every(n => n > 0);
```
7. Tạo mảng "Số X là [chẵn/lẻ]"
```javaScript
const chuoiChanLe = nums.map(n => `Số ${n} là ${n % 2 === 0 ? "chẵn" : "lẻ"}`);
```
8. Đảo ngược mảng (không làm thay đổi/mutate mảng gốc)
Sử dụng toán tử Spread ... để copy mảng trước rồi mới đảo ngược nhằm đảm bảo tính Immutable Update như bài học yêu cầu:

```javaScript
const daoNguoc = [...nums].reverse();
```

### Câu A4 — Object Destructuring & Spread

```javascript
// Destructuring
console.log(name, price, ram, color);  // iPhone 16 25990000 8 Titan
console.log(specs);                     // Lỗi: ReferenceError: specs is not defined

// Spread
console.log(updated.price);            // 23990000
console.log(updated.sale);             // true
console.log(product.price);            // 25990000 (Gốc KHÔNG đổi)

// Spread gotcha
console.log(product.specs.ram);        // 16 (Bị thay đổi theo!)
```

## PHẦN C — SUY LUẬN 

### Câu C1 — Refactor Code
```javascript
const processOrders = (orders) => 
    orders
        .filter(({ status, total }) => status === "completed" && total > 100000)
        .map(({ id, customer, total }) => ({
            id, customer, total,
            discount: total * 0.1,
            finalTotal: total * 0.9
        }))
        .sort((a, b) => b.finalTotal - a.finalTotal);
```
 
### Câu C2 — Thiết kế API

```javascript
const miniArray = {
    map(arr, fn) {
        const result = [];

        for (let i = 0; i < arr.length; i++) {
            result[result.length] = fn(arr[i], i, arr);
        }

        return result;
    },

    filter(arr, fn) {
        const result = [];

        for (let i = 0; i < arr.length; i++) {
            if (fn(arr[i], i, arr)) {
                result[result.length] = arr[i];
            }
        }

        return result;
    },

    reduce(arr, fn, initialValue) {
        let accumulator = initialValue;
        let startIndex = 0;

        // Nếu không truyền initialValue
        if (accumulator === undefined) {
            accumulator = arr[0];
            startIndex = 1;
        }

        for (let i = startIndex; i < arr.length; i++) {
            accumulator = fn(accumulator, arr[i], i, arr);
        }

        return accumulator;
    }
};

console.log(miniArray.map([1,2,3], x => x * 2));
// → [2,4,6]

console.log(miniArray.filter([1,2,3,4], x => x > 2));
// → [3,4]

console.log(miniArray.reduce([1,2,3,4], (a,b) => a+b, 0));
// → 10
```

