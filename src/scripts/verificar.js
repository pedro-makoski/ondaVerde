const botao_dados_base = document.querySelector("#send-base");

let passed = 0;
botao_dados_base.addEventListener('click', () => {
    passed = verify({
        "O valor não pode ser negativo": (value => parseInt(value)<0)
    }, ["#tempo-de-abertura", "#quant-sinal"], ["Tempo de Abertura", "Quantidade de sinais"])

    passed = verify({
        "O valor não pode ser vázio": (value => isNaN(parseInt(value)))
    }, ["#tempo-de-abertura", "#quant-sinal", "#velocity", "#posicao-inicial"], ["Tempo de Abertura", "Quantidade de sinais", "velocidade", "posição inicial"]);    

    passed = verify({
        "O valor não pode ser 0": (value => parseInt(value)==0)
    }, ["#quant-sinal"], ["Quantidade de sinais"]);    
});

