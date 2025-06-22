//toggle button
function setupDropdowns() {
  const toggleTriggers = document.querySelectorAll('.dropdown-wrap button');

  toggleTriggers.forEach(el => {
    el.addEventListener('click', () => {
      el.classList.toggle('is-active');

      if (el.nextElementSibling) {
        el.nextElementSibling.classList.toggle('is-open');
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupDropdowns();
});