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

    return positions.sort(); 
}



botao_positions.addEventListener("click", () => {
    const valores = {
        velocity: (new Velocity(toNumber(document.getElementById("velocity").value), document.querySelector('#velocidade-grandeza').value)).mbys,
        time: (new Time(toNumber(document.getElementById("tempo-de-abertura").value), document.getElementById("tempo-de-abertura-grandeza").value)).seconds,
        s_0: (new Space(toNumber(document.getElementById("posicao-inicial").value), document.getElementById("posicao-inicial-grandeza").value)).metros,
        t_0: (new Time(toNumber(document.getElementById("tempo-inicial").value), document.getElementById("tempo-inicial-grandeza").value)).seconds,
        positions: doThePositions(document.querySelectorAll(".input-positions"), document.querySelectorAll(".posicoes-grandeza"), "metros")
    }

    let times = calcMultiplePositions(valores.positions, valores.s_0, 1, valores.velocity);

    
})