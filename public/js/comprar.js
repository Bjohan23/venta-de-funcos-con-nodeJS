// Función para obtener parámetros de consulta de la URL
/*
obtiene los parámetros de consulta de la url  . utiliza la api de urlSearchParams.
para analizar la cadena de consulta y devolver un objeto de parámetros de consulta.
*/
function getQueryParams() {
  const queryParams = new URLSearchParams(window.location.search);
  return Object.fromEntries(queryParams.entries());
}

// Función para mostrar el resumen de compra
function mostrarResumenCompra() {
  // Obtener los parámetros de consulta
  const queryParams = getQueryParams();

  // Verificar si hay un carrito en los parámetros
  if (queryParams.cart) {
    const cart = JSON.parse(decodeURIComponent(queryParams.cart));
    const cartSummary = document.getElementById("cart-summary");

    // Crear una tabla de Bootstrap para mostrar el resumen del carrito
    let table = document.createElement("table");
    table.className = "table table-striped";

    // Encabezados de la tabla
    let thead = document.createElement("thead");
    thead.innerHTML = `
                <tr>
                    <th scope="col">Producto</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Acciones</th>
                </tr>
            `;
    table.appendChild(thead);

    // Cuerpo de la tabla
    let tbody = document.createElement("tbody");
    cart.forEach((item) => {
      let tr = document.createElement("tr");
      tr.innerHTML = `
                    <td>${item.titulo}</td>
                    <td>${item.precio}</td>
                    <td>
                      <a href='#' class='btn btn-primary'>Editar</a>
                      <a href='#' class='btn btn-danger'>Eliminar</a>
                    </td>
                `;
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);

    // Total de la compra
    let total = cart.reduce(
      (sum, item) => sum + parseFloat(item.precio.replace("S/", "").trim()),
      0
    );
    let totalP = document.createElement("p");
    totalP.className = "mt-4";
    totalP.innerHTML = `<strong>Total:</strong> $${total.toFixed(2)}`;

    // Agregar la tabla y el total al contenedor
    cartSummary.appendChild(table);
    cartSummary.appendChild(totalP);
  } else {
    // Mostrar un mensaje si no se proporciona un carrito en los parámetros
    let mensaje = document.createElement("p");
    mensaje.textContent = "No se proporcionó información del carrito.";
    cartSummary.appendChild(mensaje);
  }
}
function mostrarAlertaCompraExitosa() {
  Swal.fire({
    icon: "success",
    title: "¡Compra exitosa!",
    text: "¿Desea seguir comprando?",
    showCancelButton: true,
    confirmButtonText: "Sí",
    cancelButtonText: "No",
  }).then((result) => {
    if (result.value) {
      window.location.href = "index.html";
    }
  });
}

function pagar() {
  document.getElementById("mensaje").innerHTML = "Gracias por su compra";
  document.getElementById("cart-summary").style.display = "none";
  document.getElementById("btn").style.display = "none";

  document.getElementById("tarjeta").style.display = "none";
  document.getElementById("ocultar").style.display = "none";

  mostrarAlertaCompraExitosa();
}

// Mostrar el resumen de compra al cargar la página
mostrarResumenCompra();
