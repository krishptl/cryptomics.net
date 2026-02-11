// Main interaction and animation logic for Cryptomics landing page

// Wait for DOM to be fully parsed
window.addEventListener('DOMContentLoaded', () => {
  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // FAQ accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const button = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');

    if (!button || !answer || !icon) return;

    button.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqItems.forEach((other) => {
        other.classList.remove('open');
        const otherAnswer = other.querySelector('.faq-answer');
        const otherIcon = other.querySelector('.faq-icon');
        if (otherAnswer && otherIcon) {
          otherAnswer.style.maxHeight = null;
          otherIcon.textContent = '+';
        }
      });

      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        icon.textContent = '–';
      }
    });
  });

  const headerEl = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.nav a[href^="#"]');
  const sections = Array.from(document.querySelectorAll('main section[id]'));

  const setActiveNav = () => {
    const scrollPos = window.scrollY;
    const offset = headerEl ? headerEl.offsetHeight + 24 : 80;

    let currentId = '';
    for (const section of sections) {
      const top = section.offsetTop - offset - 40;
      if (scrollPos >= top) {
        currentId = section.id;
      }
    }

    navLinks.forEach((link) => {
      const href = link.getAttribute('href') || '';
      const targetId = href.startsWith('#') ? href.slice(1) : null;
      if (targetId && targetId === currentId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  const setHeaderScrolled = () => {
    if (!headerEl) return;
    if (window.scrollY > 10) {
      headerEl.classList.add('scrolled');
    } else {
      headerEl.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', () => {
    setHeaderScrolled();
    setActiveNav();
  });

  // Smooth scroll with header offset for in-page nav links
  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href') || '';
      if (!href.startsWith('#')) return;

      const targetId = href.slice(1);
      const target = document.getElementById(targetId);
      if (!target) return;

      event.preventDefault();
      const headerOffset = headerEl ? headerEl.offsetHeight + 12 : 72;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerOffset;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    });
  });

  // Scroll reveal using IntersectionObserver with gentle stagger
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealElements.length) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    revealElements.forEach((el, index) => {
      el.style.transitionDelay = `${Math.min(index * 40, 200)}ms`;
      revealObserver.observe(el);
    });
  } else {
    revealElements.forEach((el) => el.classList.add('reveal-visible'));
  }

  // Hero entrance animation (text + buttons)
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.classList.add('hero-loaded');
  }

  // Initialize state on load
  setHeaderScrolled();
  setActiveNav();
});
