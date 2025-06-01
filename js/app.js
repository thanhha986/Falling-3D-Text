const texts = [
    "I Love You",
    "Anh Yeu Em",
    "Em bé của anh",
    "Mãi bên anh nhé",
    "1/6 chúc em bé luôn vui vẻ",
    "Cưng nhất bà xã",
    "Yêu em mãi",
    "Vợ ăn được 5 bát cơm hâhhh",
    "Vợ của anh",
    "Cảm ơn em đã bên anh",
    "Vợ xinh gái, chùn cutee",
    "Thích ngắm nụ cười của vợ",
    "Muốn làm vợ cười",
    "Mãi mãi bên vợ",
    "Đưa em bé đi chơi, đi ăn, đi làm nail",
    "Em bé của anh hay cáu",
];

let images = [
    "https://i.pinimg.com/736x/77/86/1a/77861aa910507e41754f68b5d60699b6.jpg",
    "https://i.pinimg.com/736x/c3/84/9e/c3849e2eba19a1e8155b7464f9b89da8.jpg",
    "https://i.pinimg.com/736x/5f/3c/71/5f3c71b061d9d56cb00e5fc1dd9f5969.jpg",
    "https://i.pinimg.com/736x/94/59/66/9459664d0858ec81ba249d98fdb4ee3c.jpg",
    "https://i.pinimg.com/736x/d9/09/c0/d909c0b86ea1a4e65495785db03ef636.jpg"
];

const scene = document.getElementById("scene");
let rotateX = 0, rotateY = 0;
let targetRotateX = 0, targetRotateY = 0;
const maxRotate = 30;

document.addEventListener("mousemove", (e) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    targetRotateY = ((e.clientX - centerX) / centerX) * maxRotate;
    targetRotateX = ((e.clientY - centerY) / centerY) * maxRotate;
});

let touchStartX = 0, touchStartY = 0;
document.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

document.addEventListener("touchmove", (e) => {
    e.preventDefault();
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const touchX = e.touches[0].clientX;
    const touchY = e.touches[0].clientY;
    targetRotateY = ((touchX - centerX) / centerX) * maxRotate;
    targetRotateX = ((touchY - centerY) / centerY) * maxRotate;
});

function updateRotation() {
    rotateX += (targetRotateX - rotateX) * 0.1;
    rotateY += (targetRotateY - rotateY) * 0.1;
    scene.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    requestAnimationFrame(updateRotation);
}
updateRotation();


// Kiểm tra nếu là mobile
const isMobile = window.matchMedia("(max-width: 768px)").matches;

function createFallingText(initial = false) {
    const text = document.createElement("div");
    text.className = `falling-text text-${Math.floor(Math.random() * 3) + 1}`;
    text.innerText = texts[Math.floor(Math.random() * texts.length)];

    const startX = Math.random() * window.innerWidth;
    const zLayer = Math.random() * 400 - 200;
    text.style.left = startX + "px";
    text.style.fontSize = `${Math.random() * 20 + 18}px`;
    text.style.transform = `translateZ(${zLayer}px)`;

    // Xuất hiện ở vị trí ngẫu nhiên hoặc ở trên cùng
    const randomStart = Math.random() < 0.8; // 80% bắt đầu từ vị trí ngẫu nhiên
    const startY = randomStart
        ? Math.random() * window.innerHeight // Ngẫu nhiên trong màn hình
        : -50; // Từ trên rơi xuống

    text.style.top = startY + "px";
    scene.appendChild(text);

    setTimeout(() => {
        text.remove();
    }, (isMobile ? 3000 : 5000));

    let posY = startY;

    const speed = Math.random() * 2 + (isMobile ? 2.00 : 0.5);

    function animate() {
        posY += speed;
        text.style.top = posY + "px";

        if (posY > window.innerHeight + 50) {
            text.remove();
        } else {
            requestAnimationFrame(animate);
        }
    }

    animate();
}


function createHeart(initial = false, initialY = -50) {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = `<img src="${images[Math.floor(Math.random() * images.length)]}" alt="♡" />`;//"♡";

    const startX = Math.random() * window.innerWidth;
    const zLayer = Math.random() * 400 - 200;
    heart.style.left = startX + "px";
    heart.style.top = initial ? (Math.random() * window.innerHeight) + "px" : "-50px";
    heart.style.transform = `translateZ(${zLayer}px)`;

    scene.appendChild(heart);
    setTimeout(() => {
        heart.remove();
    }, (isMobile ? 3000 : 4000));

    let posY = initial ? parseFloat(heart.style.top) : -50;
    const speed = Math.random() * 1.5 + (isMobile ? 2.00 : 1);

    function animateHeart() {
        posY += speed;
        heart.style.top = posY + "px";

        if (posY > window.innerHeight + 50) {
            heart.remove();
        } else {
            requestAnimationFrame(animateHeart);
        }
    }
    animateHeart();
}

function createRose(initial = false, initialY = -50) {
    const rose = document.createElement("div");
    rose.className = "rose";
    rose.innerText = "🌺";

    const startX = Math.random() * window.innerWidth;
    const zLayer = Math.random() * 400 - 200;
    rose.style.left = startX + "px";
    rose.style.top = initial ? (Math.random() * window.innerHeight) + "px" : "-50px";
    rose.style.transform = `translateZ(${zLayer}px) rotate(${Math.random() * 360}deg)`;

    scene.appendChild(rose);
    setTimeout(() => {
        rose.remove();
    }, (isMobile ? 3000 : 4000));

    let posY = initial ? parseFloat(rose.style.top) : -50;
    const speed = Math.random() * 1.5 + (isMobile ? 2.00 : 1);

    function animateRose() {
        posY += speed;
        rose.style.top = posY + "px";

        if (posY > window.innerHeight + 50) {
            rose.remove();
        } else {
            requestAnimationFrame(animateRose);
        }
    }
    animateRose();
}

// Điều chỉnh số lượng tùy theo thiết bị
const initialTextCount = isMobile ? 10 : 30;
const initialHeartCount = isMobile ? 3 : 10;
const initialRoseCount = isMobile ? 2 : 5;

const textInterval = isMobile ? 500 : 200;
const heartInterval = isMobile ? 800 : 500;
const roseInterval = isMobile ? 1000 : 600;

// Khởi tạo ban đầu với mật độ phù hợp
for (let i = 0; i < initialTextCount; i++) {
    createFallingText(true);
}
for (let i = 0; i < initialHeartCount; i++) {
    createHeart(true);
}
for (let i = 0; i < initialRoseCount; i++) {
    createRose(true);
}

// Sinh thêm phần tử theo chu kỳ
setInterval(createFallingText, textInterval);
setInterval(createHeart, heartInterval);
setInterval(createRose, roseInterval);
