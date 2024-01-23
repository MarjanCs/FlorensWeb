document.addEventListener('DOMContentLoaded', function() {
    if (!localStorage.getItem('usuario')) {
        window.location.href = 'index.html';
    }
});
//Metodo de cerrar Cesión
function logout() {
    const acepta = confirm('¿Está seguro que deseas salir?');
    if (acepta) {
        localStorage.removeItem('usuario');
        window.location.href = 'index.html';
    } else {
        console.log('El usuario no está de acuerdo.');
    }
    
}