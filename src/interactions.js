document.addEventListener('DOMContentLoaded', () => {
  // ── Theme Toggle ────────────────────────────────────────────────────────────
  const themeToggles = document.querySelectorAll('[data-theme-toggle]');
  const html = document.documentElement;

  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    html.setAttribute('data-theme', 'dark');
  } else {
    html.setAttribute('data-theme', 'light');
  }

  themeToggles.forEach((themeToggle) => {
    themeToggle.addEventListener('click', () => {
      const newTheme = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
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

  // Delegated click handler for drawers, learn-more, close buttons
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-drawer-target]');
    if (trigger) {
      e.preventDefault();
      openDrawerById(trigger.getAttribute('data-drawer-target'));
      return;
    }

    if (e.target.closest('#learn-more-btn') || e.target.closest('#info-btn')) {
      e.preventDefault();
      openDrawerById('info-drawer');
      return;
    }

    if (e.target.closest('.drawer-close-btn')) {
      closeAllDrawers();
      return;
    }
  });

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

    if (cards.length > 0) {
      if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
          isExpanded = !isExpanded;
          updateGrid();
        });
      }

      filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
          filterPills.forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
          currentFilter = pill.getAttribute('data-filter');
          isExpanded = false;
          updateGrid();
        });
      });

      updateGrid();
    }
  }

  setupGridFilter('#projects-grid', '#projects .filter-pill', 'load-more-btn');
  setupGridFilter('#writing-grid', '#writing .filter-pill', 'load-more-writing-btn');
});
