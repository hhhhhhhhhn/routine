<script>
	import { dialogue } from "./store.js"
	import { fade } from "svelte/transition"
</script>

{#if $dialogue.text}
	<darken transition:fade={{ duration: 100 }}>
		<box>
			<h1>{$dialogue.text}</h1>
			<buttoncontainer>
				<button
					id="yes"
					on:click={function () {
						$dialogue.callback(true)
					}}>Yes</button
				>
				<button
					id="no"
					on:click={function () {
						$dialogue.callback(false)
					}}>No</button
				>
			</buttoncontainer>
		</box>
	</darken>
{/if}

<style>
	darken {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: #000b;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	box {
		height: auto;
		width: auto;
		padding: 50px;
		background-color: var(--bg);
		border-radius: 15px;
		margin: 30px;
	}
	h1 {
		margin-bottom: 20px;
		text-align: center;
	}
	buttoncontainer {
		display: flex;
		flex-direction: row;
		width: 100%;
		justify-content: space-around;
	}
	button {
		font-size: 1.5em;
		padding: 0.5em;
		padding-left: 1em;
		padding-right: 1em;
		margin: 20px;
		transition: filter 0.2s;
	}
	button:hover {
		filter: brightness(120%);
		cursor: pointer;
	}
	button:active {
		filter: brightness(150%);
	}
</style>
