<script>
	import { hist } from "./store.js"
	import Bar from "./Bar.svelte"
	import { fade } from "svelte/transition"
</script>

<Bar />
{#key $hist[0]}
	<div in:fade={{ duration: 100, delay: 50 }}>
		<svelte:component this={$hist[0].page} {...$hist[0].props} />
	</div>
{/key}
