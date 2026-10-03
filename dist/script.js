// Actualización automática del año en el pie de página
document.getElementById('year').textContent = new Date().getFullYear();

// Comportamiento de acordeón exclusivo para las preguntas frecuentes (opcional y accesible)
const faqDetails = document.querySelectorAll('.faq-item');
faqDetails.forEach((targetDetail) => {
  targetDetail.addEventListener('toggle', () => {
    if (targetDetail.open) {
      faqDetails.forEach((detail) => {
        if (detail !== targetDetail) {
          detail.removeAttribute('open');
        }
      });
    }
  });
});

// Galería interactiva de Panadería & Cafetería al Paso (1 pantalla)
const panaderiaTabs = document.querySelectorAll('.panaderia-tab-item');
const featuredImg = document.getElementById('panaderia-featured-img');
const featuredTitle = document.getElementById('panaderia-featured-title');
const featuredTag = document.getElementById('panaderia-featured-tag');
const panaderiaWaBtn = document.getElementById('panaderia-wa-btn');
const panaderiaWaText = document.getElementById('panaderia-wa-text');
const panaderiaPrev = document.getElementById('panaderia-prev');
const panaderiaNext = document.getElementById('panaderia-next');
const panaderiaDots = document.querySelectorAll('.gallery-dot');

let currentPanaderiaIndex = 0;

function setPanaderiaActive(index) {
  if (!panaderiaTabs.length) return;
  currentPanaderiaIndex = (index + panaderiaTabs.length) % panaderiaTabs.length;

  panaderiaTabs.forEach((tab, i) => {
    tab.classList.toggle('active', i === currentPanaderiaIndex);
  });

  panaderiaDots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentPanaderiaIndex);
  });

  const activeTab = panaderiaTabs[currentPanaderiaIndex];
  const newImg = activeTab.getAttribute('data-img');
  const newTitle = activeTab.getAttribute('data-title');
  const newTag = activeTab.getAttribute('data-tag');
  const newWa = activeTab.getAttribute('data-wa');
  const shortName = activeTab.querySelector('h4').textContent;

  if (featuredImg) {
    featuredImg.style.opacity = '0.35';
    setTimeout(() => {
      featuredImg.src = newImg;
      featuredImg.alt = `${newTitle} en Kiosco San Roque`;
      featuredImg.style.opacity = '1';
    }, 120);
  }

  if (featuredTitle) featuredTitle.textContent = newTitle;
  if (featuredTag) featuredTag.textContent = newTag;

  if (panaderiaWaBtn && newWa) {
    panaderiaWaBtn.href = `https://wa.me/5493624275540?text=${encodeURIComponent(newWa)}`;
  }
  if (panaderiaWaText) {
    panaderiaWaText.textContent = `Pedir ${shortName} por WhatsApp`;
  }
}

panaderiaTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => setPanaderiaActive(index));
});

if (panaderiaPrev) {
  panaderiaPrev.addEventListener('click', () => setPanaderiaActive(currentPanaderiaIndex - 1));
}

if (panaderiaNext) {
  panaderiaNext.addEventListener('click', () => setPanaderiaActive(currentPanaderiaIndex + 1));
}

panaderiaDots.forEach((dot, index) => {
  dot.addEventListener('click', () => setPanaderiaActive(index));
});

// ScrollSpy: Detecta la sección visible y actualiza el chip/link activo en la barra superior
const navLinks = document.querySelectorAll('.site-nav a');
const navContainer = document.querySelector('.site-nav');
const sections = [];

navLinks.forEach((link) => {
  const href = link.getAttribute('href');
  if (href && href.startsWith('#')) {
    const section = document.querySelector(href);
    if (section) {
      sections.push({ el: section, link: link });
    }
  }
});

function updateActiveSection() {
  const scrollPosition = window.scrollY + 140; // compensación del header
  let currentActive = null;

  for (let i = 0; i < sections.length; i++) {
    const sec = sections[i];
    const top = sec.el.offsetTop;
    const height = sec.el.offsetHeight;
    if (scrollPosition >= top && scrollPosition < top + height) {
      currentActive = sec;
      break;
    }
  }

  // Si estamos muy arriba (hero o inicio), podemos no tener activa o tener la primera si está dentro
  navLinks.forEach((l) => l.classList.remove('nav-active'));

  if (currentActive) {
    currentActive.link.classList.add('nav-active');
  }
}

window.addEventListener('scroll', updateActiveSection, { passive: true });
window.addEventListener('resize', updateActiveSection, { passive: true });
updateActiveSection();

// Control del Menú Hamburguesa en Móvil (3 barritas)
const menuToggle = document.getElementById('menu-toggle');
const siteNav = document.getElementById('site-nav');

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('is-open');
    menuToggle.classList.toggle('is-active', isOpen);
    menuToggle.setAttribute('aria-expanded', isOpen);
  });

  // Cerrar el menú al tocar cualquier link
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (siteNav.classList.contains('is-open')) {
        siteNav.classList.remove('is-open');
        menuToggle.classList.remove('is-active');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Cerrar al hacer click fuera del header
  document.addEventListener('click', (e) => {
    if (!siteNav.contains(e.target) && !menuToggle.contains(e.target)) {
      if (siteNav.classList.contains('is-open')) {
        siteNav.classList.remove('is-open');
        menuToggle.classList.remove('is-active');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    }
  });
}

