// ---------- Mobile menu ----------
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});
navLinks.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  })
);

// ---------- Typing effect ----------
const words = ["games", "clean interfaces", "custom widgets", "ideas into reality"];
const typedEl = document.getElementById("typed");
let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function type() {
  const word = words[wordIndex];
  typedEl.textContent = word.slice(0, charIndex);

  if (!deleting && charIndex < word.length) {
    charIndex++;
    setTimeout(type, 90);
  } else if (!deleting) {
    deleting = true;
    setTimeout(type, 1400);
  } else if (charIndex > 0) {
    charIndex--;
    setTimeout(type, 45);
  } else {
    deleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    setTimeout(type, 300);
  }
}
type();

// ---------- Scroll reveal + skill bars ----------
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");

      entry.target.querySelectorAll(".fill").forEach((bar) => {
        bar.style.width = bar.dataset.width + "%";
      });
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// ---------- Active nav link on scroll ----------
const sections = document.querySelectorAll("main section[id]");
const links = document.querySelectorAll(".nav-links a");

function updateActiveLink() {
  let current = "";
  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 140) current = section.id;
  });
  // at the very bottom of the page, highlight the last section
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 4) {
    current = sections[sections.length - 1].id;
  }
  links.forEach((link) =>
    link.classList.toggle("active", link.getAttribute("href") === "#" + current)
  );
}
window.addEventListener("scroll", updateActiveLink);
updateActiveLink();

// ---------- Play project preview on hover ----------
document.querySelectorAll(".card").forEach((card) => {
  const preview = card.querySelector(".card-thumb video");
  if (!preview) return;

  card.addEventListener("mouseenter", () => preview.play().catch(() => {}));
  card.addEventListener("mouseleave", () => {
    preview.pause();
    preview.currentTime = 0;
  });
});

// ---------- Project video popup ----------
const modal = document.getElementById("videoModal");
const modalVideo = document.getElementById("modalVideo");

function closeModal() {
  modal.classList.remove("open");
  modalVideo.pause();
  modalVideo.removeAttribute("src");
  modalVideo.load();
}

document.querySelectorAll("[data-video]").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    modalVideo.src = el.dataset.video;
    modal.classList.add("open");
    modalVideo.play().catch(() => {});
  });
});

document.getElementById("modalClose").addEventListener("click", closeModal);
modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });

// ---------- Certificate lightbox ----------
const lightbox = document.getElementById("certLightbox");
const lightboxImg = document.getElementById("lightboxImg");

function closeLightbox() {
  lightbox.classList.remove("open");
  lightboxImg.removeAttribute("src");
}

document.querySelectorAll("[data-cert]").forEach((btn) => {
  btn.addEventListener("click", () => {
    lightboxImg.src = btn.dataset.cert;
    lightbox.classList.add("open");
  });
});

document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });

document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  closeModal();
  closeLightbox();
});

// ---------- Contact form (opens the visitor's email app) ----------
const form = document.getElementById("contactForm");
const note = document.getElementById("formNote");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const subject = encodeURIComponent(data.get("subject"));
  const body = encodeURIComponent(
    data.get("message") + "\n\n— " + data.get("name") + " (" + data.get("email") + ")"
  );
  window.location.href = "mailto:stevenleanlaure@gmail.com?subject=" + subject + "&body=" + body;
  note.textContent = "Opening your email app…";
  form.reset();
});

// ---------- Footer year ----------
document.getElementById("year").textContent = new Date().getFullYear();