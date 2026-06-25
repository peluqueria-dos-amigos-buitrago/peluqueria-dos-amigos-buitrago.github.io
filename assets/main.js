document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('#menu');
  
  if (toggle && menu) {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.innerHTML = open ? '✕' : '☰';
    });

    // Close menu when clicking on a link
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.innerHTML = '☰';
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target) && !toggle.contains(e.target) && menu.classList.contains('open')) {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.innerHTML = '☰';
      }
    });

    // Close menu on Escape key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('open')) {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.innerHTML = '☰';
        toggle.focus();
      }
    });
  }

  // Intersection Observer for scroll reveal animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.12
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target); // Animates only once
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach((el, index) => {
    // Dynamically add staggered animation delays to siblings in grids/lists if not hardcoded
    const parent = el.parentElement;
    if (parent && (parent.classList.contains('cards') || parent.classList.contains('zone-grid') || parent.classList.contains('method-grid') || parent.classList.contains('trust-list'))) {
      const position = Array.from(parent.children).indexOf(el);
      if (position > 0) {
        const delayClass = `delay-${Math.min(position, 4)}`;
        el.classList.add(delayClass);
      }
    }
    revealObserver.observe(el);
  });
});
