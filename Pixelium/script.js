const urlInput = document.getElementById('url');
const viewer = document.getElementById('viewer');

function go() {
  let url = urlInput.value.trim();
  if (!url.startsWith('http')) url = 'https://' + url;

  // Try embedding it
  viewer.src = url;

  // Check if the site allowed the iframe to load
  setTimeout(() => {
    try {
      const sameOrigin = viewer.contentWindow.location.hostname;
      // If we can access content, it's allowed
    } catch (e) {
      // Blocked by security — open in new tab
      window.open(url, '_blank');
      viewer.src = 'about:blank'; // clear iframe
    }
  }, 2000);
}

