const generarcliente = document.getElementById("guardar");
const ruta_base = "http://localhost:1020/Cliente/";
const ruta_registrar = "save";
const ruta_buscar = "getById?id=";
const ruta_eliminar = "delete?id=";
const ruta_listar = "listAll";
var btnBuscarCliente = document.getElementById("buscarCliente");
var contador = 0;

async function ingresarCliente(){
  const inputId = document.getElementById("id");
  const inputNombre = document.getElementById("nombre");
  const inputTelefono = document.getElementById("telefono");
  const inputDireccion = document.getElementById("direccion");
var data = {
  id: inputId.value,
  nombre: inputNombre.value,
  telefono: inputTelefono.value,
  direccion: inputDireccion.value
};
let ruta = ruta_base + ruta_registrar;
let response = await  fetch(ruta, {
  method: 'POST',
  body: JSON.stringify(data),
  headers: {
      "Content-type": "application/json"
  }});

let result = await response.json();
if(result.data != null){
  alert("se guardo a: " + result.data.nombre);
}
location.reload();
}




function buscarCliente(){
  let bus = document.getElementById("buscar").value;
  let ruta = ruta_base + ruta_buscar + bus;
  fetch(ruta)
  .then((response) => response.json())
  .then((json) => generarFila(json.data, "bodyBuscar"));
}



async function eliminarCliente(bus){
 // let bus = document.getElementById("eliminar").value;
  let ruta = ruta_base + ruta_eliminar + bus;
  const res = await fetch(ruta, {method: "DELETE"});
  const data = await res.json();
  if(data.data === null){
    alert("no existe...")
  }else{
    console.log("eliminado "+data.data.nombre);
    location.reload();
  }
}



fetch(ruta_base + ruta_listar)
  .then((response) => response.json())
  .then((json) => mostrarDatos(json.data, "body"));
  //.then((json) => console.log(json.mensaje));

const mostrarDatos = function (datos, nTabla) {
  for (dato of datos) {
    generarFila(dato, nTabla);
  }
}



function generarFila(dato, nTabla) {
  if(dato === null){
    alert("no existe...");
  }else{
  const tabla = document.getElementById(nTabla);
  let fila = tabla.insertRow(-1);
  for (let i = 0; i < 5; i++) {
    let celda = fila.insertCell(i);
    if (i == 0) {
      celda.textContent = dato.id;
    }
    if (i == 1) {
      celda.textContent = dato.nombre;
    }
    if (i == 2) {
      celda.textContent = dato.telefono;
    }
    if (i == 3) {
      celda.textContent = dato.direccion;
    }if (i == 4) {
      var rows = document.getElementById('body').rows;
      let dat = rows[contador].cells[0].innerHTML;
      var button = document.createElement('button'); 
      button.innerText = 'Eliminar'; 
      button.onclick = function(){
         eliminarCliente(dat);
        }
      celda.appendChild(button);
    }
   }
   contador++;
  }
}
/*    
  
      var data ={nmidpro:proyecto.nmidpro,nmidlay:layer.nmidlay};
    
      let response = await  fetch(URL_BASE+'/api/charmarin/layersproyectos/getBy', {
                                  method: 'POST',
                                  body: JSON.stringify(data),
                                  headers: {
                                      "Content-type": "application/json"
                                  }});
  
      let result = await response.json();
      
      var arrayData = JSON.parse(result.data[0].source);
      if(arrayData!=null && arrayData.length>0){
          nmidlaypro.set(arrayData[0].nmidlaypro);
          blackBoard.load(arrayData);
      } */
