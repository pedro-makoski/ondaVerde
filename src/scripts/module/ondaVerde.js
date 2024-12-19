function reverseTimeStamps(positions, posicaoInicial, velocidade, referencial, tempo_inicial) {
    let InicialPosition = (positions[0]-posicaoInicial)+positions[positions.length-1];
    let velocity = -1*velocidade;
    let timeStamps = [];
    timeStamps = calcMultiplePositions(positions, InicialPosition, referencial, velocity, tempo_inicial);
    return timeStamps; 
}

class AberturasEFechaduras {
    constructor(tempoAbrir, temposDeChegada, positions, tempoFechar) {
        this.tempoAbrir = tempoAbrir;
        this.tempoFechar = tempoFechar;
        this.temposDeChegada = temposDeChegada;
        this.positions = positions
    }

    registrarTempoPadrao(quant) {
        let res = {};

        for(let i = 0; i < this.positions.length; i++) {
            let aberturas = [];
            let horariosDeFechar = [];

            let abreEm = this.temposDeChegada[i];
            for(let j = 0; j < quant; j++) {   
                aberturas.push(abreEm);
                let fechaEm = abreEm+this.tempoAbrir;
                horariosDeFechar.push(fechaEm);
                abreEm = fechaEm+this.tempoFechar;
            }

            res[this.positions[i]] = {
                aberto: aberturas,
                fechado: horariosDeFechar
            }
        }

        return res; 
    }

    formatarRegistrarTempoPadrao(quant, className, headingStart, headingLevel, unidades) {
        let resultadoRegistroObjeto = this.registrarTempoPadrao(quant);
        let res = "";
        for(let i = 0; i < this.positions.length; i++) {
            res+=`<div class="${className}">`;
            res+=`<h${headingLevel}>${headingStart} ${i+1}</h${headingLevel}>`;
            for(let j = 0; j < quant; j++) {
                res+=`<p>Abre em: ${resultadoRegistroObjeto[this.positions[i]]["aberto"][j]} ${unidades}</p><p>Fecha em: ${resultadoRegistroObjeto[this.positions[i]]["fechado"][j]} ${unidades}</p>`;
            }

            res+="</div>";
        }

        return res; 
    }
}