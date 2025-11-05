// Navigation: hamburger toggle and keyboard support
(function () {
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  if (navToggle && navLinks) {
    function toggleNav() {
      const open = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
      if (open) {
        const firstLink = navLinks.querySelector('a');
        if (firstLink) firstLink.focus();
      }
    }
    navToggle.addEventListener('click', toggleNav);
    navToggle.addEventListener('keydown', (e) => {
      if ((e.key === 'Enter' || e.key === ' ') && !e.repeat) {
        e.preventDefault();
        toggleNav();
      }
    });
  }
})();

// Carousel component (Projects page)
(function () {
  const carousel = document.querySelector('[data-carousel]');
  if (!carousel) return;
  const track = carousel.querySelector('[data-carousel-track]');
  const prevBtn = carousel.querySelector('[data-carousel-prev]');
  const nextBtn = carousel.querySelector('[data-carousel-next]');
  const dotsWrap = carousel.querySelector('[data-carousel-dots]');
  const slides = Array.from(track.children);
  let index = 0;

  function update() {
    track.style.transform = `translateX(-${index * 100}%)`;
    const dots = dotsWrap.querySelectorAll('button');
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
  }

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    update();
  }

  prevBtn?.addEventListener('click', () => goTo(index - 1));
  nextBtn?.addEventListener('click', () => goTo(index + 1));

  // Dots
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  // Auto-advance
  let timer = setInterval(() => goTo(index + 1), 6000);
  function resetTimer() { clearInterval(timer); timer = setInterval(() => goTo(index + 1), 6000); }
  carousel.addEventListener('pointerdown', resetTimer);
  prevBtn?.addEventListener('click', resetTimer);
  nextBtn?.addEventListener('click', resetTimer);

  update();
})();

// Contact form validation
(function () {
  const form = document.getElementById('contact-form');
  if (!form) return;
  const nameEl = form.querySelector('input[name="name"]');
  const emailEl = form.querySelector('input[name="email"]');
  const messageEl = form.querySelector('textarea[name="message"]');
  const errorEl = form.querySelector('[data-error]');

  function showError(msg) {
    if (!errorEl) return;
    errorEl.textContent = msg;
  }

  function clearError() { showError(''); }

  form.addEventListener('submit', (e) => {
    clearError();
    const name = nameEl?.value.trim();
    const email = emailEl?.value.trim();
    const message = messageEl?.value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name) { e.preventDefault(); showError('Please enter your name.'); nameEl?.focus(); return; }
    if (!email || !emailRegex.test(email)) { e.preventDefault(); showError('Please enter a valid email.'); emailEl?.focus(); return; }
    if (!message || message.length < 10) { e.preventDefault(); showError('Message should be at least 10 characters.'); messageEl?.focus(); return; }

    // For demo only
    e.preventDefault();
    showError('');
    form.reset();
    alert('Thanks! Your message has been submitted.');
  });
})();


