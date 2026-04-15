import './interactions.js';
import siteSettings from './data/site-settings.json';
import projectsData from './data/projects.json';
import writingData from './data/writing.json';
import speaking from './data/speaking.json';
import info from './data/info.json';

const projects = projectsData.projects;
const writing = writingData.writing;

// ── Markdown renderer (lightweight, no dependency) ───────────────────────────
// Converts the subset of Markdown used in drawer body fields to HTML.
function md(text) {
  if (!text) return '';
  return text
    // h2
    .replace(/^## (.+)$/gm, '<h3>$1</h3>')
    // h3
    .replace(/^### (.+)$/gm, '<h4>$1</h4>')
    // bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // italic / em
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // inline links
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="btn secondary" style="display:inline-block;margin-top:0.5rem;">$1</a>')
    // unordered list items (lines starting with "- ")
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    // ordered list items (lines starting with "1. ", "2. ", etc.)
    .replace(/^\d+\. (.+)$/gm, '<li data-ol>$1</li>')
    // wrap consecutive <li> blocks
    .replace(/((?:<li>.*<\/li>\n?)+)/g, (match) => {
      if (match.includes('data-ol')) {
        const cleaned = match.replace(/ data-ol/g, '');
        return `<ol style="padding-left:1.5rem;margin-bottom:1.5rem;display:flex;flex-direction:column;gap:1rem;">${cleaned}</ol>`;
      }
      return `<ul style="padding-left:1.5rem;margin-bottom:1.5rem;list-style-type:disc;color:var(--text-secondary);">${match}</ul>`;
    })
    // paragraphs: blank-line-separated blocks not already wrapped in a tag
    .replace(/^(?!<[houla])(.+)$/gm, '<p style="color:var(--text-secondary);">$1</p>')
    // clean up blank lines
    .replace(/\n{2,}/g, '');
}

// ── Hero ─────────────────────────────────────────────────────────────────────
function renderHero(s) {
  const el = document.getElementById('hero-mount');
  if (!el) return;
  el.innerHTML = `
    <div class="hero-content">
      <div class="hero-text">
        <h1>${s.hero.headline}</h1>
        <p class="subtitle">${s.hero.subtitle}</p>
        <div class="hero-actions">
          <a href="#" id="learn-more-btn" class="btn primary">${s.hero.cta_learn_more}</a>
          <a href="mailto:${s.contact.email}" class="btn secondary">${s.hero.cta_contact}</a>
        </div>
      </div>
      <div class="hero-image">
        <img src="${s.hero.image}" alt="${s.hero.image_alt}" referrerPolicy="no-referrer" />
      </div>
    </div>`;
}

// ── Projects section header ───────────────────────────────────────────────────
function renderProjectsHeader(s) {
  const el = document.getElementById('projects-header-mount');
  if (!el) return;
  const filters = s.projects_section.filters
    .map((f, i) => `<button class="filter-pill${i === 0 ? ' active' : ''}" data-filter="${f.value}">${f.label}</button>`)
    .join('');
  el.innerHTML = `
    <div class="section-header">
      <h2>${s.projects_section.heading}</h2>
      <p>${s.projects_section.description}</p>
      <div class="filter-pills">${filters}</div>
    </div>`;
}

// ── Writing section header ────────────────────────────────────────────────────
function renderWritingHeader(s) {
  const el = document.getElementById('writing-header-mount');
  if (!el) return;
  const ws = s.writing_section;
  const filters = ws.filters
    .map((f, i) => `<button class="filter-pill${i === 0 ? ' active' : ''}" data-filter="${f.value}">${f.label}</button>`)
    .join('');
  el.innerHTML = `
    <div class="section-header">
      <h2>${ws.heading}</h2>
      <p>${ws.description}</p>
      <p style="font-size:0.95rem;margin-top:0.5rem;color:var(--text-secondary);">
        View all writing here: <a href="${ws.muckrack_url}" target="_blank" rel="noopener noreferrer" style="text-decoration:underline;color:var(--text-primary);">Muckrack</a>.
        As seen on: <a href="${ws.susinsight_url}" target="_blank" rel="noopener noreferrer" style="text-decoration:underline;color:var(--text-primary);">Susinsight</a>,
        <a href="${ws.susbridge_url}" target="_blank" rel="noopener noreferrer" style="text-decoration:underline;color:var(--text-primary);">Susbridge</a>, and
        <a href="${ws.medium_url}" target="_blank" rel="noopener noreferrer" style="text-decoration:underline;color:var(--text-primary);">Medium</a>.
      </p>
      <div class="filter-pills">${filters}</div>
    </div>`;
}

// ── Project card ─────────────────────────────────────────────────────────────
function renderProjectCard(p) {
  let linkHtml;
  if (p.link_type === 'drawer') {
    linkHtml = `<a href="/${p.id}" class="card-link" id="${p.id}" data-drawer-target="${p.drawer_id}">View Project &rarr;</a>`;
  } else {
    linkHtml = `<a href="${p.url}" class="card-link" target="_blank" rel="noopener noreferrer">View Project &rarr;</a>`;
  }
  return `
    <div class="card" data-category="${p.category}">
      <img src="${p.image}" alt="Project" class="card-img" referrerPolicy="no-referrer">
      <div class="card-content">
        <span class="tag">${p.tag}</span>
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        ${linkHtml}
      </div>
    </div>`;
}

// ── Writing card ──────────────────────────────────────────────────────────────
function renderWritingCard(w) {
  return `
    <div class="card" data-category="${w.category}">
      <img src="${w.image}" alt="Writing" class="card-img" referrerPolicy="no-referrer">
      <div class="card-content">
        <span class="tag">${w.tag}</span>
        <h3>${w.title}</h3>
        <p>${w.description}</p>
        <a href="${w.url}" class="card-link" target="_blank" rel="noopener noreferrer">${w.link_label} &rarr;</a>
      </div>
    </div>`;
}

// ── Drawer ────────────────────────────────────────────────────────────────────
function renderDrawer(p) {
  const d = p.drawer;
  const metaHtml = d.meta.map(m => `
    <div>
      <strong style="display:block;font-size:0.85rem;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-secondary);margin-bottom:0.25rem;">${m.label}</strong>
      <span>${m.value}</span>
    </div>`).join('');

  const visitLinkHtml = d.visit_link
    ? `<a href="${d.visit_link}" target="_blank" rel="noopener noreferrer" class="btn primary" style="margin-bottom:2rem;display:inline-block;">Visit ${p.title}</a>`
    : '';

  const resourceHtml = d.resource ? `
    <div style="background:var(--card-bg);padding:1.5rem;border-radius:12px;border:1px solid var(--card-border);margin-bottom:2rem;">
      <h4 style="margin-top:0;margin-bottom:0.5rem;">${d.resource.heading}</h4>
      ${d.resource.description ? `<p style="margin-bottom:1rem;color:var(--text-secondary);">${d.resource.description}</p>` : ''}
      <a href="${d.resource.url}" class="btn secondary" target="_blank" rel="noopener noreferrer" style="display:inline-block;">${d.resource.button_label}</a>
    </div>` : '';

  const skillsHtml = d.skills && d.skills.length
    ? `<h3>Skills Demonstrated</h3>
       <div class="filter-pills" style="margin-top:1rem;">${d.skills.map(s => `<span class="filter-pill">${s}</span>`).join('')}</div>`
    : '';

  return `
    <div id="${p.drawer_id}" class="drawer">
      <button class="close-btn drawer-close-btn" aria-label="Close">&times;</button>
      <div class="drawer-inner">
        <h2>${p.title}</h2>
        <p style="font-size:1.125rem;color:var(--text-secondary);margin-bottom:1.5rem;">${d.subtitle}</p>
        ${visitLinkHtml}
        <div style="background:var(--card-bg);border:1px solid var(--card-border);padding:1.5rem;border-radius:12px;margin-bottom:2rem;display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem;">
          ${metaHtml}
        </div>
        <div class="drawer-body">${md(d.body)}</div>
        ${resourceHtml}
        ${skillsHtml}
      </div>
    </div>`;
}

// ── Info drawer ───────────────────────────────────────────────────────────────
function renderInfoDrawer(inf) {
  const parasHtml = inf.paragraphs.map(p => `<p>${p}</p>`).join('');
  const affiliationsHtml = inf.affiliations.map(a => `<li>${a}</li>`).join('');
  // Convert markdown links in beyond_body
  const beyondHtml = inf.beyond_body
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" style="text-decoration:underline;color:var(--text-primary);">$1</a>')
    .split('\n\n').map(p => `<p>${p}</p>`).join('');
  const drivesHtml = inf.drives_body
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" style="text-decoration:underline;">$1</a>')
    .split('\n\n').map(p => `<p>${p}</p>`).join('');

  return `
    <div id="info-drawer" class="drawer">
      <button id="close-drawer" class="close-btn drawer-close-btn" aria-label="Close Info">&times;</button>
      <div class="drawer-inner">
        <h2>Info</h2>
        <p class="lead">${inf.lead}</p>
        ${parasHtml}
        <h3>${inf.drives_heading}</h3>
        ${drivesHtml}
        <h3>${inf.beyond_heading}</h3>
        ${beyondHtml}
        <h3>${inf.affiliations_heading}</h3>
        <ul class="affiliations">${affiliationsHtml}</ul>
      </div>
    </div>`;
}

// ── Speaking section ──────────────────────────────────────────────────────────
function renderSpeaking(data, s) {
  const el = document.getElementById('speaking-mount');
  if (!el) return;
  const ss = s.speaking_section;
  const topicsHtml = data.talk_topics.map(t => `<li>${t}</li>`).join('');
  const engagementsHtml = data.engagements.map(e => `
    <div class="card">
      <img src="${e.image}" alt="Speaking Engagement" class="card-img" referrerPolicy="no-referrer">
      <div class="card-content">
        <span class="tag">${e.date_tag}</span>
        <h3>${e.title}</h3>
        <div class="meta">${e.host}</div>
        <p>${e.description}</p>
        <a href="${e.url}" class="card-link"${e.url !== '#' ? ' target="_blank" rel="noopener noreferrer"' : ''}>${e.link_label} &rarr;</a>
      </div>
    </div>`).join('');

  el.innerHTML = `
    <div class="section-header">
      <h2>${ss.heading}</h2>
      <p>${ss.topics_intro}</p>
      <ul class="topics-list">${topicsHtml}</ul>
      <a href="mailto:${s.contact.email}" class="btn secondary" style="display:inline-block;width:fit-content;">${ss.cta_email}</a>
    </div>
    <h3 style="margin-top:2rem;margin-bottom:2rem;">${ss.engagements_heading}</h3>
    <div class="grid grid-2">${engagementsHtml}</div>`;
}

// ── Footer ────────────────────────────────────────────────────────────────────
function renderFooter(s) {
  const el = document.getElementById('footer-mount');
  if (!el) return;
  const f = s.footer;
  const linksHtml = f.social_links.map(l => {
    const ext = l.external ? ' target="_blank" rel="noopener noreferrer"' : '';
    return `<a href="${l.url}"${ext}>${l.label}</a>`;
  }).join('');
  el.innerHTML = `
    <div class="footer-content">
      <h2>${f.heading}</h2>
      <p>${f.body}</p>
      <div class="social-links">${linksHtml}</div>
    </div>`;
}

// ── Nav brand ─────────────────────────────────────────────────────────────────
function renderNavBrand(s) {
  const el = document.getElementById('nav-brand');
  if (el) el.textContent = s.nav_brand;
  document.title = s.site_title;
}

// ── Bootstrap ─────────────────────────────────────────────────────────────────
renderNavBrand(siteSettings);
renderHero(siteSettings);
renderProjectsHeader(siteSettings);
renderWritingHeader(siteSettings);
renderSpeaking(speaking, siteSettings);
renderFooter(siteSettings);

const projectsGrid = document.getElementById('projects-grid');
const drawersMount = document.getElementById('drawers-mount');

projects.forEach(p => {
  projectsGrid.insertAdjacentHTML('beforeend', renderProjectCard(p));
  if (p.link_type === 'drawer' && p.drawer) {
    drawersMount.insertAdjacentHTML('beforeend', renderDrawer(p));
  }
});

drawersMount.insertAdjacentHTML('beforeend', renderInfoDrawer(info));

const writingGrid = document.getElementById('writing-grid');
writing.forEach(w => writingGrid.insertAdjacentHTML('beforeend', renderWritingCard(w)));
