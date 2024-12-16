function verificarClick(elemento, buttonToAppear) {
    document.addEventListener("click", (e) => {
        if(!e.target.closest(elemento) && !e.target.closest(buttonToAppear)){
            document.querySelector(elemento).classList.remove("appear");
        }
    })   
}

botao_dados_base.addEventListener("click", () => {
    for(let i = 0; i < passed.length; i++) {
        if(passed[i]===0) {
            passed =0;
            break;
        }
    }

    if(passed !== 0) {
        passed = 1;
    }

    if(passed === 1) {
        const element = document.querySelector(".posicoes");
        const inputs_place = element.querySelector(".inputs");
        const quant_sinal = toNumber(document.getElementById("quant-sinal").value);

        const elementosInputs = new ElementosInputs('<div><label for="input-{value}">Diga a posicao, referente ao {value}º semáforo</label><div><input id="input-{value}" name="id="input-{value}" class="input-positions"></input><select name="posicao-grandeza-{value}" id="posicao-grandeza-{value}" class="posicoes-grandeza"><option value="metros">Metros</option><option value="kilometros">kilometros</option></select></div></div>', quant_sinal);

        inputs_place.innerHTML = elementosInputs.doRepeat("value");
        element.classList.add("appear")
        verificarClick(".posicoes", `#${botao_dados_base.id}`);
    }
})