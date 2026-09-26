const header = document.querySelector(".site-header");

function onScroll() {
  if (!header) return;
  header.classList.toggle("is-stuck", window.scrollY > 8);
}

onScroll();
window.addEventListener("scroll", onScroll, { passive: true });
