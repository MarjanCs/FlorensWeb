let URL = "http://127.0.0.1:5000/NecesidadesLista";

document.addEventListener("DOMContentLoaded", function () {
    // Realizar la solicitud HTTP para obtener el JSON
    fetch(URL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al obtener el archivo JSON: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            // Manipular el DOM para mostrar los datos
            const userListElement = document.getElementById("NecesidadesList");
            data.forEach(nece => {
                const listItem = document.createElement("li");
                listItem.textContent = nece.Title;
                userListElement.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error("Error:", error);
        });
});