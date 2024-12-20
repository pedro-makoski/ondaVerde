const buttonAbertoFechado = document.querySelector("#send-base-to-horarios-de-abertura-e-de-fechado")
const abertoFechado = document.querySelector(".aberto-fechado");
const placeAF = document.querySelector(".sinaleiro-abre-e-fecha")

function reiniciarHorarios() {
    placeAF.innerHTML = '';    
}


function baseSimplesAbertoFechado(local) {
    const [times, timesDiference] = obterDadosTratados();
    const aberturasEFechaduras = new AberturasEFechaduras(valores.timeOpen, times, valores.positions, valores.timeClosed);
    const inputResolution = document.querySelector("#resolution");
    
    reiniciarHorarios();
    placeAF.innerHTML = aberturasEFechaduras.formatarRegistrarTempoPadrao(toNumber(inputResolution.value), "sinaleiro", "Sinaleiro ", 3, valores.t_0);
    
    const resolution = document.getElementById("resolution");
    resolution.oninput = () => {
        let value = toNumber(inputResolution.value); 
        if(value > 50) {
            value = 50; 
            inputResolution.value = 50; 
            window.alert("valor muito alto, por favor insira um valor menor");
        }
        placeAF.innerHTML = aberturasEFechaduras.formatarRegistrarTempoPadrao(value, "sinaleiro", "Sinaleiro ", 3);
    }

    abertoFechado.classList.add("appear");
    popupPositions.classList.remove("appear");
    verificarClick(".aberto-fechado", local, reiniciarHorarios, "aberto-fechado", "buttonToSee");
}

buttonAbertoFechado.addEventListener("click", () => {
    verifyInputsStandart();
    const BUTTON_NAME = "aberto-fechado"

    if(passed === 1) {
        configs["buttonToSee"] = BUTTON_NAME;
        doPositionsPopup(buttonAbertoFechado.id, BUTTON_NAME);
    }
})

const sendPositionsFromResultados = document.querySelector("#send-positions-from-resultados");
const botao_chegada_semaforos = document.querySelector(".send-positions-aberto-fechado");

botao_positions.addEventListener("click", () => {
    verifyInputsPositions();

    if(passed === 1) {
        if(configs["buttonToSee"] === "aberto-fechado") {
            baseSimplesAbertoFechado([`#${botao_positions.id}`, `#${sendPositionsFromResultados.id}`]);
        }
    
        if(configs["buttonToSee"] === "chegada") {
            tratData([`#${botao_positions.id}`, `#${botao_chegada_semaforos.id}`]);
        }
    }
})

botao_chegada_semaforos.addEventListener("click", () => {
    configs["buttonToSee"] = "chegada";
    tratData([`#${botao_chegada_semaforos.id}`, `#${botao_positions.id}`]);
    abertoFechado.classList.remove("appear");
})

sendPositionsFromResultados.addEventListener("click", () => {
    configs["buttonToSee"] = "aberto-fechado";
    baseSimplesAbertoFechado([`#${sendPositionsFromResultados.id}`, `#${botao_positions.id}`]);
    resultados.classList.remove("appear");
})