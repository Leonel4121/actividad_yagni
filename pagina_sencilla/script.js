const formulario = document.getElementById("formulario");
const lista = document.getElementById("lista");

formulario.addEventListener("submit", function(evento) {
  evento.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const cantidad = Number(document.getElementById("cantidad").value);

  if (nombre === "" || cantidad < 1) {
    alert("Ingresa un nombre y una cantidad válida.");
    return;
  }

  const fila = document.createElement("tr");
  const celdaNombre = document.createElement("td");
  const celdaCantidad = document.createElement("td");

  celdaNombre.textContent = nombre;
  celdaCantidad.textContent = cantidad;

  fila.appendChild(celdaNombre);
  fila.appendChild(celdaCantidad);
  lista.appendChild(fila);

  formulario.reset();
});
