const botao_dados_base = document.querySelector("#send-base");
const botao_positions = document.querySelector("#send-positions");

function toNumber(valor) {
    let number = valor.replace(',', '.');
    return parseFloat(number);
}

let passed = [];
function verifyInputsStandart() {
    passed = [];
    passed[0] = verify({
        "o valor não pode ser negativo": (value => toNumber(value)<0)
    }, ["#tempo-de-abertura", "#tempo-de-fechado", "#quant-sinal", "#tempo-inicial"], ["tempo de abertura", "tempo com o sinal fechado", "quantidade de sinais", "tempo inicial"])

    passed[1] = verify({
        "o valor não pode ser vázio ou conter caracteres não numericos": (value => isNaN(toNumber(value)))
    }, ["#tempo-de-abertura", "#tempo-de-fechado", "#quant-sinal", "#velocity", "#posicao-inicial", "tempo-inicial"], ["tempo de Abertura", "tempo com o sinal fechado", "quantidade de sinais", "velocidade", "posição inicial", "tempo inicial"]);    

    passed[2] = verify({
        "o valor não pode ser 0": (value => toNumber(value)===0)
    }, ["#quant-sinal", "#velocity"], ["quantidade de sinais", "velocidade"]);

    for(let i = 0; i < passed.length; i++) {
        if(passed[i]===0) {
            passed =0;
            break;
        }
    }

    if(passed !== 0) {
        passed = 1;
    }
}

function verifyInputsPositions() {
    passed = 1; 
    const inputsPoses = document.querySelectorAll(".input-positions");

    let ids = []
    let names = []

    for(let i = 0; i < inputsPoses.length; i++) {
        ids.push(`#${inputsPoses[i].id}`);
        names.push("input da posição " + (i+1));
    }

    let passed_this = verify({
        "o valor não pode ser vázio ou conter caracteres não numericos": (value => isNaN(toNumber(value)))
    }, ids, names);

    if(passed_this === 0 || passed === 0) {
        passed = 0;
    } 
}