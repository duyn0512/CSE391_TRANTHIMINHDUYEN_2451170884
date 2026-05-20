const cart = [
    { name: "Phở bò", price: 65000, quantity: 2 },
    { name: "Trà đá", price: 5000, quantity: 3 },
    { name: "Bún chả", price: 55000, quantity: 1 }
];

const hasTip = true; 
let dateStr = new Date() + ""; 
let isWednesday = false;

if (dateStr[0] === "W" && dateStr[1] === "e" && dateStr[2] === "d") {
    isWednesday = true;
}

let subTotal = 0; 
for (let i = 0; i < cart.length; i++) {
    subTotal += cart[i].price * cart[i].quantity;
}

let discountPercent = 0;
if (subTotal > 1000000) {
    discountPercent = 15;
} else if (subTotal > 500000) {
    discountPercent = 10;
}

if (isWednesday) {
    discountPercent += 5;
}

let discountAmount = (subTotal * discountPercent) / 100;
discountAmount = discountAmount - (discountAmount % 1); 

let vatAmount = (subTotal * 8) / 100;
vatAmount = vatAmount - (vatAmount % 1);

let tipAmount = 0;
if (hasTip) {
    tipAmount = (subTotal * 5) / 100;
    tipAmount = tipAmount - (tipAmount % 1);
}

let totalPayment = subTotal - discountAmount + vatAmount + tipAmount;

function formatMoney(num) {
    if (num === 0) return "0";
    let str = "" + num;
    let result = "";
    let count = 0;

    for (let i = str.length - 1; i >= 0; i--) {
        if (count === 3) {
            result = "." + result;
            count = 0;
        }
        result = str[i] + result;
        count++;
    }
    return result;
}

function fillSpaces(text, totalLength, alignRight) {
    let textStr = "" + text;
    let spacesNeeded = totalLength - textStr.length;
    let spaces = "";
    
    for (let i = 0; i < spacesNeeded; i++) {
        spaces += " ";
    }
    
    if (alignRight) {
        return spaces + textStr;
    } else {
        return textStr + spaces;
    }
}

console.log("╔══════════════════════════════════════╗");
console.log("║           HÓA ĐƠN NHÀ HÀNG           ║");
console.log("╠══════════════════════════════════════╣");

for (let i = 0; i < cart.length; i++) {
    let item = cart[i];
    let itemTotal = item.price * item.quantity;
    let priceK = (item.price / 1000) + "k";
    let totalK = (itemTotal / 1000) + "k";
    
    let part1 = (i + 1) + ". " + item.name;
    part1 = fillSpaces(part1, 15, false);
    
    let part2 = "x" + item.quantity;
    part2 = fillSpaces(part2, 5, false);
    
    let part3 = "@" + priceK;
    part3 = fillSpaces(part3, 7, false);
    
    let part4 = "= " + totalK;
    part4 = fillSpaces(part4, 7, true);
    
    console.log("║ " + part1 + part2 + part3 + part4 + "  ║");
}

console.log("╠══════════════════════════════════════╣");

let txtSub = formatMoney(subTotal) + "đ";
let txtDisc = formatMoney(discountAmount) + "đ";
let txtVat = formatMoney(vatAmount) + "đ";
let txtTip = formatMoney(tipAmount) + "đ";
let txtPay = formatMoney(totalPayment) + "đ";

console.log("║ Tổng cộng:      " + fillSpaces(txtSub, 20, true) + " ║");
console.log("║ Giảm giá (" + fillSpaces(discountPercent, 2, true) + "%):  " + fillSpaces(txtDisc, 20, true) + " ║");
console.log("║ VAT (8%):       " + fillSpaces(txtVat, 20, true) + " ║");
console.log("║ Tip (" + (hasTip ? "5" : "0") + "%):        " + fillSpaces(txtTip, 20, true) + " ║");

console.log("╠══════════════════════════════════════╣");
console.log("║ THANH TOÁN:     " + fillSpaces(txtPay, 20, true) + " ║");
console.log("╚══════════════════════════════════════╝");