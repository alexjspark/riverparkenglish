// Mobile navigation + subtle scroll animations
(function () {
  var navToggle = document.getElementById('navToggle');
  var navMenu = document.getElementById('navMenu');
  var nav = document.getElementById('nav');

  var overlay = document.createElement('div');
  overlay.className = 'nav__overlay';
  document.body.appendChild(overlay);

  function closeMenu() {
    navMenu.classList.remove('nav__menu--open');
    navToggle.classList.remove('nav__toggle--open');
    overlay.classList.remove('nav__overlay--visible');
    document.body.style.overflow = '';
  }

  function openMenu() {
    navMenu.classList.add('nav__menu--open');
    navToggle.classList.add('nav__toggle--open');
    overlay.classList.add('nav__overlay--visible');
    document.body.style.overflow = 'hidden';
  }

  navToggle.addEventListener('click', function () {
    navMenu.classList.contains('nav__menu--open') ? closeMenu() : openMenu();
  });

  overlay.addEventListener('click', closeMenu);
  navMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  function onScroll() {
    if (window.scrollY > 20) nav.classList.add('nav--scrolled');
    else nav.classList.remove('nav--scrolled');
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.feature-card, .program-card, .price-card, .review-grid blockquote, .flow-grid div, .worry-list div').forEach(function (el) {
      observer.observe(el);
    });
  }
})();
