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
