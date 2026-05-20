console.log("--- Đoạn 1 ---");
console.log(x); 
var x = 5;

console.log("\n--- Đoạn 2 ---");
try {
    console.log(y);
    let y = 10;
} catch (err) {
    console.log("Lỗi Đoạn 2:", err.message); 
}

console.log("\n--- Đoạn 3 ---");
try {
    const z = 15;
    z = 20;
    console.log(z);
} catch (err) {
    console.log("Lỗi Đoạn 3:", err.message); 
}

console.log("\n--- Đoạn 4 ---");
const arr = [1, 2, 3];
arr.push(4);
console.log(arr);

console.log("\n--- Đoạn 5 ---");
let a = 1;
{
    let a = 2;
    console.log("Trong block:", a); 
}
console.log("Ngoài block:", a);