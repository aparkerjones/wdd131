document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      skill: document.getElementById('skill').value,
      availability: document.getElementById('availability').value,
      message: document.getElementById('message').value,
      timestamp: new Date().toISOString()
    };

    saveSubmission(formData);
    showSuccessMessage(formData.name);
    contactForm.reset();
  }

  function saveSubmission(data) {
    const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
    submissions.push(data);
    localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
  }

  function showSuccessMessage(name) {
    formStatus.className = 'notice';
    formStatus.innerHTML = `<strong>Success!</strong> Thanks ${name}, we received your message and will reply within 1–2 business days.`;
    
    setTimeout(() => {
      formStatus.className = '';
      formStatus.innerHTML = '';
    }, 8000);
  }
});
