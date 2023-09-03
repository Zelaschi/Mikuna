import { Socio } from "../domain/Socio.js";
import { Comensal } from "../domain/Comensal.js"
import { Producto } from "../domain/Producto.js"
import { Cantina } from "../domain/Cantina.js"
import { MenuDelDia } from "../domain/MenuDelDia.js"
import { Carrito } from "../domain/Carrito.js"
import { Pedido } from "../domain/Pedido.js"

//hay que hacer que cuando se elimine un comensal tambien lo saque de la lista en el market


window.addEventListener("DOMContentLoaded", inicio);
let cantina= new Cantina();
let user= new Socio("",2200);
let carrito= new Carrito();
let comensalSeleccionado;
let hoy= new Date();
let dia= hoy.getDate();
let mes= hoy.getMonth()+1;
let año= hoy.getUTCFullYear();
let diaSelect=dia;
let mesSelect=mes;
let añoSelect=año;
hoy= dia+"/"+mes+"/"+año;
let fechaSeleccionada=hoy;

function inicio(){
    if(!user.getDefinido()){
      esconderTodo();
    }
    //Elementos cargados para pruebas
    comensalesParaPrueba();
    productosParaPrueba();
    menusDDParaPrueba();
    pedidosParaPrueba();
    //
    
    cargarOrdenes();
    cargarHorario();
    cargarMenuDelDia();
    cargarSaldo();
    cargarComensales(1,"u");
    cargarComensales(1,"m");
    cargarProductos();
    esconderSecciones();
    document.getElementById("contPaginaInicial").addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        nombreAUsuario();  
       }
     });  
    document.getElementById("botonAgregarFondos").addEventListener("click",function(){
        let cuantoAgrega =parseInt(prompt("Cuanto saldo desea agregar?"));
        user.agregarSaldo(cuantoAgrega);
        cargarSaldo();
    })
    document.getElementById("botonMenuDelDia").addEventListener("click",function(){agregarCarritoYActualizarlo(comensalSeleccionado,fechaSeleccionada,cantina.buscarMenuDia(fechaSeleccionada));});
    document.getElementById("botonOrdenes").addEventListener("click", function() {displayContenedor("o");});
    document.getElementById("botonCarrito").addEventListener("click", function() {displayContenedor("c");});
    document.getElementById("botonMenu").addEventListener("click", function() {displayContenedor("m");});
    document.getElementById("botonUser").addEventListener("click", function (){displayContenedor("u");})  ;
    document.getElementById("botonGuardar").addEventListener("click", function(){nombreAUsuario();});
    document.getElementById("botonDiaMas").addEventListener("click",function(){aumentarDia();});
    document.getElementById("botonDiaMenos").addEventListener("click",function(){disminuirDia();});
    document.getElementById("botonPagar").addEventListener("click",function(){pagar();});
}
//PRE: fecha en formato dia/mes/año
//POS: verifica si unDia > fecha de hoy
function yaPaso(unDia){
  let diaComp;
  if(unDia.charAt(1)=="/"){
    diaComp=parseInt(unDia.charAt(0));
  }else{
    diaComp=parseInt(unDia.charAt(0)+unDia.charAt(1));
  }
  let mesComp;
  if(unDia.charAt(1)=="/"){
    if(unDia.charAt(3)=="/"){
      mesComp=parseInt(unDia.charAt(2));
    }else{
      mesComp=parseInt(unDia.charAt(2)+unDia.charAt(3));
    }
  }else{
    if(unDia.charAt(4)=="/"){
      mesComp=parseInt(unDia.charAt(3));
    }else{
      mesComp=parseInt(unDia.charAt(3)+unDia.charAt(4));
    }
  }
  //hoy
  if(diaComp>=dia&&mesComp==mes||mesComp>mes){
    return false;
  }
  return true;
}

//POS: Funcion que carga las ordenes en el html, carga tanto las que ya fueron procesadas como las pendientes
// Agrega boton para cancelar orden
function cargarOrdenes(){
  let pedidos=user.getPedidos();
  let tablaPend= document.getElementById("tablaOrdenesPendientes");
  let tablaReal= document.getElementById("tablaOrdenesRealizadas");
  tablaPend.innerHTML="";
  tablaReal.innerHTML="";
  let i=1;
  for(let elem of pedidos){
    if(!yaPaso(elem.getFecha())){
      let tr= document.createElement("tr");
      tablaPend.appendChild(tr);
      let comida= document.createElement("td");
      comida.classList.add("tdIzquierda");
      comida.textContent=elem.getItem();
      tr.appendChild(comida);
      let precio=document.createElement("td");
      precio.textContent=elem.getItem().getPrecio();
      tr.appendChild(precio);
      let comensal=document.createElement("td");
      comensal.textContent=elem.getComensal();
      tr.appendChild(comensal);
      let fecha=document.createElement("td");
      fecha.textContent=elem.getFecha();
      tr.appendChild(fecha);
      let tdBoton= document.createElement("td");
      let boton= document.createElement("button");
      boton.classList.add("btn");
      boton.classList.add("botonEliminarPedido");
      tdBoton.classList.add("tdDerecha");
      boton.setAttribute("type","button");
      boton.textContent="Eliminar Pedido";
      boton.addEventListener("click", (function(i) {
        return function() {
          sacarPedidoYActualizar(i,elem.getItem().getPrecio());
        }
      })(i));
      tdBoton.appendChild(boton);
      tr.appendChild(tdBoton);
    }else{
      let tr= document.createElement("tr");
      tablaReal.appendChild(tr);
      let comida= document.createElement("td");
      comida.textContent=elem.getItem();
      comida.classList.add("tdIzquierda");
      tr.appendChild(comida);
      let precio=document.createElement("td");
      precio.textContent=elem.getItem().getPrecio();
      tr.appendChild(precio);
      let comensal=document.createElement("td");
      comensal.textContent=elem.getComensal();
      tr.appendChild(comensal);
      let fecha=document.createElement("td");
      fecha.textContent=elem.getFecha();
      fecha.classList.add("tdDerecha");
      tr.appendChild(fecha);
    }
    i++;
  }
}  
// PRE: Recibe el indice de los pedidos por orden de antiguedad y el precio 
// POS: Saca de la lista de pedidos pendientes deel usuario y devuelve el monto por el articulo
function sacarPedidoYActualizar(indice,precio){
    user.sacarPedido(indice);
    cantina.sacarPedido(indice);
    user.agregarSaldo(precio);
    cargarSaldo();
    cargarOrdenes();
}
// POS: Actualiza el saldo actual del usuario en el html
function cargarSaldo(){
  let span=document.getElementById("saldo");
  span.textContent=user.getSaldo();
}
// POS: agarra los elementos del carrito y crea un pedido para cada uno de ellos, vacia el carrito y actualiza el saldo
function pagar(){
  if(!carrito.estaVacio()){
    if(carrito.getTotal()<user.getSaldo()){
      let listaComensales= carrito.getListaComensal();
      let fechas=carrito.getFechasPedidos();
      let productos=carrito.getListaProductos();
      let i=0;
      for (let elem of productos){
        let pedido= new Pedido(fechas[i],elem,listaComensales[i]);
        user.restarSaldo(elem.getPrecio());
        cargarSaldo();
        cantina.agregarPedido(pedido);
        user.agregarPedido(pedido)
      }
      carrito.vaciarCarrito();
      actualizarCarrito();
      cargarOrdenes();
    }
    else{
      alert("Saldo insuficiente!");
    }
  }
  else{
    alert("Carrito Vacio!");
  }
}

function agregarCarritoYActualizarlo(comensal,fecha,producto){
  carrito.agregarAlCarrito(comensal,fecha,producto);
  actualizarCarrito();
}

function actualizarCarrito(){
    let listaComensal=carrito.getListaComensal();
    let listaProd= carrito.getListaProductos();
    let fechas= carrito.getFechasPedidos();
    let divNom= document.getElementById("resumenNombres");
    divNom.innerHTML="";
    let divPre=document.getElementById("resumenPrecios");
    divPre.innerHTML="";
    let divs=document.getElementById("rowCarrito")
    divs.innerHTML="";
    let i=0;
    for(let elem of listaProd){
      let p1= document.createElement("p");
      p1.textContent="$";
      p1.classList.add("prod");
      let span= document.createElement("span");
      span.textContent=listaProd[i].getPrecio();
      p1.appendChild(span);
      divPre.appendChild(p1);
      let p2=document.createElement("p");
      p2.textContent=elem.toString();
      p2.classList.add("prod");
      divNom.appendChild(p2);
      let divProd=document.createElement("div");
      divProd.classList.add("producto");
      divs.appendChild(divProd);
      let nombre=document.createElement("p");
      nombre.textContent=elem.toString();
      nombre.classList.add("items");
      divProd.appendChild(nombre);
      let precio=document.createElement("p");
      precio.classList.add("items");
      precio.textContent="Precio: $";
      let spanP= document.createElement("span");
      spanP.classList.add("itemId");
      spanP.textContent=elem.getPrecio();
      precio.appendChild(spanP);
      divProd.appendChild(precio);
      let fecha=document.createElement("p");
      fecha.classList.add("items");
      fecha.textContent="Fecha: ";
      let spanF= document.createElement("span");
      spanF.classList.add("itemId");
      spanF.textContent=fechas[i];
      fecha.appendChild(spanF);
      divProd.appendChild(fecha);
      let comensal =document.createElement("p");
      comensal.classList.add("items");
      comensal.textContent="Comensal: ";
      let spanC=document.createElement("span");
      spanC.classList.add("itemId");
      spanC.textContent=listaComensal[i];
      comensal.appendChild(spanC);
      divProd.appendChild(comensal);
      let boton =document.createElement("button");
      boton.setAttribute("type","button");
      boton.classList.add("btn");
      boton.classList.add("botonQuitarDelCarrito");
      boton.addEventListener("click", (function(comensal,fecha,elem) {
        return function() {
          sacarDelCarritoYActualizarlo(comensal,fecha,elem);
        }
      })(listaComensal[i],fechas[i],elem,));
      boton.textContent="Quitar del Carrito";
      divProd.appendChild(boton);
      i++;
    }
  let total=document.getElementById("totalNumero");
  total.textContent=carrito.getTotal();
}
function sacarDelCarritoYActualizarlo(comensal,fecha,producto){
  carrito.sacarDelCarrito(comensal,fecha,producto);
  actualizarCarrito();
}  
//POS: pone en el html el menu del dia asignado para el dia seleccionado
function cargarMenuDelDia(){
  if(cantina.estaFecha(fechaSeleccionada)){
    let menuDia=cantina.buscarMenuDia(fechaSeleccionada);
    let menu= document.getElementById("menuDia");
    menu.innerText=menuDia.getMenu();
    let guar= document.getElementById("guarnicionDia");
    guar.innerText=menuDia.getGuarnicion();
    let postre= document.getElementById("postreDia");
    postre.innerText=menuDia.getPostre();
    let precio=document.getElementById("precioDia");
    precio.innerHTML=menuDia.getPrecio();
  }else{
    let menu= document.getElementById("menuDia");
    menu.innerText="No Definido";
    let guar= document.getElementById("guarnicionDia");
    guar.innerText="No Definido";
    let postre= document.getElementById("postreDia");
    postre.innerText="No Definido";
    let precio=document.getElementById("precioDia");
    precio.innerHTML="No Definido";

  }
}
function aumentarDia(){
  if(diaSelect<31){
    diaSelect++;
    fechaSeleccionada=diaSelect+"/"+mesSelect+"/"+añoSelect;
  }else{
    diaSelect=1;
    mesSelect++;
    fechaSeleccionada=diaSelect+"/"+mesSelect+"/"+añoSelect;
  }
  cargarMenuDelDia();
  cargarHorario();
}
function disminuirDia(){
  if(mesSelect>mes&&diaSelect==1){
    mesSelect--;
    diaSelect=31;
    fechaSeleccionada=diaSelect+"/"+mesSelect+"/"+añoSelect;
  }else{
    if(diaSelect>dia ||mesSelect>mes ){
      diaSelect--;
      fechaSeleccionada=diaSelect+"/"+mesSelect+"/"+añoSelect;
    }
  }
  cargarMenuDelDia();
  cargarHorario();
}
function cargarHorario(){
  let aux  = document.createElement("h2");
  aux.innerHTML=fechaSeleccionada;
  let div = document.getElementById("contenedorFecha")
  div.innerHTML="";
  div.appendChild(aux);
  let diaHoy= document.getElementById("diaDeHoy");
  diaHoy.innerText=fechaSeleccionada;
}
//POS: muestra en el html el contenedor correspondiente al icono de la navbar
function displayContenedor(contenedor){ 
    switch (contenedor) {
        case "m":
          esconderSecciones();
          iconosGrises();
          document.getElementById("logoMenu").classList.add("iconoSidebarGreen");
          document.getElementById("logoMenu").classList.remove("iconoSidebarGray");
          document.getElementById("contenedorMenu").style.display="inline";
        break;
        case "u":
          esconderSecciones();
          iconosGrises();
          document.getElementById("logoUser").classList.add("iconoSidebarGreen");
          document.getElementById("logoUser").classList.remove("iconoSidebarGray");
          document.getElementById("contenedorUser").style.display="inline";
        break;
        case "o":
          esconderSecciones();
          iconosGrises();
          document.getElementById("logoOrdenes").classList.add("iconoSidebarGreen");
          document.getElementById("logoOrdenes").classList.remove("iconoSidebarGray");
          document.getElementById("contenedorResumenDeCompra").style.display="flex";
        break;
        case "c":
          esconderSecciones();
          iconosGrises();
          document.getElementById("logoCarrito").classList.add("iconoSidebarGreen");
          document.getElementById("logoCarrito").classList.remove("iconoSidebarGray");
          document.getElementById("contenedorCarritoDeCompras").style.display="flex";
        break;
      }
}
function nombreAUsuario(){
  if(document.getElementById("formNombreYApellido").reportValidity()){
    let nombre= document.getElementById("inputNombreYApellido").value;
    user.setNombre(nombre);
    document.getElementById("app").style.display="inline";
    document.getElementById("contPaginaInicial").style.display="none";
    cargarNombre();
    displayContenedor("u");
  }
}
function cargarNombre(){
  let nombreUsuario= user.getNombre();
  document.getElementById("nombreUserUser").innerHTML=nombreUsuario;
  document.getElementById("nombreUserMenu").innerHTML=nombreUsuario;
}
function cargarProductos(){
  let divMenu= document.getElementById("rowMenuAlt");
  divMenu.innerHTML="";
  let divMer= document.getElementById("rowMerienda");
  divMer.innerHTML="";
  let numMerienda=1;
  let numMenu=1;
  let listaMeriendas=cantina.getListaMeriendas();
  let listaMenues=cantina.getListaMenues();
  for (let elem of listaMeriendas){
    let div=document.createElement("div");
    div.classList.add("merienda");
    let idAuxMer="merienda"+numMerienda;
    div.id=idAuxMer;
    divMer.appendChild(div);
    let img=document.createElement("img");
    img.src=elem.getLinkFoto();
    img.setAttribute("alt",elem.getNombre());
    img.classList.add("fotoItem");
    div.appendChild(img);
    let nombre= document.createElement("p");
    nombre.classList.add("nombreItem");
    nombre.textContent =elem.getNombre();
    div.appendChild(nombre);
    let precio=document.createElement("p");
    precio.classList.add("precioItem");
    precio.textContent="Precio: $";
    let span= document.createElement("span");
    span.classList.add("precioItemNum");
    span.textContent=elem.getPrecio();
    precio.appendChild(span);
    div.appendChild(precio);
    let boton =document.createElement("button");
    boton.setAttribute("type","button");
    let idAuxBotMer="botonMerienda"+numMerienda;
    boton.id=idAuxBotMer;
    boton.classList.add("btn");
    boton.classList.add("btnCatalogoMenu");
    boton.addEventListener("click",function(){agregarCarritoYActualizarlo(comensalSeleccionado,fechaSeleccionada,elem);});
    document
    boton.textContent="Agregar al Carrito";
    div.appendChild(boton);
    numMerienda++;
  }
  for (let elem of listaMenues) {
    let div = document.createElement("div");
    div.classList.add("menues");
    let idAuxMen = "menu" + numMenu;
    div.id = idAuxMen;
    divMenu.appendChild(div);
    let img = document.createElement("img");
    img.src = elem.getLinkFoto();
    img.setAttribute("alt", elem.getNombre());
    img.classList.add("fotoItem");
    div.appendChild(img);
    let nombre = document.createElement("p");
    nombre.classList.add("nombreItem");
    nombre.textContent = elem.getNombre();
    div.appendChild(nombre);
    let precio = document.createElement("p");
    precio.classList.add("precioItem");
    precio.textContent = "Precio: $";
    let span = document.createElement("span");
    span.classList.add("precioItemNum");
    span.textContent = elem.getPrecio();
    precio.appendChild(span);
    div.appendChild(precio);
    let boton = document.createElement("button");
    boton.setAttribute("type", "button");
    let idAuxBotMen = "botonMenu" + numMenu;
    boton.id = idAuxBotMen;
    boton.addEventListener("click",function(){agregarCarritoYActualizarlo(comensalSeleccionado,fechaSeleccionada,elem);});
    boton.classList.add("btn");
    boton.classList.add("btnCatalogoMenu");
    boton.textContent = "Agregar al Carrito";
    div.appendChild(boton);
    numMenu++;
  }
}
function cargarComensales(cualActivo,MoU){
  comensalSeleccionado=user.buscarComensal(cualActivo);
  let combo;
  if(MoU=="m"){
    combo=document.getElementById("comboComensalesMenu");
  }else{
    if(MoU="u"){
      combo=document.getElementById("comboComensalesUser");
    }
  }
  combo.innerHTML=""
  let listaComensales=user.darComensales();
  let cantComensales=1;
  for (let elem of listaComensales){
    let li= document.createElement("li");
    let a= document.createElement("a");
    a.classList.add("dropdown-item");
    a.classList.add("rounded-2");
    let comensalAux="comensal"+cantComensales;
    a.id= comensalAux;
    a.addEventListener("click", (function(cantComensales) {
      return function() {
        cargarComensales(cantComensales,"m");
        cargarComensales(cantComensales,"u");
      }
    })(cantComensales));
    if(cantComensales==cualActivo){
      a.classList.add("active");
    }
    cantComensales++;
    if(MoU=="m"){
      a.textContent= elem.getNombre();
    }else{
      a.textContent= elem.toString();
    }
    li.appendChild(a);
    combo.appendChild(li);
  }
  if(MoU=="u"){
    let liDivisor= document.createElement("li");
    let hr= document.createElement("hr");
    liDivisor.appendChild(hr);
  hr.classList.add("dropdown-divider");
  combo.appendChild(liDivisor);
  let liAgregar= document.createElement("li");
  let aAgregar= document.createElement("a");
  aAgregar.classList.add("dropdown-item");
  aAgregar.classList.add("rounded-2");
  aAgregar.setAttribute('data-target', '#modalAgregarComensal');
  aAgregar.setAttribute("data-toggle","modal");
  aAgregar.textContent="Agregar Comensal";
  aAgregar.addEventListener("click", function(){
    const targetModal = this.getAttribute('data-target');
    const modal = new bootstrap.Modal(document.querySelector(targetModal));
    modal.show();
    let botonCerrar=document.getElementById("botonCerrarModal");
    botonCerrar.addEventListener("click", function(){
      modal.hide();
    })
    let botonAgregar=document.getElementById("botonAgregarComensal");
    let handleAgregarComensal;
    botonAgregar.addEventListener("click",handleAgregarComensal = function (){
      if(document.getElementById("formComensales").reportValidity()){
        let NyA=document.getElementById("inputNombreYApellidoComensal").value;
        let curso=document.getElementById("inputCursoComensal").value;
        let cursoInt=parseInt(curso);
        let radios=document.getElementsByName("PoS");
        let PoS;
        for(var radio of radios){
          if(radio.checked){
            PoS=radio.id;
          }
        }
        let comensal=new Comensal(NyA,cursoInt,PoS);
        user.agregarComensal(comensal);
        document.getElementById("formComensales").reset();
        modal.hide();
        cargarComensales(1,"u");
        cargarComensales(1,"m");
        botonAgregar.removeEventListener("click", handleAgregarComensal);
      }
    },{once : true})
  })
  liAgregar.appendChild(aAgregar);
  combo.appendChild(liAgregar)
  let liEliminar= document.createElement("li");
  let aEliminar= document.createElement("a");
  aEliminar.classList.add("dropdown-item");
  aEliminar.classList.add("rounded-2");
  aEliminar.textContent="Eliminar Comensal Seleccionado"
  liEliminar.appendChild(aEliminar);
  combo.appendChild(liEliminar);
  aEliminar.addEventListener("click", function(){
    let elementos=combo.getElementsByTagName("li");
    let elementoEliminar = elementos[cualActivo-1];
    user.eliminarComensal(cualActivo);
    combo.removeChild(elementoEliminar);
    cargarComensales(1,"u");
    cargarComensales(1,"m");
  });
  }
  
}
function iconosGrises(){
  document.getElementById("logoMenu").classList.remove("iconoSidebarGreen");
  document.getElementById("logoUser").classList.remove("iconoSidebarGreen");
  document.getElementById("logoOrdenes").classList.remove("iconoSidebarGreen");
  document.getElementById("logoCarrito").classList.remove("iconoSidebarGreen");

  document.getElementById("logoMenu").classList.add("iconoSidebarGray");
  document.getElementById("logoUser").classList.add("iconoSidebarGray");
  document.getElementById("logoOrdenes").classList.add("iconoSidebarGray");
  document.getElementById("logoCarrito").classList.add("iconoSidebarGray");
}

function esconderSecciones(){
    document.getElementById("contenedorMenu").style.display="none";
    document.getElementById("contenedorUser").style.display="none"; 
    document.getElementById("contenedorCarritoDeCompras").style.display="none";
    document.getElementById("contenedorResumenDeCompra").style.display="none";
}
function esconderTodo(){
  document.getElementById("contPaginaInicial").style.display="flex";
  document.getElementById("app").style.display="none";
  esconderSecciones();
}
function comensalesParaPrueba(){
  let Facundo= new Comensal("Facundo Rodriguez", 4, "Secundaria");
  let Juan = new Comensal("Juan Rodriguez",3,"primaria");
  user.agregarComensal(Facundo);
  user.agregarComensal(Juan);
}
function menusDDParaPrueba(){
  let dia1 =dia+"/"+mes+"/"+año;
  let Menu1= new MenuDelDia(dia1,"Pollo a la Plancha","Pure de Zanahoria","Fruta");
  let dia2= (dia+1)+"/"+mes+"/"+año;
  let Menu2= new MenuDelDia(dia2,"Ensalada","Sin Guarnición","Helado palito");
  let dia3= (dia+2)+"/"+mes+"/"+año;
  let Menu3= new MenuDelDia(dia3,"Tacos de Pollo","Sopa","Fruta");
  let dia4= (dia+3)+"/"+mes+"/"+año;
  let Menu4= new MenuDelDia(dia4,"Milanesa de Pollo","Pure","Ensalada de Frutas");
  let dia5= (dia+4)+"/"+mes+"/"+año;
  let Menu5= new MenuDelDia(dia5,"Pizza","Sin Guarnición","Salchichon");
  cantina.agregarMenuDD(Menu1);
  cantina.agregarMenuDD(Menu2);
  cantina.agregarMenuDD(Menu3);
  cantina.agregarMenuDD(Menu4);
  cantina.agregarMenuDD(Menu5);
}
function productosParaPrueba(){
  //Menues
  let milaPure= new Producto(250,"menu","Milanesa con Pure","./img/menu/milanesaPure.jpg");
  let nuggetsPure= new Producto(220,"menu","Nuggets con Pure","./img/menu/nuggetsPure.jpg");
  let ensaladaPollo= new Producto(200,"menu","Ensalada con Pollo","./img/menu/ensaladaPollo.jpg");
  let tallarinesTuco = new Producto(180,"menu", "Tallarines con Tuco","./img/menu/tallarinesTuco.jpg");
  let pizza = new Producto(230,"menu","Pizza","./img/menu/pizza.jpg");
  let pascualina = new Producto (150,"menu", "Pascualina","./img/menu/pascualina.jpg" );
  let papasFritas = new Producto(160,"menu", "Porcion de Papas Fritas","./img/menu/papasFritas.jpg");
  let strogonoff = new Producto(250,"menu","Strogonoff de Pollo", "./img/menu/strogonoff.jpg"); 
  cantina.agregarProducto(milaPure);
  cantina.agregarProducto(nuggetsPure);
  cantina.agregarProducto(ensaladaPollo);
  cantina.agregarProducto(tallarinesTuco);
  cantina.agregarProducto(pizza);
  cantina.agregarProducto(pascualina);
  cantina.agregarProducto(papasFritas);
  cantina.agregarProducto(strogonoff);
  //Meriendas
  let agua= new Producto(50,"merienda","Agua Salus","./img/merienda/agua.jpg");
  let barraFrut = new Producto(40,"merienda","Barra de cereal de frutilla","./img/merienda/BCFrutilla.jpg");
  let barraFrutL= new Producto(40,"merienda","Barra de cereal de frutilla light","./img/merienda/BCFrutillaLight.jpg");
  let coca = new Producto(60,"merienda", "Coca Cola","./img/merienda/coca.jpg");
  let gomets = new Producto(40,"merienda","Gomets","./img/merienda/gomets.jpg");
  let grano = new Producto(50,"merienda","Granolate","./img/merienda/granolate.jpg");
  let mani= new Producto(30,"merienda","Mani Japonés","./img/merienda/maniJapones.jpg");
  let menti = new Producto (25, "merienda","Mentitas","./img/merienda/mentitas.jpg");
  cantina.agregarProducto(agua);
  cantina.agregarProducto(barraFrut);
  cantina.agregarProducto(barraFrutL);
  cantina.agregarProducto(coca);
  cantina.agregarProducto(gomets);
  cantina.agregarProducto(grano);
  cantina.agregarProducto(mani);
  cantina.agregarProducto(menti);
}

function pedidosParaPrueba(){
  let gomets = new Producto(40,"merienda","Gomets","./img/merienda/gomets.jpg");
  let milaPure= new Producto(250,"menu","Milanesa con Pure","./img/menu/milanesaPure.jpg");
  let dia2= (dia+1)+"/"+mes+"/"+año;
  let Menu2= new MenuDelDia(dia2,"Ensalada","Sin Guarnición","Helado palito");
  let Facundo= new Comensal("Facundo Rodriguez", 4, "Secundaria");
  let Juan = new Comensal("Juan Rodriguez",3,"primaria");
  let ped1= new Pedido((dia+"/"+mes+"/"+año),gomets, Juan);
  let ped2= new Pedido(((dia+1)+"/"+mes+"/"+año),milaPure,Facundo);
  let ped3= new Pedido (((dia+1)+"/"+mes+"/"+año),Menu2,Facundo);
  let ped4= new Pedido (((dia-1)+"/"+mes+"/"+año),milaPure,Juan);
  user.agregarPedido(ped1);
  user.agregarPedido(ped2);
  user.agregarPedido(ped3);
  user.agregarPedido(ped4);
}