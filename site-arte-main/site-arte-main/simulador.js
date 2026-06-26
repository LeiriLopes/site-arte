function calcular() {

    const estilo = Number(document.getElementById("estilo").value);
    const medidas = Number(document.getElementById("medidas").value);

    const total = estilo + medidas;

    document.getElementById("resultado").textContent =
        "Valor estimado: R$ " + total.toLocaleString("pt-BR");
}