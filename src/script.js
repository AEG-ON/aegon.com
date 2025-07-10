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


// site funcionamento
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Fade in animation on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Timeline animation for about section
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const timeline = entry.target;
                    const cards = timeline.querySelectorAll('.about-card');
                    const timelineProgress = timeline.querySelector('.timeline-progress');
                    
                    // Animate timeline progress
                    setTimeout(() => {
                        timelineProgress.style.height = '100%';
                    }, 500);
                    
                    // Animate cards one by one
                    cards.forEach((card, index) => {
                        const dot = card.querySelector('.timeline-dot');
                        setTimeout(() => {
                            card.classList.add('visible');
                            dot.classList.add('active');
                        }, 800 + (index * 600)); // 600ms delay between each card
                    });
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '-50px 0px'
        });

        // Observe the timeline container
        const timelineContainer = document.querySelector('.about-timeline');
        if (timelineContainer) {
            timelineObserver.observe(timelineContainer);
        }

        // Progressive timeline animation on scroll
        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const card = entry.target;
                    const index = parseInt(card.dataset.index);
                    const timelineProgress = document.querySelector('.timeline-progress');
                    
                    // Update progress bar height based on card position
                    const progressHeight = ((index + 1) / 3) * 100;
                    timelineProgress.style.height = progressHeight + '%';
                    
                    // Activate current card
                    card.classList.add('visible');
                    const dot = card.querySelector('.timeline-dot');
                    dot.classList.add('active');
                }
            });
        }, {
            threshold: 0.5
        });

        // Observe each timeline card individually for progressive reveal
        document.querySelectorAll('.about-card').forEach(card => {
            progressObserver.observe(card);
        });

        // Portfolio filter functionality
        const filterButtons = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');

                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });

        // Contact form handling
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = Object.fromEntries(formData);
            
            // Simulate form submission
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });

        // Mobile menu toggle
        const mobileMenu = document.querySelector('.mobile-menu');
        const navLinks = document.querySelector('.nav-links');

        mobileMenu.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });

        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(0, 0, 0, 0.98)';
            } else {
                header.style.background = 'rgba(0, 0, 0, 0.95)';
            }
        });

        // Newsletter subscription
        document.querySelector('footer button').addEventListener('click', function() {
            const email = this.previousElementSibling.value;
            if (email) {
                alert('Obrigado por se inscrever em nossa newsletter!');
                this.previousElementSibling.value = '';
            }
        });

        // Add dynamic background animation to hero
        function createFloatingElements() {
            const hero = document.querySelector('.hero');
            for (let i = 0; i < 5; i++) {
                const element = document.createElement('div');
                element.style.cssText = `
                    position: absolute;
                    width: ${Math.random() * 100 + 50}px;
                    height: ${Math.random() * 100 + 50}px;
                    background: rgba(0, 87, 255, 0.1);
                    border-radius: 50%;
                    animation: float ${Math.random() * 20 + 10}s infinite linear;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                `;
                hero.appendChild(element);
            }
        }

        // Add CSS for floating animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0% { transform: translateY(0px) rotate(0deg); opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
            }
        `;
        document.head.appendChild(style);

        createFloatingElements();
    
