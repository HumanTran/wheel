// Danh sách các phần thưởng (8 phần)
const prizes = [
    '-15%',
    '-10%',
    '-5%',
    'Chúc bạn may mắn lần sau',
    '-10%',
    'Chúc bạn may mắn lần sau',
    '-5%',
    'Chúc bạn may mắn lần sau'
];

const wheel = document.getElementById('wheel');
const resultDiv = document.getElementById('result');

let currentRotation = 0;
let isSpinning = false;
let hasSpun = false; // Biến kiểm tra đã quay chưa

// Hàm quay vòng
function spinWheel() {
    if (isSpinning || hasSpun) return; // Không cho quay nếu đã quay rồi
    
    isSpinning = true;
    hasSpun = true; // Đánh dấu đã quay
    wheel.style.cursor = 'not-allowed'; // Đổi cursor
    resultDiv.classList.remove('show');
    resultDiv.textContent = '';
    
    // Random chọn phần thắng (0-7)
    const winningIndex = Math.floor(Math.random() * prizes.length);
    
    // Tính góc cho mỗi phần (360 / 8 = 45 độ)
    const degreesPerSection = 360 / prizes.length;
    
    // Tính góc đích để mũi tên chỉ vào giữa phần thắng
    // Mũi tên ở trên cùng (0 độ), nên ta cần quay ngược lại
    const targetDegree = 360 - (winningIndex * degreesPerSection + degreesPerSection / 2);
    
    // Thêm 7-10 vòng quay để tạo hiệu ứng (tăng từ 5-7 lên 7-10)
    const extraSpins = 7 + Math.floor(Math.random() * 4);
    const totalRotation = extraSpins * 360 + targetDegree;
    
    // Quay vòng
    const finalRotation = currentRotation + totalRotation;
    wheel.style.transform = `rotate(${finalRotation}deg)`;
    
    // Cập nhật rotation hiện tại
    currentRotation = finalRotation % 360;
    
    // Hiển thị kết quả sau khi quay xong (8 giây thay vì 5 giây)
    setTimeout(() => {
        const prizeText = prizes[winningIndex];
        if (prizeText.includes('%')) {
            resultDiv.innerHTML = `🎉 Chúc mừng! Bạn nhận được giảm giá <strong>${prizeText}</strong> 🎉`;
        } else {
            resultDiv.innerHTML = `${prizeText} 💫`;
        }
        resultDiv.classList.add('show');
        
        setTimeout(() => {
            isSpinning = false;
        }, 500);
    }, 8000);
}

// Event listener - chỉ click vào vòng quay
wheel.addEventListener('click', spinWheel);

// Khởi tạo: set vị trí ban đầu
wheel.style.transform = `rotate(${currentRotation}deg)`;

