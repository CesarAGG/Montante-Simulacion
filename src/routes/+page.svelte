<script lang="ts">
	import { Matriz } from '$lib/Matriz';
	import { Montante } from '$lib/Montante';
	import Charbox from '$lib/Charbox.svelte';

	let i = 0;
	// let a = new Matriz([0.14, 0.24, 2, 4], [4, 4, 6, 2], [2, 4, 8, 8]);
	let a = new Matriz([2, 3, 4, 18], [7, 8, 1, 22], [4, 2, 5, 33]);

	let aC: Matriz;
	let divisor: number;
	[aC, divisor] = Matriz.convertirAEnteros(a);

	aC = new Matriz(...aC).extender();
	let m = new Montante(aC).resolver();
	let b,
		changed: [number, number],
		done = false,
		mensaje: string,
		pivActual: string,
		pivAnterior: string;

	$: {
		console.log(i);
		b = m.next();
		if (b.value) {
			changed = [b.value[1], b.value[2]];
			aC = new Matriz(...b.value[0]);
			mensaje = b.value[3];
			[pivActual, pivAnterior] = [b.value[4], b.value[5]];
		} else {
			changed = [-1, -1];
			mensaje = 'El metodo ha terminado';
			done = true;
		}
	}
</script>

<div id="matriz">
	{#each aC as row, i}
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

<style>
	#matriz {
		display: grid;
		grid-template-columns: repeat(6, 1fr);
		grid-template-rows: repeat(3, 1fr);
		max-width: 70vw;
		margin-left: auto;
		margin-right: auto;
		place-items: center;
		font-size: 0.9em;
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
</style>
