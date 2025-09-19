import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getDatabase, ref, push, set} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDOsQaU-vohMbkc7VujDgklWqz0Yebdjyo",
  authDomain: "appweb-mechanicworkshop.firebaseapp.com",
  databaseURL: "https://appweb-mechanicworkshop-default-rtdb.firebaseio.com",
  projectId: "appweb-mechanicworkshop",
  storageBucket: "appweb-mechanicworkshop.appspot.com",
  messagingSenderId: "584226997397",
  appId: "1:584226997397:web:ec5661be0a15a7e686879c",
  measurementId: "G-9KGZGPBQSP"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth();

const form = document.getElementById("appointmentForm");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const user = auth.currentUser;

  if (!user) {
    Swal.fire({ icon: 'error', title: 'Error', text: 'Debes iniciar sesión.',
      background: '#000000',color: '#ffffff', confirmButtonText: "Aceptar",
      confirmButtonColor: '#0d6efd'});
    return;
  }

  const nombre = document.getElementById("fullname").value.trim();
  const apellidos = document.getElementById("surname").value.trim();
  const fecha = document.getElementById("fecha").value;
  const partes = fecha.split("-");
  const fecha2 = `${partes[2]}/${partes[1]}/${partes[0]}`;
  const hora = document.getElementById("hora").value;

  if (nombre === '' || apellidos === '' || fecha === '' || hora === '') {
    Swal.fire({
      icon: 'warning',
      title: 'Campos vacíos',
      text: 'Por favor, complete todos los campos de la cita.',
      background: '#000000',
      color: '#ffffff',
      confirmButtonText: "Aceptar",
      confirmButtonColor: '#0d6efd'
    });
    return;
  }

  const nuevaCitaRef = push(ref(db, "Citas"));

  await set(nuevaCitaRef, {
    uid: user.uid,
    nombre: nombre,
    fecha: fecha2,
    hora: hora,
    apellidos: apellidos
  })
    .then(() => {
      Swal.fire({
        icon: 'success',
        text: 'La cita ha sido agendada para el día seleccionado correctamente.',
        background: '#000000',
        color: '#ffffff',
        confirmButtonText: "Aceptar",
        confirmButtonColor: '#0d6efd'})
        .then(() => {
          limpiarFormulario();
        });
    })
    .catch((error) => {
      Swal.fire({
        icon: 'error',
        text: 'No se pudo agendar la cita',
        background: '#000000',
        color: '#ffffff',
        confirmButtonText: "Aceptar",
        confirmButtonColor: '#0d6efd'})
    });
});

function limpiarFormulario() {
  document.getElementById("fullname").value = "";
  document.getElementById("fecha").value = "";
  document.getElementById("hora").value = "";
  document.getElementById("surname").value = "";
}