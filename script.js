document.addEventListener('DOMContentLoaded', () => {
  // ── Theme Toggle ────────────────────────────────────────────────────────────
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;

  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    html.setAttribute('data-theme', 'dark');
  } else {
    html.setAttribute('data-theme', 'light');
  }

  themeToggle.addEventListener('click', () => {
    const newTheme = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });

  // ── Generic Drawer System ───────────────────────────────────────────────────
  const overlay = document.getElementById('drawer-overlay');

  function openDrawerById(id) {
    const target = document.getElementById(id);
    if (!target) return;
    target.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeAllDrawers() {
    document.querySelectorAll('.drawer.active').forEach(d => d.classList.remove('active'));
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Project card links with data-drawer-target
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-drawer-target]');
    if (trigger) {
      e.preventDefault();
      openDrawerById(trigger.getAttribute('data-drawer-target'));
      return;
    }

    // Close buttons inside drawers
    if (e.target.closest('.drawer-close-btn')) {
      closeAllDrawers();
      return;
    }
  });

  // Info / Learn More nav buttons (static in HTML, open info-drawer)
  const infoBtn = document.getElementById('info-btn');
  if (infoBtn) infoBtn.addEventListener('click', (e) => { e.preventDefault(); openDrawerById('info-drawer'); });

  const learnMoreBtn = document.getElementById('learn-more-btn');
  if (learnMoreBtn) learnMoreBtn.addEventListener('click', (e) => { e.preventDefault(); openDrawerById('info-drawer'); });

  // Overlay click closes all drawers
  overlay.addEventListener('click', closeAllDrawers);

  // Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllDrawers();
  });

  // ── Mobile Menu ─────────────────────────────────────────────────────────────
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => navLinks.classList.toggle('active'));
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('active'));
    });
  }

  // ── Generic Grid Filtering and Load More ────────────────────────────────────
  function setupGridFilter(gridSelector, filterSelector, loadMoreBtnId, initialCount = 6) {
    const filterPills = document.querySelectorAll(filterSelector);
    const cards = document.querySelectorAll(`${gridSelector} .card`);
    const loadMoreBtn = document.getElementById(loadMoreBtnId);
    let currentFilter = 'all';
    let isExpanded = false;

    function updateGrid() {
      const matchedCards = [];
      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (currentFilter === 'all' || category === currentFilter) {
          matchedCards.push(card);
        } else {
          card.style.display = 'none';
        }
      });

      matchedCards.forEach((card, index) => {
        card.style.display = (isExpanded || index < initialCount) ? 'flex' : 'none';
      });

      if (loadMoreBtn) {
        if (matchedCards.length > initialCount) {
          loadMoreBtn.style.display = 'inline-block';
          loadMoreBtn.textContent = isExpanded ? 'Show Less' : 'Load More';
        } else {
          loadMoreBtn.style.display = 'none';
        }
      }
    }

    if (filterPills.length > 0 && cards.length > 0) {
      filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
          filterPills.forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
          currentFilter = pill.getAttribute('data-filter');
          isExpanded = false;
          updateGrid();
        });
      });

      if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
          isExpanded = !isExpanded;
          updateGrid();
        });
      }

      updateGrid();
    }
  }

  setupGridFilter('#projects-grid', '#projects .filter-pill', 'load-more-btn');
  setupGridFilter('#writing-grid', '#writing .filter-pill', 'load-more-writing-btn');
});
