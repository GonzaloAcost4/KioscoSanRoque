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
