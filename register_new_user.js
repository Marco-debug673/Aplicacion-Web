import { ManageAccount } from './firebase_conect_private.js';

document.getElementById("formulario-crear").addEventListener("submit", (event) => {
event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  
  /*Se valida que los campos no esten vacíos*/
  if (email === '' || password === '') {
    Swal.fire({
      icon: 'warning',
      title: 'Campos vacíos',
      text: 'Debe de completar ambos campos, para poder crear un usuario nuevo',
      background: '#000000',
      color: '#ffffff',
      confirmButtonColor: '#0d6efd'
    });
    return;
  }

  /*Se valida que la contraseña tenga la longitud mínima de 10 carácteres*/
  /*También se valida que la contraseña tenga al menos una letra mayúscula, 
  una letra minúscula, número y carácter especial*/
  if (password.length < 10 || !/[A-Z]/.test(password)
      || !/[a-z]/.test(password) || !/[0-9]/.test(password)
      || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    Swal.fire({
      icon: 'error',
      title: 'Contraseña inválida',
      text: 'La contraseña del usuario nuevo debe tener al menos 10 caracteres, incluyendo tener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.',
      background: '#000000',
      color: '#ffffff',
      confirmButtonColor: '#0d6efd'
    });
    return;
  }

  const account = new ManageAccount();
  account.register(email, password);

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