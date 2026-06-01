// ========== BÀI B3: GAME ĐOÁN SỐ ==========

let secretNumber;
let attempts;
let guessedNumbers = [];
const MAX_ATTEMPTS = 7;

function startGame() {
    // Random số từ 1-100
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attempts = MAX_ATTEMPTS;
    guessedNumbers = [];
    
    // Ẩn nút bắt đầu, bắt đầu lặp nhập input
    playGame();
}

function playGame() {
    if (attempts <= 0) {
        // Game Over - thua
        showMessage(`❌ Bạn đã hết lượt! Số bí mật là: <strong>${secretNumber}</strong>`, 'error');
        document.getElementById('attempts').textContent = '0';
        return;
    }
    
    // Nhập số từ người dùng
    let userInput = prompt(`Đoán số từ 1-100 (${attempts} lượt còn lại):\n\nSố đã đoán: ${guessedNumbers.join(', ') || 'Chưa có'}`);
    
    // Nếu nhấn Cancel
    if (userInput === null) {
        showMessage(`Bạn đã hủy trò chơi. Số bí mật là: <strong>${secretNumber}</strong>`, 'info-message');
        return;
    }
    
    // Validate input
    if (userInput.trim() === '') {
        showMessage('⚠️ Vui lòng nhập một số!', 'warning');
        setTimeout(playGame, 500);
        return;
    }
    
    // Convert thành số
    let guess = parseInt(userInput);
    
    // Kiểm tra có phải số không
    if (isNaN(guess)) {
        showMessage('⚠️ Vui lòng nhập một con số hợp lệ!', 'warning');
        setTimeout(playGame, 500);
        return;
    }
    
    // Kiểm tra range 1-100
    if (guess < 1 || guess > 100) {
        showMessage('⚠️ Số phải nằm trong khoảng 1-100!', 'warning');
        setTimeout(playGame, 500);
        return;
    }
    
    // Kiểm tra đã đoán rồi chưa
    if (guessedNumbers.includes(guess)) {
        showMessage(`⚠️ Bạn đã đoán số ${guess} rồi! Thử số khác.`, 'warning');
        setTimeout(playGame, 500);
        return;
    }
    
    // Thêm vào danh sách đã đoán
    guessedNumbers.push(guess);
    attempts--;
    
    // Cập nhật UI
    document.getElementById('attempts').textContent = attempts;
    document.getElementById('guessed-list').textContent = `Các số đã đoán: ${guessedNumbers.join(', ')}`;
    
    // So sánh
    if (guess === secretNumber) {
        // Thắng!
        let totalGuesses = guessedNumbers.length;
        showMessage(`🎉 <strong>Chúc mừng!</strong> Bạn đoán đúng sau ${totalGuesses} lần!<br>Số bí mật là: ${secretNumber}`, 'success');
        return;
    } else if (guess < secretNumber) {
        // Cao hơn
        showMessage(`📈 Số bí mật <strong>cao hơn</strong> ${guess}`, 'info-message');
    } else {
        // Thấp hơn
        showMessage(`📉 Số bí mật <strong>thấp hơn</strong> ${guess}`, 'info-message');
    }
    
    // Tiếp tục chơi
    setTimeout(playGame, 1000);
}

function showMessage(text, className) {
    const messageDiv = document.getElementById('message');
    messageDiv.innerHTML = text;
    messageDiv.className = `message ${className}`;
}

// ========== HƯỚNG DẪN CHẠY ==========
/*
1. Mở file guess_number.html trong trình duyệt
2. Click nút "🎯 Bắt đầu trò chơi"
3. Nhập số dự đoán vào prompt
4. Theo dõi gợi ý: "Cao hơn" hay "Thấp hơn"
5. Đoán đúng trước khi hết 7 lượt để thắng

Các tính năng:
✓ Validate input (chỉ chấp nhận số 1-100)
✓ Phát hiện số đã đoán rồi
✓ Hiển thị danh sách số đã đoán
✓ Giới hạn 7 lượt
✓ Gợi ý "cao hơn" hay "thấp hơn"
✓ Đếm số lần đoán
*/
