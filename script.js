
// ==============================================================================
// STACKLY - CORE SCRIPT
// Single-Line Navbar, Scroll Animations, Inventory Filters & Role Dashboards
// ==============================================================================

// 1. Sticky Header Scroll Effect
const siteHeader = document.getElementById('site-header');
if (siteHeader) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      siteHeader.classList.add('header-scrolled');
    } else {
      siteHeader.classList.remove('header-scrolled');
    }
  }, { passive: true });
}

// 2. Mobile Drawer Navigation
const mobileToggle = document.getElementById('mobileToggle');
const mobileNavDrawer = document.getElementById('mobileNavDrawer');
const drawerClose = document.getElementById('drawerClose');
const mobileDrawerBackdrop = document.getElementById('mobileDrawerBackdrop');

function openMobileDrawer() {
  if (mobileNavDrawer) mobileNavDrawer.classList.add('open');
  if (mobileDrawerBackdrop) mobileDrawerBackdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMobileDrawer() {
  if (mobileNavDrawer) mobileNavDrawer.classList.remove('open');
  if (mobileDrawerBackdrop) mobileDrawerBackdrop.classList.remove('open');
  document.body.style.overflow = '';
}

if (mobileToggle) {
  mobileToggle.addEventListener('click', openMobileDrawer);
}
if (drawerClose) {
  drawerClose.addEventListener('click', closeMobileDrawer);
}
if (mobileDrawerBackdrop) {
  mobileDrawerBackdrop.addEventListener('click', closeMobileDrawer);
}
if (mobileNavDrawer) {
  mobileNavDrawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileDrawer);
  });
}

// 3. High-Impact Scroll Reveal Animations for Sections & Elements
function initScrollReveal() {
  // A. Top Neon Page Scroll Progress Indicator Line (0% to 100% as you scroll down the page)
  let scrollLine = document.getElementById('pageScrollProgressLine');
  if (!scrollLine) {
    scrollLine = document.createElement('div');
    scrollLine.id = 'pageScrollProgressLine';
    scrollLine.className = 'page-scroll-progress-line';
    document.body.prepend(scrollLine);
  }

  function updatePageScrollProgress() {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0) {
      const scrollPercent = Math.min(100, Math.max(0, (window.scrollY / docHeight) * 100));
      if (scrollLine) scrollLine.style.width = scrollPercent + '%';
    }
  }

  // B. Setup Section Scroll Animations (Visibly animate each section as user scrolls)
  const isDashboardPage = document.querySelector('.dash-wrapper') || document.body.classList.contains('dash-page');
  const allSections = document.querySelectorAll('section, .page-hero-banner, footer#site-footer');

  if (isDashboardPage) {
    allSections.forEach(sec => sec.classList.add('section-active'));
    document.querySelectorAll('.reveal-on-scroll, .reveal-left, .reveal-right').forEach(el => el.classList.add('revealed'));
    return;
  }

  allSections.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top > window.innerHeight * 0.75) {
      sec.classList.add('scroll-section-effect');
    } else {
      sec.classList.add('section-active');
    }
  });

  // C. Inner card/content element selectors
  const targetSelectors = [
    '.section-title',
    '.section-desc',
    '.badge-tag',
    '.stat-card',
    '.service-card',
    '.car-inventory-tile',
    '.kpi-card',
    '.team-card',
    '.blog-card',
    '.partner-logo-item',
    '.feature-box',
    '.benefit-item',
    '.faq-accordion-item',
    '.pricing-card',
    '.about-grid > div',
    '.contact-grid > div',
    '.gallery-preview-grid',
    '.finance-calc-box',
    '.features-grid-3 > div',
    '.features-grid-2 > div',
    '.features-grid-4 > div',
    '.premium-card',
    '.team-profile-card',
    '.brand-card-premium',
    '.timeline-card-box',
    '.news-tile',
    '.feature-box-glass',
    '.footer-columns-grid > div'
  ];

  const elements = document.querySelectorAll(targetSelectors.join(', '));

  // Assign cascading stagger classes to children of all grid/row containers
  const containerSelectors = [
    '.services-grid',
    '.inventory-grid',
    '.stats-grid',
    '.team-grid',
    '.blog-grid',
    '.kpi-grid',
    '.footer-columns-grid',
    '.brand-alliances-grid',
    '.faq-accordion',
    '.pricing-plans-grid',
    '.about-grid',
    '.contact-grid',
    '.features-grid-3',
    '.features-grid-2',
    '.features-grid-4'
  ];
  
  containerSelectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(grid => {
      Array.from(grid.children).forEach((child, idx) => {
        const staggerNum = (idx % 6) + 1;
        child.classList.add('stagger-' + staggerNum);
      });
    });
  });

  elements.forEach(el => {
    if (!el.classList.contains('reveal-on-scroll') && !el.classList.contains('reveal-left') && !el.classList.contains('reveal-right')) {
      el.classList.add('reveal-on-scroll');
    }
  });

  // Real-time animation check for sections and inner cards
  function checkScrollAnimations() {
    const viewHeight = window.innerHeight || document.documentElement.clientHeight;
    
    // Animate sections into place
    allSections.forEach(sec => {
      const r = sec.getBoundingClientRect();
      if (r.top <= viewHeight * 0.90 && r.bottom >= 0) {
        sec.classList.add('section-active');
        sec.querySelectorAll('.reveal-on-scroll, .reveal-left, .reveal-right').forEach(child => {
          child.classList.add('revealed');
        });
      }
    });

    // Animate inner content items
    const allAnimated = document.querySelectorAll('.reveal-on-scroll:not(.revealed), .reveal-left:not(.revealed), .reveal-right:not(.revealed)');
    allAnimated.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top <= viewHeight + 80 && rect.bottom >= -50) {
        el.classList.add('revealed');
      }
    });

    updatePageScrollProgress();
  }

  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-active');
          const innerEls = entry.target.querySelectorAll('.reveal-on-scroll, .reveal-left, .reveal-right');
          innerEls.forEach((child, idx) => {
            setTimeout(() => {
              child.classList.add('revealed');
            }, Math.min(idx * 50, 350));
          });
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.05,
      rootMargin: '80px 0px -40px 0px'
    });
    allSections.forEach(sec => sectionObserver.observe(sec));

    const elementObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.01,
      rootMargin: '100px 0px 30px 0px'
    });

    document.querySelectorAll('.reveal-on-scroll, .reveal-left, .reveal-right').forEach(el => {
      elementObserver.observe(el);
    });
  } else {
    // Immediate fallback
    allSections.forEach(sec => sec.classList.add('section-active'));
    document.querySelectorAll('.reveal-on-scroll, .reveal-left, .reveal-right').forEach(el => {
      el.classList.add('revealed');
    });
  }

  // Smooth real-time scroll listener
  let scrollTicking = false;
  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      window.requestAnimationFrame(() => {
        checkScrollAnimations();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }, { passive: true });

  window.addEventListener('resize', checkScrollAnimations, { passive: true });

  // Initial immediate pass
  checkScrollAnimations();

  // Safety fallback timers
  setTimeout(checkScrollAnimations, 500);
  setTimeout(checkScrollAnimations, 1200);
  setTimeout(checkScrollAnimations, 3200);
  setTimeout(() => {
    allSections.forEach(sec => sec.classList.add('section-active'));
    document.querySelectorAll('.reveal-on-scroll, .reveal-left, .reveal-right').forEach(el => {
      el.classList.add('revealed');
    });
  }, 4000);
}

// 4. Hero Slideshow
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.bullet');
let currentSlide = 0;
let slideInterval;

function showSlide(idx) {
  slides.forEach((s, i) => s.classList.toggle('active', i === idx));
  dots.forEach((d, i) => d.classList.toggle('active', i === idx));
  currentSlide = idx;
}

function nextSlide() {
  if (slides.length === 0) return;
  const next = (currentSlide + 1) % slides.length;
  showSlide(next);
}

if (slides.length > 0) {
  slideInterval = setInterval(nextSlide, 5000);
  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      clearInterval(slideInterval);
      showSlide(idx);
      slideInterval = setInterval(nextSlide, 5000);
    });
  });
}

// 5. Testimonials Slider
const track = document.getElementById('testiTrack');
if (track) {
  const slidesCount = track.children.length;
  let currentTesti = 0;

  function updateTestiPos() {
    track.style.transform = 'translateX(-' + (currentTesti * 100) + '%)';
  }

  const prevBtn = document.getElementById('testiPrevBtn');
  const nextBtn = document.getElementById('testiNextBtn');

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentTesti = (currentTesti + 1) % slidesCount;
      updateTestiPos();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentTesti = (currentTesti - 1 + slidesCount) % slidesCount;
      updateTestiPos();
    });
  }

  setInterval(() => {
    currentTesti = (currentTesti + 1) % slidesCount;
    updateTestiPos();
  }, 6000);
}

// 6. Number Counter Animation
const counterEls = document.querySelectorAll('.stat-number[data-target]');
if (counterEls.length > 0) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = +entry.target.dataset.target;
        const duration = 1500;
        const stepTime = 20;
        const steps = duration / stepTime;
        const increment = target / steps;
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          entry.target.textContent = Math.floor(current).toLocaleString() + '+';
        }, stepTime);

        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  counterEls.forEach(el => counterObserver.observe(el));
}

// 7. Scroll To Top Button
const scrollBtn = document.getElementById('scrollTopBtn');
if (scrollBtn) {
  window.addEventListener('scroll', () => {
    scrollBtn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// 8. Video Modal
const videoModal = document.getElementById('videoModalWrapper');
const videoFrame = document.getElementById('videoFrame');
const videoOpenTrigger = document.getElementById('videoOpenTrigger');
const videoCloseTrigger = document.getElementById('videoCloseTrigger');

function openVideoModal() {
  if (videoModal && videoFrame) {
    videoFrame.src = 'https://www.youtube.com/embed/1MTkZPys7mU?autoplay=1';
    videoModal.classList.add('show');
  }
}

function closeVideoModal() {
  if (videoModal && videoFrame) {
    videoFrame.src = '';
    videoModal.classList.remove('show');
  }
}

if (videoOpenTrigger) videoOpenTrigger.addEventListener('click', openVideoModal);
if (videoCloseTrigger) videoCloseTrigger.addEventListener('click', closeVideoModal);
if (videoModal) {
  videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) closeVideoModal();
  });
}
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeVideoModal();
});

// 9. Financing Calculator
const calcTrigger = document.getElementById('calcTrigger');
if (calcTrigger) {
  calcTrigger.addEventListener('click', () => {
    const price = +document.getElementById('calcPrice').value || 35000;
    const down = +document.getElementById('calcDown').value || 5000;
    const rate = (+document.getElementById('calcRate').value || 5.9) / 100 / 12;
    const months = +document.getElementById('calcMonths').value || 60;
    const principal = price - down;

    if (principal <= 0) {
      document.getElementById('calcMonthlyOut').textContent = '$0.00 / mo';
      return;
    }

    const monthly = principal * (rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
    document.getElementById('calcMonthlyOut').textContent = '$' + monthly.toFixed(2) + ' / mo';
    document.getElementById('calcTotalOut').textContent = 'Total Loan: $' + (monthly * months).toFixed(0);
  });
}

// ==============================================================================
// 10. LIVE INVENTORY FILTERING & SORTING (listing.html)
// ==============================================================================
function initInventoryFilters() {
  const makeFilter = document.getElementById('filterMake');
  const bodyFilter = document.getElementById('filterBody');
  const transFilter = document.getElementById('filterTrans');
  const condFilter = document.getElementById('filterCond');
  const sortSelect = document.getElementById('sortPriceSelect');
  const applyBtn = document.getElementById('applyFilterBtn');
  const carTiles = document.querySelectorAll('.car-inventory-tile');
  const countDisplay = document.getElementById('carCounterDisplay');

  if (carTiles.length === 0) return;

  function runFilter() {
    const selMake = makeFilter ? makeFilter.value.toLowerCase() : 'all makes';
    const selBody = bodyFilter ? bodyFilter.value.toLowerCase() : 'all body types';
    const selTrans = transFilter ? transFilter.value.toLowerCase() : 'transmission';
    const selCond = condFilter ? condFilter.value.toLowerCase() : 'condition';

    let visibleCount = 0;

    carTiles.forEach(tile => {
      const text = tile.textContent.toLowerCase();
      const make = (tile.dataset.make || '').toLowerCase();
      const body = (tile.dataset.body || '').toLowerCase();
      const trans = (tile.dataset.transmission || '').toLowerCase();
      const cond = (tile.dataset.condition || '').toLowerCase();

      let match = true;

      if (selMake !== 'all makes') {
        if (!text.includes(selMake) && !make.includes(selMake)) match = false;
      }
      if (selBody !== 'all body types') {
        if (!text.includes(selBody) && !body.includes(selBody)) match = false;
      }
      if (selTrans !== 'transmission') {
        if (!text.includes(selTrans) && !trans.includes(selTrans)) match = false;
      }
      if (selCond !== 'condition') {
        if (!text.includes(selCond) && !cond.includes(selCond)) match = false;
      }

      tile.style.display = match ? 'block' : 'none';
      if (match) visibleCount++;
    });

    if (countDisplay) {
      countDisplay.textContent = visibleCount + ' of ' + carTiles.length;
    }
    showToast('Found ' + visibleCount + ' matching certified cars!', 'success');
  }

  if (applyBtn) applyBtn.addEventListener('click', runFilter);
  if (makeFilter) makeFilter.addEventListener('change', runFilter);
  if (bodyFilter) bodyFilter.addEventListener('change', runFilter);
  if (transFilter) transFilter.addEventListener('change', runFilter);
  if (condFilter) condFilter.addEventListener('change', runFilter);

  // Sorting
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      const val = sortSelect.value;
      const grid = document.querySelector('.car-catalog-grid');
      if (!grid) return;

      const tilesArray = Array.from(carTiles);
      tilesArray.sort((a, b) => {
        const getPrice = el => {
          const match = el.querySelector('.net-price-val')?.textContent.replace(/[^0-9]/g, '');
          return +match || 0;
        };
        if (val.includes('Low to High')) return getPrice(a) - getPrice(b);
        if (val.includes('High to Low')) return getPrice(b) - getPrice(a);
        return 0;
      });

      tilesArray.forEach(tile => grid.appendChild(tile));
      showToast('Inventory sorted successfully!', 'success');
    });
  }
}

// ==============================================================================
// 11. TOAST NOTIFICATIONS
// ==============================================================================
function showToast(msg, type = 'success') {
  let toast = document.getElementById('dashToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'dashToast';
    toast.className = 'dash-toast';
    document.body.appendChild(toast);
  }
  toast.className = 'dash-toast show ' + (type === 'danger' ? 'toast-danger' : 'toast-success');
  toast.innerHTML = '<i class="fas ' + (type === 'danger' ? 'fa-exclamation-circle' : 'fa-check-circle') + '"></i> <span>' + msg + '</span>';
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

// ==============================================================================
// 12. ROLE-BASED AUTH & SESSION HANDLING
// ==============================================================================
function switchAuthTab(tab) {
  const loginTab = document.getElementById('loginTabBtn');
  const signupTab = document.getElementById('signupTabBtn');
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const resetForm = document.getElementById('resetPasswordForm');
  const authNavTabs = document.querySelector('.auth-nav-tabs');

  if (resetForm) resetForm.style.display = 'none';
  if (authNavTabs) authNavTabs.style.display = 'grid';

  if (loginTab && signupTab && loginForm && signupForm) {
    if (tab === 'login') {
      loginTab.classList.add('active');
      signupTab.classList.remove('active');
      loginForm.style.display = 'block';
      signupForm.style.display = 'none';
    } else {
      signupTab.classList.add('active');
      loginTab.classList.remove('active');
      signupForm.style.display = 'block';
      loginForm.style.display = 'none';
    }
  }
}

function openResetPasswordForm() {
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const resetForm = document.getElementById('resetPasswordForm');
  const authNavTabs = document.querySelector('.auth-nav-tabs');

  if (loginForm) loginForm.style.display = 'none';
  if (signupForm) signupForm.style.display = 'none';
  if (authNavTabs) authNavTabs.style.display = 'none';
  if (resetForm) {
    resetForm.style.display = 'block';
    const resetInput = document.getElementById('resetEmail');
    if (resetInput) resetInput.focus();
  }
}

function handleResetPassword(e) {
  e.preventDefault();
  const emailInput = document.getElementById('resetEmail');
  const email = emailInput ? emailInput.value.trim() : '';
  if (!email) {
    showToast('Please enter your email address.', 'danger');
    return;
  }
  showToast('Processing password reset request...', 'info');
  setTimeout(() => {
    window.location.href = '404.html';
  }, 600);
}

function selectRole(element, role) {
  document.querySelectorAll('.role-option, .role-pill').forEach(el => el.classList.remove('selected'));
  element.classList.add('selected');
  const input = element.querySelector('input');
  if (input) input.checked = true;
}

// Extract username from email or custom name
// Example: dhamu@gmail.com -> dhamu
function extractUsername(email, customName) {
  if (customName && customName.trim()) {
    return customName.trim();
  }
  if (!email || !email.trim()) return 'User';
  const cleanEmail = email.trim();
  return cleanEmail.includes('@') ? cleanEmail.split('@')[0] : cleanEmail;
}

function handleLoginSubmit(e) {
  e.preventDefault();
  const role = document.querySelector('input[name="loginRole"]:checked')?.value || 'customer';
  const emailInput = document.getElementById('loginEmail')?.value.trim();
  if (!emailInput) {
    showToast('Please enter your email address.', 'danger');
    return;
  }
  
  // Extract username from email (e.g. dhamu@gmail.com -> dhamu)
  const username = extractUsername(emailInput);
  const userData = {
    name: username,
    email: emailInput,
    role: role,
    loggedInAt: new Date().toISOString()
  };
  
  localStorage.setItem('stackly_user', JSON.stringify(userData));
  showToast('Welcome, ' + username + '! Logging in...', 'success');
  setTimeout(() => {
    window.location.href = role === 'admin' ? 'admin-dashboard.html' : 'customer-dashboard.html';
  }, 500);
}

function handleSignupSubmit(e) {
  e.preventDefault();
  const role = document.querySelector('input[name="signupRole"]:checked')?.value || 'customer';
  const nameInput = document.getElementById('signupName')?.value.trim();
  const emailInput = document.getElementById('signupEmail')?.value.trim();
  if (!emailInput) {
    showToast('Please enter your email address.', 'danger');
    return;
  }
  
  const username = extractUsername(emailInput, nameInput);
  const userData = {
    name: username,
    email: emailInput,
    role: role,
    phone: document.getElementById('signupPhone')?.value.trim() || '',
    loggedInAt: new Date().toISOString()
  };
  
  localStorage.setItem('stackly_user', JSON.stringify(userData));
  showToast('Account created successfully! Welcome, ' + username + '.', 'success');
  setTimeout(() => {
    window.location.href = role === 'admin' ? 'admin-dashboard.html' : 'customer-dashboard.html';
  }, 500);
}

function handleLogout() {
  localStorage.removeItem('stackly_user');
  showToast('Logged out successfully. Returning to Showroom...', 'success');
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 500);
}

// Global handler: Unimplemented buttons or placeholder links navigate to 404 page
document.addEventListener('click', (e) => {
  const target = e.target.closest('a, button');
  if (!target) return;
  const href = target.getAttribute('href');
  
  // If it is a dummy anchor or explicit 404 trigger
  if (target.classList.contains('navigate-404')) {
    e.preventDefault();
    window.location.href = '404.html';
    return;
  }
  if (href === '#' || href === 'javascript:void(0);') {
    const hasOnClick = target.hasAttribute('onclick');
    const isTab = target.dataset.tab || target.classList.contains('dash-nav-btn') || target.classList.contains('auth-tab-btn') || target.classList.contains('role-pill');
    if (!hasOnClick && !isTab) {
      e.preventDefault();
      window.location.href = '404.html';
    }
  }
});

// ==============================================================================
// 13. DASHBOARD TAB NAVIGATION & INTERACTIVITY
// ==============================================================================
function initDashboardTabs() {
  const navBtns = document.querySelectorAll('.dash-nav-btn');
  const tabPanels = document.querySelectorAll('.dash-tab-panel');

  if (navBtns.length > 0) {
    navBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetTabId = btn.dataset.tab;
        if (!targetTabId) return;
        e.preventDefault();

        navBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        tabPanels.forEach(p => p.classList.remove('active-panel'));
        const activePanel = document.getElementById(targetTabId);
        if (activePanel) {
          activePanel.classList.add('active-panel');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    });
  }
}

// Customer Dashboard Interactive Functions
function openCustBookingModal() {
  const m = document.getElementById('custBookingModal');
  if (m) {
    m.classList.add('show');
    const dInput = document.getElementById('bookDateInput');
    if (dInput) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      dInput.value = tomorrow.toISOString().split('T')[0];
    }
  }
}

function closeCustBookingModal() {
  const m = document.getElementById('custBookingModal');
  if (m) m.classList.remove('show');
}

function handleNewBooking(e) {
  e.preventDefault();
  const vehicle = document.getElementById('bookVehicleSelect')?.value || 'Mercedes-Benz AMG GT Coupe';
  const date = document.getElementById('bookDateInput')?.value || '2026-09-20';
  const slot = document.getElementById('bookTimeSlot')?.value || '10:00 AM';

  const tbody = document.getElementById('custDrivesTableBody');
  if (tbody) {
    const rowId = 'drive-row-' + Date.now();
    const newTr = document.createElement('tr');
    newTr.id = rowId;
    newTr.innerHTML = `
      <td><strong>${vehicle}</strong></td>
      <td>${date}, ${slot}</td>
      <td>Salem Main Showroom</td>
      <td>Marcus Vance</td>
      <td><span class="status-tag status-confirmed">Confirmed</span></td>
      <td><button onclick="cancelDriveBooking('${rowId}')" class="btn btn-outline btn-sm" style="padding:4px 8px; font-size:11px; color:#e74c3c; border-color:rgba(231,76,60,0.3);"><i class="fas fa-times"></i> Cancel</button></td>
    `;
    tbody.prepend(newTr);
  }

  // Update counter
  const kpiEl = document.getElementById('kpiActiveBookings');
  const navCountEl = document.getElementById('testDriveCount');
  if (kpiEl) kpiEl.textContent = (+kpiEl.textContent || 0) + 1;
  if (navCountEl) navCountEl.textContent = (+navCountEl.textContent || 0) + 1;

  closeCustBookingModal();
  showToast('Test drive scheduled for ' + vehicle + '!', 'success');
}

function cancelDriveBooking(rowId) {
  const row = document.getElementById(rowId);
  if (row && confirm('Are you sure you want to cancel this scheduled test drive?')) {
    row.remove();
    const kpiEl = document.getElementById('kpiActiveBookings');
    const navCountEl = document.getElementById('testDriveCount');
    if (kpiEl && +kpiEl.textContent > 0) kpiEl.textContent = +kpiEl.textContent - 1;
    if (navCountEl && +navCountEl.textContent > 0) navCountEl.textContent = +navCountEl.textContent - 1;
    showToast('Booking cancelled.', 'danger');
  }
}

function removeFavorite(rowId) {
  const row = document.getElementById(rowId);
  if (row) {
    row.remove();
    const kpiEl = document.getElementById('kpiSavedCars');
    const navCountEl = document.getElementById('favCount');
    if (kpiEl && +kpiEl.textContent > 0) kpiEl.textContent = +kpiEl.textContent - 1;
    if (navCountEl && +navCountEl.textContent > 0) navCountEl.textContent = +navCountEl.textContent - 1;
    showToast('Vehicle removed from saved favorites.', 'danger');
  }
}

function saveCustomerSettings(e) {
  e.preventDefault();
  const name = document.getElementById('settingCustName')?.value || 'Rajesh Kumar';
  const email = document.getElementById('settingCustEmail')?.value || 'customer@stackly.in';
  
  const user = JSON.parse(localStorage.getItem('stackly_user') || '{}');
  user.name = name;
  user.email = email;
  localStorage.setItem('stackly_user', JSON.stringify(user));

  const pName = document.getElementById('custProfileName');
  const pEmail = document.getElementById('custProfileEmail');
  const pGreet = document.getElementById('welcomeGreeting');
  if (pName) pName.textContent = name;
  if (pEmail) pEmail.textContent = email;
  if (pGreet) pGreet.textContent = 'Welcome back, ' + name.split(' ')[0] + '!';

  showToast('Profile settings updated successfully!', 'success');
}

// Admin Dashboard Interactive Functions
function openAddCarModal() {
  const m = document.getElementById('adminAddCarModal');
  if (m) m.classList.add('show');
}

function closeAddCarModal() {
  const m = document.getElementById('adminAddCarModal');
  if (m) m.classList.remove('show');
}

function handleAddNewCar(e) {
  e.preventDefault();
  const model = document.getElementById('addCarModel')?.value || 'New Vehicle';
  const make = document.getElementById('addCarMake')?.value || 'Custom';
  const type = document.getElementById('addCarType')?.value || 'Sedan';
  const price = +document.getElementById('addCarPrice')?.value || 50000;
  const cond = document.getElementById('addCarCond')?.value || 'New';

  const tbody = document.getElementById('adminQuickInventoryBody');
  if (tbody) {
    const rowId = 'car-inv-' + Date.now();
    const tr = document.createElement('tr');
    tr.id = rowId;
    tr.innerHTML = `
      <td><strong>${model}</strong></td>
      <td>${type}</td>
      <td>STK-${Math.floor(100000 + Math.random() * 900000)}</td>
      <td>$${price.toLocaleString()}</td>
      <td><span class="status-tag status-confirmed">Ready for Delivery</span></td>
      <td><button onclick="deleteCarRow('${rowId}')" class="btn btn-outline btn-sm" style="color:#e74c3c; border-color:rgba(231,76,60,0.3); padding:4px 8px; font-size:11px;"><i class="fas fa-trash"></i></button></td>
    `;
    tbody.prepend(tr);
  }

  // Update Admin KPI
  const stockEl = document.getElementById('kpiAdminStock');
  const navStockEl = document.getElementById('adminStockCount');
  if (stockEl) stockEl.textContent = (+stockEl.textContent || 0) + 1;
  if (navStockEl) navStockEl.textContent = (+navStockEl.textContent || 0) + 1;

  closeAddCarModal();
  showToast(model + ' added to Salem inventory!', 'success');
}

function deleteCarRow(rowId) {
  const row = document.getElementById(rowId);
  if (row && confirm('Remove this vehicle from Salem inventory registry?')) {
    row.remove();
    const stockEl = document.getElementById('kpiAdminStock');
    const navStockEl = document.getElementById('adminStockCount');
    if (stockEl && +stockEl.textContent > 0) stockEl.textContent = +stockEl.textContent - 1;
    if (navStockEl && +navStockEl.textContent > 0) navStockEl.textContent = +navStockEl.textContent - 1;
    showToast('Vehicle removed from inventory.', 'danger');
  }
}

function approveLead(leadId) {
  const statusEl = document.getElementById('lead-status-' + leadId);
  if (statusEl) {
    statusEl.className = 'status-tag status-completed';
    statusEl.textContent = 'Approved';
    showToast('Lead #' + leadId + ' approved & booked for test drive!', 'success');
  }
}

function reassignLead(leadId) {
  const reps = ['Marcus Vance', 'Lynn Roberts', 'Keith Connolly', 'Heather Wilkins'];
  const curRep = document.getElementById('lead-rep-' + leadId)?.textContent;
  const nextRep = reps.find(r => r !== curRep) || reps[0];
  const repEl = document.getElementById('lead-rep-' + leadId);
  if (repEl) {
    repEl.textContent = nextRep;
    showToast('Lead #' + leadId + ' assigned to ' + nextRep, 'success');
  }
}

function archiveLead(leadId) {
  const row = document.getElementById('lead-row-' + leadId);
  if (row) {
    row.style.opacity = '0.4';
    showToast('Lead #' + leadId + ' archived.', 'success');
  }
}

function filterAdminLeads() {
  const query = document.getElementById('leadSearchInput')?.value.toLowerCase() || '';
  const rows = document.querySelectorAll('#adminLeadsTableBody tr');
  rows.forEach(r => {
    r.style.display = r.textContent.toLowerCase().includes(query) ? '' : 'none';
  });
}

function filterStockTable() {
  const query = document.getElementById('inventorySearchInput')?.value.toLowerCase() || '';
  const rows = document.querySelectorAll('#fullStockTableBody tr');
  rows.forEach(r => {
    r.style.display = r.textContent.toLowerCase().includes(query) ? '' : 'none';
  });
}

function exportReportCSV() {
  const csvContent = "data:text/csv;charset=utf-8," 
    + "Month,Units Sold,Gross Revenue,Top Model,Satisfaction\n"
    + "August 2026,26,$2140000,Timor Ventura V2,98.4%\n"
    + "July 2026,22,$1890000,Mercedes-Benz AMG GT,97.8%\n"
    + "June 2026,19,$1650000,Porsche 911,99.1%\n";
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "stackly_salem_dealership_report.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast('Report CSV exported successfully!', 'success');
}

// Populate full stock table if present
function populateStockRegistry() {
  const fullTbody = document.getElementById('fullStockTableBody');
  if (!fullTbody) return;

  const cars = [
    { name: 'Mercedes-Benz AMG GT Coupe', make: 'Mercedes-Benz', type: 'Coupe', price: '$89,500', miles: '1,450 km', status: 'Available' },
    { name: 'BMW M4 Competition', make: 'BMW', type: 'Sports Sedan', price: '$78,900', miles: '8,200 km', status: 'Available' },
    { name: 'Audi RS7 Sportback Quattro', make: 'Audi', type: 'Sportback', price: '$105,000', miles: '520 km', status: 'Available' },
    { name: 'Range Rover Sport Dynamic', make: 'Land Rover', type: 'SUV', price: '$94,500', miles: '14,800 km', status: 'Available' },
    { name: 'Porsche 911 Carrera S', make: 'Porsche', type: 'Convertible', price: '$138,000', miles: '4,100 km', status: 'Reserved' },
    { name: 'Ford Mustang GT Fastback', make: 'Ford', type: 'Fastback', price: '$56,800', miles: '850 km', status: 'Available' },
    { name: 'Timor Hatchback V2', make: 'Timor', type: 'Hatchback', price: '$24,495', miles: '7,215 km', status: 'Available' },
    { name: 'Timor Ventura V2', make: 'Timor', type: 'Sedan', price: '$24,495', miles: '7,215 km', status: 'Available' },
    { name: 'Toyota Convertible', make: 'Toyota', type: 'Convertible', price: '$64,495', miles: '7,215 km', status: 'Inspection' },
    { name: 'Mobilist Greenia', make: 'Mobilist', type: 'Hybrid', price: '$124,495', miles: '212 km', status: 'Available' },
    { name: 'Mobilist Loka', make: 'Mobilist', type: 'Smart Coupe', price: '$64,495', miles: '7,215 km', status: 'Available' },
    { name: 'Timor Ventura Sport', make: 'Timor', type: 'Coupe', price: '$124,495', miles: '212 km', status: 'Available' }
  ];

  fullTbody.innerHTML = cars.map((c, i) => `
    <tr id="full-stock-${i}">
      <td><strong>${c.name}</strong></td>
      <td>${c.make}</td>
      <td>${c.type}</td>
      <td>${c.price}</td>
      <td>${c.miles}</td>
      <td><span class="status-tag ${c.status === 'Available' ? 'status-confirmed' : 'status-pending'}">${c.status}</span></td>
      <td>
        <a href="detail.html" target="_blank" class="btn btn-outline-primary btn-sm" style="padding:4px 8px; font-size:11px;">View</a>
        <button onclick="deleteCarRow('full-stock-${i}')" class="btn btn-outline btn-sm" style="color:#e74c3c; border-color:rgba(231,76,60,0.3); padding:4px 8px; font-size:11px; margin-left:4px;"><i class="fas fa-trash"></i></button>
      </td>
    </tr>
  `).join('');
}

// ==============================================================================
// 14. INITIALIZE ALL ON DOM READY
// ==============================================================================
document.addEventListener('DOMContentLoaded', () => {
  // Global Auth State Handler & Dynamic User Binding
  const user = JSON.parse(localStorage.getItem('stackly_user') || 'null');
  const authNavBtn = document.getElementById('authNavBtn');
  
  if (user && authNavBtn) {
    // Show logged-in username and role on navbar across all 14 pages
    const displayRole = user.role === 'admin' ? 'Admin' : 'Customer';
    const roleIcon = user.role === 'admin' ? 'fa-user-shield' : 'fa-user-circle';
    authNavBtn.innerHTML = `<i class="fas ${roleIcon}"></i> ${user.name} (${displayRole})`;
    authNavBtn.href = user.role === 'admin' ? 'admin-dashboard.html' : 'customer-dashboard.html';
    authNavBtn.title = `Logged in as ${user.email}. Click to open ${displayRole} Dashboard`;
    authNavBtn.style.borderColor = user.role === 'admin' ? 'var(--accent-pink)' : 'var(--primary)';
    authNavBtn.style.color = user.role === 'admin' ? 'var(--accent-pink)' : 'var(--primary)';

    // Insert quick logout button if on navbar
    if (authNavBtn.parentElement && !document.getElementById('navLogoutBtn')) {
      const logoutBtn = document.createElement('a');
      logoutBtn.id = 'navLogoutBtn';
      logoutBtn.href = '#';
      logoutBtn.className = 'btn btn-outline btn-sm';
      logoutBtn.style.cssText = 'border-color: rgba(231,76,60,0.4); color: #e74c3c; margin-left: 8px; padding: 6px 12px; font-size: 12px;';
      logoutBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i> Logout';
      logoutBtn.onclick = (e) => { e.preventDefault(); handleLogout(); };
      authNavBtn.parentElement.appendChild(logoutBtn);
    }
  }

  // Populate dynamic user info in Customer Dashboard
  if (user && user.role === 'customer') {
    const pName = document.getElementById('custProfileName');
    const pEmail = document.getElementById('custProfileEmail');
    const pGreet = document.getElementById('welcomeGreeting');
    const pAvatar = document.getElementById('custAvatar');
    const settingName = document.getElementById('settingCustName');
    const settingEmail = document.getElementById('settingCustEmail');

    if (pName && user.name) pName.textContent = user.name;
    if (pEmail && user.email) pEmail.textContent = user.email;
    if (pGreet && user.name) pGreet.textContent = 'Welcome back, ' + user.name + '!';
    if (pAvatar && user.name) pAvatar.innerHTML = '<span style="font-size:1.3rem; font-weight:700;">' + user.name.charAt(0).toUpperCase() + '</span>';
    if (settingName && user.name) settingName.value = user.name;
    if (settingEmail && user.email) settingEmail.value = user.email;
  }

  // Populate dynamic user info in Admin Dashboard
  if (user && user.role === 'admin') {
    const aName = document.getElementById('adminProfileName');
    const aEmail = document.getElementById('adminProfileEmail');
    const aGreet = document.getElementById('adminWelcomeGreeting');
    const aAvatar = document.getElementById('adminAvatar');

    if (aName && user.name) aName.textContent = user.name;
    if (aEmail && user.email) aEmail.textContent = user.email;
    if (aGreet && user.name) aGreet.textContent = 'Welcome back, ' + user.name + '! (Operations Overview)';
    if (aAvatar && user.name) aAvatar.innerHTML = '<span style="font-size:1.3rem; font-weight:700;">' + user.name.charAt(0).toUpperCase() + '</span>';
  }

  initScrollReveal();
  initInventoryFilters();
  initDashboardTabs();
  populateStockRegistry();
  renderCustInventoryCards();
  calculateLiveEmi();
  initStacklyPreloader();
});


// --- FAQ Accordion Toggle ---
function toggleFaq(headerEl) {
  const item = headerEl.parentElement;
  if (item) {
    const isActive = item.classList.contains('active');
    document.querySelectorAll('.faq-accordion-item').forEach(el => el.classList.remove('active'));
    if (!isActive) item.classList.add('active');
  }
}

// --- Contact Form Submission Handler ---
function handleContactSubmit(e) {
  e.preventDefault();
  const fName = document.getElementById('contactFirstName')?.value || 'Guest';
  const lName = document.getElementById('contactLastName')?.value || '';
  const email = document.getElementById('contactEmail')?.value || '';
  const phone = document.getElementById('contactPhone')?.value || '';
  const subject = document.getElementById('contactSubject')?.value || 'Inquiry';
  const message = document.getElementById('contactMessage')?.value || '';

  // Save inquiry to localStorage for Admin Dashboard
  const inquiries = JSON.parse(localStorage.getItem('stackly_inquiries') || '[]');
  inquiries.unshift({
    name: fName + ' ' + lName,
    email: email,
    phone: phone,
    subject: subject,
    message: message,
    date: new Date().toLocaleDateString()
  });
  localStorage.setItem('stackly_inquiries', JSON.stringify(inquiries));

  showToast('Thank you, ' + fName + '! Your message was received by Stackly Salem.', 'success');
  e.target.reset();
}

// --- Detail Page VIP Test Drive Booking Handler ---
function handleDetailBooking(e) {
  e.preventDefault();
  const name = document.getElementById('detailDriveName')?.value || 'Guest';
  const phone = document.getElementById('detailDrivePhone')?.value || '';
  const date = document.getElementById('detailDriveDate')?.value || 'Tomorrow';
  const loc = document.getElementById('detailDriveLoc')?.value || 'Meyyanur Showroom';

  showToast('Test drive reserved for ' + name + ' on ' + date + ' (' + loc + ')!', 'success');
  e.target.reset();
}

// --- Financing Application Submission Handler ---
function handleFinancingSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('finName')?.value || 'Applicant';
  const phone = document.getElementById('finPhone')?.value || '';
  const car = document.getElementById('finCar')?.value || 'Vehicle';

  showToast('Pre-approval application submitted for ' + name + '! Bank approval in 15 mins.', 'success');
  e.target.reset();
}

// --- Newsletter Subscription Handler ---
function handleNewsletterSubmit(e) {
  e.preventDefault();
  const email = document.getElementById('newsEmailInput')?.value || '';
  showToast('Subscribed! Motoring digest will be sent to ' + email, 'success');
  e.target.reset();
}


// ==============================================================================
// 15. STACKLY CINEMATIC 3-SECOND SUPERCAR PRELOADER & SMOOTH PAGE NAVIGATION
// ==============================================================================
function initStacklyPreloader() {
  const preloader = document.getElementById('stacklyPreloader');
  if (!preloader) return;

  const car = document.getElementById('preloaderCar');
  const track = document.getElementById('preloaderTrack');
  const progressBar = document.getElementById('preloaderProgressBar');
  const percentText = document.getElementById('preloaderPercent');
  const statusText = document.getElementById('preloaderStatus');
  const speedText = document.getElementById('hudSpeed');
  const gearText = document.getElementById('hudGear');

  const DURATION = 3000; // Exactly 3.0 seconds
  let startTimestamp = null;

  // Explicit initial frame state
  if (progressBar) progressBar.style.width = '0%';
  if (percentText) percentText.textContent = '0%';
  if (speedText) speedText.textContent = '0';
  if (gearText) gearText.textContent = '1ST GEAR';

  function updatePreloader(currentTime) {
    if (!startTimestamp) startTimestamp = currentTime || performance.now();
    const elapsed = (currentTime || performance.now()) - startTimestamp;
    const progress = Math.min(1, Math.max(0, elapsed / DURATION));
    const percent = Math.floor(progress * 100);

    // Update Percentage Text (0% -> 100%)
    if (percentText) percentText.textContent = percent + '%';

    // Update Progress Bar Line (0% -> 100% with ultra-smooth sub-pixel precision)
    if (progressBar) progressBar.style.width = (progress * 100).toFixed(1) + '%';

    // Update Speedometer HUD (0 -> 240 KM/H)
    if (speedText) {
      const currentSpeed = Math.floor(progress * 240);
      speedText.textContent = currentSpeed;
    }

    // Update Gear Shifter HUD
    if (gearText) {
      if (progress < 0.20) gearText.textContent = '1ST GEAR';
      else if (progress < 0.45) gearText.textContent = '2ND GEAR';
      else if (progress < 0.70) gearText.textContent = '3RD GEAR';
      else if (progress < 0.90) gearText.textContent = '4TH GEAR';
      else gearText.textContent = 'TOP GEAR';
    }

    // Move Supercar smoothly along the highway track
    if (car && track) {
      const trackWidth = track.clientWidth || 550;
      const carWidth = car.clientWidth || 200;
      const maxDistance = Math.max(0, trackWidth - carWidth);
      car.style.left = (progress * maxDistance).toFixed(1) + 'px';
    }

    // Dynamic Automotive Milestones
    if (statusText) {
      if (progress < 0.28) {
        statusText.innerHTML = '<i class="fas fa-fire" style="color:var(--accent-pink);"></i> Igniting Twin-Turbo V8 Powertrain...';
      } else if (progress < 0.60) {
        statusText.innerHTML = '<i class="fas fa-microchip fa-spin" style="color:var(--accent-cyan);"></i> Calibrating Salem Showroom Inventory...';
      } else if (progress < 0.90) {
        statusText.innerHTML = '<i class="fas fa-tachometer-alt" style="color:var(--primary);"></i> Engaging All-Wheel Drive Dynamics...';
      } else {
        statusText.innerHTML = '<i class="fas fa-flag-checkered" style="color:#2ecc71;"></i> Showroom Experience Ready &ndash; Launching!';
      }
    }

    if (progress < 1) {
      requestAnimationFrame(updatePreloader);
    } else {
      // 3.0s Complete: Guarantee 100% full line and 100% text
      if (progressBar) progressBar.style.width = '100%';
      if (percentText) percentText.textContent = '100%';
      if (speedText) speedText.textContent = '240';
      if (gearText) gearText.textContent = 'TOP GEAR';

      // High-speed nitro launch & cinematic dissolve
      if (car) {
        car.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease';
        car.style.transform = 'translateX(140px) scale(1.05)';
      }
      setTimeout(() => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
          preloader.style.display = 'none';
          // Immediately reveal everything in the viewport once preloader finishes
          window.dispatchEvent(new Event('scroll'));
          window.dispatchEvent(new Event('resize'));
        }, 550);
      }, 150);
    }
  }

  requestAnimationFrame(updatePreloader);
  initSmoothNavigation();
}

// Password toggle helper for luxury login portal
function togglePasswordVisibility(inputId, toggleIcon) {
  const input = document.getElementById(inputId);
  if (!input) return;
  if (input.type === 'password') {
    input.type = 'text';
    toggleIcon.classList.remove('fa-eye');
    toggleIcon.classList.add('fa-eye-slash');
  } else {
    input.type = 'password';
    toggleIcon.classList.remove('fa-eye-slash');
    toggleIcon.classList.add('fa-eye');
  }
}

// Smooth Page Navigation handler for seamless transitions
function initSmoothNavigation() {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href) return;

    // Ignore anchors, external links, javascript, tel, mailto, target="_blank"
    if (
      href.startsWith('#') ||
      href.startsWith('javascript:') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      link.getAttribute('target') === '_blank' ||
      href.startsWith('http://') ||
      href.startsWith('https://')
    ) {
      return;
    }

    // Intercept internal page navigation (.html)
    if (href.endsWith('.html') || (!href.includes('://') && !href.startsWith('#'))) {
      e.preventDefault();
      const targetUrl = href;
      const preloader = document.getElementById('stacklyPreloader');

      if (preloader) {
        // Smoothly reveal preloader and navigate
        preloader.style.display = 'flex';
        preloader.classList.remove('fade-out');
        const car = document.getElementById('preloaderCar');
        if (car) {
          car.style.transition = 'none';
          car.style.transform = 'none';
          car.style.left = '0px';
        }
        setTimeout(() => {
          window.location.href = targetUrl;
        }, 220);
      } else {
        window.location.href = targetUrl;
      }
    }
  });
}


// ==============================================================================
// 16. FAST CUSTOMER DASHBOARD HELPERS & INVENTORY RENDERER
// ==============================================================================

// Fast instant tab switcher for Customer Dashboard
function switchCustTab(tabId, navBtn) {
  // Update sidebar active state
  if (navBtn) {
    document.querySelectorAll('.dash-nav-btn').forEach(b => b.classList.remove('active'));
    navBtn.classList.add('active');
  } else {
    document.querySelectorAll('.dash-nav-btn').forEach(b => {
      if (b.dataset.tab === tabId) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });
  }

  // Hide all panels & show target with zero lag
  document.querySelectorAll('.dash-tab-panel').forEach(p => p.classList.remove('active-panel'));
  const targetPanel = document.getElementById(tabId);
  if (targetPanel) {
    targetPanel.classList.add('active-panel');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Populate inventory if switching to inventory tab
  if (tabId === 'custInventory') {
    renderCustInventoryCards();
  }
}

// 12 Dealership Inventory Cars Data
const custInventoryData = [
  { name: 'Mercedes-Benz AMG GT Coupe', make: 'Mercedes-Benz', type: 'Coupe', price: '$89,500', emi: '$1,340/mo', hp: '523 HP', miles: '1,450 km', status: 'Available', img: 'assets/luxury-silver-sports-car-241de.webp' },
  { name: 'BMW M4 Competition', make: 'BMW', type: 'Coupe', price: '$78,900', emi: '$1,180/mo', hp: '503 HP', miles: '8,200 km', status: 'Available', img: 'assets/sport-car-1-e1623321077599-2b4e7.webp' },
  { name: 'Audi RS7 Sportback Quattro', make: 'Audi', type: 'Sedan', price: '$105,000', emi: '$1,560/mo', hp: '591 HP', miles: '520 km', status: 'Available', img: 'assets/car-3-e1623321014259-83cf6.webp' },
  { name: 'Range Rover Sport Dynamic', make: 'Land Rover', type: 'SUV', price: '$94,500', emi: '$1,410/mo', hp: '395 HP', miles: '14,800 km', status: 'Available', img: 'assets/brand-new-vehicle-on-dealership-display-e1623320551734-ea3c7.webp' },
  { name: 'Porsche 911 Carrera S', make: 'Porsche', type: 'Convertible', price: '$138,000', emi: '$2,050/mo', hp: '443 HP', miles: '4,100 km', status: 'Reserved', img: 'assets/studio-shot-of-three-dimensional-yellow-convertible-fd38c.webp' },
  { name: 'Ford Mustang GT Fastback', make: 'Ford', type: 'Coupe', price: '$56,800', emi: '$850/mo', hp: '450 HP', miles: '850 km', status: 'Available', img: 'assets/headlight-of-old-car-e1623320588420-1b595.webp' },
  { name: 'Timor Hatchback V2', make: 'Timor', type: 'Sedan', price: '$24,495', emi: '$370/mo', hp: '180 HP', miles: '7,215 km', status: 'Available', img: 'assets/car-3-e1623321014259-83cf6.webp' },
  { name: 'Timor Ventura V2', make: 'Timor', type: 'Sedan', price: '$24,495', emi: '$370/mo', hp: '190 HP', miles: '7,215 km', status: 'Available', img: 'assets/sport-car-1-e1623321077599-2b4e7.webp' },
  { name: 'Toyota Convertible', make: 'Toyota', type: 'Convertible', price: '$64,495', emi: '$960/mo', hp: '301 HP', miles: '7,215 km', status: 'Inspection', img: 'assets/studio-shot-of-three-dimensional-yellow-convertible-fd38c.webp' },
  { name: 'Mobilist Greenia', make: 'Mobilist', type: 'Hybrid', price: '$124,495', emi: '$1,850/mo', hp: '680 HP', miles: '212 km', status: 'Available', img: 'assets/hybrid-car-1-c0f20.webp' },
  { name: 'Mobilist Loka', make: 'Mobilist', type: 'Hybrid', price: '$64,495', emi: '$960/mo', hp: '290 HP', miles: '7,215 km', status: 'Available', img: 'assets/white-smart-car-07bdf.webp' },
  { name: 'Timor Ventura Sport', make: 'Timor', type: 'SUV', price: '$124,495', emi: '$1,850/mo', hp: '420 HP', miles: '212 km', status: 'Available', img: 'assets/luxury-silver-sports-car-241de.webp' }
];

let activeCustCategory = 'all';

function renderCustInventoryCards(filterText = '') {
  const container = document.getElementById('custInventoryGrid');
  if (!container) return;

  const query = filterText.toLowerCase().trim();
  const filtered = custInventoryData.filter(car => {
    const matchesCat = activeCustCategory === 'all' || car.type.toLowerCase().includes(activeCustCategory.toLowerCase());
    const matchesSearch = !query || 
      car.name.toLowerCase().includes(query) || 
      car.make.toLowerCase().includes(query) || 
      car.type.toLowerCase().includes(query) || 
      car.price.toLowerCase().includes(query);
    return matchesCat && matchesSearch;
  });

  const countEl = document.getElementById('custInvCount');
  if (countEl) countEl.textContent = filtered.length;

  container.innerHTML = filtered.map((car, idx) => `
    <div class="car-inventory-tile">
      <div class="car-img-wrapper" style="position:relative; overflow:hidden;">
        <img src="${car.img}" alt="${car.name}" loading="lazy" style="height:190px; width:100%; object-fit:cover;"/>
        <span class="status-tag ${car.status === 'Available' ? 'status-confirmed' : 'status-pending'}" style="position:absolute; top:12px; left:12px;">${car.status}</span>
        <button onclick="toggleSaveWishlist('${car.name}', this)" class="btn btn-sm" style="position:absolute; top:12px; right:12px; background:rgba(0,0,0,0.6); border:none; color:#fff; border-radius:50%; width:32px; height:32px; display:flex; align-items:center; justify-content:center;" title="Bookmark to Wishlist">
          <i class="fas fa-heart"></i>
        </button>
      </div>
      <div class="car-card-body" style="padding:18px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
          <span style="font-size:12px; font-weight:700; color:var(--text-muted); text-transform:uppercase;">${car.make} &bull; ${car.type}</span>
          <span style="font-size:12px; font-weight:700; color:var(--accent-cyan);">${car.emi}</span>
        </div>
        <h4 style="font-size:1.15rem; font-weight:800; color:#fff; margin-bottom:8px;">${car.name}</h4>
        <div style="display:flex; gap:12px; font-size:12px; color:var(--text-muted); margin-bottom:14px;">
          <span><i class="fas fa-bolt" style="color:var(--primary);"></i> ${car.hp}</span>
          <span><i class="fas fa-road" style="color:var(--accent-cyan);"></i> ${car.miles}</span>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border-light); padding-top:12px;">
          <strong style="font-size:1.3rem; color:var(--primary);">${car.price}</strong>
          <button onclick="bookCarFromWishlist('${car.name}')" class="btn btn-primary btn-sm" style="font-size:11.5px; padding:5px 12px;"><i class="fas fa-key"></i> Test Drive</button>
        </div>
      </div>
    </div>
  `).join('');
}

function filterCustInventory() {
  const query = document.getElementById('custInvSearch')?.value || '';
  renderCustInventoryCards(query);
}

function filterCustCategory(cat, btn) {
  activeCustCategory = cat;
  if (btn) {
    document.querySelectorAll('#custCatPills button').forEach(b => {
      b.className = 'btn btn-outline btn-sm';
      b.style.padding = '5px 14px';
      b.style.fontSize = '12px';
    });
    btn.className = 'btn btn-primary btn-sm';
    btn.style.padding = '5px 14px';
    btn.style.fontSize = '12px';
  }
  const query = document.getElementById('custInvSearch')?.value || '';
  renderCustInventoryCards(query);
}

function bookCarFromWishlist(carName) {
  openCustBookingModal();
  const select = document.getElementById('bookVehicleSelect');
  if (select) {
    let found = false;
    for (let opt of select.options) {
      if (opt.value.toLowerCase().includes(carName.toLowerCase().split(' ')[0])) {
        opt.selected = true;
        found = true;
        break;
      }
    }
    if (!found && select.options.length > 0) {
      select.options[0].selected = true;
    }
  }
}

function toggleSaveWishlist(carName, btn) {
  const favEl = document.getElementById('favCount');
  const kpiEl = document.getElementById('kpiSavedCars');
  let currentFavs = +(favEl?.textContent || 3);
  
  if (btn.style.color === 'rgb(248, 13, 118)' || btn.style.color === '#f80d76') {
    btn.style.color = '#fff';
    currentFavs = Math.max(0, currentFavs - 1);
    showToast(carName + ' removed from wishlist.', 'danger');
  } else {
    btn.style.color = 'var(--accent-pink)';
    currentFavs += 1;
    showToast(carName + ' saved to your wishlist!', 'success');
  }
  
  if (favEl) favEl.textContent = currentFavs;
  if (kpiEl) kpiEl.textContent = currentFavs;
}

// Live Real-Time Interactive Loan EMI Calculator
function calculateLiveEmi() {
  const loanAmt = +document.getElementById('calcLoanAmt')?.value || 45000;
  const annualRate = +document.getElementById('calcRate')?.value || 7.2;
  const tenureMonths = +document.getElementById('calcTenure')?.value || 60;

  // Labels
  const amtEl = document.getElementById('calcLoanAmtText');
  const rateEl = document.getElementById('calcRateText');
  const tenureEl = document.getElementById('calcTenureText');
  if (amtEl) amtEl.textContent = '$' + loanAmt.toLocaleString();
  if (rateEl) rateEl.textContent = annualRate.toFixed(1) + '%';
  if (tenureEl) tenureEl.textContent = tenureMonths + ' Months (' + (tenureMonths / 12).toFixed(1) + ' Yrs)';

  // Monthly EMI = [P x R x (1+R)^N]/[(1+R)^N-1]
  const monthlyRate = (annualRate / 12) / 100;
  const emi = (loanAmt * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / (Math.pow(1 + monthlyRate, tenureMonths) - 1);
  const totalPayment = emi * tenureMonths;
  const totalInterest = totalPayment - loanAmt;

  const emiEl = document.getElementById('calcMonthlyEmi');
  const intEl = document.getElementById('calcTotalInterest');
  const payEl = document.getElementById('calcTotalPayment');

  if (emiEl) emiEl.innerHTML = '$' + Math.round(emi).toLocaleString() + ' <small style="font-size:14px; font-weight:500; color:var(--text-muted);">/ mo</small>';
  if (intEl) intEl.textContent = '$' + Math.round(totalInterest).toLocaleString();
  if (payEl) payEl.textContent = '$' + Math.round(totalPayment).toLocaleString();
}

function downloadSanctionLetter() {
  const user = JSON.parse(localStorage.getItem('stackly_user') || '{"name":"Rajesh Kumar"}');
  showToast('Downloading Sanction Certificate for ' + user.name + '...', 'info');
  setTimeout(() => {
    const text = "STACKLY LUXURY AUTOMOTIVE\n"
      + "PRE-APPROVED CREDIT FACILITY CERTIFICATE\n"
      + "----------------------------------------------------\n"
      + "Client: " + user.name + "\n"
      + "Sanctioned Amount: $45,000 USD (INR 37,50,000)\n"
      + "Consortium Partners: HDFC Bank & SBI Automotive\n"
      + "Fixed APR: 7.2% for 60 Months\n"
      + "Certificate Ref: STK-VIP-LN-9921\n"
      + "Status: Cleared for Instant Disbursal\n";
    const blob = new Blob([text], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = "Stackly_PreApproved_Loan_Sanction.txt";
    link.click();
    showToast('Sanction certificate downloaded!', 'success');
  }, 400);
}

function openShowroomRoute() {
  window.open("https://maps.google.com/?q=Stackly+Meyyanur+Salem+Tamil+Nadu", "_blank");
}
