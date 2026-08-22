document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const loginButton = document.getElementById('login-button');
  const signupButton = document.getElementById('signup-button');
  const errorMessage = document.getElementById('error-message');
  const resetLink = document.getElementById('reset-link');

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    errorMessage.style.display = 'none';
    errorMessage.textContent = '';

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    if (!username || !password) {
      showError('Please enter both your username/email and password.');
      return;
    }

    if (password.length < 6) {
      showError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || 'Invalid username or password.');
      }

      const data = await response.json();
      window.location.href = data.redirectUrl || '/dashboard';

    } catch (err) {
      showError(err.message || 'An error occurred during authentication. Please try again.');
    } finally {
      setLoading(false);
    }
  });

  signupButton.addEventListener('click', () => {
    window.location.href = '/signup';
  });

  resetLink.addEventListener('click', (e) => {
    e.preventDefault();
    alert('A password reset link has been dispatched if the account exists.');
  });

  function showError(msg) {
    errorMessage.textContent = msg;
    errorMessage.style.display = 'block';
  }

  function setLoading(isLoading) {
    const btnText = loginButton.querySelector('.btn-text');
    const spinner = loginButton.querySelector('.spinner');

    if (isLoading) {
      loginButton.disabled = true;
      btnText.style.display = 'none';
      spinner.style.display = 'inline-block';
    } else {
      loginButton.disabled = false;
      btnText.style.display = 'inline';
      spinner.style.display = 'none';
    }
  }
});
