document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  
  // Check for saved theme or system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    html.setAttribute('data-theme', 'dark');
  } else {
    html.setAttribute('data-theme', 'light');
  }

  themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });

  // Drawer Logic
  const infoBtn = document.getElementById('info-btn');
  const learnMoreBtn = document.getElementById('learn-more-btn');
  const drawer = document.getElementById('info-drawer');
  const overlay = document.getElementById('drawer-overlay');
  const closeBtn = document.getElementById('close-drawer');

  function openDrawer(e) {
    if (e) e.preventDefault();
    drawer.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  }

  function closeDrawer() {
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  infoBtn.addEventListener('click', openDrawer);
  if (learnMoreBtn) learnMoreBtn.addEventListener('click', openDrawer);
  closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('active')) {
      closeDrawer();
    }
  });

  // Mobile Menu Logic
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  // Generic Grid Filtering and Load More
  function setupGridFilter(gridSelector, filterSelector, loadMoreBtnId, initialCount = 6) {
    const filterPills = document.querySelectorAll(filterSelector);
    const cards = document.querySelectorAll(`${gridSelector} .card`);
    const loadMoreBtn = document.getElementById(loadMoreBtnId);
    let currentFilter = 'all';
    let isExpanded = false;

    function updateGrid() {
      let matchedCards = [];

      // Filter cards
      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (currentFilter === 'all' || category === currentFilter) {
          matchedCards.push(card);
        } else {
          card.style.display = 'none';
        }
      });

      // Show/hide based on expansion state
      matchedCards.forEach((card, index) => {
        if (isExpanded || index < initialCount) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });

      // Update Load More button
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
          // Update active state
          filterPills.forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
          
          // Update filter and reset expansion
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

      // Initial render
      updateGrid();
    }
  }

  // Initialize filters
  setupGridFilter('#projects-grid', '#projects .filter-pill', 'load-more-btn');
  setupGridFilter('#writing-grid', '#writing .filter-pill', 'load-more-writing-btn');
});
