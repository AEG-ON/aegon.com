const videoContainer = document.querySelector('.video-container');
const heroSection = document.querySelector('.hero-section');
const overlay = document.querySelector('.overlay');

let locked = false;
let isExpanded = false;

function animateVideo(grow = true) {
  document.body.style.overflow = 'hidden';
  locked = true;

  let size = grow ? 500 : 800;
  const targetSize = grow ? 800 : 500;
  const speed = 3; // Quanto maior, mais rápido

  overlay.style.opacity = grow ? '1' : '1';

  const animate = () => {
    size += grow ? speed : -speed;

    if ((grow && size >= targetSize) || (!grow && size <= targetSize)) {
      size = targetSize;
      videoContainer.style.width = `${size}px`;
      videoContainer.style.height = `${size}px`;

      overlay.style.opacity = grow ? '1' : '0';

      document.body.style.overflow = 'auto';
      locked = false;
      isExpanded = grow;
      return;
    }

    videoContainer.style.width = `${size}px`;
    videoContainer.style.height = `${size}px`;

    requestAnimationFrame(animate);
  };

  requestAnimationFrame(animate);
}

window.addEventListener('scroll', () => {
  const rect = heroSection.getBoundingClientRect();

  // Descer: cresce
  if (!locked && !isExpanded && rect.top <= 0 && rect.bottom >= window.innerHeight) {
    animateVideo(true);
  }

  // Subir: volta a diminuir
  if (!locked && isExpanded && rect.top >= 0) {
    animateVideo(false);
  }
});
