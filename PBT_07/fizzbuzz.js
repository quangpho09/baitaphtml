// ========== BÀI B4: FIZZBUZZ NÂNG CAO ==========

console.log("========== VERSION 1: FIZZBUZZ CLASSIC ==========\n");

function classicFizzBuzz(n) {
    console.log("In từ 1 đến " + n + ":");
    console.log("(Chia hết 3 → Fizz, chia hết 5 → Buzz, chia hết cả 2 → FizzBuzz)\n");
    
    for (let i = 1; i <= n; i++) {
        let output = "";
        
        if (i % 3 === 0) {
            output += "Fizz";
        }
        if (i % 5 === 0) {
            output += "Buzz";
        }
        
        if (output === "") {
            output = i;
        }
        
        console.log(i + ": " + output);
    }
}

// Chạy classic version
classicFizzBuzz(30);

console.log("\n========== VERSION 2: CUSTOM FIZZBUZZ ==========\n");

function customFizzBuzz(n, rules) {
    console.log("In từ 1 đến " + n + " với rules:");
    
    // In các rules
    for (let i = 0; i < rules.length; i++) {
        console.log("  - Chia hết " + rules[i].divisor + " → " + rules[i].word);
    }
    console.log("");
    
    for (let i = 1; i <= n; i++) {
        let output = "";
        
        // Áp dụng từng rule
        for (let j = 0; j < rules.length; j++) {
            if (i % rules[j].divisor === 0) {
                output += rules[j].word;
            }
        }
        
        if (output === "") {
            output = i;
        }
        
        console.log(i + ": " + output);
    }
}

// Test 1: FizzBuzz + Jazz
console.log("TEST 1: FizzBuzz + Jazz (3, 5, 7)\n");
customFizzBuzz(30, [
    { divisor: 3, word: "Fizz" },
    { divisor: 5, word: "Buzz" },
    { divisor: 7, word: "Jazz" }
]);

console.log("\n========== TEST 2: 2 rules (Foo, Bar) ==========\n");
customFizzBuzz(20, [
    { divisor: 2, word: "Foo" },
    { divisor: 3, word: "Bar" }
]);

console.log("\n========== TEST 3: Single rule ==========\n");
customFizzBuzz(15, [
    { divisor: 4, word: "Quad" }
]);

console.log("\n========== TEST CASES QUAN TRỌNG ==========\n");

console.log("Classic FizzBuzz - Các số đặc biệt:");
let testNumbers = [3, 5, 6, 9, 10, 12, 15, 20, 21, 30, 35, 45, 100, 105];
let rules = [
    { divisor: 3, word: "Fizz" },
    { divisor: 5, word: "Buzz" }
];

for (let i = 0; i < testNumbers.length; i++) {
    let num = testNumbers[i];
    let output = "";
    
    for (let j = 0; j < rules.length; j++) {
        if (num % rules[j].divisor === 0) {
            output += rules[j].word;
        }
    }
    
    if (output === "") {
        output = num;
    }
    
    console.log(num + " → " + output);
}

console.log("\n✅ FizzBuzz hoàn tất!");
