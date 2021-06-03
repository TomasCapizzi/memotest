'use strict';

const contenedor = document.getElementById('contenedor');
const resultado = document.getElementById('resultado');
const btnPlay = document.getElementById('play')

const Fichas = [{
    id: 1,
    color: 'rojo',
}, {
    id: 1,
    color: 'rojo',
}, {
    id: 2,
    color: 'amarillo',
}, {
    id: 2,
    color: 'amarillo',
}, {
    id: 3,
    color: 'verde',
}, {
    id: 3,
    color: 'verde',
}, {
    id: 4,
    color: 'celeste',
}, {
    id: 4,
    color: 'celeste',
}, {
    id: 5,
    color: 'azul',
}, {
    id: 5,
    color: 'azul',
}, {
    id: 6,
    color: 'rosa',
}, {
    id: 6,
    color: 'rosa',
}];



function generarTablero() {

    let totalFichas = 12;
    Fichas.sort(() => (0.5 - Math.random()));
    let primeraEleccion = 0;
    let primerMov = false;
    let segundaEleccion = 0;
    let contadorMovimientos = 0;
    let parejasIguales = 0;

    for (let i = 1; i <= totalFichas; i++) {
        const ficha = document.createElement('div');

        ficha.classList.add('gris')
        contenedor.appendChild(ficha);

        ficha.addEventListener('click', () => {
            contadorMovimientos++;
            ficha.classList.remove('gris');
            ficha.classList.add(Fichas[i - 1].color);

            resultado.innerText = contadorMovimientos;



            if (primerMov == false) {
                primeraEleccion = Fichas[i - 1].id;
                console.log('Primera Elección ' + primeraEleccion);
                primerMov = true;
            } else if (primerMov) {
                segundaEleccion = Fichas[i - 1].id;
                console.log('Segunda Elección: ' + segundaEleccion);
                primerMov = compararElecciones(primeraEleccion, segundaEleccion);
                if (primerMov) {
                    setTimeout(() => {
                        ficha.classList.add('gris');
                        ficha.classList.remove(Fichas[i - 1].color);
                    }, 500);
                } else if (primerMov == false) {
                    if (parejasIguales == 5) {
                        console.log('Has ganado');
                        btnPlay.classList.remove('oculto')
                        resultado.innerText = 'Has ganado con un total de ' + contadorMovimientos + ' movimientos';

                        btnPlay.addEventListener('click', () => {
                            contenedor.innerHTML = '';
                            resultado.innerText = '';
                            btnPlay.classList.add('oculto');
                            generarTablero();
                        })

                    } else {
                        parejasIguales++;
                        console.log(parejasIguales)
                    }
                }
                //primerMov = false;
            }



        })
    }
}

generarTablero();

function compararElecciones(uno, dos) {
    if (uno == dos) {
        console.log('Son Iguales')
        return false
    } else {
        console.log('Equivocado');
        return true;
    }

}