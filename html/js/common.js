//toggle button
const setupDropdowns = () => {
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

// footer copy
const copyDv = () => {
  const origin = document.querySelector('.footer-info .copy')
  origin.classList.add('mt-0');
  document.querySelector('.footer-link').appendChild(origin.cloneNode(true));
  origin.remove();
}

//tab menu sort
const initTabs = (containerSelector, type) => {
  const container = document.querySelector(containerSelector);
  if (!container) return; // Exit if container not found

  const tabMenus = container.querySelectorAll('.tab-menu');
  const tabContents = container.querySelectorAll('.tab-content__wrap .tab-content');

  tabMenus.forEach(tab => {
      tab.addEventListener('click', () => {
          // Step 1: Always handle the active state for the clicked tab menu.
          tabMenus.forEach(el => el.classList.remove('is-active'));
          tab.classList.add('is-active');

          // Step 2: Conditionally handle the content panels based on type.
          if (type !== 'sort') {
              const targetId = tab.getAttribute('data-tab');
              const targetContent = container.querySelector(`#${targetId}`);

              tabContents.forEach(el => el.classList.remove('is-active'));
              if (targetContent) {
                  targetContent.classList.add('is-active');
              }
          }
      });
  });
};
const tabMenu = (type = 'full') => {
  if (type === 'sort') {
      // Initializes the tab system that only handles the active state of menus.
      initTabs('.tab-container-sort', 'sort');
  } else {
      // Initializes the full-featured tab system by default.
      initTabs('.tab-container-full', 'full');
  }
};
// faq
const accordion = () => {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
      const questionButton = item.querySelector('.faq-question');
      questionButton.addEventListener('click', () => {
          const isActive = item.classList.contains('is-active');
          
          // Optional: Close all other items
          // faqItems.forEach(otherItem => {
          //     otherItem.classList.remove('is-active');
          // });

          // Toggle the clicked item
          if (!isActive) {
              item.classList.add('is-active');
          } else {
              item.classList.remove('is-active');
          }
      });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupDropdowns();
  copyDv();
  tabMenu('sort');
  accordion();
});