class MRU {
    constructor(velocity, inicialPosition) {
        this.velocity = velocity;
        this.inicialPosition = inicialPosition; 
    }

    calcPosition(time) {
        return(this.inicialPosition+(this.velocity*time));
    }

    calcTime(position) {
        return((position-this.inicialPosition)/this.velocity);
    }
}

// referencial - 0 - posição inicial
// referencial - 1 - posicao anterior
function calcMultiplePositions(valores, posicaoInicial, referencial, velocidade) {
    let res = []

    if(referencial === 0) {
        for(let i = 0; i < valores.length; i++) {
            const mru = new MRU(velocidade, posicaoInicial);
            res.push(mru.calcTime(valores[i]));
        }
    }

    if(referencial === 1) {
        let posAnterior = posicaoInicial;
        for(let i = 0; i < valores.length; i++) {
            const mru = new MRU(velocidade, posAnterior);
            res.push(mru.calcTime(valores[i]));
            posAnterior = valores[i]; 
        }
    }

    return res; 
}