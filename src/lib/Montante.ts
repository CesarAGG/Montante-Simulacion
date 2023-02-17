// this class solves a matriz of the form Ax = b using the montante method
// it is assumed that the matriz is already in reduced row echelon form
import { Matriz } from './Matriz';

export class Montante {
	constructor(
		public matriz: Matriz,
		public divisor: number = 1,
		public vectorOriginal: Array<number> | null = null
	) {
		this.matriz = new Matriz(...matriz); // esto arregla un error de perdida de tipo
		if (this.matriz.tipo !== 0 && matriz.tipo !== 1)
			throw new Error('La matriz debe ser de tamaño m x m+1 o m x m*2');
		if (this.matriz.tipo === 1 && !vectorOriginal)
			throw new Error(
				'La matriz debe tener un vector de soluciones original para poder calcular la solucion'
			);
	}

	*resolver() {
		const matriz = new Matriz(...this.matriz.map((row) => [...row]));
		let prevMatriz = JSON.parse(JSON.stringify(matriz));
		yield [matriz, -1, -1, 'Matriz extendida', null, null];

		let pivActual = 1;
		for (let k = 0; k < this.matriz.m; k++) {
			const pivAnterior = pivActual;
			pivActual = matriz[k][k];
			if (pivActual === 0) {
				// check if there is a row below that has a non-zero element in the same column
				for (let i = k + 1; i < this.matriz.m; i++) {
					if (matriz[i][k] !== 0) {
						// swap rows
						[matriz[i], matriz[k]] = [matriz[k], matriz[i]];
						yield [
							matriz,
							i,
							k,
							`Se intercambian las filas ${i + 1} y ${k + 1} ya que el elemento ${i + 1}, ${
								k + 1
							} es diferente de 0`,
							pivActual,
							pivAnterior
						];
						// also swap the vector solucion
						if (this.matriz.tipo === 1) {
							const temp = this.vectorOriginal![i];
							this.vectorOriginal![i] = this.vectorOriginal![k];
							this.vectorOriginal![k] = temp;
						}

						pivActual = matriz[k][k];
						break;
					}
				}
				// if there is no row below that has a non-zero element in the same column, then the matrix is singular
				if (matriz[k][k] === 0) {
					yield [
						matriz,
						-1,
						-1,
						`La matriz es singular, por lo que no tiene una solucion única el sistema${
							this.matriz.tipo === 1 ? ', la matriz no tiene adjunta ni inversa' : ''
						} y el determinante es 0`,
						null,
						null
					];
					return;
				}
			}
			prevMatriz = JSON.parse(JSON.stringify(matriz));
			for (let i = 0; i < matriz.m; i++) {
				if (i !== k) {
					for (let j = k; j < matriz.n; j++) {
						let mensaje;
						if (j === k) {
							matriz[i][j] = 0;
							mensaje = `Los elementos de la columna ${
								k + 1
							} se ponen en 0 ya que el pivote actual es ${pivActual} que esta en esa columna`;
						} else {
							matriz[i][j] = Math.round(
								(pivActual * matriz[i][j] - matriz[k][j] * prevMatriz[i][k]) / pivAnterior
							);
							mensaje = `El elemento ${i + 1}, ${
								j + 1
							} se calcula con la operacion (${pivActual} * ${prevMatriz[i][j]} - ${
								prevMatriz[k][j]
							} * ${prevMatriz[i][k]}) / ${pivAnterior}`;
						}
						yield [matriz, i, j, mensaje, pivActual, pivAnterior];
					}
				}
			}
			for (let i = 0; i <= k; i++) {
				if (i === k) continue;
				matriz[i][i] = pivActual;
				yield [
					matriz,
					i,
					i,
					`El elemento ${i + 1}, ${i + 1} se pone en ${pivActual}`,
					pivActual,
					pivAnterior
				];
			}
		}

		const determinante = this.divisor === 1 ? pivActual : pivActual / this.divisor;
		if (pivActual === 0) return;
		yield [
			matriz,
			-1,
			-1,
			`El determinante de la funcion es ${matriz[0][0]} ${
				this.divisor === 1 ? '' : `/${this.divisor} = ${determinante}`
			}`,
			null,
			null
		];

		if (this.matriz.tipo === 0) {
			const vectorSolucion = matriz.map((row) => row[row.length - 1] / determinante / this.divisor);
			yield [matriz, -1, -1, `El vector solucion es [${vectorSolucion.join(', ')}]`, null, null];
		} else {
			const vectorSolucion = matriz.map(
				(row) =>
					row.slice(this.matriz.m).reduce((a, b, i) => a + b * this.vectorOriginal![i], 0) /
					determinante
			);
			let mensajeVector = '';
			// each part of the message is going to be 'vectorOriginal[0] * matriz[i][m] + vectorOriginal[1] * matriz[i][m+1] + ... + vectorOriginal[m-1] * matriz[i][n-1]'
			for (let i = 0; i < this.matriz.m; i++) {
				mensajeVector += `x${i + 1} = ${this.divisor === 1 ? '' : `1/${this.divisor}`}(`;
				for (let m = 0; m < this.matriz.m; m++) {
					if (m === 0)
						mensajeVector += `${this.vectorOriginal![m]} * ${matriz[i][m + this.matriz.m]}`;
					else mensajeVector += ` + ${this.vectorOriginal![m]} * ${matriz[i][m + this.matriz.m]}`;
				}
				if (i !== this.matriz.m - 1) mensajeVector += `${this.divisor === 1 ? '' : ')'}, `;
			}

			mensajeVector = mensajeVector.replace(/\+ -/, '-').replace(/^ \+ /, '');
			yield [
				matriz,
				-1,
				-1,
				`El vector solucion es ${mensajeVector} = ${vectorSolucion.join(', ')}`,
				null,
				null
			];
		}
	}
}
