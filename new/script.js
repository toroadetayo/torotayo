const root = document.documentElement;
const themeButtons = document.querySelectorAll("[data-theme-toggle]");
const menuButton = document.querySelector("[data-menu-toggle]");
const menuCloseButtons = document.querySelectorAll("[data-menu-close]");
const sidebar = document.querySelector("[data-sidebar]");
const navLinks = document.querySelectorAll(".side-nav a");
const clock = document.querySelector("[data-sydney-time]");
const mobile = window.matchMedia("(max-width: 760px)");

function getSavedTheme() {
  try { return localStorage.getItem("torotayo-theme"); } catch { return null; }
}

function saveTheme(theme) {
  try { localStorage.setItem("torotayo-theme", theme); } catch { /* Storage can be unavailable. */ }
}

function setTheme(theme) {
  root.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]').content = theme === "dark" ? "#172321" : "#fbfcfb";
  themeButtons.forEach((button) => {
    const label = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
    button.setAttribute("aria-label", label);
    button.title = label;
    button.querySelector("i").className = theme === "dark" ? "ph-fill ph-sun" : "ph-fill ph-moon-stars";
  });
}

const initialTheme = getSavedTheme() || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
setTheme(initialTheme);
themeButtons.forEach((button) => button.addEventListener("click", () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  setTheme(next);
  saveTheme(next);
}));

const sydneyFormatter = new Intl.DateTimeFormat("en-AU", {
  timeZone: "Australia/Sydney",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

function updateClock() {
  const now = new Date();
  clock.textContent = sydneyFormatter.format(now);
  clock.dateTime = now.toISOString();
}
updateClock();
window.setInterval(updateClock, 30_000);

function setMenu(open, returnFocus = false) {
  const shouldOpen = open && mobile.matches;
  document.body.classList.toggle("menu-open", shouldOpen);
  menuButton.setAttribute("aria-expanded", String(shouldOpen));
  menuButton.setAttribute("aria-label", shouldOpen ? "Close navigation" : "Open navigation");
  menuButton.title = shouldOpen ? "Close navigation" : "Open navigation";
  sidebar.inert = mobile.matches && !shouldOpen;
  if (shouldOpen) sidebar.querySelector(".sidebar-close").focus();
  else if (returnFocus) menuButton.focus();
}

menuButton.addEventListener("click", () => setMenu(!document.body.classList.contains("menu-open"), true));
menuCloseButtons.forEach((button) => button.addEventListener("click", () => setMenu(false, true)));
navLinks.forEach((link) => link.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && document.body.classList.contains("menu-open")) setMenu(false, true);
});
mobile.addEventListener("change", () => setMenu(false));
setMenu(false);

function setActiveLink(id) {
  navLinks.forEach((link) => {
    const active = link.getAttribute("href") === `#${id}`;
    link.classList.toggle("is-active", active);
    if (active) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
}

if (document.body.dataset.page === "home") {
  const sections = [...document.querySelectorAll("main section[id]")];
  const observer = new IntersectionObserver(() => {
    let current = "top";
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= window.innerHeight * 0.38) current = section.id;
    }
    setActiveLink(current);
  }, { rootMargin: "-30% 0px -55% 0px" });
  sections.forEach((section) => observer.observe(section));
}
