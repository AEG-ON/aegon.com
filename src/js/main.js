const video = document.querySelector('.video-container video');

window.addEventListener('scroll', () => {
  const section = document.querySelector('.hero-section');
  const rect = section.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  const visible = Math.min(Math.max((windowHeight - rect.top) / (windowHeight + rect.height), 0), 1);
  const scale = 1 + visible * 1;  // Aumenta até 20%

  video.style.transform = `scale(${scale})`;
});