<script>
	export let callback = function () {}
	export let text = "+"
</script>

<button on:click={callback}>{text}</button>

<style>
	button {
		--radius: 75px;
		width: var(--radius);
		height: var(--radius);
		border-radius: var(--radius);
		outline: none;
		font-size: Calc(var(--radius) / 2);
		font-weight: bold;
		transition: filter 0.1s;
		user-select: none;
	}

	button:hover {
		filter: brightness(120%);
		cursor: pointer;
	}

	button:active {
		filter: brightness(150%);
	}
</style>
