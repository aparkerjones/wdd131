// handle mobile nav
(function () {
  const header = document.querySelector('.site-header');
  const btn = document.getElementById('hamburger');
  const menu = document.getElementById('primary-menu');

  if (!header || !btn || !menu) return;

  const open = () => {
    header.classList.add('nav-open');
    btn.setAttribute('aria-expanded', 'true');
    btn.textContent = '✕';
  };

  const close = () => {
    header.classList.remove('nav-open');
    btn.setAttribute('aria-expanded', 'false');
    btn.textContent = '☰';
  };

  const toggle = () => {
    header.classList.contains('nav-open') ? close() : open();
  };

  btn.addEventListener('click', toggle);

  // close when clicking outside
  document.addEventListener('click', (e) => {
    if (!header.contains(e.target) && !menu.contains(e.target) && header.classList.contains('nav-open')) {
      close();
    }
  });

  // close on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && header.classList.contains('nav-open')) {
      close();
      btn.focus();
    }
  });
})();
