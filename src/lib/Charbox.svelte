<script lang="ts">
	export let char: string;
	export let changed: boolean;
</script>

<div class:changed>
	{char}
</div>

<style>
	div {
		width: 100%;
		aspect-ratio: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 3em;
		border: 1px solid black;
	}

	@media screen and (max-width: 768px) {
		div {
			font-size: 2.6em;
		}
	}

	.changed {
		background-color: rgb(121, 0, 207);
		color: rgb(255, 255, 255);
	}
</style>
