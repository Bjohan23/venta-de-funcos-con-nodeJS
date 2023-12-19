document.addEventListener("DOMContentLoaded", function () {
  // Obtener los parámetros de la URL
  const urlParams = new URLSearchParams(window.location.search);
  // si la url esta bacia redireccionar a iniciar secion

  // Obtener los valores de los parámetros
  const usuario = urlParams.get("usuario");
  const clave = urlParams.get("clave");
  console.log("usuario:" + usuario);
  console.log("clave:" + clave);

  // si el usuario y la contraseña no esta bacia  mostrar boton salir
  if (usuario) {
    document.getElementById("iniciar").style.display = "none";
    document.getElementById("salir").style.display = "flex";
  }
});

//  si no se a iniciado secion redireccionar a iniciar secion
function redireccionar() {
  window.location.href = "usuario/iniciarSesion.html";
}
