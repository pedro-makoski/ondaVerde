class Velocity {
    constructor(value, unidadeDeMedida) {
        if(unidadeDeMedida.toLowerCase() === 'm/s') {
            this.mbys = value;
            this.kmbyh = value*3.6;
        }
        
        if(unidadeDeMedida.toLowerCase() === 'km/h') {
            this.kmbyh = value;
            this.mbys = value/3.6; 
        }
    }
}

class Time {
    constructor(value, unidadeDeMedida) {
        if(unidadeDeMedida.toLowerCase() === 'segundos') {
            this.seconds = value; 
            this.minutos = value/60; 
            this.hours = value/3600; 
        }

        if(unidadeDeMedida.toLowerCase() === 'minutos') {
            this.seconds = value*60; 
            this.minutos = value;
            this.hours = value/60;
        }

        if(unidadeDeMedida.toLowerCase() === 'horas') {
            this.seconds = value*3600; 
            this.minutos = value*60;
            this.hours = value; 
        }
    }
}

class Space {
    constructor(value, unidadeDeMedida) {
        if(unidadeDeMedida.toLowerCase() === 'metros') {
            this.metros = value;
            this.km = value/1000; 
        }

        if(unidadeDeMedida.toLowerCase() === 'kilometros') {
            this.metros = value*1000;
            this.km = value;
        }
    }
}