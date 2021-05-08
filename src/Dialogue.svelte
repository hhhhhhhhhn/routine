<script>
	import { dialogue } from "./store.js"
	import { fade } from "svelte/transition"
</script>

{#if $dialogue.text}
	<darken transition:fade={{ duration: 100 }}>
		<box>
			<h1>{$dialogue.text}</h1>
			<buttoncontainer>
				{#if $dialogue.options === undefined}
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
				{:else}
					{#each $dialogue.options as option, i}
						<button
							style="width: 100%"
							on:click={function () {
								$dialogue.callback(i)
							}}>{option}</button
						>
					{/each}
				{/if}
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
		z-index: 99999;
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
		flex-wrap: wrap;
	}
	button {
		font-size: 1.5em;
		padding: 0.5em;
		padding-left: 1em;
		padding-right: 1em;
		margin: 20px;
		margin-top: 10px;
		margin-bottom: 10px;
		transition: filter 0.2s;
		width: auto;
	}
	button:hover {
		filter: brightness(120%);
		cursor: pointer;
	}
	button:active {
		filter: brightness(150%);
	}
</style>
