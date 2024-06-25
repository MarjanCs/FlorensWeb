let URL = "https://florensback-production.up.railway.app/";
PresentarOcultarNece= function(){
    mostrarComponente("Necesidades");
    ocultarComponente("Patrones");
    ocultarComponente("Dominios");
    ocultarComponente("Bibliografia");
}
PresentarOcultarPatro= function(){
    mostrarComponente("Patrones");
    ocultarComponente("Necesidades");
    ocultarComponente("Dominios");
    ocultarComponente("Bibliografia");
}
PresentarOcultarDom= function(){
    mostrarComponente("Dominios");
    ocultarComponente("Patrones");
    ocultarComponente("Necesidades");
    ocultarComponente("Bibliografia");
}
PresentarOcultarBiblio= function(){
    mostrarComponente("Bibliografia");
    ocultarComponente("Patrones");
    ocultarComponente("Dominios");
    ocultarComponente("Necesidades");
}