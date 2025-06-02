const carousel = document.querySelector('.caurosel');
const images = carousel.querySelectorAll('img');
let current = 0;

function showImage(index) {
  images.forEach((img, i) => {
    img.classList.toggle('active', i === index);
  });
}

function nextImage() {
  current = (current + 1) % images.length;
  showImage(current);
}

// Initialize
showImage(current);

// Cycle every 3 seconds
setInterval(nextImage, 3000);

const nav = document.querySelector('.nav-links-container');
function toggleNavBarView() {
    nav.classList.toggle('active');
}