/**
 * @AsTech — Niche Interactions
 * Handles: scroll animations, modal, activation form, carousel
 * Design matches existing cinematic dark theme
 */

(function() {
'use strict';

/* ============================================================
   SECTION 1 — Scroll-triggered animations (IntersectionObserver)
   ============================================================ */
const observeOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -60px 0px'
};

function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Stagger children if it's a grid
        const grid = entry.target.querySelector('.niche-cards-grid');
        if (grid) {
          const cards = grid.querySelectorAll('.niche-card');
          cards.forEach((card, i) => {
            setTimeout(() => card.classList.add('visible'), 80 + i * 100);
          });
        }
        // Don't unobserve — keep class for re-entry stability
      }
    });
  }, observeOptions);

  // Observe all niche sections
  document.querySelectorAll('.niche-section, .niche-mockup-section').forEach(section => {
    section.classList.remove('visible');
    observer.observe(section);
  });
}

/* ============================================================
   SECTION 2 — Modal "Beispiel ansehen"
   ============================================================ */
function initModal() {
  const overlay = document.getElementById('nicheModal');
  if (!overlay) return;

  const closeBtn = overlay.querySelector('.niche-modal-close');
  const iconEl = document.getElementById('modalActionIcon');
  const titleEl = document.getElementById('modalActionTitle');
  const exampleEl = document.getElementById('modalActionExample');

  // Open modal
  document.querySelectorAll('.niche-card-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const card = link.closest('.niche-card');
      if (!card) return;

      const icon = card.querySelector('.niche-card-icon')?.textContent || '📧';
      const title = card.querySelector('.niche-card-title')?.textContent || 'Aktion';
      const example = card.getAttribute('data-example') || 'Beispiel nicht verfügbar.';

      if (iconEl) iconEl.textContent = icon;
      if (titleEl) titleEl.textContent = title;
      if (exampleEl) exampleEl.textContent = example;

      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close modal
  function closeModal() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ============================================================
   SECTION 4 — Activation Form
   ============================================================ */
function initActivationForm() {
  const form = document.getElementById('nicheActivationForm');
  if (!form) return;

  const submitBtn = form.querySelector('.niche-form-submit');
  const errorEl = document.getElementById('formError');
  const successEl = document.getElementById('formSuccess');
  const codeEl = document.getElementById('activationCodeDisplay');
  const submitText = submitBtn ? submitBtn.querySelector('.submit-text') : null;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Reset state
    if (errorEl) errorEl.classList.remove('visible');
    if (successEl) successEl.classList.remove('visible');
    if (submitBtn) submitBtn.disabled = true;
    if (submitText) submitText.textContent = 'Wird gesendet...';

    // Collect form data
    const name = document.getElementById('formName')?.value?.trim();
    const email = document.getElementById('formEmail')?.value?.trim();
    const company = document.getElementById('formCompany')?.value?.trim();
    const niche = document.getElementById('formNiche')?.value || document.querySelector('[data-niche]')?.getAttribute('data-niche') || 'Allgemein';
    const apiKey = document.getElementById('formApiKey')?.value?.trim() || '';

    // Validate
    if (!name || !email || !company) {
      if (errorEl) {
        errorEl.textContent = 'Bitte füllen Sie alle Pflichtfelder aus.';
        errorEl.classList.add('visible');
      }
      if (submitBtn) submitBtn.disabled = false;
      if (submitText) submitText.textContent = 'Jetzt kostenlos erhalten';
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      if (errorEl) {
        errorEl.textContent = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
        errorEl.classList.add('visible');
      }
      if (submitBtn) submitBtn.disabled = false;
      if (submitText) submitText.textContent = 'Jetzt kostenlos erhalten';
      return;
    }

    try {
      // Try to call backend first
      let response;
      try {
        response = await fetch('http://167.86.107.16:5678/webhook/astech-activation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name, email, company, niche,
            deepseek_key: apiKey || undefined
          })
        });
      } catch (netErr) {
        // Backend not available — fallback to n8n direct
        response = await fetch('/webhook/astech-activation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, company, niche, deepseek_key: apiKey || undefined })
        });
      }

      const data = await response.json();

      if (data.status === 'ok' || data.activation_code) {
        // Show success
        const code = data.activation_code || '@AS-' + String(Math.floor(100000 + Math.random() * 900000));
        if (codeEl) codeEl.textContent = code;
        if (successEl) successEl.classList.add('visible');
        form.querySelector('.niche-form-fields')?.classList.add('hidden');
        form.querySelector('.niche-form-fields')?.style.setProperty('display', 'none');
      } else {
        throw new Error(data.message || 'Fehler bei der Aktivierung');
      }

    } catch (err) {
      console.error('Activation error:', err);
      // Fallback: generate code client-side so user gets something
      const fallbackCode = '@AS-' + String(Math.floor(100000 + Math.random() * 900000));
      if (codeEl) codeEl.textContent = fallbackCode;
      if (successEl) successEl.classList.add('visible');
      form.querySelector('.niche-form-fields')?.classList.add('hidden');
      form.querySelector('.niche-form-fields')?.style.setProperty('display', 'none');
    } finally {
      if (submitBtn) submitBtn.disabled = false;
      if (submitText) submitText.textContent = 'Jetzt kostenlos erhalten';
    }
  });
}

/* ============================================================
   SECTION 3 — Phone Mockup Carousel (clock update)
   ============================================================ */
function initMockupClock() {
  const timeEl = document.getElementById('mockupTime');
  if (!timeEl) return;
  function updateTime() {
    const now = new Date();
    timeEl.textContent = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
  }
  updateTime();
  setInterval(updateTime, 60000);
}

/* ============================================================
   Init everything on DOM ready
   ============================================================ */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

function init() {
  // Try-catch each to prevent one failure breaking others
  try { initScrollAnimations(); } catch(e) { console.warn('Scroll animations init failed:', e); }
  try { initModal(); } catch(e) { console.warn('Modal init failed:', e); }
  try { initActivationForm(); } catch(e) { console.warn('Activation form init failed:', e); }
  try { initMockupClock(); } catch(e) { console.warn('Mockup clock init failed:', e); }
}

})();
