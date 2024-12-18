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

function mesclarInString(list1, list2, intercalation, end, doMoreOneThing) {
    let res = []

    for(let i = 0; i < list1.length; i++) {
        res.push(`${list1[i]}${intercalation}${list2[i]}${end}`);
        if(doMoreOneThing !== undefined) {
            doMoreOneThing(list1, list2, i, res);
        }
    }

    return res; 
}

const resultados = document.querySelector(".resultados")

let valores; 

botao_positions.addEventListener("click", () => {
    if(passed === 1) {
        valores = {
            velocity: (new Velocity(toNumber(document.getElementById("velocity").value), document.querySelector('#velocidade-grandeza').value)).mbys,
            timeOpen: (new Time(toNumber(document.getElementById("tempo-de-abertura").value), document.getElementById("tempo-de-abertura-grandeza").value)).seconds,
            s_0: (new Space(toNumber(document.getElementById("posicao-inicial").value), document.getElementById("posicao-inicial-grandeza").value)).metros,
            t_0: (new Time(toNumber(document.getElementById("tempo-inicial").value), document.getElementById("tempo-inicial-grandeza").value)).seconds,
            timeClosed: (new Time(toNumber(document.getElementById("tempo-de-fechado").value), document.getElementById("tempo-de-fechado-grandeza").value)).seconds
            
        }

        valores["positions"] = doThePositions(document.querySelectorAll(".input-positions"), document.querySelectorAll(".posicoes-grandeza"), "metros", valores.velocity)

    
        let times = calcMultiplePositions(valores.positions, valores.s_0, 0, valores.velocity, valores.t_0);
        let timesDiference = calcMultiplePositions(valores.positions, valores.s_0, 1, valores.velocity, valores.t_0);

        const trajetoPlace = document.querySelector(".trajeto");
        const temposDiferenciaisPlace = document.querySelector(".tempos-diferenciais");
        const timeText = trajetoPlace.querySelector(".time");
        const paragrafoAteSemaoforo = document.querySelector(".ate-semaforo");

        let timesText = mesclarInString(times, valores.positions, ' segundo(s): ', ' metro(s)', (timeList, positionlist, idx, resList) => {
            if(timeList[idx] < 0) {
                resList[idx] = `O carro não passara nesse semáforo, posição dele: ${positionlist[idx]} metro(s)`;
            }
        });
        timeText.innerHTML = timesText[0];
    
        const timeStamps = new ElementosInputs('<div class="traco"></div><div class="time-point"><div class="bullet-point"></div><p class="time">{value}</p></div>');
        const timesDiferences = new ElementosInputs('<p class="diferenca-tempo">{value} segundo(s)</p></div>')
        
        paragrafoAteSemaoforo.innerHTML = `Para chegar ao primeiro semáforo da posição inicial demorou ${timesDiference[0]} segundo(s).`
        trajetoPlace.innerHTML += timeStamps.doOnList(timesText.slice(1, timesText.length), "value");
        temposDiferenciaisPlace.innerHTML += timesDiferences.doOnList(timesDiference.slice(1, timesDiference.length), "value")
    
        resultados.classList.add("appear")
        popupPositions.classList.remove("appear");
        verificarClick(".resultados", `#${botao_positions.id}`, () => {
            trajetoPlace.innerHTML = '<div class="time-point"><div class="bullet-point"></div><p class="time"></p></div>';
            temposDiferenciaisPlace.innerHTML = "";
        });

        const aberturasFechaduras = new AberturasEFechaduras(valores.timeOpen, times, valores.positions, valores.timeClosed);
        console.log(aberturasFechaduras.registrarTempoPensandoNosDoisLadosComCarrosDeMesmaVelocidade(10, valores.t_0, valores.s_0, valores.velocity));
        console.log(aberturasFechaduras.registrarTempoPadrao(10, valores.t_0));
    }
})