const WHATSAPP_NUMBER = "573215809250";
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
menuButton?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
});
document.querySelectorAll(".nav a").forEach((link) =>
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
  }),
);
document.getElementById("year").textContent = new Date().getFullYear();
const items = document.querySelectorAll(".reveal");
if (
  "IntersectionObserver" in window &&
  !matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      }),
    { threshold: 0.12 },
  );
  items.forEach((item) => observer.observe(item));
} else items.forEach((item) => item.classList.add("visible"));
document.querySelectorAll(".booking").forEach((button) =>
  button.addEventListener("click", () => {
    const select = document.querySelector('[name="servicio"]');
    select.value = button.dataset.service;
    document.querySelector("#contacto").scrollIntoView({ behavior: "smooth" });
  }),
);
const form = document.getElementById("contact-form");
form?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const message = `Hola CLENOX Services, deseo solicitar una valoración.\n\nNombre: ${data.get("nombre")}\nTeléfono: ${data.get("telefono")}\nExperiencia: ${data.get("servicio")}\nDetalles: ${data.get("mensaje")}`;
  const status = document.getElementById("form-status");
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  const popup = window.open(url, "_blank");
  if (popup) popup.opener = null;
  else window.location.href = url;
  status.textContent = "Abriendo WhatsApp…";
});

const dynamicCards = document.querySelectorAll(
  ".plan, .membership-grid article, .service-line-card, .staycare-service, .staycare-memberships article",
);
const canAnimateCards =
  matchMedia("(hover: hover) and (pointer: fine)").matches &&
  !matchMedia("(prefers-reduced-motion: reduce)").matches;

dynamicCards.forEach((card, index) => {
  card.classList.add("dynamic-card");
  card.style.setProperty("--card-index", index % 6);
  if (!canAnimateCards) return;
  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    card.style.setProperty("--pointer-x", `${x * 100}%`);
    card.style.setProperty("--pointer-y", `${y * 100}%`);
    card.style.setProperty("--rotate-x", `${(0.5 - y) * 5}deg`);
    card.style.setProperty("--rotate-y", `${(x - 0.5) * 6}deg`);
  });
  card.addEventListener("pointerleave", () => {
    card.style.removeProperty("--rotate-x");
    card.style.removeProperty("--rotate-y");
  });
});
