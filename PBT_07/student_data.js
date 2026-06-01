// ========== BÀI B2: XỬ LÝ DỮ LIỆU SINH VIÊN ==========

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

// ========== 1. TÍNH ĐIỂM TRUNG BÌNH ==========
function calculateGPA(student) {
    return student.math * 0.4 + student.physics * 0.3 + student.cs * 0.3;
}

// ========== 2. PHÂN LOẠI ĐIỂM ==========
function classifyGrade(gpa) {
    if (gpa >= 8.0) return "Giỏi";
    if (gpa >= 6.5) return "Khá";
    if (gpa >= 5.0) return "Trung bình";
    return "Yếu";
}

// ========== 3. XỬ LÝ DỮ LIỆU ==========

// Tính GPA và phân loại cho mỗi sinh viên
let results = [];
for (let i = 0; i < students.length; i++) {
    let gpa = calculateGPA(students[i]);
    let classification = classifyGrade(gpa);
    results.push({
        stt: i + 1,
        name: students[i].name,
        gpa: gpa.toFixed(1),
        classification: classification,
        gender: students[i].gender,
        scores: {
            math: students[i].math,
            physics: students[i].physics,
            cs: students[i].cs
        }
    });
}

// ========== IN BẢNG KẾT QUẢ ==========
console.log("========== BẢNG KẾT QUẢ HỌC TẬP ==========\n");
console.log("| STT | Tên    | Toán | Lý | CNTT | TB   | Xếp loại    |");
console.log("|-----|--------|------|----|----|------|-------------|");

for (let i = 0; i < results.length; i++) {
    let r = results[i];
    console.log(`| ${r.stt}   | ${r.name.padEnd(6)} | ${r.scores.math}    | ${r.scores.physics}  | ${r.scores.cs}   | ${r.gpa.padEnd(4)} | ${r.classification.padEnd(11)} |`);
}
console.log("");

// ========== 4. ĐẾM SỐ SV MỖI XẾP LOẠI ==========
console.log("========== THỐNG KÊ XẾP LOẠI ==========\n");

let gioi = 0, kha = 0, trungBinh = 0, yeu = 0;

for (let i = 0; i < results.length; i++) {
    let classification = results[i].classification;
    if (classification === "Giỏi") gioi++;
    else if (classification === "Khá") kha++;
    else if (classification === "Trung bình") trungBinh++;
    else if (classification === "Yếu") yeu++;
}

console.log("Giỏi:        " + gioi + " sinh viên");
console.log("Khá:         " + kha + " sinh viên");
console.log("Trung bình:  " + trungBinh + " sinh viên");
console.log("Yếu:         " + yeu + " sinh viên");
console.log("Tổng cộng:   " + students.length + " sinh viên");
console.log("");

// ========== 5. TÌM SV CÓ ĐIỂM TB CAO NHẤT VÀ THẤP NHẤT ==========
console.log("========== ĐIỂM CAO NHẤT VÀ THẤP NHẤT ==========\n");

let maxGPA = results[0].gpa;
let minGPA = results[0].gpa;
let topStudent = results[0];
let bottomStudent = results[0];

for (let i = 0; i < results.length; i++) {
    let gpa = parseFloat(results[i].gpa);
    if (gpa > parseFloat(maxGPA)) {
        maxGPA = results[i].gpa;
        topStudent = results[i];
    }
    if (gpa < parseFloat(minGPA)) {
        minGPA = results[i].gpa;
        bottomStudent = results[i];
    }
}

console.log("Sinh viên có GPA cao nhất:");
console.log("  Tên: " + topStudent.name);
console.log("  GPA: " + topStudent.gpa);
console.log("  Xếp loại: " + topStudent.classification);
console.log("");

console.log("Sinh viên có GPA thấp nhất:");
console.log("  Tên: " + bottomStudent.name);
console.log("  GPA: " + bottomStudent.gpa);
console.log("  Xếp loại: " + bottomStudent.classification);
console.log("");

// ========== 6. TÍNH ĐIỂM TB TOÀN LỚP THEO MÔN ==========
console.log("========== ĐIỂM TRUNG BÌNH TOÀN LỚP ==========\n");

let totalMath = 0, totalPhysics = 0, totalCS = 0;

for (let i = 0; i < students.length; i++) {
    totalMath += students[i].math;
    totalPhysics += students[i].physics;
    totalCS += students[i].cs;
}

let avgMath = (totalMath / students.length).toFixed(1);
let avgPhysics = (totalPhysics / students.length).toFixed(1);
let avgCS = (totalCS / students.length).toFixed(1);

console.log("Toán:       " + avgMath);
console.log("Lý:         " + avgPhysics);
console.log("CNTT:       " + avgCS);
console.log("");

// ========== BONUS: TÍNH ĐIỂM TB THEO GIỚI TÍNH ==========
console.log("========== ĐIỂM TRUNG BÌNH THEO GIỚI TÍNH ==========\n");

let maleCount = 0, femaleCount = 0;
let maleGPATotal = 0, femaleGPATotal = 0;

for (let i = 0; i < results.length; i++) {
    if (results[i].gender === "M") {
        maleCount++;
        maleGPATotal += parseFloat(results[i].gpa);
    } else {
        femaleCount++;
        femaleGPATotal += parseFloat(results[i].gpa);
    }
}

let avgMaleGPA = (maleGPATotal / maleCount).toFixed(1);
let avgFemaleGPA = (femaleGPATotal / femaleCount).toFixed(1);

console.log("Nam (M):");
console.log("  Số lượng: " + maleCount);
console.log("  GPA trung bình: " + avgMaleGPA);
console.log("");

console.log("Nữ (F):");
console.log("  Số lượng: " + femaleCount);
console.log("  GPA trung bình: " + avgFemaleGPA);
console.log("");

console.log("✅ Xử lý dữ liệu hoàn tất!");
