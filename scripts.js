window.addEventListener('scroll', () => {
  document.querySelectorAll('.card').forEach(card => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    } else {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
    }
  });
});
function loadShowcase(category) {
  // Load and display projects by category
  // Example: Fetch from database or local JSON
}
function submitGuestComment(name, message) {
  if (name && message) {
    // Save comment to database or file
    alert("Thanks for your comment!");
  } else {
    alert("Please fill in both fields!");
  }
}
const facts = [
  "PixelPaw was founded in 2024!",
  "Our mascot loves coding in Scratch!",
  "We released 10 games so far!"
];

function showRandomFact() {
  const fact = facts[Math.floor(Math.random() * facts.length)];
  alert(fact);
}
function toggleTheme() {
  document.body.classList.toggle("dark-theme");
}
function updateVisitorCounter() {
  let visits = localStorage.getItem("visits") || 0;
  visits++;
  localStorage.setItem("visits", visits);
  document.getElementById("visitor-count").innerText = `Visits: ${visits}`;
}
