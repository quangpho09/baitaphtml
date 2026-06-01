// ========== CÂUU A1: VAR / LET / CONST VERIFICATION ==========

console.log("======= ĐOẠN 1: VAR HOISTING =======");
console.log("Dự đoán: undefined");
console.log("Kết quả:");
console.log(x);  // undefined (hoisting)
var x = 5;
console.log("Sau khi gán: " + x);
console.log("");

console.log("======= ĐOẠN 2: LET TEMPORAL DEAD ZONE =======");
console.log("Dự đoán: ReferenceError");
console.log("Kết quả:");
try {
    console.log(y);  // ReferenceError
    let y = 10;
} catch (err) {
    console.log("ERROR: " + err.message);
}
console.log("");

console.log("======= ĐOẠN 3: CONST REASSIGNMENT =======");
console.log("Dự đoán: TypeError");
console.log("Kết quả:");
const z = 15;
try {
    z = 20;  // TypeError
} catch (err) {
    console.log("ERROR: " + err.message);
}
console.log("z vẫn là: " + z);
console.log("");

console.log("======= ĐOẠN 4: CONST + ARRAY.PUSH =======");
console.log("Dự đoán: [1, 2, 3, 4]");
console.log("Kết quả:");
const arr = [1, 2, 3];
arr.push(4);
console.log(arr);
console.log("Giải thích: const không ngăn sửa nội dung array, chỉ ngăn gán lại tham chiếu");
console.log("");

console.log("======= ĐOẠN 5: LET BLOCK SCOPE =======");
console.log("Dự đoán:");
console.log("  Trong block: 2");
console.log("  Ngoài block: 1");
console.log("Kết quả:");
let a = 1;
{
    let a = 2;
    console.log("Trong block:", a);
}
console.log("Ngoài block:", a);
console.log("");

console.log("✅ Kiểm chứng hoàn tất!");
