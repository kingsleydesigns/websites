// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 2000,
    once: true,
  });
  
  // Initialize VanillaTilt
  VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
    max: 15,
    speed: 400,
    scale: 1.05
  });
  
  // Optional: Register Service Worker for PWA
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(reg => console.log('Service worker registered.'))
        .catch(err => console.error('Service worker registration failed:', err));
    });
  }

// Preloader js
// Wait until everything is loaded
window.addEventListener('load', function () {
    const preloader = document.getElementById('preloader');
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 500);
      }, 1000); // Delay the whole fade by 1s // match transition in CSS
  });
  

const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.nav-bar');

hamButton.addEventListener('click', () => {
	navigation.classList.toggle('open');
	hamButton.classList.toggle('open');
});


// Counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 400; // Lower = faster
  
    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / speed;
  
        if (count < target) {
          counter.innerText = Math.ceil(count + increment);
          setTimeout(updateCount, 10);
        } else {
          counter.innerText = target + '+'; // Optional: Add +
        }
      };
  
      updateCount();
    });
  }
  
  // Trigger only once when section is visible
  let statsAnimated = false;
  window.addEventListener('scroll', () => {
    const statsSection = document.getElementById('stats');
    const sectionTop = statsSection.getBoundingClientRect().top;
    const triggerPoint = window.innerHeight - 100;
  
    if (sectionTop < triggerPoint && !statsAnimated) {
      animateCounters();
      statsAnimated = true;
    }
  });
  