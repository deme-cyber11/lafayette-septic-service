/* ============================================
   Lafayette Septic Service - Main JS
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* --- Mobile Nav Toggle --- */
  const navToggle = document.querySelector('.nav-toggle');
  const navMobile = document.querySelector('.nav-mobile');
  if (navToggle && navMobile) {
    navToggle.addEventListener('click', function () {
      const isOpen = navMobile.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    /* Mobile sub-menu toggles */
    navMobile.querySelectorAll('.mobile-sub-toggle').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const sub = btn.nextElementSibling;
        const isActive = btn.classList.toggle('active');
        sub.style.display = isActive ? 'block' : 'none';
      });
    });
    /* Close nav on link click */
    navMobile.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navMobile.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* --- Hero Before/After Slider --- */
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.slider-dot');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  let currentSlide = 0;
  let slideInterval;

  function goToSlide(index) {
    if (!slides.length) return;
    slides[currentSlide].classList.remove('active');
    if (dots[currentSlide]) dots[currentSlide].classList.remove('active');
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) dots[currentSlide].classList.add('active');
  }

  function startAutoplay() {
    slideInterval = setInterval(function () {
      goToSlide(currentSlide + 1);
    }, 4000);
  }

  function resetAutoplay() {
    clearInterval(slideInterval);
    startAutoplay();
  }

  if (slides.length > 1) {
    startAutoplay();
    if (prevBtn) prevBtn.addEventListener('click', function () { goToSlide(currentSlide - 1); resetAutoplay(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { goToSlide(currentSlide + 1); resetAutoplay(); });
    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () { goToSlide(i); resetAutoplay(); });
    });
  }

  /* --- FAQ Accordion --- */
  document.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const item = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isOpen = item.classList.toggle('open');
      answer.style.maxHeight = isOpen ? answer.scrollHeight + 'px' : '0';
    });
  });

  /* --- Sticky Header shadow on scroll --- */
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        header.style.boxShadow = '0 2px 16px rgba(0,0,0,.12)';
      } else {
        header.style.boxShadow = '0 2px 8px rgba(0,0,0,.08)';
      }
    }, { passive: true });
  }

  /* --- Smooth scroll for anchor links --- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
