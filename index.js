import { ManageAccount } from './firebase_conect.js';

document.getElementById("formulario-sesion").addEventListener("submit", (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  /*Se valida que los campos no esten vacíos*/
  if (email === '' || password === '') {
    Swal.fire({
      icon: 'warning',
      title: 'Campos vacíos',
      text: 'Por favor, complete ambos campos',
      background: '#000000',
      color: '#ffffff',
      confirmButtonColor: '#0d6efd'
    });
    return;
  }

  const account = new ManageAccount();
  account.authenticate(email, password);
  
});

document.addEventListener("DOMContentLoaded", () => {
  const passwordInput = document.getElementById("password");
  const toggleBtn = document.getElementById("togglePassword");
  const icon = document.getElementById("togglePasswordIcon");

  toggleBtn.addEventListener("click", () => {
    const isPassword = passwordInput.type === "password";
    passwordInput.type = isPassword ? "text" : "password";
    icon.className = isPassword ? "bi bi-eye-slash" : "bi bi-eye";
  });
});