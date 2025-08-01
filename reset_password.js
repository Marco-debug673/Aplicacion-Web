import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { app } from "./firebase_conect.js";

const auth = getAuth(app);

document.getElementById("reset-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("resetEmail").value;

  try {
    await sendPasswordResetEmail(auth, email);
    Swal.fire({
      icon: "success",
      title: "Correo enviado",
      text: "Revisa tu bandeja de entrada para restablecer tu contraseña.",
      background: '#000000',
      color: '#ffffff',
      confirmButtonColor: '#0d6efd'
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudo enviar el correo. Verifica que el correo esté registrado.",
      background: '#000000',
      color: '#ffffff',
      confirmButtonColor: '#0d6efd'
    });
    console.error(error);
  }
});