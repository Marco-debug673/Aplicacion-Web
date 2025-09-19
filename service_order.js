import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getDatabase, ref, push, set, update } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";
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

let idSolicitudActual = null;

document.getElementById("saveBtn2").addEventListener("click", async (e) => {
  e.preventDefault();

  const user = auth.currentUser;

  if (!user) {
    Swal.fire({ icon: 'error', title: 'Error', text: 'Debes iniciar sesión.',
      background: '#000000',color: '#ffffff', confirmButtonText: "Aceptar",
      confirmButtonColor: '#0d6efd'});
    return;
  }

  const marca = document.getElementById("marcaVehiculo").value.trim();
  const modelo = document.getElementById("modeloVehiculo").value.trim();
  const anio = document.getElementById("anioVehiculo").value.trim();
  const combustible = document.getElementById("combustibleVehiculo").value;
  const color = document.getElementById("colorVehiculo").value;
  const tipoVehiculoVal = document.getElementById("tipoVehiculoSeleccion").value;

  const tipoCamioneta = document.getElementById("tipoVehiculo3").value;
  const capacidadCarga = document.getElementById("capacidadCargaVehiculo").value.trim();
  const cilindraje = document.getElementById("cilindrajeVehiculo").value.trim();
  const tipoMoto = document.getElementById("tipoVehiculo2").value;

  let tipoVehiculoTexto = "";
  if (tipoVehiculoVal === "1") tipoVehiculoTexto = "automovil";
  if (tipoVehiculoVal === "2") tipoVehiculoTexto = "camioneta";
  if (tipoVehiculoVal === "3") tipoVehiculoTexto = "moto";

  //Validación por la selección del automóvil
  if (marca === '' || modelo === '' || anio === '' || combustible === '' || color === '') {
    Swal.fire({
      icon: 'warning',
      title: 'Campos vacíos',
      text: 'Por favor, complete todos los campos de la información del vehículo.',
      background: '#000000',
      color: '#ffffff',
      confirmButtonText: "Aceptar",
      confirmButtonColor: '#0d6efd'
    });
    return;
  }

  //Validación por la selección de la camioneta
  if (tipoVehiculoTexto === "camioneta") {
    if (tipoCamioneta === '' || capacidadCarga === '') {
      Swal.fire({
        icon: 'warning',
        title: 'Campos vacíos',
        text: 'Por favor, complete los campos relacionados con la camioneta.',
        background: '#000000',
        color: '#ffffff',
        confirmButtonText: "Aceptar",
        confirmButtonColor: '#0d6efd'
      });
      return;
    }
  }

  //Validación por la selección de la moto
  if (tipoVehiculoTexto === "moto") {
    if (cilindraje === '' || tipoMoto === '') {
      Swal.fire({
        icon: 'warning',
        title: 'Campos vacíos',
        text: 'Por favor, complete los campos relacionados con la moto.',
        background: '#000000',
        color: '#ffffff',
        confirmButtonText: "Aceptar",
        confirmButtonColor: '#0d6efd'
      });
      return;
    }
  }

  const datosVehiculo = {
    marca: marca,
    modelo: modelo,
    anio: parseInt(anio),
    combustible: document.getElementById("combustibleVehiculo").selectedOptions[0]?.textContent || "",
    color: document.getElementById("colorVehiculo").selectedOptions[0]?.textContent || "",
    tipoCamioneta: tipoVehiculoTexto ==="camioneta" ? document.getElementById("tipoVehiculo3").selectedOptions[0]?.textContent || "": null,
    capacidadCarga: tipoVehiculoTexto === "camioneta" ? capacidadCarga : null,
    cilindraje: tipoVehiculoTexto === "moto" ? cilindraje : null,
    tipoMoto: tipoVehiculoTexto === "moto" ? document.getElementById("tipoVehiculo2").selectedOptions[0]?.textContent || "" : null
  };

  const nuevaSolicitudRef = push(ref(db, "solicitudes"));
  idSolicitudActual = nuevaSolicitudRef.key;

  await set(ref(db, `solicitudes/${idSolicitudActual}`), {
    uid: user.uid,
    tipovehiculo: {datos: datosVehiculo}
  })
    .then(() => {
      Swal.fire({
        icon: 'success',
        text: 'Los datos del vehículo han sido guardados. Ahora complete la información restante.',
        background: '#000000',
        color: '#ffffff',
        confirmButtonText: "Aceptar",
        confirmButtonColor: '#0d6efd'})
        .then(() => {
            limpiarCamposVehiculo();
        })
    })
    .catch((error) => {
      Swal.fire({
        icon: 'error',
        text: 'No se pudieron guardar los datos',
        background: '#000000',
        color: '#ffffff',
        confirmButtonText: "Aceptar",
        confirmButtonColor: '#0d6efd'});
    });
});

document.getElementById("saveBtn").addEventListener("click", async (e) => {
  e.preventDefault();

  const user = auth.currentUser;

  if (!user) {
    Swal.fire({ icon: 'error', title: 'Error', text: 'Debes iniciar sesión.',
      background: '#000000',color: '#ffffff', confirmButtonText: "Aceptar",
      confirmButtonColor: '#0d6efd'});
    return;
  }

  if (!idSolicitudActual) {
    Swal.fire({
      icon: 'error',
      title: 'Advertencia',
      text: 'Primero debe registrar los datos del vehículo antes de continuar.',
      background: '#000000',
      color: '#ffffff',
      confirmButtonText: "Aceptar",
      confirmButtonColor: '#dc3545'
    });
    return;
  }

  const nombre = document.getElementById("floatingInputName").value.trim();
  const apellidos = document.getElementById("floatingInputSurname").value.trim();
  const telefono = document.getElementById("floatingInputNumeroTelefono").value.trim();
  const tipoVehiculoVal = document.getElementById("tipoVehiculoSeleccion").value;
  const falla = document.querySelector("select[aria-label='Default select example']").selectedOptions[0].textContent;

  let tipoVehiculoTexto = "";
  if (tipoVehiculoVal === "1") tipoVehiculoTexto = "automovil";
  if (tipoVehiculoVal === "2") tipoVehiculoTexto = "camioneta";
  if (tipoVehiculoVal === "3") tipoVehiculoTexto = "moto";

  if (nombre === '' || apellidos === '' || telefono === '' || tipoVehiculoVal === '' || falla === '') {
    Swal.fire({
      icon: 'warning',
      title: 'Campos vacíos',
      text: 'Por favor, complete todos los campos de la solicitud de servicio.',
      background: '#000000',
      color: '#ffffff',
      confirmButtonText: "Aceptar",
      confirmButtonColor: '#0d6efd'
    });
    return;
  }

const clienteData = {
    nombre: nombre,
    apellidos: apellidos,
    numerotelefono: telefono,
    falladetectada: falla,
    'tipovehiculo/tipo': tipoVehiculoTexto
  };

  await update(ref(db, `solicitudes/${idSolicitudActual}`), clienteData)
    .then(() => {
      Swal.fire({
        icon: 'success',
        text: 'Su solicitud ha sido guardada correctamente.',
        background: '#000000',
        color: '#ffffff',
        confirmButtonText: "Aceptar",
        confirmButtonColor: '#0d6efd'})
        .then(() => {
            limpiarCamposSolicitud();
            idSolicitudActual = null;
        })
    })
    .catch((error) => {
      Swal.fire({
        icon: 'error',
        text: 'No se pudo guardar la solicitud:' + error.message,
        background: '#000000',
        color: '#ffffff',
        confirmButtonText: "Aceptar",
        confirmButtonColor: '#0d6efd'});
    });
});

function limpiarCamposVehiculo() {
  document.getElementById("marcaVehiculo").value = "";
  document.getElementById("modeloVehiculo").value = "";
  document.getElementById("anioVehiculo").value = "";
  document.getElementById("combustibleVehiculo").value = "";
  document.getElementById("colorVehiculo").value = "";
  document.getElementById("tipoVehiculo3").value = "";
  document.getElementById("capacidadCargaVehiculo").value = "";
  document.getElementById("cilindrajeVehiculo").value = "";
  document.getElementById("tipoVehiculo2").value = "";
}

function limpiarCamposSolicitud() {
  document.getElementById("floatingInputName").value = "";
  document.getElementById("floatingInputSurname").value = "";
  document.getElementById("floatingInputNumeroTelefono").value = "";
  document.getElementById("tipoVehiculoSeleccion").value = "";
  const selectFalla = document.querySelector("select[aria-label='Default select example']");
  if (selectFalla) selectFalla.selectedIndex = 0;
}