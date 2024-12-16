const botao_dados_base = document.querySelector("#send-base");
const botao_positions = document.querySelector("#send-positions")

function toNumber(valor) {
    let number = valor.replace(',', '.');
    return parseFloat(number);
}

let passed = [];
botao_dados_base.addEventListener('click', () => {
    passed = [];
    passed[0] = verify({
        "O valor não pode ser negativo": (value => toNumber(value)<0)
    }, ["#tempo-de-abertura", "#quant-sinal", "#tempo-inicial"], ["Tempo de Abertura", "Quantidade de sinais", "Tempo inicial"])

    passed[1] = verify({
        "O valor não pode ser vázio": (value => isNaN(toNumber(value)))
    }, ["#tempo-de-abertura", "#quant-sinal", "#velocity", "#posicao-inicial", "tempo-inicial"], ["Tempo de Abertura", "Quantidade de sinais", "velocidade", "posição inicial", "tempo inicial"]);    

    passed[2] = verify({
        "O valor não pode ser 0": (value => toNumber(value)===0)
    }, ["#quant-sinal", "#velocity"], ["Quantidade de sinais", "Velocidade"]);
});

botao_positions.addEventListener("click", () => {
    const inputsPoses = document.querySelectorAll(".input-positions");
    inputsPoses.forEach((inputPos) => {
        passed[3] = verify({
            "O valor não pode ser 0": (value => toNumber(value)===0)
        }, [inputPos.id], ["Posicao dos semaforos"]);
    })
})