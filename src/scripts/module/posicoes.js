function replace(string, key, value) {
    let res = string;
    let original = string; 
    res = res.replace(key, value);
    if(original != res) {
        res = replace(res, key, value);
    }

    return res; 
}

class ElementosInputs {
    constructor(string) {
        this.string = string;
    }

    substituir(valores) {
        const values = Object.values(valores);
        const keys = Object.keys(valores);
        this.stringNew = "";
        for(let i = 0; i < values.length; i++) {
            this.stringNew = replace(this.string, `{${keys[i]}}`, values[i]);
        }

        return this.stringNew;
    }

    doRepeat(key, quant) {
        this.res = "";

        for(let i = 1; i <= quant; i++) {
            const object = {}
            object[key] = i; 
            this.res += this.substituir(object);
        }

        return this.res
    }

    doOnList(list, key) {
        this.res = "";

        for(let i = 0; i < list.length; i++) {
            const object = {}
            object[key] = list[i]; 
            this.res += this.substituir(object);
        }

        return this.res
    }
}