function pipe(...fns) {
    return function (initialValue) {
        return fns.reduce((currentValue, currentFn) => currentFn(currentValue), initialValue);
    };
}


console.log("=== 1. TEST PIPE ===");
const processWorkflow = pipe(
    x => x * 2,         // 5 → 10
    x => x + 10,        // 10 → 20
    x => x.toString(),  // 20 → "20"
    x => "Kết quả: " + x
);
console.log(processWorkflow(5)); // → "Kết quả: 20"

function memoize(fn) {
    const cache = {};

    return function (...args) {
        const key = JSON.stringify(args);

        if (key in cache) {
            return cache[key];
        }

        const result = fn(...args);
        cache[key] = result;
        return result;
    };
}


console.log("\n=== 2. TEST MEMOIZE ===");
const expensiveCalc = memoize((n) => {
    console.log("Đang tính toán cồng kềnh...");
    let result = 0;
    for (let i = 0; i < n; i++) result += i;
    return result;
});

console.log("Lượt gọi 1:", expensiveCalc(1000000)); 
console.log("Lượt gọi 2:", expensiveCalc(1000000)); 

function debounce(fn, delay) {
    let timerId = null;

    return function (...args) {
        if (timerId) {
            clearTimeout(timerId);
        }

        timerId = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}

console.log("\n=== 3. TEST DEBOUNCE ===");
const simulateSearch = debounce((query) => {
    console.log("-> Thực hiện API Call Tìm kiếm keyword:", query);
}, 500);

simulateSearch("R");
simulateSearch("Re");
simulateSearch("Rea");
simulateSearch("React"); 

async function retry(fn, maxAttempts = 3) {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await fn();
        } catch (error) {
            console.log(`[Lần thử ${attempt}/${maxAttempts}] Gặp lỗi: ${error.message}`);
            
            if (attempt === maxAttempts) {
                throw new Error(`Đã thử ${maxAttempts} lần nhưng tác vụ vẫn thất bại hoàn toàn!`);
            }
        }
    }
}

console.log("\n=== 4. TEST RETRY ===");
let countFetch = 0;
const unstableFetchAPI = async () => {
    countFetch++;
    if (countFetch < 3) {
        throw new Error("Lỗi kết nối Server mạng yếu (502 Bad Gateway)!");
    }
    return "Dữ liệu JSON từ API Shopee đã tải thành công!";
};

(async () => {
    try {
        const resultData = await retry(unstableFetchAPI, 4);
        console.log("🌟 KẾT QUẢ CUỐI CÙNG:", resultData);
    } catch (finalError) {
        console.error("❌ THẤT BẠI HOÀN TOÀN:", finalError.message);
    }
})();