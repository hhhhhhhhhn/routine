<script>
	import { goBack, hist } from "./js/history.js"
	import Bar from "./Bar.svelte"
	import Dialogue from "./Dialogue.svelte"
	import { fade } from "svelte/transition"

	document.addEventListener("keydown", function (event) {
		switch (event.key) {
			case "Escape":
				goBack()
				break
			case " ":
				let event = document.createEvent("MouseEvents")
				event.initEvent("mousedown", true, true)
				document.activeElement.dispatchEvent(event)
				break
		}
	})
</script>

<Bar />
{#key $hist[0]}
	<div in:fade={{ duration: 100, delay: 50 }}>
		<svelte:component this={$hist[0].page} {...$hist[0].props} />
	</div>
{/key}

<Dialogue />

<style>
	div {
		display: block;
		margin: 0 auto;
		width: clamp(100px, 90vw, 700px);
	}
</style>
