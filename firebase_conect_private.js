import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDOsQaU-vohMbkc7VujDgklWqz0Yebdjyo",
  authDomain: "appweb-mechanicworkshop.firebaseapp.com",
  databaseURL: "https://appweb-mechanicworkshop-default-rtdb.firebaseio.com",
  projectId: "appweb-mechanicworkshop",
  storageBucket: "appweb-mechanicworkshop.firebasestorage.app",
  messagingSenderId: "584226997397",
  appId: "1:584226997397:web:ec5661be0a15a7e686879c",
  measurementId: "G-9KGZGPBQSP"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();

export class ManageAccount {
  register(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((_) => {
        Swal.fire({
        icon: 'success',
        title: 'Usuario nuevo ha sido registrado',
        timer: 2000,
        showConfirmButton: false,
        background: '#000000',
        color: '#ffffff'
      }).then(() => {
        window.location.href = "register_user_private.html";
      });
      })
      .catch((error) => {
        //console.error(error.message);
        Swal.fire({
            icon: 'error',
            title: 'Error al registrar nuevo usuario',
            confirmButtonText: 'Intentar de nuevo',
            background: '#000000',
            color: '#ffffff',
            confirmButtonColor: '#dc3545'
        });
      });
  }

  authenticate(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
        const user = auth.currentUser;
        const email = user ? user.email : 'Usuario';

        Swal.fire({
            icon: 'success',
            title: 'Bienvenido',
            text: `${email}`,
            timer: 2000,
            showConfirmButton: false,
            background: '#000000',
            color: '#ffffff'
        }).then(() => {
            window.location.href = "menu.html";
        });
    })
    .catch((error) => {
      //console.error(error.message);
      Swal.fire({
        icon: 'error',
        title: 'Error al iniciar sesión',
        text: 'El correo o la contraseña no es correcto',
        confirmButtonText: 'Intentar de nuevo',
        background: '#000000',
        color: '#ffffff',
        confirmButtonColor: '#dc3545'
      });
    });
}

  signOut() {
    const user = auth.currentUser;
    const email = user ? user.email : 'Usuario';

    signOut(auth)
      .then(() => {
        Swal.fire({
            icon: 'success',
            title: 'Sesión cerrada',
            text: `Has cerrado sesión como: ${email}`,
            timer: 2000,
            showConfirmButton: false,
            background: '#000000',
            color: '#ffffff'
        }).then(() => {
            window.location.href = "index.html";
        });
      })
      .catch((error) => {
        //console.error(error.message);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo cerrar sesión.',
            confirmButtonColor: '#dc3545'
        });
      });
  }

  getCurrentUserEmail() {
    const user = auth.currentUser;
    return user ? user.email : null;
    }
}