// Nimra Safdar — portfolio interactions
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const progressBar = document.getElementById("progressBar");
const year = document.getElementById("year");
const toast = document.getElementById("toast");

if (year) year.textContent = new Date().getFullYear();

menuToggle?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

// Scroll progress indicator
function updateProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  if (progressBar) progressBar.style.width = `${progress}%`;
}
window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

// Reveal elements as they enter the viewport
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

// Lightweight rotating headline
const typedText = document.getElementById("typedText");
const phrases = ["Data Science", "Artificial Intelligence", "Machine Learning"];
let phraseIndex = 0;
if (typedText && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  window.setInterval(() => {
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typedText.classList.add("changing");
    typedText.style.opacity = "0";
    window.setTimeout(() => {
      typedText.textContent = phrases[phraseIndex];
      typedText.style.opacity = "1";
      typedText.classList.remove("changing");
    }, 180);
  }, 2600);
}

// Copy email address
document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", async () => {
    const value = button.getAttribute("data-copy");
    try {
      await navigator.clipboard.writeText(value);
      if (toast) {
        toast.textContent = "Email copied to clipboard!";
        toast.classList.add("show");
        window.setTimeout(() => toast.classList.remove("show"), 2200);
      }
    } catch {
      window.location.href = `mailto:${value}`;
    }
  });
});

// Highlight the navigation item for the section currently in view
const sections = document.querySelectorAll("main section[id]");
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const activeId = entry.target.id;
      navLinks?.querySelectorAll("a[href^='#']").forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${activeId}`);
      });
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });
sections.forEach((section) => sectionObserver.observe(section));
