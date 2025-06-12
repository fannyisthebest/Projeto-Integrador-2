    // Política de Privacidade
    const privacyModal = document.getElementById('privacyModal');
    const openPrivacyModal = document.getElementById('openPrivacyModal');
    const closePrivacyModal = document.getElementById('closePrivacyModal');

    openPrivacyModal.addEventListener('click', () => {
      privacyModal.classList.remove('hidden');
    });
    closePrivacyModal.addEventListener('click', () => {
      privacyModal.classList.add('hidden');
    });
    window.addEventListener('click', (e) => {
      if (e.target === privacyModal) {
        privacyModal.classList.add('hidden');
      }
    });

    // Termos de Uso
    const termsModal = document.getElementById('termsModal');
    const openTermsModal = document.getElementById('openTermsModal');
    const closeTermsModal = document.getElementById('closeTermsModal');

    openTermsModal.addEventListener('click', () => {
      termsModal.classList.remove('hidden');
    });
    closeTermsModal.addEventListener('click', () => {
      termsModal.classList.add('hidden');
    });
    window.addEventListener('click', (e) => {
      if (e.target === termsModal) {
        termsModal.classList.add('hidden');
      }
    });