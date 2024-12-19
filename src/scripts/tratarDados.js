const trajetoPlace = document.querySelector(".trajeto");
const temposDiferenciaisPlace = document.querySelector(".tempos-diferenciais");

function reiniciarPath() {
    trajetoPlace.innerHTML = '<div class="time-point"><div class="bullet-point"></div><p class="time"></p></div>';
    temposDiferenciaisPlace.innerHTML = "";
}

function doThePositions(valores, grandezas, preferredGrandeza, velocidade) {
    let positions = []

    for(let i = 0; i < valores.length; i++) {
        let value = toNumber(valores[i].value);
        let grandeza = grandezas[i].value;
        
        let preferredValue = new Space(value, grandeza)
        if(preferredGrandeza === 'metros') {
            preferredValue = preferredValue.metros;
        } 

        if(preferredGrandeza === 'kilometros') {
            preferredValue = preferredGrandeza.km;
        }

        if(!positions.includes(preferredValue)) {
            positions.push(preferredValue);
        }
    }

    if(velocidade > 0) {
        return positions.sort((value1, value2) => value1-value2); 
    } else {
        return positions.sort((value1, value2) => value2-value1);
    }
}

function mesclarInString(list1, list2, intercalation, end, start, doMoreOneThing, putIndexText) {
    let res = []

    for(let i = 0; i < list1.length; i++) {
        res.push(`${start}${list1[i]}${intercalation}${list2[i]}${end}${putIndexText!==undefined ? putIndexText + (i+1) :''}`);
        if(doMoreOneThing !== undefined) {
            doMoreOneThing(list1, list2, i, res);
        }
    }

    return res; 
}

let valores; 

function obterDadosTratados() {
    valores = {
        velocity: (new Velocity(toNumber(document.getElementById("velocity").value), document.querySelector('#velocidade-grandeza').value)).mbys,
        timeOpen: (new Time(toNumber(document.getElementById("tempo-de-abertura").value), document.getElementById("tempo-de-abertura-grandeza").value)).seconds,
        s_0: (new Space(toNumber(document.getElementById("posicao-inicial").value), document.getElementById("posicao-inicial-grandeza").value)).metros,
        t_0: (new Time(toNumber(document.getElementById("tempo-inicial").value), document.getElementById("tempo-inicial-grandeza").value)).seconds,
        timeClosed: (new Time(toNumber(document.getElementById("tempo-de-fechado").value), document.getElementById("tempo-de-fechado-grandeza").value)).seconds
    }

    valores["positions"] = doThePositions(document.querySelectorAll(".input-positions"), document.querySelectorAll(".posicoes-grandeza"), "metros", valores.velocity);

    let times = calcMultiplePositions(valores.positions, valores.s_0, 0, valores.velocity, valores.t_0);
    let timesDiference = calcMultiplePositions(valores.positions, valores.s_0, 1, valores.velocity, valores.t_0);

    return [times, timesDiference];
}

const resultados = document.querySelector(".resultados");

function tratData(local) {
    if(passed === 1) {
        let [times, timesDiference] = obterDadosTratados();
    
        let timesText = mesclarInString(times, valores.positions, ' segundo(s) a posição do carro vai ser de: ', ' metro(s)', 'Em ', (timeList, positionlist, idx, resList) => {
            if(timeList[idx] < 0) {
                resList[idx] = `O carro não passara nesse semáforo, posição do semaforo: ${positionlist[idx]} metro(s)`;
            }
        }, " onde está o semaforo ");

        reiniciarPath();

        const timeText = trajetoPlace.querySelector(".time");
        const paragrafoAteSemaoforo = document.querySelector(".ate-semaforo");

        timeText.innerHTML = timesText[0];
    
        const timeStamps = new ElementosInputs('<div class="traco"></div><div class="time-point"><div class="bullet-point"></div><p class="time">{value}</p></div>');
        const timesDiferences = new ElementosInputs('<p class="diferenca-tempo">{value} segundo(s)</p></div>')

        paragrafoAteSemaoforo.innerHTML = `Para chegar ao primeiro semáforo da posição inicial demorou ${timesDiference[0]} segundo(s).`
        trajetoPlace.innerHTML += timeStamps.doOnList(timesText.slice(1, timesText.length), "value");
        temposDiferenciaisPlace.innerHTML += timesDiferences.doOnList(timesDiference.slice(1, timesDiference.length), "value")
    
        resultados.classList.add("appear");
        popupPositions.classList.remove("appear");
        verificarClick(".resultados", local, reiniciarPath, "chegada", "buttonToSee");
    }
}

botao_dados_base.addEventListener("click", () => {
    verifyInputsStandart();
    const BUTTON_NAME = "chegada";

    if(passed === 1) {
        configs["buttonToSee"] = BUTTON_NAME;
        doPositionsPopup(botao_dados_base.id, BUTTON_NAME);
    }
});