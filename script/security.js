const auth = {
    isAuthenticated: false,
    user: null
};

function logout() {
    auth.isAuthenticated = false;
    auth.user = null;
    window.location.href = "./index.html"; // Redirige a la página de inicio de sesión
}