export class Matriz extends Array<Array<number>> {
	constructor(...args: number[][]) {
		super();

		for (const element of args) {
			if (element.length !== args[0].length)
				throw new Error('La matriz debe tener el mismo número de columnas en cada fila');
			this.push(element);
		}

		if (this.m === 0) throw new Error('La matriz debe tener al menos una fila');
		if (this.tipo === -1) throw new Error('La matriz debe ser de tamaño m x m+1');

		if (this.tipo === 0) this.vectorSolucion = this.map((row) => row[row.length - 1]);
	}

	vectorSolucion: Array<number> | null = null;

	get tipo() {
		// aumentada simple es 0 y aumentada con identidad es 1, vector solucion es 2, cuadrada es 3
		if (this.m === this.n - 1) return 0;
		else if (this.m === this.n / 2) return 1;
		else if (this.m === 1) return 2;
		else if (this.m === this.n) return 3;
		else return -1;
	}

	// hacer propiedades para m y n que son el numero de filas y columnas
	get m() {
		return this.length;
	}

	get n() {
		return this[0].length;
	}

	// el metodo extender() regresa una matriz aumentada con la matriz identidad, solamente si el tipo es 0
	extender() {
		if (this.tipo !== 0) throw new Error('La matriz debe ser de tamaño m x m+1');

		const arr = new Array();
		for (let i = 0; i < this.m; i++) {
			arr.push([...this[i].slice(0, -1), ...Array(this.m).fill(0)]);
			arr[i][i + this.n - 1] = 1;
		}
		const mat = new Matriz(...arr);
		mat.vectorSolucion = this.map((row) => row[row.length - 1]);
		return mat;
	}

	// el metodo adjunta() toma una matriz extendida y regresa las ultimas m columnas, asume que ya esta resuelta
	adjunta() {
		if (this.tipo !== 1) throw new Error('La matriz debe ser de tamaño m x 2m');

		const arr = new Array();
		for (let i = 0; i < this.m; i++) {
			arr.push(this[i].slice(this.n / 2));
		}
		return new Matriz(...arr);
	}

	// el metodo inversa() toma una matriz extendida y regresa la matriz inversa, asume que ya esta resuelta
	inversa() {
		if (this.tipo !== 1) throw new Error('La matriz debe ser de tamaño m x 2m');

		const det = this[0][0];
		const arr = new Array();
		for (let i = 0; i < this.m; i++) {
			arr.push(this[i].slice(this.n / 2).map((element) => element / det));
		}
		return new Matriz(...arr);
	}

	static convertirAEnteros(input: Array<Array<number>>) {
		let divisor = 1;
		const arr = new Array();
		let maxPower = 0;
		for (const element of input) {
			for (let j = 0; j < input[0].length; j++) {
				const power = Math.pow(10, element[j].toString().split('.')[1]?.length || 0);
				if (power > maxPower) maxPower = power;
			}
		}
		divisor *= maxPower;
		for (let i = 0; i < input.length; i++) {
			arr.push(new Array());
			for (let j = 0; j < input[0].length; j++) {
				arr[i].push(Math.round((input[i][j] * maxPower + Number.EPSILON) * 100) / 100);
			}
		}
		const mcdArr = new Array();
		for (let i = 0; i < input.length; i++) {
			for (let j = 0; j < input[0].length; j++) {
				mcdArr.push(arr[i][j]);
			}
		}
		const mcdNum = mcd(mcdArr);
		divisor /= mcdNum;
		for (let i = 0; i < input.length; i++) {
			for (let j = 0; j < input[0].length; j++) {
				arr[i][j] /= mcdNum;
			}
		}

		return [arr, divisor];
	}
}

function mcd(arr: Array<number>) {
	let ret = arr[0];
	for (let i = 1; i < arr.length; i++) {
		ret = mcd2(ret, arr[i]);
	}
	return ret;
}

function mcd2(a: number, b: number): number {
	if (b === 0) return a;
	return mcd2(b, a % b);
}
