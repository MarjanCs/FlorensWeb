let URL = "http://127.0.0.1:5000/";
//let URL = "http://127.0.0.1:5000/Necesidades";

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
        resultTitulo.value = data[0]?.Título;
        const resultDefi = document.getElementById('txtDefinicion');
        resultDefi.value = data[0]?.Definición;
        const resultObjetivos = document.getElementById('txtObjetivos');
        resultObjetivos.value = data[0]?.Objetivo;
        const resultrAfecciones = document.getElementById('txtAfecciones');
        resultrAfecciones.value = "";
        Object.entries(data[0]?.["Afecciones Derivadas"]).forEach(([afeccion, descripcion]) => {
            console.log(`${afeccion}: ${descripcion}`);
            resultrAfecciones.value = resultrAfecciones.value+`${afeccion}: ${descripcion}`;
          });
        const resultrCuidados = document.getElementById('txtCuidados');
        resultrCuidados.value = "";
        Object.entries(data[0]?.["Cuidados por Aplicar"]).forEach(([afeccion, descripcion]) => {
            console.log(`${afeccion}: ${descripcion}`);
            resultrCuidados.value = resultrCuidados.value+`${afeccion}: ${descripcion}`;
          });

    }) .catch(error => {
        // Manejar errores de la solicitud
        console.error('Error de solicitud:', error);

    });
}

function Guardar(){
    var Definicion = document.getElementById("txtDefinicion").value;
    var Titulo = document.getElementById("txtTitulo").value;
    var Objetivo = document.getElementById("txtObjetivos").value;
    fetch(URL+'EditarDocument', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            DefinicionUpdate: Definicion,
            TituloUpdate: Titulo,
            ObjetivoUpdate: Objetivo
        })
    }).then(data=> {

    }).catch(error => {
        // Manejar errores de la solicitud
        console.error('Error de solicitud:', error);

    });
}