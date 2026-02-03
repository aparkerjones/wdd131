
'use strict';

/* ---------- Utilities ---------- */
const $ = (sel, scope = document) => scope.querySelector(sel);
const $$ = (sel, scope = document) => Array.from(scope.querySelectorAll(sel));
const getJSON = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
};
const setJSON = (key, value) => localStorage.setItem(key, JSON.stringify(value));

/* ---------- Theme ---------- */
function getSystemPrefersDark() { return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches; }
function applyTheme(theme) {
  const html = document.documentElement;
  if (theme === 'dark') html.setAttribute('data-theme', 'dark');
  else html.removeAttribute('data-theme');
  const btn = $('#theme-toggle');
  if (btn) btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  if (btn) btn.textContent = theme === 'dark' ? 'Light mode' : 'Dark mode';
}
function initTheme() {
  const saved = localStorage.getItem('theme');
  const theme = saved ? saved : (getSystemPrefersDark() ? 'dark' : 'light');
  applyTheme(theme);
  $('#theme-toggle')?.addEventListener('click', () => {
    const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  });
}

/* ---------- Common UI ---------- */
function setActiveNav() {
  const path = location.pathname.split('/').pop() || 'index.html';
  $$('nav a').forEach(a => {
    const isActive = a.getAttribute('href') === path;
    if (isActive) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
}

function setFooterYear() {
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/* ---------- Lessons Page Logic ---------- */
function initLessonsPage() {
  const listEl = $('#lessons-list');
  const filterEl = $('#level-filter');
  if (!listEl || !filterEl) return;

  const base = {
    beginner: {
      label: 'Beginner',
      color: '#4caf50',
      basename: 'lesson-beginner'
    },
    intermediate: {
      label: 'Intermediate',
      color: '#ff8f00',
      basename: 'lesson-intermediate'
    },
    advanced: {
      label: 'Advanced',
      color: '#5e35b1',
      basename: 'lesson-advanced'
    }
  };

  /** @type {{id:string,title:string,level:'Beginner'|'Intermediate'|'Advanced',duration:string,topics:string[],basename:string,desc:string}[]} */
  const lessons = [
    { id: 'b101', title: 'Piano Foundations: Posture & Keys', level: base.beginner.label, duration: '30 min', topics: ['Posture', 'Finger numbers', 'Key names'], basename: base.beginner.basename, desc: 'Learn proper seating, relaxed hand shape, and get comfortable finding and naming white & black keys.' },
    { id: 'b102', title: 'Reading Basics: Rhythm & Notation', level: base.beginner.label, duration: '35 min', topics: ['Quarter notes', 'Staff intro', 'Basic rhythms'], basename: base.beginner.basename, desc: 'Start reading simple rhythms and notes on the treble clef with confidence.' },
    { id: 'i201', title: 'Technique Builder: Scales & Arpeggios', level: base.intermediate.label, duration: '45 min', topics: ['C/G/D scales', 'Arpeggios', 'Metronome'], basename: base.intermediate.basename, desc: 'Develop even tone and timing with structured scale practice and metronome work.' },
    { id: 'i202', title: 'Chord Progressions & Accompaniment', level: base.intermediate.label, duration: '40 min', topics: ['I–V–vi–IV', 'Broken chords', 'Left-hand patterns'], basename: base.intermediate.basename, desc: 'Play popular progressions and accompany melodies with broken chord patterns.' },
    { id: 'a301', title: 'Expressive Playing & Phrasing', level: base.advanced.label, duration: '50 min', topics: ['Dynamics', 'Rubato', 'Tone color'], basename: base.advanced.basename, desc: 'Shape phrases with dynamics and rubato to communicate musical ideas convincingly.' },
    { id: 'a302', title: 'Performance Prep: Polishing a Piece', level: base.advanced.label, duration: '55 min', topics: ['Section practice', 'Memory', 'Stage tips'], basename: base.advanced.basename, desc: 'Refine articulation, balance, and consistency while preparing for a recorded performance.' }
  ];

  function lessonImageHTML(basename, alt) {
    return `
      <img 
        src="images/${basename}-800.webp" 
        srcset="images/${basename}-400.webp 400w, images/${basename}-800.webp 800w" 
        sizes="(max-width: 600px) 100vw, 400px"
        alt="${alt}"
        width="800" height="450"
        loading="lazy" decoding="async"
      >`;
  }

  function renderList(level = 'All') {
    const data = level === 'All'
      ? lessons.slice().sort((a, b) => a.level.localeCompare(b.level))
      : lessons.filter(l => l.level === level);

    listEl.innerHTML = data.map(l => {
      const topics = l.topics.map(t => `<li>${t}</li>`).join('');
      return `
        <article class="card" data-id="${l.id}">
          ${lessonImageHTML(l.basename, `${l.level} lesson preview image`)}
          <div class="pad">
            <h3>${l.title}</h3>
            <p class="meta">${l.level} • ${l.duration}</p>
            <p>${l.desc}</p>
            <details>
              <summary>What you’ll cover</summary>
              <ul class="list">${topics}</ul>
            </details>
            <button class="btn outline enroll-btn" data-lesson="${l.id}">Add to My Plan</button>
          </div>
        </article>
      `;
    }).join('');

    // After rendering, ensure selected state is reflected
    const selectedSet = new Set(getJSON('selectedLessons', []));
    $$('.enroll-btn', listEl).forEach(btn => {
      const id = btn.dataset.lesson;
      btn.textContent = selectedSet.has(id) ? 'Remove from My Plan' : 'Add to My Plan';
    });
  }

  filterEl.addEventListener('change', e => renderList(e.target.value));

  listEl.addEventListener('click', e => {
    const btn = e.target.closest('.enroll-btn');
    if (!btn) return;
    const id = btn.dataset.lesson;
    const selected = new Set(getJSON('selectedLessons', []));
    let message = '';
    if (selected.has(id)) { selected.delete(id); message = 'Removed from your plan.'; }
    else { selected.add(id); message = 'Added to your plan.'; }
    setJSON('selectedLessons', Array.from(selected));
    btn.textContent = selected.has(id) ? 'Remove from My Plan' : 'Add to My Plan';
    const notice = $('#lessons-notice');
    if (notice) {
      notice.textContent = message;
      notice.hidden = false;
      setTimeout(() => { notice.hidden = true; }, 1600);
    }
  });

  renderList('All');
}

/* ---------- Practice Page Logic ---------- */
function initPracticePage() {
  const form = $('#practice-form');
  const tableBody = $('#practice-tbody');
  const totalEl = $('#weekly-total');
  const tipEl = $('#practice-tip');
  const levelSel = $('#practice-level');

  if (!form || !tableBody || !totalEl || !tipEl || !levelSel) return;

  function getData() { return getJSON('practiceData', {}); }
  function setData(obj) { setJSON('practiceData', obj); }

  function isoToday() {
    const d = new Date();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${m}-${day}`;
  }

  function lastNDates(n) {
    const arr = [];
    const d = new Date();
    for (let i = 0; i < n; i++) {
      const copy = new Date(d);
      copy.setDate(d.getDate() - i);
      const m = String(copy.getMonth() + 1).padStart(2, '0');
      const day = String(copy.getDate()).padStart(2, '0');
      arr.push(`${copy.getFullYear()}-${m}-${day}`);
    }
    return arr.reverse();
  }

  function renderTable() {
    const data = getData();
    const days = lastNDates(7);
    tableBody.innerHTML = days.map(date => {
      const minutes = Number(data[date] || 0);
      return `
        <tr>
          <td>${date}</td>
          <td>${minutes}</td>
        </tr>
      `;
    }).join('');

    const total = days.map(d => Number(data[d] || 0)).reduce((sum, n) => sum + n, 0);
    totalEl.textContent = `${total} min`;

    const level = levelSel.value;
    const tip = level === 'Beginner'
      ? `Nice work! Aim for 15–20 minutes daily to build consistency.`
      : level === 'Intermediate'
      ? `Great! Target focused 25–35 minute sessions on technique + repertoire.`
      : `Quality over quantity—plan 40–50 minutes with mindful phrasing & polish.`;
    tipEl.textContent = tip;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const minutes = Number($('#minutes').value);
    if (!Number.isFinite(minutes) || minutes <= 0) {
      alert('Please enter a positive number of minutes.');
      return;
    }
    const data = getData();
    const today = isoToday();
    data[today] = (Number(data[today]) || 0) + minutes;
    setData(data);
    $('#minutes').value = '';
    renderTable();
  });

  $('#reset-week')?.addEventListener('click', () => {
    if (confirm('Clear the last 7 days of practice?')) {
      const data = getData();
      lastNDates(7).forEach(d => { delete data[d]; });
      setData(data);
      renderTable();
    }
  });

  levelSel.addEventListener('change', renderTable);
  renderTable();
}

/* ---------- Contact Page Logic ---------- */
function initContactPage() {
  const form = $('#contact-form');
  if (!form) return;

  const nameEl = $('#name');
  const emailEl = $('#email');
  const skillEl = $('#skill');
  const statusEl = $('#form-status');

  const saved = getJSON('contactInfo', {});
  if (saved.name) nameEl.value = saved.name;
  if (saved.email) emailEl.value = saved.email;
  if (saved.skill) skillEl.value = saved.skill;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!nameEl.value.trim() || !emailEl.value.includes('@')) {
      statusEl.textContent = 'Please provide a valid name and email.';
      statusEl.className = 'notice';
      return;
    }
    setJSON('contactInfo', { name: nameEl.value.trim(), email: emailEl.value.trim(), skill: skillEl.value });
    const msg = `Thanks, ${nameEl.value.trim()}! We received your inquiry. Watch your inbox at ${emailEl.value.trim()} for next steps within 1–2 business days.`;
    statusEl.textContent = msg;
    statusEl.className = 'notice';
    form.reset();
  });
}

/* ---------- Boot ---------- */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  setActiveNav();
  setFooterYear();
  const page = document.body.dataset.page;
  if (page === 'lessons') initLessonsPage();
  if (page === 'practice') initPracticePage();
  if (page === 'contact') initContactPage();
});
