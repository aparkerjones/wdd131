const practiceTips = {
  Beginner: "Great start! Aim for 15–20 minutes daily. Focus on hand position and note reading.",
  Intermediate: "Solid work! Try for 20–30 minutes per session. Add scales and sight-reading.",
  Advanced: "Excellent! Target 30+ minutes daily. Dedicate time to repertoire and expression."
};

document.addEventListener('DOMContentLoaded', () => {
  const practiceForm = document.getElementById('practice-form');
  const minutesInput = document.getElementById('minutes');
  const levelSelect = document.getElementById('practice-level');
  const resetButton = document.getElementById('reset-week');
  const practiceTbody = document.getElementById('practice-tbody');
  const weeklyTotal = document.getElementById('weekly-total');
  const practiceTip = document.getElementById('practice-tip');

  if (practiceForm) {
    loadPracticeData();
    updateTip();

    practiceForm.addEventListener('submit', (e) => {
      e.preventDefault();
      addPracticeEntry();
    });

    levelSelect.addEventListener('change', updateTip);
    
    resetButton.addEventListener('click', resetPracticeData);
  }

  function addPracticeEntry() {
    const minutes = parseInt(minutesInput.value);
    const today = new Date().toDateString();

    if (minutes > 0) {
      const practiceLog = getPracticeLog();
      
      if (practiceLog[today]) {
        practiceLog[today] += minutes;
      } else {
        practiceLog[today] = minutes;
      }

      localStorage.setItem('practiceLog', JSON.stringify(practiceLog));
      loadPracticeData();
      practiceForm.reset();
      
      showNotification(`Added ${minutes} minutes!`);
    }
  }

  function loadPracticeData() {
    const practiceLog = getPracticeLog();
    const last7Days = getLast7Days();
    let total = 0;

    practiceTbody.innerHTML = '';

    last7Days.forEach(date => {
      const dateStr = date.toDateString();
      const minutes = practiceLog[dateStr] || 0;
      total += minutes;

      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${formatDate(date)}</td>
        <td>${minutes} min</td>
      `;
      practiceTbody.appendChild(row);
    });

    weeklyTotal.textContent = `${total} min`;
  }

  function getPracticeLog() {
    return JSON.parse(localStorage.getItem('practiceLog') || '{}');
  }

  function getLast7Days() {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push(date);
    }
    return days;
  }

  function formatDate(date) {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  function updateTip() {
    const level = levelSelect.value;
    if (practiceTips[level]) {
      practiceTip.textContent = practiceTips[level];
    }
  }

  function resetPracticeData() {
    if (confirm('Reset all practice data for the last 7 days?')) {
      const practiceLog = getPracticeLog();
      const last7Days = getLast7Days();
      
      last7Days.forEach(date => {
        delete practiceLog[date.toDateString()];
      });
      
      localStorage.setItem('practiceLog', JSON.stringify(practiceLog));
      loadPracticeData();
      showNotification('Practice data reset!');
    }
  }

  function showNotification(message) {
    practiceTip.textContent = message;
    practiceTip.style.fontWeight = 'bold';
    
    setTimeout(() => {
      updateTip();
      practiceTip.style.fontWeight = 'normal';
    }, 3000);
  }
});
