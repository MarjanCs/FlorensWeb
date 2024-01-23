let URL = "http://127.0.0.1:5000/";
//let URL = "http://127.0.0.1:5000/Necesidades";
var doc = "";
var nameD = "";
document.addEventListener("DOMContentLoaded", function () {
    // Realizar la solicitud HTTP para obtener el JSON
    fetch(URL+"DominiosLista")
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al obtener el archivo JSON: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            // Manipular el DOM para mostrar los datos
            const userListElement = document.getElementById("DominiosList");
            Object.keys(data).forEach(nece => {
                const button  = document.createElement("input");
                button.type = "button";
                button.className = "Boton";
                button.id = `DominiosButton_${nece}`;
                button.value = data[nece].Title;
                button.textContent = data[nece].Title;
                /*button.addEventListener('click',function() {
                    llamarInformacion(data[nece].Id,data[nece].Title);
                });*/
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
    
    fetch(URL+'DocPatronesInfo', {
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
        const resultrAfecciones = document.getElementById('txtAlteraciones');
        resultrAfecciones.removeAttribute('disabled');
        resultrAfecciones.value = "";
        Object.entries(data[0]?.Alteraciones).forEach(([afeccion, descripcion]) => {
            console.log(`${afeccion}: ${descripcion}`);
            resultrAfecciones.value = resultrAfecciones.value+`${afeccion}: ${descripcion}`+"\n ";
        });
        const resultrCuidados = document.getElementById('txtValorar');
        resultrCuidados.removeAttribute('disabled');
        resultrCuidados.value = "";
        Object.entries(data[0]?.Valoraciones).forEach(([afeccion, descripcion]) => {
            console.log(`${afeccion}: ${descripcion}`);
            resultrCuidados.value = resultrCuidados.value+`${afeccion}: ${descripcion}`+"\n ";
        });
        const resultados = document.getElementById('txtResultados');
        resultados.removeAttribute('disabled');
        resultados.value ="";
        Object.entries(data[0]?.Resultados).forEach(([afeccion, descripcion]) => {
            console.log(`${afeccion}: ${descripcion}`);
            resultados.value = resultados.value+`${afeccion}: ${descripcion}`+"\n ";
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
    var Objetivo = document.getElementById("txtResultados").value;
    var resultados = transformarJson(Objetivo);
    var alteraciones = document.getElementById("txtAlteraciones").value;
    var resultadosAltera = transformarJson(alteraciones);
    var valorar = document.getElementById("txtValorar").value;
    var resultadosValor = transformarJson(valorar);
    console.log(resultados.Resultados);
    fetch(URL+'EditarDocumentPatron/'+doc+"/"+nameD, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            DefinicionUpdate: Definicion,
            TituloUpdate: Titulo,
            ResultadoUpdate: resultados.Resultados,
            AlteracionesUpdate: resultadosAltera.Resultados,
            ValorarUpdate: resultadosValor.Resultados
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
    var Objetivo = document.getElementById("txtResultados");
    Objetivo.setAttribute('disabled', 'disabled');
    Objetivo.value="";
    var alteraciones = document.getElementById("txtAlteraciones");
    alteraciones.setAttribute('disabled', 'disabled');
    alteraciones.value="";
    var valorar = document.getElementById("txtValorar");
    valorar.setAttribute('disabled', 'disabled');
    valorar.value="";
    const Boton = document.getElementById('btnGuardar');
    Boton.setAttribute('disabled', 'disabled');
}