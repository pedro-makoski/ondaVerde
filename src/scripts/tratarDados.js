function doThePositions(valores, grandezas, preferredGrandeza) {
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

    return positions.sort((value1, value2) => value1-value2); 
}

function mesclarInString(list1, list2, intercalation, end) {
    let res = []

    for(let i = 0; i < list1.length; i++) {
        res.push(`${list1[i]}${intercalation}${list2[i]}${end}`);
    }

    return res; 
}

const resultados = document.querySelector(".resultados")

botao_positions.addEventListener("click", () => {
    if(passed === 1) {
        const valores = {
            velocity: (new Velocity(toNumber(document.getElementById("velocity").value), document.querySelector('#velocidade-grandeza').value)).mbys,
            time: (new Time(toNumber(document.getElementById("tempo-de-abertura").value), document.getElementById("tempo-de-abertura-grandeza").value)).seconds,
            s_0: (new Space(toNumber(document.getElementById("posicao-inicial").value), document.getElementById("posicao-inicial-grandeza").value)).metros,
            t_0: (new Time(toNumber(document.getElementById("tempo-inicial").value), document.getElementById("tempo-inicial-grandeza").value)).seconds,
            positions: doThePositions(document.querySelectorAll(".input-positions"), document.querySelectorAll(".posicoes-grandeza"), "metros")
        }

        console.log(valores);
    
        let times = calcMultiplePositions(valores.positions, valores.s_0, 0, valores.velocity);
        let timesDiference = calcMultiplePositions(valores.positions, valores.s_0, 1, valores.velocity);
        const trajetoPlace = document.querySelector(".trajeto");
        const temposDiferenciaisPlace = document.querySelector(".tempos-diferenciais");
        const timeText = trajetoPlace.querySelector(".time");
        times = mesclarInString(times, valores.positions, ' segundo(s): ', ' metro(s)');
        timeText.innerHTML = times[0];
    
        const timeStamps = new ElementosInputs('<div class="traco"></div><div class="time-point"><div class="bullet-point"></div><p class="time">{value}</p></div>');
        const timesDiferences = new ElementosInputs('<div class="time-point-distance"><div class="traco-info"></div><p class="diferenca-tempo">{value} segundos</p></div>')
    
        trajetoPlace.innerHTML += timeStamps.doOnList(times.slice(1, times.length), "value");
        temposDiferenciaisPlace.innerHTML += timesDiferences.doOnList(timesDiference.slice(1, timesDiference.length), "value")
    
        resultados.classList.add("appear")
        popupPositions.classList.remove("appear");
        verificarClick(".resultados", `#${botao_positions.id}`, () => {
            trajetoPlace.innerHTML = '<div class="trajeto"><div class="time-point"><div class="bullet-point"></div><p class="time"></p></div></div>';
            temposDiferenciaisPlace.innerHTML = "";
        });
    }
})