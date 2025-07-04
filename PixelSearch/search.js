const input = document.getElementById('search');
const resultsDiv = document.getElementById('results');

input.addEventListener('input', () => {
  const query = input.value.toLowerCase();
  resultsDiv.innerHTML = '';

  if (!query) return;

  const results = searchData.filter(item =>
    item.title.toLowerCase().includes(query) ||
    item.content.toLowerCase().includes(query)
  );

  if (results.length === 0) {
    resultsDiv.innerHTML = '<p>No results found.</p>';
    return;
  }

  results.forEach(result => {
    const resultEl = document.createElement('div');
    resultEl.classList.add('result');
    resultEl.innerHTML = `
      <div class="result-title"><a href="${result.url}">${result.title}</a></div>
      <div>${result.content.slice(0, 100)}...</div>
    `;
    resultsDiv.appendChild(resultEl);
  });
});
