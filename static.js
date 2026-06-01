const header = document.getElementById("site-header");
const navToggle = document.getElementById("nav-toggle");
const siteNav = document.getElementById("site-nav");
const revealItems = document.querySelectorAll(".reveal");

function syncHeader() {
  header.classList.toggle("scrolled", window.scrollY > 12);
}

function toggleMenu() {
  const isOpen = siteNav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
}

function closeMenuOnNavigate() {
  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

function setupReveal() {
  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealItems.forEach((item) => observer.observe(item));
}

navToggle.addEventListener("click", toggleMenu);
closeMenuOnNavigate();
setupReveal();
syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });
