let URL = "http://127.0.0.1:5000/";
//let URL = "http://127.0.0.1:5000/Necesidades";
var doc = "";
var nameD = "";
document.addEventListener("DOMContentLoaded", function () {
    // Realizar la solicitud HTTP para obtener el JSON
    fetch(URL+"NecesidadesLista")
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al obtener el archivo JSON: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            // Manipular el DOM para mostrar los datos
            const userListElement = document.getElementById("NecesidadesList");
            Object.keys(data).forEach(nece => {
                const button  = document.createElement("input");
                button.type = "button";
                button.className = "Boton";
                button.id = `NececidadButton_${nece}`;
                button.value = data[nece].Title;
                button.textContent = data[nece].Title;
                button.addEventListener('click',function() {
                    llamarInformacion(data[nece].Id,data[nece].Title);
                });
                //button.onclick = llamarInformacion();
                userListElement.appendChild(button);
            });
        })
        .catch(error => {
            console.error("Error:", error);
        });
});

function llamarInformacion (documento, name){
    doc = documento;
    nameD = name;
    console.log(documento+name);
    fetch(URL+'DocNecesidadesInfo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            Document: documento,
            Name: name
        })
    }).then(response => {
        if (!response.ok) {
            throw new Error(`Error de red: ${response.status}`);
        }
        return response.json();
    }).then(data => {
        // Manejar la información devuelta
        console.log(data);
        const resultTitulo = document.getElementById("txtTitulo");
        resultTitulo.removeAttribute('disabled');
        resultTitulo.value = data[0]?.Titulo;
        const resultDefi = document.getElementById('txtDefinicion');
        resultDefi.removeAttribute('disabled');
        resultDefi.value = data[0]?.Definicion;
        const resultObjetivos = document.getElementById('txtObjetivos');
        resultObjetivos.removeAttribute('disabled');
        resultObjetivos.value = data[0]?.Objetivo;
        const resultrAfecciones = document.getElementById('txtAfecciones');
        resultrAfecciones.removeAttribute('disabled');
        resultrAfecciones.value = "";
        Object.entries(data[0]?.Afecciones).forEach(([afeccion, descripcion]) => {
            console.log(`${afeccion}: ${descripcion}`);
            resultrAfecciones.value = resultrAfecciones.value+`${afeccion}: ${descripcion}`+"\n ";
        });
        const resultrCuidados = document.getElementById('txtCuidados');
        resultrCuidados.removeAttribute('disabled');
        resultrCuidados.value = "";
        Object.entries(data[0]?.Cuidados).forEach(([afeccion, descripcion]) => {
            console.log(`${afeccion}: ${descripcion}`);
            resultrCuidados.value = resultrCuidados.value+`${afeccion}: ${descripcion}`+"\n ";
        });
        const Boton = document.getElementById('btnGuardar');
        Boton.removeAttribute('disabled');
    }) .catch(error => {
        // Manejar errores de la solicitud
        console.error('Error de solicitud:', error);

    });
}

function Guardar(){
    var Definicion = document.getElementById("txtDefinicion").value;
    var Titulo = document.getElementById("txtTitulo").value;
    var Objetivo = document.getElementById("txtObjetivos").value;
    var afecciones = document.getElementById("txtAfecciones").value;
    var resultadosAltera = transformarJson(afecciones);
    var cuidados = document.getElementById("txtCuidados").value;
    var resultadosValor = transformarJson(cuidados);
    fetch(URL+'EditarDocumentNecesidades/'+doc+"/"+nameD, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            DefinicionUpdate: Definicion,
            TituloUpdate: Titulo,
            ObjetivoUpdate: Objetivo,
            AfeccionesUpdate: resultadosAltera.Resultados,
            CuidadosUpdate: resultadosValor.Resultados
        })
    }).then(data=> {
        console.log("Completado");
        limpiar();
    }).catch(error => {
        // Manejar errores de la solicitud
        console.error('Error de solicitud:', error);

    });
}

function transformarJson(valor){
    const elementos = valor.split(/\n(?![^\s:]+:)/).filter(Boolean);

    // Crear el objeto JSON en el formato deseado
    const valoracionesJSON = {
    "Resultados": {}
    };

    elementos.forEach((elemento) => {
    const [clave, valor] = elemento.split(':').map(item => item.trim());
    valoracionesJSON.Resultados[clave] = !isNaN(valor) ? parseFloat(valor) : valor;
    });

    //console.log(JSON.stringify(valoracionesJSON, null, 2));
    return valoracionesJSON;
    
}

function limpiar(){
    var Definicion = document.getElementById("txtDefinicion");
    Definicion.setAttribute('disabled', 'disabled');
    Definicion.value="";
    var Titulo = document.getElementById("txtTitulo");
    Titulo.setAttribute('disabled', 'disabled');
    Titulo.value="";
    var Objetivo = document.getElementById("txtObjetivos");
    Objetivo.setAttribute('disabled', 'disabled');
    Objetivo.value="";
    var afecciones = document.getElementById("txtAfecciones");
    afecciones.setAttribute('disabled', 'disabled');
    afecciones.value="";
    var cuidados = document.getElementById("txtCuidados");
    cuidados.setAttribute('disabled', 'disabled');
    cuidados.value="";
    const Boton = document.getElementById('btnGuardar');
    Boton.setAttribute('disabled', 'disabled');
}