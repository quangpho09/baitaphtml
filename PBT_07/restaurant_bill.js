// ========== CÂU C2: TÍNH HÓA ĐƠN NHÀ HÀNG ==========

function calculateBill(items, dayOfWeek = null, includeTip = true) {
    /*
    items: mảng object { name, price, quantity }
    dayOfWeek: tên ngày (Wednesday để giảm thêm 5%)
    includeTip: có tính tip hay không (5%)
    */
    
    // ========== BƯỚC 1: TÍNH TỔNG TIỀN ==========
    let subtotal = 0;
    let itemDetails = [];
    
    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        let itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        itemDetails.push({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            total: itemTotal
        });
    }
    
    // ========== BƯỚC 2: TÍNH GIẢM GIÁ ==========
    let discountPercent = 0;
    
    // Giảm theo tổng tiền
    if (subtotal > 1000000) {
        discountPercent = 15;
    } else if (subtotal > 500000) {
        discountPercent = 10;
    }
    
    // Giảm thêm nếu là thứ 3
    if (dayOfWeek && dayOfWeek.toLowerCase() === "wednesday") {
        discountPercent += 5;
    }
    
    let discountAmount = subtotal * discountPercent / 100;
    
    // ========== BƯỚC 3: TÍNH VAT (8%) ==========
    let afterDiscount = subtotal - discountAmount;
    let vatAmount = afterDiscount * 0.08;
    
    // ========== BƯỚC 4: TÍNH TIP (5%, optional) ==========
    let tipAmount = 0;
    if (includeTip) {
        tipAmount = afterDiscount * 0.05;
    }
    
    // ========== BƯỚC 5: TỔNG THANH TOÁN ==========
    let total = afterDiscount + vatAmount + tipAmount;
    
    // ========== TRÍCH XUẤT KẾT QUẢ ==========
    return {
        items: itemDetails,
        subtotal: subtotal,
        discountPercent: discountPercent,
        discountAmount: discountAmount,
        afterDiscount: afterDiscount,
        vat: vatAmount,
        tip: tipAmount,
        total: total
    };
}

// ========== HÀM IN HÓA ĐƠN ĐẸP ==========
function printBill(billData, restaurantName = "NHÀ HÀNG 3 MIỀN") {
    let output = "";
    
    output += "╔══════════════════════════════════════╗\n";
    output += "║    " + restaurantName.padEnd(31) + " ║\n";
    output += "╠══════════════════════════════════════╣\n";
    
    // In các item
    for (let i = 0; i < billData.items.length; i++) {
        let item = billData.items[i];
        let namePart = (i + 1) + ". " + item.name;
        let qtyPart = "x" + item.quantity;
        let pricePart = "@" + formatCurrency(item.price);
        let totalPart = "= " + formatCurrency(item.total);
        
        output += "║ " + namePart.padEnd(15) + " " + qtyPart.padEnd(4) + " " + 
                  pricePart.padEnd(10) + " " + totalPart.padStart(10) + " ║\n";
    }
    
    output += "╠══════════════════════════════════════╣\n";
    
    // Tổng cộng
    output += "║ Tổng cộng:".padEnd(20) + formatCurrency(billData.subtotal).padStart(15) + " ║\n";
    
    // Giảm giá
    if (billData.discountPercent > 0) {
        output += "║ Giảm giá (" + billData.discountPercent + "%):".padEnd(20) + 
                  formatCurrency(-billData.discountAmount).padStart(15) + " ║\n";
    } else {
        output += "║ Giảm giá (0%):".padEnd(20) + "0đ".padStart(15) + " ║\n";
    }
    
    // VAT
    output += "║ VAT (8%):".padEnd(20) + formatCurrency(billData.vat).padStart(15) + " ║\n";
    
    // Tip
    if (billData.tip > 0) {
        output += "║ Tip (5%):".padEnd(20) + formatCurrency(billData.tip).padStart(15) + " ║\n";
    }
    
    output += "╠══════════════════════════════════════╣\n";
    output += "║ THANH TOÁN:".padEnd(20) + formatCurrency(billData.total).padStart(15) + " ║\n";
    output += "╚══════════════════════════════════════╝\n";
    
    return output;
}

// ========== HÀM FORMAT TIỀN TỆ ==========
function formatCurrency(num) {
    return Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "đ";
}

// ========== TEST 1: HÓA ĐƠN CÓ GIẢM GIÁ ==========
console.log("========== TEST 1: HÓA ĐƠN CÓ GIẢM GIÁ ==========\n");

let items1 = [
    { name: "Phở bò", price: 65000, quantity: 2 },
    { name: "Trà đá", price: 5000, quantity: 3 },
    { name: "Bún chả", price: 55000, quantity: 1 }
];

let bill1 = calculateBill(items1, null, true);
console.log(printBill(bill1));

// ========== TEST 2: HÓA ĐƠN VỚI GIẢM GIÁ LỚN (> 500K) ==========
console.log("========== TEST 2: HÓA ĐƠN > 500K (GIẢM 10%) ==========\n");

let items2 = [
    { name: "Cơm chiên", price: 150000, quantity: 2 },
    { name: "Cá hấp", price: 200000, quantity: 1 },
    { name: "Nước ngọt", price: 20000, quantity: 3 }
];

let bill2 = calculateBill(items2, null, true);
console.log(printBill(bill2));

// ========== TEST 3: HÓA ĐƠN > 1 TRIỆU (GIẢM 15%) ==========
console.log("========== TEST 3: HÓA ĐƠN > 1 TRIỆU (GIẢM 15%) ==========\n");

let items3 = [
    { name: "Lẩu tôm thái", price: 350000, quantity: 1 },
    { name: "Dê nướng", price: 400000, quantity: 1 },
    { name: "Rượu", price: 300000, quantity: 1 },
    { name: "Nước lạnh", price: 30000, quantity: 2 }
];

let bill3 = calculateBill(items3, null, true);
console.log(printBill(bill3));

// ========== TEST 4: NGÀY THỨ 3 - GIẢM THÊM 5% ==========
console.log("========== TEST 4: NGÀY THỨ 3 - GIẢM THÊM 5% ==========\n");

let items4 = [
    { name: "Bún riêu", price: 45000, quantity: 2 },
    { name: "Gà rôti", price: 150000, quantity: 1 },
    { name: "Nước ổi", price: 25000, quantity: 2 }
];

let bill4 = calculateBill(items4, "Wednesday", true);
console.log(printBill(bill4));

// ========== TEST 5: KHÔNG CÓ TIP ==========
console.log("========== TEST 5: KHÔNG CÓ TIP ==========\n");

let items5 = [
    { name: "Mì xào", price: 55000, quantity: 1 },
    { name: "Thịt nướng", price: 85000, quantity: 2 }
];

let bill5 = calculateBill(items5, null, false);
console.log(printBill(bill5));

// ========== TEST 6: GIẢM GIÁ KẾP (> 500K + THỨ 3) ==========
console.log("========== TEST 6: GIẢM GIÁ KẾP (> 500K + THỨ 3) ==========\n");

let items6 = [
    { name: "Bò nướng", price: 200000, quantity: 2 },
    { name: "Lẩu cá", price: 250000, quantity: 1 },
    { name: "Bia", price: 50000, quantity: 2 }
];

let bill6 = calculateBill(items6, "Wednesday", true);
console.log(printBill(bill6));
console.log("Chi tiết:");
console.log("- Tổng tiền: " + formatCurrency(bill6.subtotal));
console.log("- Giảm giá " + bill6.discountPercent + "%: " + formatCurrency(-bill6.discountAmount));
console.log("- Sau giảm: " + formatCurrency(bill6.afterDiscount));
console.log("- VAT 8%: " + formatCurrency(bill6.vat));
console.log("- Tip 5%: " + formatCurrency(bill6.tip));
console.log("- TỔNG THANH TOÁN: " + formatCurrency(bill6.total));

console.log("\n✅ Tính hóa đơn hoàn tất!");
