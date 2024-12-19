const buttonAbertoFechado = document.querySelector("#send-base-to-horarios-de-abertura-e-de-fechado")
const abertoFechado = document.querySelector(".aberto-fechado");
const placeAF = document.querySelector(".sinaleiro-abre-e-fecha")

function reiniciarHorarios() {
    placeAF.innerHTML = '';    
}


function baseSimplesAbertoFechado(local) {
    popupPositions.classList.remove("appear");

    const [times, timesDiference] = obterDadosTratados();
    const aberturasEFechaduras = new AberturasEFechaduras(valores.timeOpen, times, valores.positions, valores.timeClosed);

    reiniciarHorarios();
    placeAF.innerHTML += aberturasEFechaduras.formatarRegistrarTempoPadrao(toNumber(document.querySelector("#resolution").value), "sinaleiro", "Sinaleiro ", 3, "segundos");

    abertoFechado.classList.add("appear");
    verificarClick(".aberto-fechado", local, reiniciarHorarios, "aberto-fechado", "buttonToSee");
}

buttonAbertoFechado.addEventListener("click", () => {
    verifyInputsStandart();
    const BUTTON_NAME = "aberto-fechado"

    if(passed === 1) {
        configs["buttonToSee"] = BUTTON_NAME;
        doPositionsPopup(buttonAbertoFechado.id, BUTTON_NAME);

        verificarClick(".resultados", `#${buttonAbertoFechado.id}`, undefined, "aberto-fechado", "buttonToSee");
    }
})

botao_positions.addEventListener("click", () => {
    verifyInputsPositions();

    if(passed === 1) {
        if(configs["buttonToSee"] === "aberto-fechado") {
            baseSimplesAbertoFechado(`#${botao_positions.id}`);
        }
    
        if(configs["buttonToSee"] === "chegada") {
            tratData(`#${botao_positions.id}`);
        }
    }
})

const botao_chegada_semaforos = document.querySelector(".send-positions-aberto-fechado");
botao_chegada_semaforos.addEventListener("click", () => {
    configs["buttonToSee"] = "chegada";
    tratData(`#${botao_chegada_semaforos.id}`);
    abertoFechado.classList.remove("appear");
})

const sendPositionsFromResultados = document.querySelector("#send-positions-from-resultados");
sendPositionsFromResultados.addEventListener("click", () => {
    configs["buttonToSee"] = "aberto-fechado";
    baseSimplesAbertoFechado(`#${sendPositionsFromResultados.id}`);
    resultados.classList.remove("appear");
})