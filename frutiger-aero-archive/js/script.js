// Settings modal
const settingsBtn = document.getElementById('settingsBtn');
const modal = document.getElementById('settingsModal');
const closeModal = document.getElementById('closeSettings');

settingsBtn.onclick = () => modal.style.display = 'block';
closeModal.onclick = () => modal.style.display = 'none';
window.onclick = (e) => { if(e.target == modal) modal.style.display = 'none'; }

// Dark/Light Mode
const themeToggle = document.getElementById('themeToggle');
themeToggle.onclick = () => document.body.classList.toggle('dark-mode');

// Language selector using Google Translate
function googleTranslateElementInit() {
  new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
}
const languageSelect = document.getElementById('languageSelect');
languageSelect.onchange = function() {
    const lang = this.value;
    const gtFrame = document.querySelector('iframe.goog-te-menu-frame');
    if(gtFrame) gtFrame.contentWindow.postMessage({type:'changeLanguage', lang}, '*');
}
