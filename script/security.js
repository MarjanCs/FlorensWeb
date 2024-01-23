document.addEventListener('DOMContentLoaded', function() {
    if (!localStorage.getItem('usuario')) {
        window.location.href = 'index.html';
    }
});
//Metodo de cerrar Cesión
function logout() {
    localStorage.removeItem('usuario');
    window.location.href = 'index.html';
}