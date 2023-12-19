// implementa una funcionalidad de "cargar más" que muestra de a 4 elementos cada vez que se hace clic
//en el botón "load-more". Cuando todos los elementos han sido mostrados, el botón se oculta.

let loadMoreBtn = document.querySelector("#load-more");
let currentItem = 8;

loadMoreBtn.onclick = () => {
  let boxes = [...document.querySelectorAll(".box-container .box")];
  for (var i = currentItem; i < currentItem + 4; i++) {
    boxes[i].style.display = "inline-block";
  }
  currentItem += 4;
  if (currentItem >= boxes.length) {
    loadMoreBtn.style.display = "none";
  }
};

//  codigo de carrito de compras
let total = 0; //Inicializo una variable
const totalElement = document.getElementById("total"); //Referencia al elemento del DOM con el id "total", que se utilizará para mostrar el costo total
const carrito = document.getElementById("carrito");
const elementos1 = document.getElementById("lista-1");
const lista = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.getElementById("vaciar-carrito");

// Cargar carrito desde localStorage al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  cargarCarritoDesdeLocalStorage();
  mostrarTotal();
});

cargarEventListeners(); //se encarga de configurar los event listeners para las interacciones del usuario.

//Lógica para manejar eventos de clic en elementos específicos de la interfaz de
// usuario relacionados con un carrito de compras, como agregar elementos al carrito,eliminar elementos y vaciar
function cargarEventListeners() {
  elementos1.addEventListener("click", comprarElemento);
  carrito.addEventListener("click", eliminarElemento);
  vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
  document.getElementById("Imprimir").addEventListener("click", comprar);
}

//capturar el evento de clic en algún elemento de la interfaz de usuario que tenga la clase
//"agregar-carrito", en este caso "Agregar al carrito".

function comprarElemento(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const elemento = e.target.parentElement.parentElement;
    leerDatosElemento(elemento);
  }
}

//encapsula la lógica para extraer información específica de un producto
function leerDatosElemento(elemento) {
  const infoElemento = {
    imagen: elemento.querySelector("img").src,
    titulo: elemento.querySelector("h3").textContent,
    precio: elemento.querySelector(".precio").textContent,
    id: elemento.querySelector("a").getAttribute("data-id"),
  };

  //Llama a la función insertarCarrito y le pasa el objeto infoElemento como argumento.
  insertarCarrito(infoElemento);
}

// se encarga de tomar la información de un producto y la representa visualmente en una nueva fila
// en la tabla, cada fila contiene la imagen, el título, el precio
function insertarCarrito(elemento) {
  const row = document.createElement("tr"); //crea un nuevo elemento de tabla (<tr>) que representará una fila en el carrito.
  row.innerHTML = `
        <td>
            <img src="${elemento.imagen}" width="100" height="150">
        </td>
        <td>
            ${elemento.titulo}
        </td>
        <td>
            ${elemento.precio}
        </td>
        <td>
            <a href="#" class="borrar" data-id="${elemento.id}">X</a>
        </td>
    `;
  lista.appendChild(row);

  // Guardar carrito en localStorage
  guardarCarritoEnLocalStorage();

  // Actualizar el total
  const precioNumerico = parseFloat(elemento.precio.replace("S/", "").trim());
  total += precioNumerico;
  mostrarTotal();
}

// se encarga de manejar la eliminación de un elemento del carrito de compras en la interfaz de usuario
function eliminarElemento(e) {
  e.preventDefault();
  if (e.target.classList.contains("borrar")) {
    const elemento = e.target.parentElement.parentElement;
    // Restar el precio del elemento eliminado del total
    const precioElemento = parseFloat(
      elemento
        .querySelector("td:nth-child(3)")
        .textContent.replace("S/", "")
        .trim()
    );
    total -= precioElemento;
    elemento.remove();

    // Guardar carrito en localStorage después de eliminar un elemento
    guardarCarritoEnLocalStorage();
    mostrarTotal();
  }
}

//Permite vaciar completamente el carrito de compras, restableciendo el total a cero
function vaciarCarrito() {
  console.log("Vaciar carrito");
  while (lista.firstChild) {
    lista.removeChild(lista.firstChild);
  }

  // Reiniciar el total
  total = 0;
  mostrarTotal();

  // Vaciar carrito en localStorage
  localStorage.removeItem("carrito");

  return false;
}

//Muestra el total de la compra
function mostrarTotal() {
  // Mostrar el total en tu elemento HTML con el símbolo de soles
  totalElement.textContent = `S/${total.toFixed(2)}`;
}

function guardarCarritoEnLocalStorage() {
  // Obtener los elementos del carrito
  const filasCarrito = lista.querySelectorAll("tr");

  // Crear un array para almacenar los elementos del carrito
  const carritoArray = [];

  filasCarrito.forEach((fila) => {
    const elemento = {
      imagen: fila.querySelector("img").src,
      titulo: fila.querySelector("td:nth-child(2)").textContent,
      precio: fila.querySelector("td:nth-child(3)").textContent,
      id: fila.querySelector("a").getAttribute("data-id"),
    };

    carritoArray.push(elemento);
  });

  // Guardar el array del carrito en localStorage
  localStorage.setItem("carrito", JSON.stringify(carritoArray));
}

function cargarCarritoDesdeLocalStorage() {
  // Obtener el carrito desde localStorage
  const carritoGuardado = localStorage.getItem("carrito");

  if (carritoGuardado) {
    // Convertir el JSON almacenado en localStorage a un array
    const carritoArray = JSON.parse(carritoGuardado);

    // Insertar los elementos del carrito en la tabla
    carritoArray.forEach((elemento) => {
      insertarCarrito(elemento);
    });
  }
}

//Parte del formulario
function mostrarDatos() {
  // Captura de datos del formulario
  var nombre = document.getElementById("nombre").value;
  var email = document.getElementById("email").value;
  var mensaje = document.getElementById("mensaje").value;

  // Verificar si los campos están completos
  if (nombre.trim() === "" || email.trim() === "" || mensaje.trim() === "") {
    // Mostrar mensaje de error si algún campo está vacío
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Completa todos los campos antes de enviar el formulario.",
    });
  } else {
    // Crear el mensaje de la alerta
    var mensajeAlerta =
      "Nombre: " + nombre + "\nEmail: " + email + "\nMensaje: " + mensaje;

    // Mostrar ventana de alerta con la información del formulario
    alert(mensajeAlerta);

    // Limpiar los campos del formulario
    document.getElementById("nombre").value = "";
    document.getElementById("email").value = "";
    document.getElementById("mensaje").value = "";
  }
}

function comprar() {
  // Obtener el carrito actual
  const filasCarrito = lista.querySelectorAll("tr");
  const carritoArray = [];

  filasCarrito.forEach((fila) => {
    const elemento = {
      imagen: fila.querySelector("img").src,
      titulo: fila.querySelector("td:nth-child(2)").textContent,
      precio: fila.querySelector("td:nth-child(3)").textContent,
      id: fila.querySelector("a").getAttribute("data-id"),
    };
    carritoArray.push(elemento);
  });

  // Verificar si el carrito está vacío utilizando SweetAlert
  if (carritoArray.length === 0) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "El carrito está vacío. Agrega productos antes de comprar.",
    });
  } else {
    // Redirigir a la página comprar.html con el carrito como parámetro de consulta
    const queryParams = new URLSearchParams();
    queryParams.set("cart", encodeURIComponent(JSON.stringify(carritoArray)));
    window.location.href = `comprar.html?${queryParams.toString()}`;
  }
}

// codigo de pagina comprar.html

// Función para obtener parámetros de consulta de la URL
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
    table.className = "table table-bordered";

    // Encabezados de la tabla
    let thead = document.createElement("thead");
    thead.innerHTML = `
                <tr>
                    <th scope="col">Producto</th>
                    <th scope="col">Precio</th>
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
                `;
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);

    // Total de la compra
    let total = cart.reduce((sum, item) => sum + parseFloat(item.precio), 0);
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

// Mostrar el resumen de compra al cargar la página
mostrarResumenCompra();
