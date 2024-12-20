const configs = {}

function verificarClick(elemento, buttonsToAppear, doMoreThings, actualButton, idx) {
    let finalizar = false;
    const element = document.querySelector(elemento);
    if(configs[idx] === actualButton) {
        document.addEventListener("click", (e) => {
            if(!e.target.closest(elemento) && configs[idx] === actualButton){
                let allButtonsPassed = true;
                for(let i = 0; i < buttonsToAppear.length; i++) {
                    let closest = e.target.closest(buttonsToAppear[i]);
                    allButtonsPassed = allButtonsPassed && !closest; 
                }

                if(allButtonsPassed) {
                    element.classList.remove("appear");
                    if(doMoreThings !== undefined) {
                        doMoreThings();
                    }
                    finalizar = true;
                    return;
                } 
            }
        })  
    }
}

const popupPositions = document.querySelector(".posicoes");

function doPositionsPopup(buttonStart, buttonName) {
    const inputs_place = popupPositions.querySelector(".inputs");
    const quant_sinal = toNumber(document.getElementById("quant-sinal").value);

    const elementosInputs = new ElementosInputs('<div><label for="input-{value}">Diga a posicao, referente ao {value}º semáforo</label><div><input id="input-{value}" name="input-{value}" class="input-positions"></input><select name="posicao-grandeza-{value}" id="posicao-grandeza-{value}" class="posicoes-grandeza" autocomplete="off"><option value="metros">Metros</option><option value="kilometros">kilometros</option></select></div></div>');

    inputs_place.innerHTML = elementosInputs.doRepeat("value", quant_sinal);
    popupPositions.classList.add("appear");
    verificarClick(".posicoes", [`#${buttonStart}`, `#${botao_positions.id}`], undefined, buttonName, "buttonToSee");
}

