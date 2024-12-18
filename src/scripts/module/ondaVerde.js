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

    registrarTempoPadrao(quant, tempoInicial) {
        let res = {};

        for(let i = 0; i < this.positions.length; i++) {
            let aberturas = [];
            let horariosDeFechar = [];

            let abreEm = this.temposDeChegada[i];
            for(let j = 0; j < quant; j++) {   
                aberturas.push(abreEm);
                let fechaEm = abreEm+this.tempoAbrir
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

    registrarTempoPensandoNosDoisLadosComCarrosDeMesmaVelocidade(quant, tempoInicial, posicaoInicial, velocidade){

    }
}