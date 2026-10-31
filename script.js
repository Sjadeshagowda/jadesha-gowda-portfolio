/**
 * ===================================================================
 * PORTFOLIO CLIENT ENGINE — S JADESHA GOWDA
 * Pure Vanilla JavaScript (ES6+) | Chart.js Data-Driven Integration
 * Accessible Modals | WCAG AA Interactions | Theme Controller
 * ===================================================================
 */

'use strict';

/* ===================================================================
   CAREER SNAPSHOT DATA CONFIGURATION OBJECT
   CRITICAL DATA INTEGRITY RULE:
   Official numerical scores and proficiency percentages are omitted
   by default. To display live Chart.js visualizations, update the
   numerical values below and switch `isVerifiedDataProvided` to `true`.
   =================================================================== */
const careerChartData = {
  // Set to true once verified numbers and evaluation scores are ready
  isVerifiedDataProvided: false,

  // Chart A: Skills Radar Domains
  skillsRadar: {
    labels: ['AI / ML', 'ServiceNow', 'Python', 'Web & Databases', 'Cloud'],
    datasets: [{
      label: 'Verified Skill Affinity (0-100)',
      data: [88, 92, 90, 82, 78], // Sample values activated upon verification
      backgroundColor: 'rgba(59, 130, 246, 0.15)',
      borderColor: '#3b82f6',
      borderWidth: 2,
      pointBackgroundColor: '#3b82f6',
      pointBorderColor: '#ffffff',
      pointHoverBackgroundColor: '#ffffff',
      pointHoverBorderColor: '#3b82f6',
      pointRadius: 4
    }]
  },

  // Chart B: Target Role Fit
  roleFit: {
    labels: ['ServiceNow Developer', 'Software Engineer', 'AI/ML Engineer'],
    datasets: [{
      label: 'Target Alignment Score (%)',
      data: [95, 90, 88], // Sample values activated upon verification
      backgroundColor: [
        '#3b82f6',
        '#64748b',
        '#94a3b8'
      ],
      borderColor: [
        '#2563eb',
        '#475569',
        '#64748b'
      ],
      borderWidth: 1,
      borderRadius: 6
    }]
  },

  // Chart C: Chronological Milestones
  certificationTimeline: {
    labels: [
      '2021: Secondary (85%)',
      '2023: Higher Secondary (68%)',
      'Infosys Springboard (DSA Using Java & Introduction to AI)',
      'EZ Training and Technology (Python Programming)',
      'CyberSecure \'25 Hackathon',
      'Apr 2026: AWS Cloud Quest (Credly)',
      'May 2026: Welcome to ServiceNow (Credly)',
      'Jun 2026: ServiceNow CAD (Credly)',
      'Jul 2026: ServiceNow CSA (Credly)'
    ],
    datasets: [{
      label: 'Milestone Progress Level',
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59, 130, 246, 0.08)',
      borderWidth: 2,
      fill: true,
      tension: 0.35,
      pointBackgroundColor: '#3b82f6',
      pointRadius: 5,
      pointHoverRadius: 7
    }]
  }
};

/* Global Chart instances store for dynamic updates */
let chartInstances = {
  radar: null,
  roleFit: null,
  timeline: null
};

/* ===================================================================
   DOCUMENT READY INITIALIZATION
   =================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavbar();
  initTypewriter();
  initProjectFilters();
  initProjectModals();
  initSTSSGalleryCarousel();
  initCareerCharts();
  initContactForm();
  initBackToTop();
  updateCurrentYear();
  initScrollSpy();
});

/* ===================================================================
   1. THEME MANAGEMENT (LIGHT / DARK)
   =================================================================== */
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('portfolio-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Set default theme: stored theme, else dark theme default
  const activeTheme = storedTheme ? storedTheme : 'dark';
  applyTheme(activeTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = current === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
      updateChartTheme();
    });
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const toggleBtn = document.getElementById('theme-toggle');
  if (toggleBtn) {
    toggleBtn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
    toggleBtn.setAttribute('title', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
  }
}

/* ===================================================================
   2. NAVBAR & MOBILE DRAWER CONTROLLER
   =================================================================== */
function initNavbar() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const drawer = document.getElementById('mobile-nav-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (!menuBtn || !drawer) return;

  function toggleMenu(open) {
    const shouldOpen = open !== undefined ? open : !drawer.classList.contains('open');
    if (shouldOpen) {
      drawer.classList.add('open');
      drawer.removeAttribute('aria-hidden');
      menuBtn.setAttribute('aria-expanded', 'true');
      menuBtn.setAttribute('aria-label', 'Close mobile navigation menu');
      document.body.style.overflow = 'hidden';
    } else {
      drawer.classList.remove('open');
      drawer.setAttribute('aria-hidden', 'true');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.setAttribute('aria-label', 'Open mobile navigation menu');
      document.body.style.overflow = '';
    }
  }

  menuBtn.addEventListener('click', () => toggleMenu());

  // Close when clicking any nav link
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  // Close on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      toggleMenu(false);
      menuBtn.focus();
    }
  });

  // Close when clicking outside drawer content
  drawer.addEventListener('click', (e) => {
    if (e.target === drawer) {
      toggleMenu(false);
    }
  });
}

/* ===================================================================
   3. SCROLL SPY ACTIVE NAV LINK HIGHLIGHTING
   =================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('.nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (!sections.length || !('IntersectionObserver' in window)) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        setActiveNav(id);
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  function setActiveNav(id) {
    desktopLinks.forEach(link => {
      if (link.getAttribute('href') === `#${id}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    mobileLinks.forEach(link => {
      if (link.getAttribute('href') === `#${id}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
}

/* ===================================================================
   4. ROTATING ROLE TITLES TYPING ANIMATION
   =================================================================== */
function initTypewriter() {
  const targetElement = document.getElementById('typewriter-text');
  if (!targetElement) return;

  // Respect user preference for reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    targetElement.textContent = 'Software & AI/ML Engineer';
    return;
  }

  const roles = [
    'Aspiring Software Engineer',
    'AI/ML Engineer',
    'ServiceNow Developer'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 85;
  const eraseSpeed = 45;
  const holdDelay = 1800;

  function typeTick() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      charIndex--;
      targetElement.textContent = currentRole.substring(0, charIndex);
    } else {
      charIndex++;
      targetElement.textContent = currentRole.substring(0, charIndex);
    }

    let nextDelay = isDeleting ? eraseSpeed : typeSpeed;

    if (!isDeleting && charIndex === currentRole.length) {
      // Completed typing current word
      isDeleting = true;
      nextDelay = holdDelay;
    } else if (isDeleting && charIndex === 0) {
      // Completed deleting current word
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      nextDelay = 400;
    }

    setTimeout(typeTick, nextDelay);
  }

  typeTick();
}

/* ===================================================================
   5. DYNAMIC PROJECT FILTERING
   =================================================================== */
function initProjectFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const featuredCards = document.querySelectorAll('.featured-projects-grid .project-card');
  const compactCards = document.querySelectorAll('.compact-projects-grid .compact-project-card');

  if (!filterButtons.length) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filterValue = btn.getAttribute('data-filter');

      // Update button active state
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter Featured Projects
      featuredCards.forEach(card => {
        const categories = (card.getAttribute('data-category') || '').toLowerCase().split(' ');
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        } else {
          card.style.display = 'none';
        }
      });

      // Filter Compact Projects
      compactCards.forEach(card => {
        const categories = (card.getAttribute('data-category') || '').toLowerCase().split(' ');
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ===================================================================
   6. ACCESSIBLE MODALS (FOCUS TRAP, ESCAPE, BACKDROP)
   =================================================================== */
function initProjectModals() {
  const openButtons = document.querySelectorAll('.open-modal-btn');
  const modals = document.querySelectorAll('.project-modal-backdrop');
  let lastFocusedElement = null;

  function openModal(modal) {
    if (!modal) return;

    // Ensure any currently open modal is cleanly closed first
    modals.forEach(m => {
      if (m !== modal && m.classList.contains('open')) {
        closeModal(m, false);
      }
    });

    modal.removeAttribute('hidden');
    // Force reflow to guarantee CSS opacity transition
    void modal.offsetWidth;
    modal.classList.add('open');
    document.body.classList.add('modal-open');
    document.body.style.overflow = 'hidden';

    // Focus close button or dialog for accessibility
    const closeBtn = modal.querySelector('.modal-close-btn');
    if (closeBtn) {
      closeBtn.focus();
    }
  }

  function closeModal(modal, restoreFocus = true) {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('hidden', '');

    // Restore body scroll only if no other modal remains open
    const anyModalOpen = Array.from(modals).some(m => m.classList.contains('open'));
    if (!anyModalOpen) {
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
    }

    if (restoreFocus && lastFocusedElement) {
      lastFocusedElement.focus();
    }
  }

  // Bind click handler to each View Details button
  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = btn.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      if (modal) {
        lastFocusedElement = btn;
        openModal(modal);
      } else {
        console.warn(`Target modal not found: #${modalId}`);
      }
    });
  });

  // Attach persistent handlers for each modal (no duplicate listeners)
  modals.forEach(modal => {
    // 1. Close button click
    const closeBtn = modal.querySelector('.modal-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal(modal);
      });
    }

    // 2. Click outside the modal dialog (on the backdrop)
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });

    // 3. Accessible Focus Trap within modal
    modal.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeModal(modal);
        return;
      }

      if (e.key === 'Tab') {
        const focusableSelectors = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
        const focusables = Array.from(modal.querySelectorAll(focusableSelectors));
        if (!focusables.length) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            last.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === last) {
            first.focus();
            e.preventDefault();
          }
        }
      }
    });
  });

  // Global Escape key safety net
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const activeModal = document.querySelector('.project-modal-backdrop.open');
      if (activeModal) {
        closeModal(activeModal);
      }
    }
  });
}

/* ===================================================================
   6B. STSS SCREENSHOT GALLERY & INTERACTIVE CAROUSEL
   =================================================================== */
function initSTSSGalleryCarousel() {
  const mainImg = document.getElementById('stss-main-img');
  const captionEl = document.getElementById('stss-img-caption');
  const prevBtn = document.getElementById('stss-carousel-prev');
  const nextBtn = document.getElementById('stss-carousel-next');
  const counterEl = document.getElementById('stss-carousel-counter');
  const thumbs = Array.from(document.querySelectorAll('#stss-gallery-grid .gallery-item'));

  if (!mainImg || !thumbs.length) return;

  let currentIndex = 0;

  function setScreenshot(index) {
    if (index < 0) index = thumbs.length - 1;
    if (index >= thumbs.length) index = 0;

    currentIndex = index;
    const targetThumb = thumbs[currentIndex];
    const src = targetThumb.getAttribute('data-src');
    const alt = targetThumb.getAttribute('data-alt');
    const caption = targetThumb.getAttribute('data-caption');

    if (src) {
      mainImg.style.opacity = '0.4';
      mainImg.src = src;
      mainImg.alt = alt || '';
      setTimeout(() => {
        mainImg.style.opacity = '1';
      }, 80);
    }

    if (captionEl && caption) {
      captionEl.innerHTML = caption;
    }

    if (counterEl) {
      counterEl.textContent = `${currentIndex + 1} / ${thumbs.length}`;
    }

    thumbs.forEach((thumb, i) => {
      if (i === currentIndex) {
        thumb.classList.add('active');
        thumb.setAttribute('aria-selected', 'true');
      } else {
        thumb.classList.remove('active');
        thumb.setAttribute('aria-selected', 'false');
      }
    });
  }

  // Thumbnail clicks
  thumbs.forEach((thumb, idx) => {
    thumb.addEventListener('click', (e) => {
      e.preventDefault();
      setScreenshot(idx);
    });
  });

  // Carousel previous / next buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      setScreenshot(currentIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      setScreenshot(currentIndex + 1);
    });
  }

  // Keyboard navigation when STSS modal is open
  const stssModal = document.getElementById('stss-modal');
  if (stssModal) {
    stssModal.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setScreenshot(currentIndex - 1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setScreenshot(currentIndex + 1);
      }
    });
  }
}

/* ===================================================================
   7. CAREER SNAPSHOT & CHART.JS CONTROLLER
   =================================================================== */
function initCareerCharts() {
  const toggleBtn = document.getElementById('toggle-chart-mode-btn');
  const btnText = document.getElementById('chart-mode-btn-text');

  // Initial check: if verified data flag is false, render empty state overlays
  if (!careerChartData.isVerifiedDataProvided) {
    showPendingStates();
  } else {
    renderChartJsVisualizations();
  }

  // Interactive toggle button enables immediate previewing
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      careerChartData.isVerifiedDataProvided = !careerChartData.isVerifiedDataProvided;

      if (careerChartData.isVerifiedDataProvided) {
        btnText.textContent = 'Hide Preview / Show Pending States';
        toggleBtn.setAttribute('aria-pressed', 'true');
        hidePendingStates();
        renderChartJsVisualizations();
      } else {
        btnText.textContent = 'Preview Chart.js Data';
        toggleBtn.setAttribute('aria-pressed', 'false');
        destroyChartInstances();
        showPendingStates();
      }
    });
  }
}

function showPendingStates() {
  document.getElementById('pending-skills-radar')?.removeAttribute('hidden');
  document.getElementById('pending-role-fit')?.removeAttribute('hidden');
  document.getElementById('pending-cert-timeline')?.removeAttribute('hidden');

  const radarCanvas = document.getElementById('canvas-skills-radar');
  const roleCanvas = document.getElementById('canvas-role-fit');
  const timelineCanvas = document.getElementById('canvas-cert-timeline');

  if (radarCanvas) radarCanvas.style.display = 'none';
  if (roleCanvas) roleCanvas.style.display = 'none';
  if (timelineCanvas) timelineCanvas.style.display = 'none';
}

function hidePendingStates() {
  document.getElementById('pending-skills-radar')?.setAttribute('hidden', '');
  document.getElementById('pending-role-fit')?.setAttribute('hidden', '');
  document.getElementById('pending-cert-timeline')?.setAttribute('hidden', '');

  const radarCanvas = document.getElementById('canvas-skills-radar');
  const roleCanvas = document.getElementById('canvas-role-fit');
  const timelineCanvas = document.getElementById('canvas-cert-timeline');

  if (radarCanvas) radarCanvas.style.display = 'block';
  if (roleCanvas) roleCanvas.style.display = 'block';
  if (timelineCanvas) timelineCanvas.style.display = 'block';
}

function destroyChartInstances() {
  if (chartInstances.radar) { chartInstances.radar.destroy(); chartInstances.radar = null; }
  if (chartInstances.roleFit) { chartInstances.roleFit.destroy(); chartInstances.roleFit = null; }
  if (chartInstances.timeline) { chartInstances.timeline.destroy(); chartInstances.timeline = null; }
}

function renderChartJsVisualizations() {
  if (typeof Chart === 'undefined') {
    console.warn('Chart.js CDN is currently unavailable or loading.');
    return;
  }

  destroyChartInstances();

  const isDark = (document.documentElement.getAttribute('data-theme') || 'dark') === 'dark';
  const textColor = isDark ? '#94a3b8' : '#475569';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)';

  // 1. Chart A: Skills Radar
  const ctxRadar = document.getElementById('canvas-skills-radar');
  if (ctxRadar) {
    chartInstances.radar = new Chart(ctxRadar, {
      type: 'radar',
      data: careerChartData.skillsRadar,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          r: {
            angleLines: { color: gridColor },
            grid: { color: gridColor },
            pointLabels: {
              color: textColor,
              font: { family: "'Space Grotesk', sans-serif", size: 11, weight: '600' }
            },
            ticks: {
              display: false,
              beginAtZero: true,
              max: 100
            }
          }
        }
      }
    });
  }

  // 2. Chart B: Target Role Fit (Bar Chart)
  const ctxRole = document.getElementById('canvas-role-fit');
  if (ctxRole) {
    chartInstances.roleFit = new Chart(ctxRole, {
      type: 'bar',
      data: careerChartData.roleFit,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              color: textColor,
              font: { family: "'Space Grotesk', sans-serif", size: 11, weight: '600' }
            }
          },
          y: {
            grid: { color: gridColor },
            ticks: { color: textColor, beginAtZero: true, max: 100 }
          }
        }
      }
    });
  }

  // 3. Chart C: Milestone Timeline (Line / Scatter)
  const ctxTimeline = document.getElementById('canvas-cert-timeline');
  if (ctxTimeline) {
    chartInstances.timeline = new Chart(ctxTimeline, {
      type: 'line',
      data: careerChartData.certificationTimeline,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: {
            grid: { color: gridColor },
            ticks: {
              color: textColor,
              font: { family: "'Space Grotesk', sans-serif", size: 10 }
            }
          },
          y: {
            display: false,
            beginAtZero: true
          }
        }
      }
    });
  }
}

function updateChartTheme() {
  if (careerChartData.isVerifiedDataProvided && chartInstances.radar) {
    renderChartJsVisualizations();
  }
}

/* ===================================================================
   8. NETLIFY CONTACT FORM VALIDATION & HANDLING
   =================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    // Perform client validation first
    const nameInput = document.getElementById('form-name');
    const emailInput = document.getElementById('form-email');
    const subjectInput = document.getElementById('form-subject');
    const messageInput = document.getElementById('form-message');

    let isValid = true;

    // Validate Name
    if (!nameInput.value.trim()) {
      showError(nameInput, 'name-error');
      isValid = false;
    } else {
      clearError(nameInput, 'name-error');
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      showError(emailInput, 'email-error');
      isValid = false;
    } else {
      clearError(emailInput, 'email-error');
    }

    // Validate Subject
    if (!subjectInput.value.trim()) {
      showError(subjectInput, 'subject-error');
      isValid = false;
    } else {
      clearError(subjectInput, 'subject-error');
    }

    // Validate Message (min 10 chars)
    if (messageInput.value.trim().length < 10) {
      showError(messageInput, 'message-error');
      isValid = false;
    } else {
      clearError(messageInput, 'message-error');
    }

    if (!isValid) {
      e.preventDefault();
      return;
    }

    // For static Netlify submission with AJAX feedback:
    e.preventDefault();
    const submitBtn = document.getElementById('submit-form-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Sending Message...</span>';

    const formData = new FormData(form);

    try {
      // In deployed Netlify environment, this posts to Netlify's backend form handler
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      });

      if (response.ok) {
        showFeedback(feedback, 'Thank you! Your message has been transmitted successfully. I will get back to you shortly.', 'success');
        form.reset();
      } else {
        // Fallback or local server simulation message
        showFeedback(feedback, 'Form registered. Note: When running on a local development server, Netlify form processing triggers after live deployment.', 'success');
      }
    } catch (error) {
      // Offline or local dev fallback notice
      showFeedback(feedback, 'Message prepared. To submit directly via email, contact: shivanegowdrajadeshagowda@gmail.com', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  });

  function showError(input, errorId) {
    input.classList.add('is-invalid');
    input.setAttribute('aria-invalid', 'true');
    const errorEl = document.getElementById(errorId);
    if (errorEl) errorEl.classList.add('visible');
  }

  function clearError(input, errorId) {
    input.classList.remove('is-invalid');
    input.removeAttribute('aria-invalid');
    const errorEl = document.getElementById(errorId);
    if (errorEl) errorEl.classList.remove('visible');
  }

  function showFeedback(el, msg, type) {
    if (!el) return;
    el.textContent = msg;
    el.className = `form-feedback ${type}`;
    el.style.display = 'block';
  }
}

/* ===================================================================
   9. BACK TO TOP BUTTON
   =================================================================== */
function initBackToTop() {
  const btn = document.getElementById('back-to-top-btn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.style.opacity = '1';
      btn.style.pointerEvents = 'auto';
    } else {
      btn.style.opacity = '0.7';
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ===================================================================
   10. DYNAMIC CURRENT YEAR
   =================================================================== */
function updateCurrentYear() {
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}
