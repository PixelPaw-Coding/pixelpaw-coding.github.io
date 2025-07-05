const urlInput = document.getElementById('url');
const viewer = document.getElementById('viewer');

function go() {
  let url = urlInput.value.trim();
  if (!url.startsWith('http')) url = 'https://' + url;
  window.open(url, '_blank'); // open in new tab
}

function toggleTheme() {
  document.body.classList.toggle("dark");
}
