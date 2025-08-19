// ===== AOS and VanillaTilt Initialization =====
AOS.init({
    duration: 1000,
    once: true
  });
  
//   VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
//     max: 15,
//     speed: 400,
//     scale: 1.05
//   });
  
  // ===== Hero Image Slider =====
  const heroImages = document.querySelectorAll('.hero img');
  let currentSlide = 0;
  
  function showSlide(index) {
    heroImages.forEach((img, i) => {
      img.classList.toggle('active', i === index);
    });
  }
  
  function nextSlide() {
    currentSlide = (currentSlide + 1) % heroImages.length;
    showSlide(currentSlide);
  }
  
  setInterval(nextSlide, 4000); // Change image every 4s
  showSlide(currentSlide);
  
  // ===== Smooth Scroll on Nav Click =====
  document.querySelectorAll('nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
  
  // ===== Gallery Filter =====
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      galleryItems.forEach(item => {
        item.style.display = (filter === 'all' || item.getAttribute('data-category') === filter) ? 'block' : 'none';
      });
    });
  });
  
// Glightbox
const lightbox = GLightbox({
    selector: '.glightbox'
  });