// Dark/Light Mode
const themeToggle = document.getElementById('themeToggle');
themeToggle.onclick = () => document.body.classList.toggle('dark-mode');

// Language selector powered by Google Translate
const languageSelect = document.getElementById('languageSelect');
languageSelect.onchange = function() {
    const lang = this.value;
    const gtFrame = document.querySelector('iframe.goog-te-menu-frame');
    if(gtFrame) gtFrame.contentWindow.postMessage({type:'changeLanguage', lang}, '*');
}
