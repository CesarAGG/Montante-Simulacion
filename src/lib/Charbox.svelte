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
		font-size: 2.1em;
		border: 1px solid black;
		overflow: hidden;
		word-break: break-all;
	}

	div:hover {
		text-overflow: clip;
		white-space: normal;
		word-break: break-all;
	}

	@media screen and (max-width: 1024px) {
		div {
			font-size: 1.5em;
		}
	}

	@media screen and (max-width: 768px) {
		div {
			font-size: 1.1em;
		}
	}

	@media screen and (max-width: 480px) {
		div {
			font-size: 0.8em;
		}
	}

	.changed {
		background-color: rgb(121, 0, 207);
		color: rgb(255, 255, 255);
	}
</style>
