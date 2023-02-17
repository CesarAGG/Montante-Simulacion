// this class solves a matriz of the form Ax = b using the montante method
// it is assumed that the matriz is already in reduced row echelon form
import { Matriz } from './Matriz';

export class Montante {
    constructor(
        public matriz: Matriz,
    ) {
        this.matriz = new Matriz(...matriz); // esto arregla un error de perdida de tipo
        if (this.matriz.tipo !== 0 && matriz.tipo !== 1) throw new Error('La matriz debe ser de tamaño m x m+1 o m x m*2');
    }

    * resolver() {
        const matriz = new Matriz(...this.matriz.map(row => [...row]));
        let prevMatriz = JSON.parse(JSON.stringify(matriz));
        yield [matriz, -1, -1, "Matriz extendida", null, null];

        let pivActual = 1;
        for (let k = 0; k < this.matriz.m; k++) {
            const pivAnterior = pivActual;
            pivActual = matriz[k][k];
            for (let i = 0; i < matriz.m; i++) {
                if (i !== k) {
                    for (let j = k; j < matriz.n; j++) {
                        let mensaje;
                        if (j === k) {
                            matriz[i][j] = 0;
                            mensaje = `Los elementos de la columna ${k + 1} se ponen en 0 ya que el pivote actual es ${pivActual} que esta en esa columna`;
                        }
                        else {
                            matriz[i][j] = (pivActual * matriz[i][j] - matriz[k][j] * prevMatriz[i][k]) / pivAnterior;
                            mensaje = `El elemento ${i + 1}, ${j + 1} se calcula con la operacion (${pivActual} * ${prevMatriz[i][j]} - ${prevMatriz[k][j]} * ${prevMatriz[i][k]}) / ${pivAnterior}`;
                        }
                        yield [matriz, i, j, mensaje, pivActual, pivAnterior];
                    }
                }
            }
            for (let i = 0; i <= k; i++) {
                if (i === k) continue;
                matriz[i][i] = pivActual;
                yield [matriz, i, i, `El elemento ${i + 1}, ${i + 1} se pone en ${pivActual}`, pivActual, pivAnterior];
            }

            prevMatriz = JSON.parse(JSON.stringify(matriz));
        }
    }
}
