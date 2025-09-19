import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { getDatabase, ref, get, child, set } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";

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

export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
const db = getDatabase();

export class ManageAccount {
  register(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        //Guardar en Realtime Database
        set(ref(db, `usuarios/${user.uid}`), {
          email: email
        })
      })
      .then((_) => {
        Swal.fire({
          icon: 'success',
          title: 'Registro éxitoso',
          timer: 2000,
          showConfirmButton: false,
          background: '#000000',
          color: '#ffffff'
      }).then(() => {
        window.location.href = "index.html";
      });
    })
      .catch((error) => {
          Swal.fire({
            icon: 'warning',
            text: 'Esta cuenta ya existe',
            background: '#000000',
            color: '#ffffff',
            confirmButtonColor: '#ffc107'
          });
        })
      .catch((error) => {
        //console.error(error.message);
        Swal.fire({
            icon: 'error',
            title: 'Error al registrar cuenta',
            confirmButtonText: 'Intentar de nuevo',
            background: '#000000',
            color: '#ffffff',
            confirmButtonColor: '#dc3545'
        });
      });
  }

  authenticate(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const email = user ? user.email : 'Usuario';

      const dbRef = ref(db);
      get(child(dbRef, `usuarios/${user.uid}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            const rol = data.rol;

            // Guardar en localStorage
            localStorage.setItem("rol", rol);
            localStorage.setItem("email", data.email);

            Swal.fire({
              icon: 'success',
              title: 'Bienvenido',
              text: `${email}`,
              timer: 2000,
              showConfirmButton: false,
              background: '#000000',
              color: '#ffffff'
            }).then(() => {
              // Redirige una vez cargado el rol
              window.location.href = "menu.html";
            });
          } else {
            Swal.fire({
              icon: 'warning',
              text: 'Su cuenta no tiene un rol. Debe de contactar al administrador, para que le sea asignado uno.',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#0d6efd',
              background: '#000000',
              color: '#ffffff'
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = "index.html";
              }
            });
          }
        })
        .catch((error) => {
          Swal.fire({
              icon: 'error',
              text: 'Error al obtener el rol. Intenta más tarde.',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#0d6efd',
              background: '#000000',
              color: '#ffffff'
            })
        });
    })
    .catch((error) => {
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