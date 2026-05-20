console.log("=== VERSION 1: CLASSIC FIZZBUZZ ===");

for (let i = 1; i <= 100; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
        console.log("FizzBuzz");
    } 
    else if (i % 3 === 0) {
        console.log("Fizz");
    } 
    else if (i % 5 === 0) {
        console.log("Buzz");
    } 
    else {
        console.log(i);
    }
}

console.log("\n-----------------------------------\n");

console.log("=== VERSION 2: CUSTOM FIZZBUZZ ===");

/**
 * @param {number} n 
 * @param {Array} rules 
 */
function customFizzBuzz(n, rules) {
    // Duyệt từ 1 đến n
    for (let i = 1; i <= n; i++) {
        let resultStr = ""; 

        for (let j = 0; j < rules.length; j++) {
            let rule = rules[j];
            
            if (i % rule.divisor === 0) {
                resultStr = resultStr + rule.word; 
            }
        }

        if (resultStr === "") {
            console.log(i);
        } 
        else {
            console.log(i + " = \"" + resultStr + "\"");
        }
    }
}

// --- DỮ LIỆU KIỂM THỬ (TEST CASE) ---
customFizzBuzz(35, [
    { divisor: 3, word: "Fizz" },
    { divisor: 5, word: "Buzz" },
    { divisor: 7, word: "Jazz" }
]);