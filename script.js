// ===== Mobile Menu Toggle =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// ===== Hero Slider =====
const heroSlider = document.querySelector('.hero-slider');
const heroSlides = document.querySelectorAll('.hero-slide');
const prevBtn = document.querySelector('.slider-control.prev');
const nextBtn = document.querySelector('.slider-control.next');
const dotsContainer = document.querySelector('.slider-dots');

let currentSlide = 0;
const totalSlides = heroSlides.length;

// Create dots
for (let i = 0; i < totalSlides; i++) {
  const dot = document.createElement('div');
  dot.classList.add('slider-dot');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goToSlide(i));
  dotsContainer.appendChild(dot);
}

const dots = document.querySelectorAll('.slider-dot');

function updateSlider() {
  heroSlides.forEach((slide, index) => {
    slide.classList.toggle('active', index === currentSlide);
  });
  
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide);
  });
}

function goToSlide(slideIndex) {
  currentSlide = slideIndex;
  if (currentSlide >= totalSlides) currentSlide = 0;
  if (currentSlide < 0) currentSlide = totalSlides - 1;
  updateSlider();
}

function nextSlide() {
  currentSlide++;
  if (currentSlide >= totalSlides) currentSlide = 0;
  updateSlider();
}

function prevSlide() {
  currentSlide--;
  if (currentSlide < 0) currentSlide = totalSlides - 1;
  updateSlider();
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Auto-slide every 5 seconds
let slideInterval = setInterval(nextSlide, 5000);

heroSlider.addEventListener('mouseenter', () => {
  clearInterval(slideInterval);
});

heroSlider.addEventListener('mouseleave', () => {
  slideInterval = setInterval(nextSlide, 5000);
});

// ===== Testimonials Slider =====
const testimonialSlider = document.querySelector('.testimonials-slider');
const testimonials = document.querySelectorAll('.testimonial');
const testimonialPrevBtn = document.querySelector('.testimonial-control.prev');
const testimonialNextBtn = document.querySelector('.testimonial-control.next');
const testimonialDotsContainer = document.querySelector('.testimonial-dots');

let currentTestimonial = 0;
const totalTestimonials = testimonials.length;

// Create testimonial dots
for (let i = 0; i < totalTestimonials; i++) {
  const dot = document.createElement('div');
  dot.classList.add('testimonial-dot');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goToTestimonial(i));
  testimonialDotsContainer.appendChild(dot);
}

const testimonialDots = document.querySelectorAll('.testimonial-dot');

function updateTestimonialSlider() {
  testimonials.forEach((testimonial, index) => {
    testimonial.classList.toggle('active', index === currentTestimonial);
  });
  
  testimonialDots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentTestimonial);
  });
}

function goToTestimonial(slideIndex) {
  currentTestimonial = slideIndex;
  updateTestimonialSlider();
}

function nextTestimonial() {
  currentTestimonial++;
  if (currentTestimonial >= totalTestimonials) currentTestimonial = 0;
  updateTestimonialSlider();
}

function prevTestimonial() {
  currentTestimonial--;
  if (currentTestimonial < 0) currentTestimonial = totalTestimonials - 1;
  updateTestimonialSlider();
}

testimonialNextBtn.addEventListener('click', nextTestimonial);
testimonialPrevBtn.addEventListener('click', prevTestimonial);

// Auto-slide testimonials every 7 seconds
let testimonialInterval = setInterval(nextTestimonial, 7000);

testimonialSlider.addEventListener('mouseenter', () => {
  clearInterval(testimonialInterval);
});

testimonialSlider.addEventListener('mouseleave', () => {
  testimonialInterval = setInterval(nextTestimonial, 7000);
});

// ===== Stats Counter Animation =====
const statNumbers = document.querySelectorAll('.stat-number');
const statsSection = document.querySelector('.stats');

function animateStats() {
  statNumbers.forEach(stat => {
    const target = +stat.getAttribute('data-count');
    const suffix = stat.textContent.includes('%') ? '%' : '';
    const duration = 2000; // Animation duration in ms
    const step = target / (duration / 16); // 60fps
    
    let current = 0;
    
    const counter = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(counter);
      }
      stat.textContent = Math.floor(current) + suffix;
    }, 16);
  });
}

// Only animate when stats section is in view
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateStats();
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statsObserver.observe(statsSection);

// ===== Back to Top Button =====
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopBtn.classList.add('active');
  } else {
    backToTopBtn.classList.remove('active');
  }
});

backToTopBtn.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ===== Form Submission =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Here you would normally send the data to your server
    console.log('Form submitted:', data);
    
    // Show success message
    alert('Merci pour votre message! Nous vous contacterons bientôt.');
    contactForm.reset();
  });
}

// ===== Smooth Scrolling for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// ===== Header Scroll Effect =====
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});