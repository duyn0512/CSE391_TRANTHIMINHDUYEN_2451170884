const students = [
    { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
    { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
    { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
    { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
    { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
    { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" },
];

let countGioi = 0, countKha = 0, countTb = 0, countYeu = 0;

let maxAvg = -1;
let minAvg = 11;
let bestStudent = "";
let worstStudent = "";

let totalMath = 0, totalPhysics = 0, totalCs = 0;

let totalAvgMale = 0, countMale = 0;
let totalAvgFemale = 0, countFemale = 0;

console.log("| STT | Tên     | TB   | Xếp loại    |");
console.log("|-----|---------|------|-------------|");

for (let i = 0; i < students.length; i++) {
    const sv = students[i];

    let rawAvg = sv.math * 0.4 + sv.physics * 0.3 + sv.cs * 0.3;
    
    let temp = rawAvg * 10 + 0.5;
    let avg = (temp - (temp % 1)) / 10;

    let xepLoai = "";
    if (avg >= 8.0) {
        xepLoai = "Giỏi";
        countGioi++;
    } else if (avg >= 6.5) {
        xepLoai = "Khá";
        countKha++;
    } else if (avg >= 5.0) {
        xepLoai = "Trung bình";
        countTb++;
    } else {
        xepLoai = "Yếu";
        countYeu++;
    }

    let avgStr = "" + avg;
    if (avg % 1 === 0) {
        avgStr = avgStr + ".0";
    }

    let stt = i + 1;
    let nameSpacing = "       "; 
    if (sv.name === "An" || sv.name === "Em") nameSpacing = "       ";
    if (sv.name === "Chi" || sv.name === "Huy") nameSpacing = "      ";
    if (sv.name === "Bình" || sv.name === "Dũng" || sv.name === "Giang" || sv.name === "Phong") nameSpacing = "    ";

    let xlSpacing = "       "; 
    if (xepLoai === "Giỏi" || xepLoai === "Khá" || xepLoai === "Yếu") xlSpacing = "        ";
    if (xepLoai === "Trung bình") xlSpacing = "  ";

    console.log("| " + stt + "   | " + sv.name + nameSpacing + " | " + avgStr + "  | " + xepLoai + xlSpacing + " |");

    if (avg > maxAvg) {
        maxAvg = avg;
        bestStudent = sv.name;
    }
    if (avg < minAvg) {
        minAvg = avg;
        worstStudent = sv.name;
    }

    totalMath += sv.math;
    totalPhysics += sv.physics;
    totalCs += sv.cs;

    if (sv.gender === "M") {
        totalAvgMale += avg;
        countMale++;
    } else if (sv.gender === "F") {
        totalAvgFemale += avg;
        countFemale++;
    }
}

console.log("----------------------------------------------\n");

console.log("4. Thống kê số lượng xếp loại:");
console.log("   - Giỏi: " + countGioi + " SV");
console.log("   - Khá: " + countKha + " SV");
console.log("   - Trung bình: " + countTb + " SV");
console.log("   - Yếu: " + countYeu + " SV\n");

console.log("5. Thống kê điểm cao nhất / thấp nhất:");
console.log("   - SV có điểm TB cao nhất: " + bestStudent + " (" + (maxAvg % 1 === 0 ? maxAvg + ".0" : maxAvg) + ")");
console.log("   - SV có điểm TB thấp nhất: " + worstStudent + " (" + (minAvg % 1 === 0 ? minAvg + ".0" : minAvg) + ")\n");

let size = students.length;

let avgMath = ((totalMath / size) * 10 + 0.5);
avgMath = (avgMath - (avgMath % 1)) / 10;

let avgPhysics = ((totalPhysics / size) * 10 + 0.5);
avgPhysics = (avgPhysics - (avgPhysics % 1)) / 10;

let avgCs = ((totalCs / size) * 10 + 0.5);
avgCs = (avgCs - (avgCs % 1)) / 10;

console.log("6. Điểm trung bình toàn lớp theo từng môn:");
console.log("   - Môn Toán: " + (avgMath % 1 === 0 ? avgMath + ".0" : avgMath));
console.log("   - Môn Vật lý: " + (avgPhysics % 1 === 0 ? avgPhysics + ".0" : avgPhysics));
console.log("   - Môn Tin học (CS): " + (avgCs % 1 === 0 ? avgCs + ".0" : avgCs) + "\n");

let avgMale = 0;
if (countMale > 0) {
    let tempM = (totalAvgMale / countMale) * 10 + 0.5;
    avgMale = (tempM - (tempM % 1)) / 10;
}

let avgFemale = 0;
if (countFemale > 0) {
    let tempF = (totalAvgFemale / countFemale) * 10 + 0.5;
    avgFemale = (tempF - (tempF % 1)) / 10;
}

console.log("7. (Bonus) Điểm trung bình học tập theo giới tính:");
console.log("   - Nam (M): " + (avgMale % 1 === 0 ? avgMale + ".0" : avgMale));
console.log("   - Nữ (F): " + (avgFemale % 1 === 0 ? avgFemale + ".0" : avgFemale));