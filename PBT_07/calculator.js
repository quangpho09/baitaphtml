// ========== BÀI B1: MÁY TÍNH ĐƠN GIẢN ==========

function calculate(num1, operator, num2) {
    // Validate input
    if (typeof num1 !== 'number' || typeof num2 !== 'number') {
        return "Lỗi: Input không phải số";
    }
    
    // Validate operator
    const validOperators = ["+", "-", "*", "/", "%", "**"];
    if (!validOperators.includes(operator)) {
        return `Lỗi: Operator '${operator}' không hợp lệ`;
    }
    
    // Handle division by zero
    if (operator === "/" && num2 === 0) {
        return "Lỗi: Không thể chia cho 0";
    }
    
    // Calculate result
    let result;
    switch (operator) {
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "*":
            result = num1 * num2;
            break;
        case "/":
            result = num1 / num2;
            break;
        case "%":
            result = num1 % num2;
            break;
        case "**":
            result = num1 ** num2;
            break;
    }
    
    return result;
}

// ========== TEST CASES ==========
console.log("========== TEST CALCULATOR ==========\n");

console.log("Test 1 - Cộng:");
console.log("calculate(10, '+', 5)");
console.log("Kết quả:", calculate(10, "+", 5));
console.log("Dự đoán: 15");
console.log("");

console.log("Test 2 - Chia cho 0:");
console.log("calculate(10, '/', 0)");
console.log("Kết quả:", calculate(10, "/", 0));
console.log("Dự đoán: Lỗi: Không thể chia cho 0");
console.log("");

console.log("Test 3 - Operator không hợp lệ:");
console.log("calculate(10, '^', 5)");
console.log("Kết quả:", calculate(10, "^", 5));
console.log("Dự đoán: Lỗi: Operator '^' không hợp lệ");
console.log("");

console.log("Test 4 - Input không phải số:");
console.log("calculate('abc', '+', 5)");
console.log("Kết quả:", calculate("abc", "+", 5));
console.log("Dự đoán: Lỗi: Input không phải số");
console.log("");

console.log("Test 5 - Lũy thừa:");
console.log("calculate(2, '**', 10)");
console.log("Kết quả:", calculate(2, "**", 10));
console.log("Dự đoán: 1024");
console.log("");

// Additional tests
console.log("========== THÊM TEST ==========\n");

console.log("Trừ: calculate(20, '-', 8) =", calculate(20, "-", 8));
console.log("Nhân: calculate(6, '*', 7) =", calculate(6, "*", 7));
console.log("Chia: calculate(100, '/', 4) =", calculate(100, "/", 4));
console.log("Chia lấy dư: calculate(10, '%', 3) =", calculate(10, "%", 3));
console.log("Input không phải số: calculate(10, '+', 'abc') =", calculate(10, "+", "abc"));
console.log("Operator không hợp lệ: calculate(5, '&', 3) =", calculate(5, "&", 3));

console.log("\n✅ Test hoàn tất!");
