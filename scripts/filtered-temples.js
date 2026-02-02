// Data for temples
const temples = [
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl: "images/manti-utah.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl: "images/washington-dc.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl: "images/mexico-city-mexico.jpg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl: "images/lima-peru.jpg"
  },
  {
    templeName: "Meridian Idaho",
    location: "Meridian, Idaho, United States",
    dedicated: "2017, November, 19",
    area: 67000,
    imageUrl: "images/meridian-idaho.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl: "images/payson-utah.jpg"
  },
  {
    templeName: "Rexburg Idaho",
    location: "Rexburg, Idaho, United States",
    dedicated: "2008, February, 10",
    area: 57000,
    imageUrl: "images/rexburg-idaho.jpg"
  },
  {
    templeName: "San Diego California",
    location: "San Diego, California, United States",
    dedicated: "1993, July, 31",
    area: 72000,
    imageUrl: "images/san-diego-california.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl: "images/yigo-guam.jpg"
  },
  {
    templeName: "Santiago Chile",
    location: "Providencia, Santiago, Chile",
    dedicated: "1983, September, 15",
    area: 21000,
    imageUrl: "images/santiago-chile.jpg"
  }
];

// Handle mobile nav
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

// Function to create temple cards
function createTempleCard(temple) {
  const card = document.createElement('figure');
  card.className = 'card';
  
  const img = document.createElement('img');
  img.src = temple.imageUrl;
  img.alt = temple.templeName;
  img.loading = 'lazy';
  
  const figcaption = document.createElement('figcaption');
  
  const nameEl = document.createElement('h3');
  nameEl.textContent = temple.templeName;
  
  const locationEl = document.createElement('p');
  locationEl.className = 'location';
  locationEl.textContent = temple.location;
  
  const dedicatedEl = document.createElement('p');
  dedicatedEl.className = 'dedicated';
  dedicatedEl.textContent = `Dedicated: ${temple.dedicated}`;
  
  const areaEl = document.createElement('p');
  areaEl.className = 'area';
  areaEl.textContent = `Area: ${temple.area.toLocaleString()} sq ft`;
  
  figcaption.appendChild(nameEl);
  figcaption.appendChild(locationEl);
  figcaption.appendChild(dedicatedEl);
  figcaption.appendChild(areaEl);
  
  card.appendChild(img);
  card.appendChild(figcaption);
  
  return card;
}

// Function to render temples
function renderTemples(templeList) {
  const container = document.getElementById('album-grid');
  if (!container) return;
  
  container.innerHTML = '';
  templeList.forEach(temple => {
    container.appendChild(createTempleCard(temple));
  });
}

// Filter functions
function filterTemples(filterType) {
  let filtered = temples;
  
  const currentYear = new Date().getFullYear();
  
  switch (filterType) {
    case 'old':
      filtered = temples.filter(temple => {
        const dedicatedYear = parseInt(temple.dedicated.split(',')[0]);
        return dedicatedYear < 1900;
      });
      break;
    case 'new':
      filtered = temples.filter(temple => {
        const dedicatedYear = parseInt(temple.dedicated.split(',')[0]);
        return dedicatedYear > 2000;
      });
      break;
    case 'large':
      filtered = temples.filter(temple => temple.area > 90000);
      break;
    case 'small':
      filtered = temples.filter(temple => temple.area < 10000);
      break;
    case 'home':
    default:
      filtered = temples;
      break;
  }
  
  renderTemples(filtered);
}

// Set up navigation event listeners
document.addEventListener('DOMContentLoaded', () => {
  // Initial render
  renderTemples(temples);
  
  // Set up navigation links
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const hash = link.getAttribute('href').substring(1);
      filterTemples(hash);
      
      // Close mobile menu if open
      const hamburger = document.getElementById('hamburger');
      const header = document.querySelector('.site-header');
      if (header && header.classList.contains('nav-open')) {
        header.classList.remove('nav-open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.textContent = '☰';
      }
    });
  });
});
