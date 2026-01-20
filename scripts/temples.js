(function () {
  const header = document.querySelector('.site-header');
  const button = document.getElementById('hamburger');
  const menu = document.getElementById('primary-menu');

  if (!header || !button || !menu) return;

  const openMenu = () => {
    header.classList.add('nav-open');
    button.setAttribute('aria-expanded', 'true');
    button.textContent = '✕';        // change symbol to "X"
  };

  const closeMenu = () => {
    header.classList.remove('nav-open');
    button.setAttribute('aria-expanded', 'false');
    button.textContent = '☰';        // change symbol back to hamburger
  };

  const toggleMenu = () => {
    const isOpen = header.classList.contains('nav-open');
    isOpen ? closeMenu() : openMenu();
  };

  button.addEventListener('click', toggleMenu);

  // Optional: close menu when focus leaves nav on mobile
  document.addEventListener('click', (e) => {
    const clickInside = header.contains(e.target) || menu.contains(e.target);
    if (!clickInside && header.classList.contains('nav-open')) {
      closeMenu();
    }
  });

  // Optional: close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && header.classList.contains('nav-open')) {
      closeMenu();
      button.focus();
    }
  });
})();
