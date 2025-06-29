// Social logins
document.getElementById('google-login').addEventListener('click', async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  try {
    await auth.signInWithPopup(provider);
    window.location.href = 'forum.html';
  } catch (err) {
    alert("Google login error: " + err.message);
  }
});

document.getElementById('github-login').addEventListener('click', async () => {
  const provider = new firebase.auth.GithubAuthProvider();
  try {
    await auth.signInWithPopup(provider);
    window.location.href = 'forum.html';
  } catch (err) {
    alert("GitHub login error: " + err.message);
  }
});

// Email/Password login with session control
document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  const staySignedIn = document.getElementById('stay-signed-in').checked;

  const persistence = staySignedIn ? firebase.auth.Auth.Persistence.LOCAL : firebase.auth.Auth.Persistence.SESSION;

  try {
    await auth.setPersistence(persistence);
    await auth.signInWithEmailAndPassword(email, password);
    window.location.href = 'forum.html';
  } catch (err) {
    alert("Login error: " + err.message);
  }
});
