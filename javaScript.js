document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".navbar");
  const navToggle = document.getElementById("navToggle");
  const menu = document.getElementById("menu");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id], .wrapper[id]");
  const progressBar = document.getElementById("scrollProgress");
  const yearEl = document.getElementById("year");

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  function onScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (progressBar) progressBar.style.width = progress + "%";

    if (navbar) {
      navbar.classList.toggle("scrolled", scrollTop > 20);
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (navToggle && menu) {
    navToggle.addEventListener("click", function () {
      const isOpen = menu.classList.toggle("open");
      navToggle.classList.toggle("open", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        menu.classList.remove("open");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  if ("IntersectionObserver" in window && sections.length) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            navLinks.forEach((link) => {
              link.classList.toggle(
                "active",
                link.getAttribute("href") === "#" + id
              );
            });
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    sections.forEach((section) => navObserver.observe(section));
  }
});
