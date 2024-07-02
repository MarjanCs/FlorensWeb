
var doc = "";
var nameD = "";
let index = 0;
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
            Object.keys(data).forEach(dom => {
                const button  = document.createElement("input");
                button.type = "button";
                button.className = "Boton";
                button.id = `DominiosButton_${dom}`;
                button.value = data[dom].Title;
                button.textContent = data[dom].Title;
                button.addEventListener('click',function() {
                    llamarInformacionDom(data[dom].Id,data[dom].Title);
                });
                userListElement.appendChild(button);
            });
        })
        .catch(error => {
            console.error("Error:", error);
        });
});

function llamarInformacionDom (documento, name){
    doc = documento;
    nameD = name;
    console.log(documento+name);
    
    fetch(URL+'DocDominiosInfo', {
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
        const resultTitulo = document.getElementById("txtTituloDom");
        resultTitulo.removeAttribute('disabled');
        resultTitulo.value = data[0]?.Titulo;
        const resultDefi = document.getElementById('txtDefinicionDom');
        resultDefi.removeAttribute('disabled');
        resultDefi.value = data[0]?.Definicion;
        const userListElement = document.getElementById("ClasesList");
        index = data[0]?.Clases.length;
        userListElement.innerHTML = '';
        Object.keys(data[0]?.Clases).forEach(dom => {
            console.log(dom);
            const div  = document.createElement("div");
            div.id = `Div_${dom}`;
            const tituloC  = document.createElement("h3");
            tituloC.textContent = "Clase "+(parseInt(dom)+1);
            tituloC.className = "text-Title";
            tituloC.id = "Clase"+dom;
            div.appendChild(tituloC);
            const campoC  = document.createElement("textarea");
            campoC.type = "text";
            campoC.id = `DomTextoC_${dom}`;
            campoC.className = "rectangle-7";
            campoC.value = data[0]?.Clases[dom].Clase;
            div.appendChild(campoC);

            const tituloD  = document.createElement("h3");
            tituloD.textContent = "Descripcion "+(parseInt(dom)+1);
            tituloD.className = "text-Title";
            tituloD.id = "Descripcion"+dom;
            div.appendChild(tituloD);
            const campoD  = document.createElement("textarea");
            campoD.type = "text";
            campoD.id = `DomTextoD_${dom}`;
            campoD.className = "rectangle-7";
            campoD.value = data[0]?.Clases[dom].Descripcion;
            div.appendChild(campoD);

            const tituloDi  = document.createElement("h3");
            tituloDi.textContent = "Diagnostico "+(parseInt(dom)+1);
            tituloDi.className = "text-Title";
            tituloDi.id = "Diagnostico"+dom;
            div.appendChild(tituloDi);
            const campo  = document.createElement("textarea");
            campo.type = "text";
            campo.id = `DomTextoDi_${dom}`;
            campo.className = "rectangle-7";
            campo.value = "";
            Object.entries(data[0]?.Clases[dom].Diagnosticos).forEach(([afeccion, descripcion]) => {
                campo.value = campo.value+`${descripcion}`+"\n";
            });
            div.appendChild(campo);
            userListElement.appendChild(div);
        });
        
        const Boton = document.getElementById('btnGuardarDom');
        Boton.removeAttribute('disabled');
    }) .catch(error => {
        // Manejar errores de la solicitud
        console.error('Error de solicitud:', error);

    });
}

function GuardarDom(){
    var Definicion = document.getElementById("txtDefinicionDom").value;
    var Titulo = document.getElementById("txtTituloDom").value;
    var Clases=[];
    for (let i = 0; i < index; i++) {
        var valor = {
            Clase: document.getElementById("DomTextoC_"+i).value,
            Descripcion: document.getElementById("DomTextoD_"+i).value,
            Diagnosticos: transformarJson(document.getElementById("DomTextoDi_"+i).value)
        }
        
        Clases.push(valor);
    }
    const dominio = {
        Titulo,
        Definicion,
        Clases
    }
    console.log(dominio);
    fetch(URL+'EditarDocumentDominio/'+doc+"/"+nameD, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            DefinicionUpdate: Definicion,
            TituloUpdate: Titulo,
            ClasesUpdate: Clases,
        })
    }).then(data=> {
        console.log("Completado");
        limpiarDom();
    }).catch(error => {
        // Manejar errores de la solicitud
        console.error('Error de solicitud:', error);

    });
}

function transformarJson(valor){
    const elementos = valor.split(/\n(?![^\s:]+:)/).filter(Boolean);

    // Crear el objeto JSON en el formato deseado
    const valoracionesJSON = {
    "Resultados": []
    };

    elementos.forEach((elemento) => {
        const [clave, valor] = elemento.split('.-').map(item => item.trim());
        valoracionesJSON.Resultados[clave] = !isNaN(valor) ? parseFloat(valor) : valor;
    });

    //console.log(JSON.stringify(valoracionesJSON, null, 2));
    return valoracionesJSON;
    
}

function limpiarDom(){
    var Definicion = document.getElementById("txtDefinicionDom");
    Definicion.setAttribute('disabled', 'disabled');
    Definicion.value="";
    var Titulo = document.getElementById("txtTituloDom");
    Titulo.setAttribute('disabled', 'disabled');
    Titulo.value="";
    const userListElement = document.getElementById("ClasesList");
    userListElement.innerHTML = '';
    const Boton = document.getElementById('btnGuardarDom');
    Boton.setAttribute('disabled', 'disabled');
}