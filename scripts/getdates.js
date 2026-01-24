// getdates.js - footer dates

(function() {
  // Display current year
  const yearEl = document.getElementById('currentyear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Display last modified date
  const modEl = document.getElementById('lastModified');
  if (modEl) {
    modEl.textContent = 'Last modified: ' + document.lastModified;
  }
})();
