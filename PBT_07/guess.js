let timeString = new Date() + ""; 
let seed = 0;

for (let i = 0; i < timeString.length; i++) {
    seed = (seed * 31) + (timeString[i] * 1 === timeString[i] * 1 ? timeString[i] * 1 : i);
}

if (seed < 0) {
    seed = -seed; 
}
let targetNumber = (seed % 100) + 1;

let maxAttempts = 7;
let attemptsCount = 0;
let guessedNumbers = []; 
let isWin = false;

alert("Chào mừng bạn đến với Mini Game Đoán Số!\nMáy đã bí mật chọn 1 số từ 1 đến 100. Bạn có tối đa 7 lượt đoán!");

while (attemptsCount < maxAttempts) {
    let remaining = maxAttempts - attemptsCount;
    let userInput = prompt("Lượt đoán thứ " + (attemptsCount + 1) + " (Còn " + remaining + " lượt):\nNhập một số từ 1 đến 100:");

    if (userInput === null) {
        alert("Bạn đã thoát trò chơi.");
        break;
    }

    let guess = userInput * 1;

    if (guess !== guess || guess < 1 || guess > 100 || userInput.trim() === "") {
        alert("Lỗi: Vui lòng chỉ nhập số nguyên hợp lệ trong khoảng từ 1 đến 100!");
        continue; 
    }

    let isDuplicated = false;
    for (let i = 0; i < guessedNumbers.length; i++) {
        if (guessedNumbers[i] === guess) {
            isDuplicated = true;
            break;
        }
    }

    if (isDuplicated) {
        alert("Cảnh báo: Bạn đã đoán số " + guess + " này rồi! Hãy chọn số khác.");
        continue; 
    }

    guessedNumbers[guessedNumbers.length] = guess;
    attemptsCount++; 

    if (guess === targetNumber) {
        alert("Đúng rồi! Bạn đoán đúng sau " + attemptsCount + " lần!");
        isWin = true;
        break; 
    } else if (guess > targetNumber) {
        alert("Thấp hơn! (Số bạn đoán đang hơi CAO)");
    } else {
        alert("Cao hơn! (Số bạn đoán đang hơi THẤP)");
    }
}

if (!isWin && attemptsCount === maxAttempts) {
    alert("Hết lượt! Bạn đã THUA cuộc.\nĐáp án chính xác là: " + targetNumber);
}