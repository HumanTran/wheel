// Danh sách các phần thưởng (8 phần)
const prizes = [
    'Chúc bạn may mắn lần sau',
    '-5%',
    'Chúc bạn may mắn lần sau',
    'Chúc bạn may mắn lần sau',
    '-10%',
    'Chúc bạn may mắn lần sau',
    '-5%',
    'Chúc bạn may mắn lần sau'
];

const wheel = document.getElementById('wheel');

let currentRotation = 0;
let isSpinning = false;
let hasSpun = false; // Biến kiểm tra đã quay chưa

// Hàm quay vòng
function spinWheel() {
    // Nếu đang quay hoặc đã quay rồi thì không cho quay tiếp
    if (isSpinning || hasSpun) return;

    isSpinning = true;   // đánh dấu đang quay
    hasSpun = true;      // đánh dấu đã quay
    wheel.style.cursor = 'not-allowed'; // đổi con trỏ chuột

    // Chọn ngẫu nhiên phần thưởng (0-7)
    const winningIndex = Math.floor(Math.random() * prizes.length);

    // Góc mỗi phần = 360 độ / số phần thưởng
    const degreesPerSection = 360 / prizes.length;

    // Góc mục tiêu để mũi tên trúng phần thưởng
    // Mỗi phần có góc trung tâm = index * degreesPerSection + nửa phần
    const targetDegree = winningIndex * degreesPerSection + degreesPerSection / 2;

    // Thêm 7-10 vòng quay đầy đủ để tạo hiệu ứng (mượt hơn)
    const extraSpins = 7 + Math.floor(Math.random() * 4);

    // Tổng góc quay = số vòng quay + góc đến phần thắng
    const totalRotation = extraSpins * 360 + targetDegree;

    // Góc cuối cùng = góc hiện tại + tổng quay
    const finalRotation = currentRotation + totalRotation;

    // Thực hiện quay vòng
    wheel.style.transform = `rotate(${finalRotation}deg)`;

    // Cập nhật góc hiện tại (mod 360 để giữ giá trị nhỏ)
    currentRotation = finalRotation % 360;

    // Đợi animation kết thúc (ở đây 8s)
    setTimeout(() => {
        isSpinning = false;
        const prize = getPrizeTextAtArrow();
        showResult(prize); // <--- sửa ở đây
    }, 8000);
}

function getPrizeTextAtArrow() {
    const prizeTexts = document.querySelectorAll('.prize-text');
    const arrow = document.querySelector('.arrow'); // mũi tên

    const arrowRect = arrow.getBoundingClientRect();
    const arrowX = arrowRect.left + arrowRect.width / 2;
    const arrowY = arrowRect.top + arrowRect.height / 2;

    let minDistance = Infinity;
    let prizeIndex = 0;

    prizeTexts.forEach((text, i) => {
        const rect = text.getBoundingClientRect();
        const textX = rect.left + rect.width / 2;
        const textY = rect.top + rect.height / 2;

        // Khoảng cách Euclidean giữa mũi tên và text
        const distance = Math.sqrt((textX - arrowX) ** 2 + (textY - arrowY) ** 2);

        if (distance < minDistance) {
            minDistance = distance;
            prizeIndex = i;
        }
    });

    return prizeTexts[prizeIndex].textContent;
}

function showResult(prize) {
    const resultEl = document.getElementById('result');
    if(prize == "Chúc bạn may mắn lần sau"){
        resultEl.textContent = "Chia buồn với ní";
    }
    else{
        resultEl.textContent = "Ní được giảm " + prize.replace('-', '');
    }

    resultEl.classList.add('show'); // thêm class show để bật animation
}



// Event listener - chỉ click vào vòng quay
wheel.addEventListener('click', spinWheel);

// Khởi tạo: set vị trí ban đầu
wheel.style.transform = `rotate(${currentRotation}deg)`;

