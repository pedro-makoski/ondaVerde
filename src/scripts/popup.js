function verificarClick(elemento, buttonToAppear) {
    document.addEventListener("click", (e) => {
        if(!e.target.closest(elemento) && !e.target.closest(buttonToAppear)){
            document.querySelector(elemento).style.display="none";
        }
    })   
}

botao_dados_base.addEventListener("click", () => {
    if(passed===1) {
        const element = document.querySelector(".posicoes");
        const inputs_place = element.querySelector(".inputs");
        const quant_sinal = parseInt(document.getElementById("quant-sinal").value);

        const elementosInputs = new ElementosInputs('<div><label for="input-{value}">Diga a posicao, referente ao {value}º semáforo</label><div><input id="input-{value}" name="id="input-{value}"></input></div></div>', quant_sinal);

        inputs_place.innerHTML = elementosInputs.doRepeat("value");
        element.style.display = "block";
        verificarClick(".posicoes", `#${botao_dados_base.id}`);
    }
})