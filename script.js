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

  const susinsightDrawer = document.getElementById('susinsight-drawer');
  const susinsightDrawerClose = document.getElementById('susinsight-drawer-close');
  const susinsightLink = document.getElementById('susinsight-link');

  const culersonDrawer = document.getElementById('culerson-drawer');
  const culersonDrawerClose = document.getElementById('culerson-drawer-close');
  const culersonLink = document.getElementById('culerson-link');

  const kumatDrawer = document.getElementById('kumat-drawer');
  const kumatDrawerClose = document.getElementById('kumat-drawer-close');
  const kumatLink = document.getElementById('kumat-link');

  const arDrawer = document.getElementById('ar-drawer');
  const arDrawerClose = document.getElementById('ar-drawer-close');
  const arLink = document.getElementById('ar-link');

  const oneAcreFundDrawer = document.getElementById('one-acre-fund-drawer');
  const oneAcreFundDrawerClose = document.getElementById('one-acre-fund-drawer-close');
  const oneAcreFundLink = document.getElementById('one-acre-fund-link');

  const lcaDrawer = document.getElementById('lca-drawer');
  const lcaDrawerClose = document.getElementById('lca-drawer-close');
  const lcaLink = document.getElementById('lca-link');

  const sugarDrawer = document.getElementById('sugar-drawer');
  const sugarDrawerClose = document.getElementById('sugar-drawer-close');
  const sugarLink = document.getElementById('sugar-link');

  const carTransportLcaDrawer = document.getElementById('car-transport-lca-drawer');
  const carTransportLcaDrawerClose = document.getElementById('car-transport-lca-drawer-close');
  const carTransportLcaLink = document.getElementById('car-transport-lca-link');

  const waterTreatmentDrawer = document.getElementById('water-treatment-drawer');
  const waterTreatmentDrawerClose = document.getElementById('water-treatment-drawer-close');
  const waterTreatmentLink = document.getElementById('water-treatment-link');

  const lithiumDrawer = document.getElementById('lithium-drawer');
  const lithiumDrawerClose = document.getElementById('lithium-drawer-close');
  const lithiumLink = document.getElementById('lithium-link');

  const bioButanolDrawer = document.getElementById('bio-butanol-drawer');
  const bioButanolDrawerClose = document.getElementById('bio-butanol-drawer-close');
  const bioButanolLink = document.getElementById('bio-butanol-link');

  const plasticRecoveryDrawer = document.getElementById('plastic-recovery-drawer');
  const plasticRecoveryDrawerClose = document.getElementById('plastic-recovery-drawer-close');
  const plasticRecoveryLink = document.getElementById('plastic-recovery-link');

  const carbonBlackDrawer = document.getElementById('carbon-black-drawer');
  const carbonBlackDrawerClose = document.getElementById('carbon-black-drawer-close');
  const carbonBlackLink = document.getElementById('carbon-black-link');

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

  function openSusinsightDrawer(e) {
    if (e) e.preventDefault();
    susinsightDrawer.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeSusinsightDrawer() {
    susinsightDrawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function openCulersonDrawer(e) {
    if (e) e.preventDefault();
    culersonDrawer.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCulersonDrawer() {
    culersonDrawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function openKumatDrawer(e) {
    if (e) e.preventDefault();
    kumatDrawer.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeKumatDrawer() {
    kumatDrawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function openArDrawer(e) {
    if (e) e.preventDefault();
    arDrawer.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeArDrawer() {
    arDrawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function openOneAcreFundDrawer(e) {
    if (e) e.preventDefault();
    oneAcreFundDrawer.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeOneAcreFundDrawer() {
    oneAcreFundDrawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function openLcaDrawer(e) {
    if (e) e.preventDefault();
    lcaDrawer.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLcaDrawer() {
    lcaDrawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function openSugarDrawer(e) {
    if (e) e.preventDefault();
    sugarDrawer.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeSugarDrawer() {
    sugarDrawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function openCarTransportLcaDrawer(e) {
    if (e) e.preventDefault();
    carTransportLcaDrawer.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCarTransportLcaDrawer() {
    carTransportLcaDrawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function openWaterTreatmentDrawer(e) {
    if (e) e.preventDefault();
    waterTreatmentDrawer.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeWaterTreatmentDrawer() {
    waterTreatmentDrawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function openLithiumDrawer(e) {
    if (e) e.preventDefault();
    lithiumDrawer.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLithiumDrawer() {
    lithiumDrawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function openBioButanolDrawer(e) {
    if (e) e.preventDefault();
    bioButanolDrawer.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeBioButanolDrawer() {
    bioButanolDrawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function openPlasticRecoveryDrawer(e) {
    if (e) e.preventDefault();
    plasticRecoveryDrawer.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closePlasticRecoveryDrawer() {
    plasticRecoveryDrawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function openCarbonBlackDrawer(e) {
    if (e) e.preventDefault();
    carbonBlackDrawer.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCarbonBlackDrawer() {
    carbonBlackDrawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  infoBtn.addEventListener('click', openDrawer);
  if (learnMoreBtn) learnMoreBtn.addEventListener('click', openDrawer);
  closeBtn.addEventListener('click', closeDrawer);
  
  if (susinsightLink) susinsightLink.addEventListener('click', openSusinsightDrawer);
  if (susinsightDrawerClose) susinsightDrawerClose.addEventListener('click', closeSusinsightDrawer);

  if (culersonLink) culersonLink.addEventListener('click', openCulersonDrawer);
  if (culersonDrawerClose) culersonDrawerClose.addEventListener('click', closeCulersonDrawer);

  if (kumatLink) kumatLink.addEventListener('click', openKumatDrawer);
  if (kumatDrawerClose) kumatDrawerClose.addEventListener('click', closeKumatDrawer);

  if (arLink) arLink.addEventListener('click', openArDrawer);
  if (arDrawerClose) arDrawerClose.addEventListener('click', closeArDrawer);

  if (oneAcreFundLink) oneAcreFundLink.addEventListener('click', openOneAcreFundDrawer);
  if (oneAcreFundDrawerClose) oneAcreFundDrawerClose.addEventListener('click', closeOneAcreFundDrawer);

  if (lcaLink) lcaLink.addEventListener('click', openLcaDrawer);
  if (lcaDrawerClose) lcaDrawerClose.addEventListener('click', closeLcaDrawer);

  if (sugarLink) sugarLink.addEventListener('click', openSugarDrawer);
  if (sugarDrawerClose) sugarDrawerClose.addEventListener('click', closeSugarDrawer);

  if (carTransportLcaLink) carTransportLcaLink.addEventListener('click', openCarTransportLcaDrawer);
  if (carTransportLcaDrawerClose) carTransportLcaDrawerClose.addEventListener('click', closeCarTransportLcaDrawer);

  if (waterTreatmentLink) waterTreatmentLink.addEventListener('click', openWaterTreatmentDrawer);
  if (waterTreatmentDrawerClose) waterTreatmentDrawerClose.addEventListener('click', closeWaterTreatmentDrawer);

  if (lithiumLink) lithiumLink.addEventListener('click', openLithiumDrawer);
  if (lithiumDrawerClose) lithiumDrawerClose.addEventListener('click', closeLithiumDrawer);

  if (bioButanolLink) bioButanolLink.addEventListener('click', openBioButanolDrawer);
  if (bioButanolDrawerClose) bioButanolDrawerClose.addEventListener('click', closeBioButanolDrawer);

  if (plasticRecoveryLink) plasticRecoveryLink.addEventListener('click', openPlasticRecoveryDrawer);
  if (plasticRecoveryDrawerClose) plasticRecoveryDrawerClose.addEventListener('click', closePlasticRecoveryDrawer);

  if (carbonBlackLink) carbonBlackLink.addEventListener('click', openCarbonBlackDrawer);
  if (carbonBlackDrawerClose) carbonBlackDrawerClose.addEventListener('click', closeCarbonBlackDrawer);

  overlay.addEventListener('click', () => {
    closeDrawer();
    closeSusinsightDrawer();
    closeCulersonDrawer();
    closeKumatDrawer();
    closeArDrawer();
    closeOneAcreFundDrawer();
    closeLcaDrawer();
    closeSugarDrawer();
    closeCarTransportLcaDrawer();
    closeWaterTreatmentDrawer();
    closeLithiumDrawer();
    closeBioButanolDrawer();
    closePlasticRecoveryDrawer();
    closeCarbonBlackDrawer();
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (drawer.classList.contains('active')) closeDrawer();
      if (susinsightDrawer && susinsightDrawer.classList.contains('active')) closeSusinsightDrawer();
      if (culersonDrawer && culersonDrawer.classList.contains('active')) closeCulersonDrawer();
      if (kumatDrawer && kumatDrawer.classList.contains('active')) closeKumatDrawer();
      if (arDrawer && arDrawer.classList.contains('active')) closeArDrawer();
      if (oneAcreFundDrawer && oneAcreFundDrawer.classList.contains('active')) closeOneAcreFundDrawer();
      if (lcaDrawer && lcaDrawer.classList.contains('active')) closeLcaDrawer();
      if (sugarDrawer && sugarDrawer.classList.contains('active')) closeSugarDrawer();
      if (carTransportLcaDrawer && carTransportLcaDrawer.classList.contains('active')) closeCarTransportLcaDrawer();
      if (waterTreatmentDrawer && waterTreatmentDrawer.classList.contains('active')) closeWaterTreatmentDrawer();
      if (lithiumDrawer && lithiumDrawer.classList.contains('active')) closeLithiumDrawer();
      if (bioButanolDrawer && bioButanolDrawer.classList.contains('active')) closeBioButanolDrawer();
      if (plasticRecoveryDrawer && plasticRecoveryDrawer.classList.contains('active')) closePlasticRecoveryDrawer();
      if (carbonBlackDrawer && carbonBlackDrawer.classList.contains('active')) closeCarbonBlackDrawer();
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
