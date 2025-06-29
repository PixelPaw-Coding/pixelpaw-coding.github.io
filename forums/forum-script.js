// Forum logout button
if (document.getElementById('logout-btn')) {
  document.getElementById('logout-btn').addEventListener('click', () => {
    auth.signOut().then(() => {
      window.location.href = 'index.html';
    });
  });
}

// New post form
if (document.getElementById('new-post-form')) {
  document.getElementById('new-post-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('post-title').value.trim();
    const content = document.getElementById('post-content').value.trim();

    if (containsSwearWords(title) || containsSwearWords(content)) {
      alert('Post contains inappropriate language.');
      return;
    }

    const links = content.match(/https?:\/\/[^\s]+/g) || [];
    for (const url of links) {
      if (!isLinkAllowed(url)) {
        alert('One or more links are not allowed.');
        return;
      }
    }

    try {
      const user = auth.currentUser;
      const userDoc = await db.collection('users').doc(user.uid).get();
      const post = {
        title,
        content,
        author: userDoc.data().username,
        signature: userDoc.data().signature,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      };
      await db.collection('posts').add(post);
      alert('Post created!');
      document.getElementById('new-post-form').reset();
      loadPosts();
    } catch (err) {
      alert('Error creating post: ' + err.message);
    }
  });
}

// Load posts
async function loadPosts() {
  const postsContainer = document.getElementById('posts-container');
  postsContainer.innerHTML = '';
  const snapshot = await db.collection('posts').orderBy('createdAt', 'desc').get();
  snapshot.forEach(doc => {
    const post = doc.data();
    const postElement = document.createElement('div');
    postElement.classList.add('post');
    postElement.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.content}</p>
      <p><strong>By:</strong> ${post.author}</p>
      <p><em>${post.signature}</em></p>
      <hr/>
    `;
    postsContainer.appendChild(postElement);
  });
}

// Load posts on forum page load
if (document.getElementById('posts-container')) {
  auth.onAuthStateChanged(user => {
    if (user) {
      loadPosts();
    } else {
      window.location.href = 'index.html';
    }
  });
}

// Reuse swear word filter and link filter
const swearWords = ["badword1", "badword2"]; // Replace with real bad words

function containsSwearWords(text) {
  text = text.toLowerCase();
  return swearWords.some(word => text.includes(word));
}

function isLinkAllowed(url) {
  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname.toLowerCase();
    const allowedSites = [
      'scratch.mit.edu',
      'github.com',
      'youtube.com',
      'www.youtube.com',
      'khanacademy.org'
    ];
    return allowedSites.some(site => hostname.endsWith(site));
  } catch {
    return false;
  }
}
