function enumerate(lista) {
    let string = "";
    const length = lista.length;
    for(let i = 0; i < length; i++) {
        string+=lista[i];
        if(i==length-2) {
            string+=" e "
            continue;
        }

        if(i<length-2) {
            string+=", "
        }
    }

    return string;
}

function verify(object, selections, names) {
    try {
        const errados  = []
        const mensagens = []
        const keys = Object.keys(object)
        const values = Object.values(object)

        for(let i = 0; i < keys.length; i++) {
            for(let j = 0; j < selections.length; j++) {
                if(values[i](document.querySelector(selections[j]).value)) {
                    errados.push(names[j]);
                    if(!mensagens.includes(keys[i])) {
                        mensagens.push(keys[i]);
                    }
                }
            }
        }

        if(errados.length>0) {
            console.log(mensagens);
            window.alert(`Problema no(s) input(s) sobre ${enumerate(errados)}, ${enumerate(mensagens)}`);
            return 0; 
        } else {
            return 1;
        }
    } catch(e) {
        console.log(e);
    }
}