<script>
	import { hist, goBack } from "./store.js"
</script>

<div id="bar" style={$hist[0].title ? "" : "border: none;"}>
	<button
		on:click={function () {
			goBack(1)
		}}
		style={$hist.length == 1 ? "display: none;" : ""}>&lt;</button
	>
	<p>{$hist[0].title}</p>
</div>
<div id="space" />

<style>
	#space {
		height: 60px;
	}

	#bar {
		z-index: 999;
		position: fixed;
		height: 60px;
		display: flex;
		flex-direction: row;
		width: 100%;
		align-items: center;
		font-size: large;
		font-weight: bold;
		border-bottom: 2px solid var(--fg);
	}

	button {
		outline: none;
		border: none;
		font-size: 1.5em;
		padding: 15px;
	}

	button:hover {
		cursor: pointer;
		filter: brightness(120%);
	}

	button:active {
		filter: brightness(150%);
	}

	p {
		padding: 15px;
	}
</style>
