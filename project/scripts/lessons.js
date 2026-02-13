const lessons = [
  {
    id: 1,
    title: "Hand Position & Posture",
    level: "Beginner",
    duration: "15 min",
    topics: ["Sitting position", "Hand shape", "Finger numbers"]
  },
  {
    id: 2,
    title: "Reading Notes: Middle C to G",
    level: "Beginner",
    duration: "20 min",
    topics: ["Treble clef", "Bass clef", "Note recognition"]
  },
  {
    id: 3,
    title: "Simple Rhythms",
    level: "Beginner",
    duration: "15 min",
    topics: ["Quarter notes", "Half notes", "Whole notes", "Counting"]
  },
  {
    id: 4,
    title: "Major Scales: C, G, D",
    level: "Intermediate",
    duration: "25 min",
    topics: ["Scale patterns", "Fingering", "Key signatures"]
  },
  {
    id: 5,
    title: "Chord Progressions",
    level: "Intermediate",
    duration: "30 min",
    topics: ["I-IV-V", "Major triads", "Minor triads", "Inversions"]
  },
  {
    id: 6,
    title: "Arpeggios & Broken Chords",
    level: "Intermediate",
    duration: "20 min",
    topics: ["Arpeggio technique", "Patterns", "Speed building"]
  },
  {
    id: 7,
    title: "Expressive Playing",
    level: "Advanced",
    duration: "35 min",
    topics: ["Dynamics", "Phrasing", "Rubato", "Pedaling"]
  },
  {
    id: 8,
    title: "Advanced Repertoire Study",
    level: "Advanced",
    duration: "40 min",
    topics: ["Score analysis", "Practice strategies", "Performance preparation"]
  },
  {
    id: 9,
    title: "Sight-Reading Skills",
    level: "Advanced",
    duration: "25 min",
    topics: ["Quick recognition", "Pattern reading", "Error recovery"]
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const levelFilter = document.getElementById('level-filter');
  const lessonsList = document.getElementById('lessons-list');
  const lessonsNotice = document.getElementById('lessons-notice');

  if (levelFilter && lessonsList) {
    displayLessons('All');

    levelFilter.addEventListener('change', (e) => {
      const selectedLevel = e.target.value;
      displayLessons(selectedLevel);
    });
  }

  function displayLessons(level) {
    const filteredLessons = level === 'All' 
      ? lessons 
      : lessons.filter(lesson => lesson.level === level);

    if (filteredLessons.length === 0) {
      lessonsNotice.textContent = `No lessons found for ${level}.`;
      lessonsNotice.hidden = false;
      lessonsList.innerHTML = '';
      return;
    }

    lessonsNotice.hidden = true;
    
    lessonsList.innerHTML = filteredLessons.map(lesson => `
      <article class="card">
        <div class="pad">
          <h3>${lesson.title}</h3>
          <p class="meta"><strong>${lesson.level}</strong> • ${lesson.duration}</p>
          <p><strong>Topics:</strong> ${lesson.topics.join(', ')}</p>
        </div>
      </article>
    `).join('');
  }
});
