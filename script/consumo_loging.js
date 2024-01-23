document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});
function submitForm() {
    // Obtener los valores de usuario y contraseña
    const username = document.getElementById("user").value;
    const password = document.getElementById("pass").value;

    // Crear un objeto con los datos del formulario
    const formData = {
        email: username,
        password: password
    };

    
    fetch("http://127.0.0.1:5000/verificar_usuario", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)

    })
    .then(response => response.json())
    .then(data => {
        console.log(data["mensaje"]);
        if(data["status"]==true){
            if(data["rol"]=="Administrador"){
                location.href='./administrador.html';
                auth.isAuthenticated = true;
                auth.user = username;
            }else{
                alert("Acceso no autorizado");
            }
        }else{
            alert("Usuario o contraseña incorrecto");
        }
    })
    .catch(error => {
        console.error("Error al realizar la solicitud al servidor:", error);
        //console.log(formData);
        alert("Error al realizar la solicitud al servidor");
    });
}

const auth = {
    isAuthenticated: false,
    user: null
};

function logout() {
    auth.isAuthenticated = false;
    auth.user = null;
    window.location.href = "./index.html"; // Redirige a la página de inicio de sesión
}