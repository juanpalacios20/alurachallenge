// Define cómo se deben reemplazar los caracteres
// e - enter
// o - ober
// i - imes
// a - ai
// u - ufat

// Obtén los elementos del DOM
const botonEncriptar = document.getElementById("button__encriptar");
const botonDesencriptar = document.getElementById("button__desencriptar");
const botonCopiar = document.getElementById("button__copiar");
const campoTextoInicial = document.getElementById("textoInput");
const campoTextoFinal = document.getElementById("textoFinal");
const imagenMunheco = document.getElementById("munheco");
const textoInformativo = document.getElementById("textoInfo");
const contenedorDerecha = document.getElementById("rigth");

// Función para actualizar la vista con el texto encriptado o desencriptado
const actualizarVista = (nuevoValor) => {
    campoTextoFinal.innerHTML = nuevoValor;
    campoTextoFinal.classList.add("ajustar");
    contenedorDerecha.classList.add("ajuste");
    campoTextoInicial.value = "";
    campoTextoInicial.style.height = "auto";
    campoTextoInicial.placeholder = "Ingrese el texto aquí";
    imagenMunheco.classList.add("ocultar");
    textoInformativo.classList.add("ocultar");
    botonCopiar.classList.remove("bn_ocultar");
}

// Función para restablecer la vista inicial
const restablecerVista = () => {
    campoTextoInicial.value = "";
    campoTextoInicial.style.height = "auto";
    campoTextoFinal.innerHTML = "";
    contenedorDerecha.classList.remove("ajuste");
    campoTextoFinal.classList.remove("ajustar");
    imagenMunheco.classList.remove("ocultar");
    campoTextoFinal.placeholder = "Ningún mensaje fue encontrado";
    textoInformativo.classList.remove("ocultar");
    botonCopiar.classList.add("bn_ocultar");
    campoTextoInicial.focus();
};

// Definición de reemplazos para encriptación y desencriptación
let reglasReemplazo = [
    ["e", "enter"],
    ["o", "ober"],
    ["i", "imes"],
    ["a", "ai"],
    ["u", "ufat"]
];

// Evento para encriptar el texto cuando se haga clic en el botón correspondiente
botonEncriptar.addEventListener('click', () => {
    const texto = campoTextoInicial.value.toLowerCase();

    if (texto) {
        const encriptarTexto = (texto) => {
            reglasReemplazo.forEach(([caracter, reemplazo]) => {
                if (texto.includes(caracter)) {
                    texto = texto.replaceAll(caracter, reemplazo);
                }
            });
            return texto;
        };
        actualizarVista(encriptarTexto(texto));
    } else {
        alert("Ingrese texto para encriptar");
        restablecerVista();
    }
});

// Evento para desencriptar el texto cuando se haga clic en el botón correspondiente
botonDesencriptar.addEventListener('click', () => {
    const texto = campoTextoInicial.value.toLowerCase();

    if (texto) {
        const desencriptarTexto = (texto) => {
            reglasReemplazo.forEach(([caracter, reemplazo]) => {
                if (texto.includes(reemplazo)) {
                    texto = texto.replaceAll(reemplazo, caracter);
                }
            });
            return texto;
        };
        actualizarVista(desencriptarTexto(texto));
    } else {
        alert("Ingrese texto a desencriptar");
        restablecerVista();
    }
});

// Evento para copiar el texto final al portapapeles
botonCopiar.addEventListener("click", () => {
    let texto = campoTextoFinal;
    texto.select();
    document.execCommand('copy');
    //navigator.clipboard.writeText(texto.value);
    // La función del portapapeles no es compatible con móviles
    alert("Texto Copiado");
    restablecerVista();
});

// Ajusta automáticamente el tamaño del área de texto según el contenido
campoTextoInicial.addEventListener("change", e => {
    campoTextoInicial.style.height = "auto";
    let alturaScroll = e.target.scrollHeight;
    campoTextoInicial.style.height = `${alturaScroll}px`;
});
campoTextoInicial.addEventListener("keyup", e => {
    campoTextoInicial.style.height = "auto";
    let alturaScroll = e.target.scrollHeight;
    campoTextoInicial.style.height = `${alturaScroll}px`;
});
