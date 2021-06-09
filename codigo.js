'use strict';

const contenedor = document.getElementById('contenedor');
const tablero = document.getElementById('tablero');
const pantallaInicio = document.getElementById('inicio')
const Modal = document.getElementById('modal-contenedor');



//  Botones de Dificultad  //
const btnFacil = document.getElementById('btn-facil');
const btnIntermedio = document.getElementById('btn-medio');
const btnDificil = document.getElementById('btn-dificil');

////////////////////////////////////////////////////////////

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

//////// Eventos de botones  ////////////
let movimientos = 0;
btnFacil.addEventListener('click', () => {
    movimientos = 26;
    pantallaInicio.innerHTML = '';
    pantallaInicio.classList.add('oculto');
    tablero.classList.remove('oculto');
    generarTablero(movimientos);
});

btnIntermedio.addEventListener('click', () => {
    movimientos = 22;
    pantallaInicio.innerHTML = '';
    pantallaInicio.classList.add('oculto');
    tablero.classList.remove('oculto');
    generarTablero(movimientos);
});

btnDificil.addEventListener('click', () => {
    movimientos = 18;
    //  pantallaInicio.innerHTML = '';
    pantallaInicio.classList.add('oculto');
    tablero.classList.remove('oculto');
    generarTablero(movimientos);
});










///////////////////////////////////////////////////////////

function generarTablero(mov) {

    let totalFichas = 12;
    Fichas.sort(() => (0.5 - Math.random()));
    let primeraEleccion = 0;
    let primerMov = false;
    let segundaEleccion = 0;
    let contadorMovimientos = 1;
    let parejasIguales = 0;

    tablero.innerHTML = `
    <header class="resultado">
        <h4 id="resultado"></h4>
        <button class="oculto" id="play">Play Again</button>
    </header>
    `
    const resultado = document.getElementById('resultado');
    const btnPlay = document.getElementById('play');
    tablero.appendChild(contenedor);
    for (let i = 1; i <= totalFichas; i++) {
        const ficha = document.createElement('div');

        ficha.classList.add('gris')
        contenedor.appendChild(ficha);

        ficha.addEventListener('click', () => {
            if (contadorMovimientos == mov) {
                resultado.innerText = '';
                movimientos = 0;
                gameOver();
            }
            // contadorMovimientos++;
            ficha.classList.remove('gris');
            ficha.classList.add(Fichas[i - 1].color);
            ficha.classList.add('seleccionado')

            resultado.innerText = contadorMovimientos;

            if (primerMov == false) {
                primeraEleccion = Fichas[i - 1].id;
                console.log('Primera Elección ' + primeraEleccion);
                primerMov = true;
            } else if (primerMov) {
                segundaEleccion = Fichas[i - 1].id;
                console.log('Segunda Elección: ' + segundaEleccion);
                primerMov = compararElecciones(primeraEleccion, segundaEleccion);
                contadorMovimientos++;
                if (primerMov) {
                    ficha.classList.remove('seleccionado')
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
                        console.log(parejasIguales);
                    }
                } else if (fichasIguales) {
                    console.log('No puedes clickear la misma ficha')
                }


            }



        })
    }
}


function compararElecciones(uno, dos) {
    if (uno == dos) {
        console.log('Pareja Correcta')
        return false
    } else {
        console.log('Equivocado');
        return true;
    }

}

function gameOver() {
    console.log('abrir modal');
    Modal.classList.add('on')
    const btnModal = document.getElementById('btn-modal');
    btnModal.addEventListener('click', () => {
        contenedor.innerHTML = '';
        tablero.innerHTML = '';
        tablero.classList.add('oculto');
        Modal.classList.remove('on');
        pantallaInicio.classList.remove('oculto');
        generarTablero(contadorMovimientos);

    })
}