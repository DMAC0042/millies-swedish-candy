/* ================================================
   MILLIE'S SWEDISH CANDY CO. - Main JavaScript
   ================================================ */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all modules
  initMobileNav();
  initScrollAnimations();
  initForms();
  initSmoothScroll();
});

/* ================================================
   MOBILE NAVIGATION
   ================================================ */
function initMobileNav() {
  const toggle = document.querySelector('.nav__mobile-toggle');
  const menu = document.querySelector('.nav__mobile-menu');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', function() {
    const isOpen = menu.classList.contains('active');

    menu.classList.toggle('active');
    toggle.setAttribute('aria-expanded', !isOpen);

    // Animate hamburger to X
    const spans = toggle.querySelectorAll('span');
    if (!isOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });

  // Close menu when clicking on a link
  const mobileLinks = menu.querySelectorAll('.nav__mobile-link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', function() {
      menu.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');

      const spans = toggle.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!menu.contains(e.target) && !toggle.contains(e.target) && menu.classList.contains('active')) {
      menu.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');

      const spans = toggle.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });
}

/* ================================================
   SCROLL ANIMATIONS
   ================================================ */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('[data-animate]');

  if (!animatedElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add delay if specified
        const delay = entry.target.dataset.animateDelay || 0;
        setTimeout(() => {
          entry.target.classList.add('animated');
        }, delay);

        // Unobserve after animation
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  animatedElements.forEach(el => {
    observer.observe(el);
  });
}

/* ================================================
   FORM HANDLING
   ================================================ */
function initForms() {
  const forms = document.querySelectorAll('[data-form]');

  forms.forEach(form => {
    form.addEventListener('submit', handleFormSubmit);
  });
}

async function handleFormSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const submitBtn = form.querySelector('[type="submit"]');
  const formContainer = form.closest('.form');
  const successMessage = formContainer?.querySelector('.form__success');

  // Validate form
  if (!validateForm(form)) {
    return;
  }

  // Show loading state
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;

  // Get form data
  const formData = new FormData(form);
  const formAction = form.getAttribute('action');

  try {
    // If using Formspree or similar service
    if (formAction && formAction.includes('formspree')) {
      const response = await fetch(formAction, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        showSuccess(form, formContainer, successMessage);
      } else {
        throw new Error('Form submission failed');
      }
    } else {
      // Fallback: simulate success for demo purposes
      // In production, replace with your actual form handler
      await new Promise(resolve => setTimeout(resolve, 1000));
      showSuccess(form, formContainer, successMessage);
    }
  } catch (error) {
    console.error('Form submission error:', error);
    submitBtn.textContent = 'Error - Try Again';
    submitBtn.disabled = false;

    setTimeout(() => {
      submitBtn.textContent = originalText;
    }, 3000);
  }
}

function showSuccess(form, formContainer, successMessage) {
  if (successMessage) {
    form.style.display = 'none';
    successMessage.classList.add('active');
  } else {
    // Fallback alert
    alert('Thank you! Your submission has been received.');
    form.reset();
  }
}

function validateForm(form) {
  const requiredFields = form.querySelectorAll('[required]');
  let isValid = true;

  requiredFields.forEach(field => {
    // Remove previous error styling
    field.classList.remove('error');

    if (!field.value.trim()) {
      field.classList.add('error');
      isValid = false;
    }

    // Email validation
    if (field.type === 'email' && field.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(field.value)) {
        field.classList.add('error');
        isValid = false;
      }
    }
  });

  if (!isValid) {
    // Focus first error field
    const firstError = form.querySelector('.error');
    if (firstError) {
      firstError.focus();
    }
  }

  return isValid;
}

/* ================================================
   SMOOTH SCROLL
   ================================================ */
function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');

      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        e.preventDefault();

        const navHeight = document.querySelector('.nav')?.offsetHeight || 0;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ================================================
   NAV SCROLL EFFECT (optional enhancement)
   ================================================ */
function initNavScroll() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }

    lastScroll = currentScroll;
  });
}

/* ================================================
   UTILITY: Set current year in footer
   ================================================ */
document.addEventListener('DOMContentLoaded', function() {
  const yearSpans = document.querySelectorAll('[data-year]');
  const currentYear = new Date().getFullYear();

  yearSpans.forEach(span => {
    span.textContent = currentYear;
  });
});
