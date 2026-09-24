// Mobile menu toggle
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];

if (burger && mobileMenu) {
  burger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const isOpen = mobileMenu.classList.contains('open');
    burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });
}

// Sticky nav shadow
const nav = document.getElementById('site-nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    nav.classList.add('nav-scrolled');
  } else {
    nav.classList.remove('nav-scrolled');
  }
});

// Reveal on scroll (IntersectionObserver)
const reveals = document.querySelectorAll('.reveal, .reveal-stagger');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
reveals.forEach(el => observer.observe(el));

// Menu category filter
const filterButtons = document.querySelectorAll('[data-filter]');
const menuItems = document.querySelectorAll('[data-category]');
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('bg-[var(--brown)]', 'text-[var(--cream-light)]'));
    btn.classList.add('bg-[var(--brown)]', 'text-[var(--cream-light)]');
    const filter = btn.getAttribute('data-filter');
    menuItems.forEach(item => {
      if (filter === 'all' || item.getAttribute('data-category') === filter) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// Lightbox for gallery
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const galleryImgs = document.querySelectorAll('.photo-tile img');
const lightboxClose = document.getElementById('lightbox-close');
let currentIndex = 0;
const imgSrcs = Array.from(galleryImgs).map(img => ({ src: img.src, alt: img.alt }));

function openLightbox(index) {
  currentIndex = index;
  lightboxImg.src = imgSrcs[index].src;
  lightboxImg.alt = imgSrcs[index].alt;
  lightbox.classList.remove('hidden', 'opacity-0');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  lightbox.classList.add('hidden');
  document.body.style.overflow = '';
}
galleryImgs.forEach((img, i) => {
  img.parentElement.addEventListener('click', () => openLightbox(i));
});
if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightbox) {
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
}
document.addEventListener('keydown', (e) => {
  if (lightbox && !lightbox.classList.contains('hidden')) {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') openLightbox((currentIndex + 1) % imgSrcs.length);
    if (e.key === 'ArrowLeft') openLightbox((currentIndex - 1 + imgSrcs.length) % imgSrcs.length);
  }
});

// Reviews carousel (simple horizontal scroll snap, buttons)
const reviewTrack = document.getElementById('review-track');
const prevReview = document.getElementById('review-prev');
const nextReview = document.getElementById('review-next');
if (reviewTrack && prevReview && nextReview) {
  const scrollAmount = () => reviewTrack.querySelector('.review-card')?.offsetWidth + 24 || 300;
  prevReview.addEventListener('click', () => reviewTrack.scrollBy({ left: -scrollAmount(), behavior: 'smooth' }));
  nextReview.addEventListener('click', () => reviewTrack.scrollBy({ left: scrollAmount(), behavior: 'smooth' }));
}

// Dynamic year in footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
