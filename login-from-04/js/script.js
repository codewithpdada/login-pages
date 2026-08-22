document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const signInTab = document.getElementById('signInTab');
  const signUpTab = document.getElementById('signUpTab');
  const signInForm = document.getElementById('signInForm');
  const signUpForm = document.getElementById('signUpForm');
  const togglePasswordIcons = document.querySelectorAll('.toggle-password');

  // Switch to Sign In Tab
  signInTab.addEventListener('click', () => {
    switchTab(signInTab, signUpTab, signInForm, signUpForm);
  });

  // Switch to Sign Up Tab
  signUpTab.addEventListener('click', () => {
    switchTab(signUpTab, signInTab, signUpForm, signInForm);
  });

  // Helper function to switch tabs
  function switchTab(activeTab, inactiveTab, activeForm, inactiveForm) {
    activeTab.classList.add('active');
    inactiveTab.classList.remove('active');
    
    activeForm.classList.add('active');
    inactiveForm.classList.remove('active');
  }

  // Toggle Password Visibility
  togglePasswordIcons.forEach(icon => {
    icon.addEventListener('click', () => {
      const targetId = icon.getAttribute('data-target');
      const passwordInput = document.getElementById(targetId);

      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
      } else {
        passwordInput.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
      }
    });
  });

  // Form Submission Handler
  const handleFormSubmit = (event, type) => {
    event.preventDefault();
    const form = event.target;
    
    if (form.checkValidity()) {
      alert(`${type} successful! Access granted.`);
      form.reset();
    } else {
      form.reportValidity();
    }
  };

  signInForm.addEventListener('submit', (e) => handleFormSubmit(e, 'Sign In'));
  signUpForm.addEventListener('submit', (e) => handleFormSubmit(e, 'Sign Up'));
});
