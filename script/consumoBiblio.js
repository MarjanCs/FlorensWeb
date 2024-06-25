

function llamarInformacionBiblio (collection){    
    fetch(URL+'BibliografiasList/'+collection)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error de red: ${response.status}`);
            }
            return response.json();
        }).then(data => {
            // Manejar la información devuelta
            console.log(data);
            const resultrBibliografia = document.getElementById('txtBibliografiasBiblio');
            resultrBibliografia.removeAttribute('disabled');
            resultrBibliografia.value = "";
            Object.entries(data.Bibliografias).forEach(([afeccion, descripcion]) => {
                //console.log(`${afeccion}: ${descripcion}`);
                resultrBibliografia.value = resultrBibliografia.value+`${descripcion}`+"\n ";
            });
            const Boton = document.getElementById('btnGuardarBiblio');
            Boton.removeAttribute('disabled');
            Boton.addEventListener('click',function() {
                GuardarBiblio(collection);
            });
        }) .catch(error => {
            // Manejar errores de la solicitud
            console.error('Error de solicitud:', error);

        });
}

function GuardarBiblio(collection){
    var valorar = document.getElementById("txtBibliografiasBiblio").value;
    var resultadosValor = transformarJson(valorar);
    console.log(JSON.stringify({
        UpdateBibliografia: resultadosValor,
        Name: collection
    }));
    fetch(URL+'EditarDocumentBibliografia/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            UpdateBibliografia: resultadosValor,
            Name: collection
        })
    }).then(data=> {
        console.log("Completado");
        limpiarBiblio();
    }).catch(error => {
        // Manejar errores de la solicitud
        console.error('Error de solicitud:', error);

    });
}

function transformarJson(valor){
    const lineas = valor.split('\n');
    const bibliografias = {};

    lineas.forEach((linea, index) => {
        // Solo procesar líneas no vacías
        if (linea.trim() !== '') {
            bibliografias[index + 1] = linea.trim();
        }
    });
    console.log(bibliografias)
    return bibliografias;
    
}

function limpiarBiblio(){
    var Definicion = document.getElementById("txtBibliografiasBiblio");
    Definicion.setAttribute('disabled', 'disabled');
    Definicion.value="";
    const Boton = document.getElementById('btnGuardarBiblio');
    Boton.setAttribute('disabled', 'disabled');
}

function ejemplo(){
    var valorar = document.getElementById("txtBibliografiasBiblio").value;
    const lineas = valorar.split('\n');
    const bibliografias = {};

    lineas.forEach((linea, index) => {
        // Solo procesar líneas no vacías
        if (linea.trim() !== '') {
            bibliografias[index + 1] = linea.trim();
        }
    });
    console.log(bibliografias)
    return bibliografias;
}