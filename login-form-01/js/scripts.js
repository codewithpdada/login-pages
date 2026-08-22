document.getElementById('login-button').addEventListener('click', function() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  if (!username || !password) {
    alert('Please enter both username and password');
    return;
  }
  
  console.log('Login attempt with:', { username, password });
});

document.getElementById('reset-link').addEventListener('click', function(e) {
  e.preventDefault();
  alert('Password reset functionality would be triggered here');
});
