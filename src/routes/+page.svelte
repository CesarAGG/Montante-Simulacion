<script lang="ts">
	import { Matriz } from '$lib/Matriz';
	import { Montante } from '$lib/Montante';
	import Charbox from '$lib/Charbox.svelte';

	let i = 0;
	let matrizOriginal = new Matriz([2, 3, 4, 18], [7, 8, 1, 22], [4, 2, 5, 33]);

	let matExtendida: Matriz,
		variablesNo = 3,
		matrizPrototype = JSON.parse(JSON.stringify(matrizOriginal)),
		divisor: number,
		montanteProgreso,
		montanteObjeto: Montante,
		changed: [number, number],
		done: boolean,
		mensaje: string,
		pivActual: string,
		pivAnterior: string,
		reset: boolean,
		changeModo = false,
		inicio = true,
		modo = false,
		matAdjunta: Matriz,
		matInversa: Matriz;

	$: console.log(matrizPrototype);

	$: {
		setup();
		modo = changeModo;
	}

	$: {
		console.log(i);
		montanteProgreso = montanteObjeto.next();
		if (!reset) {
			if (montanteProgreso.value) {
				changed = [montanteProgreso.value[1], montanteProgreso.value[2]];
				matExtendida = new Matriz(...montanteProgreso.value[0]);
				mensaje = montanteProgreso.value[3];
				[pivActual, pivAnterior] = [montanteProgreso.value[4], montanteProgreso.value[5]];
			} else {
				changed = [-1, -1];
				mensaje = 'El metodo ha terminado';
				done = true;
			}
		} else {
			resetMatriz();
		}
	}

	$: if (variablesNo !== matrizPrototype.length) {
		matrizPrototype = new Array(variablesNo).fill(null).map(() => Array(variablesNo + 1).fill(1));
	}

	$: if (variablesNo < 1) {
		variablesNo = 1;
	}

	$: if (done && modo) {
		matAdjunta = matExtendida.adjunta();
		matInversa = matExtendida.inversa();
	}

	function resetMatriz() {
		matrizOriginal = new Matriz(...matrizPrototype);
		setup();
		i = -1;
	}

	function setup() {
		[matExtendida, divisor] = Matriz.convertirAEnteros(matrizOriginal);
		matExtendida = modo ? new Matriz(...matExtendida).extender() : new Matriz(...matExtendida);
		montanteObjeto = new Montante(matExtendida, divisor, matrizOriginal.vectorSolucion).resolver();
		done = reset = false;
		changed = [-1, -1];
	}
</script>

<h1>Método de Montante</h1>
<h2>Input</h2>
<div class="datos">
	<label for="variables">Variables: </label>
	<input type="number" id="variables" bind:value={variablesNo} />
	{#each new Array(variablesNo) as _, i}
		<div>
			{#each new Array(variablesNo) as _, j}
				<input type="number" class="coeficiente" bind:value={matrizPrototype[i][j]} />x<sub
					>{j + 1}</sub
				>
				{j < variablesNo - 1 ? '+ ' : '= '}
			{/each}
			<input type="number" class="coeficiente" bind:value={matrizPrototype[i][variablesNo]} />
		</div>
	{/each}
</div>
<!-- checkbox para preguntar al usuario si desea obtener adjunta e inversa -->
<div class="datos">
	<label for="modo">Desea obtener ademas la adjunta e inversa?</label>
	<input type="checkbox" id="modo" bind:checked={changeModo} />
</div>
{#if inicio}
	<button
		on:click={() => {
			inicio = false;
			reset = true;
		}}>Empezar</button
	>
{:else}
	<button
		on:click={() => {
			reset = true;
		}}>Reset</button
	>
{/if}
{#if !inicio}
	<h2>Método</h2>
	<div
		class="matriz"
		style={`grid-template-columns: repeat(${
			matExtendida.n + (divisor === 1 ? 0 : 1)
		}, 1fr); grid-template-rows: repeat(${matExtendida.m}, 1fr)`}
	>
		{#if divisor !== 1}
			<div id="divisor">
				<sup>1</sup>&frasl;<sub>{divisor}</sub>
			</div>
		{/if}
		{#each matExtendida as row, i}
			{#each row as col, j}
				<Charbox char={col} changed={[i, j].toString() === changed.toString()} />
			{/each}
		{/each}
	</div>
	<button
		on:click={() => {
			if (!done) i++;
		}}>Siguiente</button
	>
	<div id="mensaje" class="datos">
		{mensaje}
	</div>
	<div id="pivActual" class="datos">
		{pivActual ? 'Pivote actual: ' + pivActual : ''}
	</div>
	<div id="pivAnterior" class="datos">
		{pivAnterior ? 'Pivote anterior: ' + pivAnterior : ''}
	</div>
{/if}

<h3 class:hidden={!modo || !done}>Adjunta</h3>
{#if done && modo}
	<div
		class="matriz"
		style={`grid-template-columns: repeat(${
			matAdjunta.n + (divisor === 1 ? 0 : 1)
		}, 1fr); grid-template-rows: repeat(${matAdjunta.m}, 1fr)`}
	>
		{#if divisor !== 1}
			<div id="divisor">
				<sup>1</sup>&frasl;<sub>{divisor}</sub>
			</div>
		{/if}
		{#each matAdjunta as row, i}
			{#each row as col, j}
				<Charbox char={col} changed={[i, j].toString() === changed.toString()} />
			{/each}
		{/each}
	</div>
{/if}

<h3 class:hidden={!modo || !done}>Inversa</h3>
{#if done && modo}
	<div
		class="matriz"
		style={`grid-template-columns: repeat(${
			matInversa.n + (divisor === 1 ? 0 : 1)
		}, 1fr); grid-template-rows: repeat(${matInversa.m}, 1fr)`}
	>
		{#if divisor !== 1}
			<div id="divisor">
				<sup>1</sup>&frasl;<sub>{divisor}</sub>
			</div>
		{/if}
		{#each matInversa as row, i}
			{#each row as col, j}
				<Charbox char={col} changed={[i, j].toString() === changed.toString()} />
			{/each}
		{/each}
	</div>
{/if}

<style>
	.hidden {
		display: none;
	}
	.matriz {
		display: grid;
		max-width: 80vw;
		margin-left: auto;
		margin-right: auto;
		place-items: center;
		font-size: 0.9em;
	}

	#divisor {
		grid-column: 1;
		grid-row: 1 / 4;
		font-size: 1.5em;
		font-weight: bold;
	}

	.datos {
		margin-top: 1em;
		text-align: center;
	}

	#mensaje {
		color: rgb(163, 0, 0);
	}

	#pivActual {
		color: rgb(0, 4, 222);
	}

	#pivAnterior {
		color: rgb(128, 0, 163);
	}

	button {
		margin-top: 1em;
		margin-left: auto;
		margin-right: auto;
		display: block;
	}

	input {
		width: 2em;
	}
	input.coeficiente::-webkit-outer-spin-button,
	input.coeficiente::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	input.coeficiente[type='number'] {
		-moz-appearance: textfield;
	}
</style>
