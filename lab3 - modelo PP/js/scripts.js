import Anuncio from "./anuncios.js"; 

const anuncios = JSON.parse(localStorage.getItem("lista")) || [];
let id = null;

window.addEventListener("DOMContentLoaded", () => {

    if(anuncios){
        handlerLoad();
    }

    let botonCancelar = document.getElementById('btnCancelarCambios');
    let botonEliminar = document.getElementById('btnEliminarElemento');
    let botonGuardarCambios = document.getElementById('btnModificar');

    // document.forms[0].addEventListener("load", handlerLoad);
    document.forms[0].addEventListener("submit", handlerSubmit);
    document.forms[0].addEventListener("click", handlerClick);
    botonCancelar.addEventListener("click",handlerCancelar);
    botonEliminar.addEventListener("click",handlerEliminar);
    botonGuardarCambios.addEventListener("click", handlerModificar);

});


function handlerSubmit(e){
    e.preventDefault(); 
    // console.log("hola");

    const frm = e.target;

    const nuevoAnuncio = new Anuncio(Date.now(),frm.titulo.value, frm.transaccion.value, frm.descripcion.value, frm.precio.value, frm.banios.value, frm.autos.value, frm.dormitorios.value);

    // console.log(nuevoAnuncio);
    // console.log(nuevoAnuncio.precio);
    // console.log(nuevoAnuncio.id);
    
    altaAnuncio(nuevoAnuncio);
    // console.log(anuncios);

    // anuncios.forEach(element => {
    //     console.log(element);
    // });

    limpiarForm(frm);
}   




function altaAnuncio(a){

    anuncios.push(a);
    almacenarDatos(anuncios);

    handlerLoad();

}

function almacenarDatos(data){
    localStorage.setItem("lista", JSON.stringify(data));
}



function crearTabla(items){
    const tabla = document.createElement('table');

    tabla.appendChild(crearThead(items[0]));
    tabla.appendChild(crearTbody(items));

    return tabla;
}

function crearThead(item){
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');

    for (const key in item){
        if(key !== "id")
        {
            const th = document.createElement('th');
            const texto = document.createTextNode(key);
            th.appendChild(texto);
            tr.appendChild(th);
        }
    }

    thead.appendChild(tr);
    return thead;
}

function crearTbody(items){
    const tbody = document.createElement('tbody');

    items.forEach((element) => {
        const tr = document.createElement('tr');
        for (const key in element) {
            if(key=== "id")
            {
                tr.setAttribute("data-id",element[key]);
            }else{
                const td = document.createElement('td');
                // const texto = document.createTextNode(item[key]);
                // td.appendChild(texto);
                td.textContent = element[key];
                tr.appendChild(td);
            }
        }
        tbody.appendChild(tr);
    });

    return tbody;
}

function handlerLoad(e){
    renderizarLista(crearTabla(anuncios), document.getElementById("divTabla"));
}

function renderizarLista(lista, contenedor){
    // borro lista actual
    while(contenedor.hasChildNodes()){
        contenedor.removeChild(contenedor.firstChild);
    }

    //lista no null
    if(lista){
        contenedor.appendChild(lista);
    }
}



function limpiarForm(frm)
{
    frm.reset();    
}


function handlerClick(e){
    // if(!e.target.matches('td')) return;
    if(e.target.matches('td')){
        let id = e.target.parentNode.dataset.id;
        console.log(id);
        cargarForm(id);
        document.forms[0].id.value = id;
        
        document.getElementById("divAccionesTabla").setAttribute("style","display: flex");
    }
    // }else if(e.target.matches('#btnEliminarElemento'))
    // {
    //     eliminarElemento();
    // }

}

function handlerCancelar(e){

    limpiarForm(document.forms[0]);
    document.getElementById("divAccionesTabla").setAttribute("style","display: none");

}

function handlerEliminar(e){

    eliminarElemento();
    document.getElementById("divAccionesTabla").setAttribute("style","display: none");
}


function handlerModificar(e){

    const frm = document.forms[0];
    const anuncioEditado = new Anuncio(parseInt(frm.id.value),frm.titulo.value, frm.transaccion.value, frm.descripcion.value, frm.precio.value, frm.banios.value, frm.autos.value, frm.dormitorios.value);


    if(confirm("Confirma modificación?")){
        agregarSpinner();
        let index = anuncios.findIndex((item)=> item.id == frm.id.value);
        console.log(index);
        anuncios[index] = anuncioEditado;
        setTimeout(()=>{
            almacenarDatos(anuncios);
            handlerLoad();
            eliminarSpinner();
        }, 2000);
    }else{
        alert("Modificación cancelada");
    }
    
    limpiarForm(document.forms[0]);
    document.getElementById("divAccionesTabla").setAttribute("style","display: none");

}

function eliminarElemento(){
    let id = parseInt(document.forms[0].id.value);

    console.log(id);
    let index = anuncios.findIndex((item)=> item.id == id);
    anuncios.splice(index,1);

    almacenarDatos(anuncios);
    handlerLoad();
    limpiarForm(document.forms[0]);
}


function cargarForm(id){
    let Anuncio = null;

    // anuncios.forEach((anuncio) =>{
    //     if(anuncio.id === parseInt(id))
    //     {
    //         Anuncio = anuncio;
    //     }
    // });

    Anuncio = anuncios.filter(a=> a.id===parseInt(id))[0];

    const {titulo, transaccion, descripcion, precio, num_wc, num_estacionamiento,num_dormitorio} = Anuncio;

    const frm = document.forms[0];

    frm.titulo.value = titulo;
    frm.transaccion.value = transaccion;
    frm.descripcion.value = descripcion;
    frm.precio.value = precio;
    frm.banios.value = num_wc;
    frm.autos.value = num_estacionamiento;
    frm.dormitorios.value = num_dormitorio;

}


function agregarSpinner()
{
    let spinner = document.createElement("img");
    spinner.setAttribute("src", "../assets/spinner.gif");
    spinner.setAttribute("alt", "imagen spinner");

    document.getElementById("spinner-container").appendChild(spinner);
}

function eliminarSpinner()
{
    document.getElementById("spinner-container").innerHTML="";
}