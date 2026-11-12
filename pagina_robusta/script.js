let productos = JSON.parse(localStorage.getItem("productos")) || [];

const formulario = document.getElementById("formulario");
const lista = document.getElementById("lista");
const busqueda = document.getElementById("busqueda");
const filtro = document.getElementById("filtro");
const resumen = document.getElementById("resumen");

function guardarDatos() {
  localStorage.setItem("productos", JSON.stringify(productos));
}

function mostrarProductos() {
  lista.innerHTML = "";

  const texto = busqueda.value.toLowerCase();
  const categoriaElegida = filtro.value;

  productos.forEach(function(producto, indice) {
    const coincideNombre = producto.nombre.toLowerCase().includes(texto);
    const coincideCategoria =
      categoriaElegida === "Todas" || producto.categoria === categoriaElegida;

    if (coincideNombre && coincideCategoria) {
      const fila = document.createElement("tr");

      const nombre = document.createElement("td");
      const cantidad = document.createElement("td");
      const categoria = document.createElement("td");
      const acciones = document.createElement("td");

      nombre.textContent = producto.nombre;
      cantidad.textContent = producto.cantidad;
      categoria.textContent = producto.categoria;

      const editar = document.createElement("button");
      editar.textContent = "Editar";
      editar.addEventListener("click", function() {
        document.getElementById("nombre").value = producto.nombre;
        document.getElementById("cantidad").value = producto.cantidad;
        document.getElementById("categoria").value = producto.categoria;
        document.getElementById("indice").value = indice;
      });

      const eliminar = document.createElement("button");
      eliminar.textContent = "Eliminar";
      eliminar.addEventListener("click", function() {
        if (confirm("¿Deseas eliminar este producto?")) {
          productos.splice(indice, 1);
          guardarDatos();
          mostrarProductos();
        }
      });

      acciones.appendChild(editar);
      acciones.appendChild(eliminar);
      fila.appendChild(nombre);
      fila.appendChild(cantidad);
      fila.appendChild(categoria);
      fila.appendChild(acciones);
      lista.appendChild(fila);
    }
  });

  const unidades = productos.reduce(function(total, producto) {
    return total + producto.cantidad;
  }, 0);

  resumen.textContent =
    "Productos: " + productos.length + " | Unidades: " + unidades;
}

formulario.addEventListener("submit", function(evento) {
  evento.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const cantidad = Number(document.getElementById("cantidad").value);
  const categoria = document.getElementById("categoria").value;
  const indice = document.getElementById("indice").value;

  if (nombre === "" || !Number.isInteger(cantidad) || cantidad < 0) {
    alert("Revisa el nombre y la cantidad. La cantidad debe ser un entero igual o mayor a cero.");
    return;
  }

  const producto = { nombre: nombre, cantidad: cantidad, categoria: categoria };

  if (indice === "") {
    productos.push(producto);
  } else {
    productos[Number(indice)] = producto;
  }

  guardarDatos();
  formulario.reset();
  document.getElementById("indice").value = "";
  mostrarProductos();
});

document.getElementById("cancelar").addEventListener("click", function() {
  formulario.reset();
  document.getElementById("indice").value = "";
});

busqueda.addEventListener("input", mostrarProductos);
filtro.addEventListener("change", mostrarProductos);

mostrarProductos();
