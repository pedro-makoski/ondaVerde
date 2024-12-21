function reverseTimeStamps(positions, posicaoInicial, velocidade, referencial, tempo_inicial) {
    let InicialPosition = (positions[0]-posicaoInicial)+positions[positions.length-1];
    let velocity = -1*velocidade;
    let timeStamps = [];
    timeStamps = calcMultiplePositions(positions, InicialPosition, referencial, velocity, tempo_inicial);
    return timeStamps; 
}

function timeFormatationsFromSeconds(seconds) {
    let segundos;
    let minutos;
    let horas; 
    let aux; 

    segundos = seconds%60;
    aux = seconds/60|0; 
    minutos = aux%60;
    horas = aux/60|0; 

    segundos = segundos.toString().padStart(2, '0');
    minutos = minutos.toString().padStart(2, '0');
    horas = horas.toString().padStart(2, '0');

    return `${horas}:${minutos}:${segundos}`
}

class AberturasEFechaduras {
    constructor(tempoAbrir, temposDeChegada, positions, tempoFechar) {
        this.tempoAbrir = tempoAbrir;
        this.tempoFechar = tempoFechar;
        this.temposDeChegada = temposDeChegada;
        this.positions = positions;
        this.tempoDeCiclo = this.tempoAbrir+this.tempoFechar;
    }

    registrarTempoPadrao(quant) {
        let res = {};

        for(let i = 0; i < this.positions.length; i++) {
            let aberturas = [];
            let horariosDeFechar = [];

            let abreEm = this.temposDeChegada[i];
            
            if(abreEm > this.tempoDeCiclo) {
                abreEm = this.temposDeChegada[i]-(this.tempoDeCiclo*((this.temposDeChegada[i]/this.tempoDeCiclo)|0));
            }

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

    formatarRegistrarTempoPadrao(quant, className, headingStart, headingLevel) {
        let resultadoRegistroObjeto = this.registrarTempoPadrao(quant);
        let res = "";
        res+=`O tempo de ciclo do carro é de ${timeFormatationsFromSeconds(this.tempoDeCiclo)}`;
        for(let i = 0; i < this.positions.length; i++) {
            res+=`<div class="${className}">`;
            res+=`<h${headingLevel}>${headingStart} ${i+1}</h${headingLevel}>`;
            for(let j = 0; j < quant; j++) {
                res+=`<p>Abre em: ${timeFormatationsFromSeconds(resultadoRegistroObjeto[this.positions[i]]["aberto"][j])}</p><p>Fecha em: ${timeFormatationsFromSeconds(resultadoRegistroObjeto[this.positions[i]]["fechado"][j])}</p>`;
            }

            res+="</div>";
        }

        return res; 
    }

    verificarDoOutroLado(posicaoInicial, velocidade, t0) {
        let pegouFechado = {};
        let reverseTemposDeChegada = reverseTimeStamps(this.positions, posicaoInicial, velocidade, 0, t0);

        for(let i = 0; i < this.temposDeChegada.length; i++) {
            let abertoCarroIda = this.temposDeChegada[i];
            
            if(abertoCarroIda > this.tempoDeCiclo) {
                abertoCarroIda = this.temposDeChegada[i]-(this.tempoDeCiclo*((this.temposDeChegada[i]/this.tempoDeCiclo)|0));
            }

            let abertoCarroVolta = reverseTemposDeChegada[i];
            
            if(abertoCarroVolta > this.tempoDeCiclo) {
                abertoCarroVolta = reverseTemposDeChegada[i]-(this.tempoDeCiclo*((reverseTemposDeChegada[i]/this.tempoDeCiclo)|0));
            }

            if(abertoCarroIda > abertoCarroVolta) {
                pegouFechado[this.positions[i]] = i+1;
            }
        }

        return pegouFechado;
    }

    verificarDoOutroLadoString(posicaoInicial, velocidade, t0) {
        let object = this.verificarDoOutroLado(posicaoInicial, velocidade, t0);
        const keys = Object.keys(object);
        const values = Object.values(object);
        let res = "";
        const elementos_unidirecionais = []

        if(keys.length > 0) {
            res+="A onda verde é unidirecional ela dá problemas nos semaforos: ";
        } else {
            return "O sistema funciona para ambos os lados"
        }

        for(let i = 0; i < keys.length; i++) {
            elementos_unidirecionais.push(`${values[i]} da posição ${keys[i]} metros`);
        }

        res+=enumerate(elementos_unidirecionais);

        return res; 
    }
}