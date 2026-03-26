document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navItems = navLinks.querySelectorAll('a');

  const sectionIds = Array.from(navItems).map(a => a.getAttribute('href').slice(1));
  const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

  function setActiveNav() {
    const scrollY = window.scrollY;
    const navHeight = nav.offsetHeight + 80;
    let currentId = '';

    for (let i = sections.length - 1; i >= 0; i--) {
      if (scrollY >= sections[i].offsetTop - navHeight) {
        currentId = sections[i].id;
        break;
      }
    }

    navItems.forEach(link => {
      const href = link.getAttribute('href').slice(1);
      link.classList.toggle('active', href === currentId);
    });
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
    if (!ticking) {
      requestAnimationFrame(() => {
        setActiveNav();
        ticking = false;
      });
      ticking = true;
    }
  });

  setActiveNav();

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navItems.forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -40px 0px' };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animTargets = [
    '.theme-card', '.featured-card', '.pub-item',
    '.industry-item', '.grant-item', '.skill-group',
    '.about-card', '.about-text', '.honor-item'
  ];

  animTargets.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('fade-in');
      el.style.transitionDelay = `${i * 80}ms`;
      observer.observe(el);
    });
  });
});
