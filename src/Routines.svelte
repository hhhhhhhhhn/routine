<script>
	import {
		computedRoutines,
		addEmptyRoutine,
		deleteRoutine
	} from "./js/store"
	import { goTo } from "./js/history.js"
	import { ask } from "./js/dialogue.js"
	import Button from "./comps/Button.svelte"
	import HorizontalCard from "./comps/HorizontalCard.svelte"
	import Routine from "./Routine.svelte"
	import { holdable } from "./comps/holdable.js"
</script>

<div id="list">
	{#each $computedRoutines as routine, i (routine.id)}
		<div
			use:holdable
			on:press={function () {
				goTo(Routine, { i }, "")
			}}
			on:hold={async function () {
				if (await ask(`Delete "${routine.name}"?`)) deleteRoutine(i)
			}}
		>
			<HorizontalCard>
				<b>{routine.name}</b>
				<p>
					{Math.round(routine.time / 60)} min.
				</p>
				<p>{routine.calories} kcal.</p>
			</HorizontalCard>
		</div>
	{/each}
	{#if $computedRoutines.length == 0}
		<p id="notfound">No routines</p>
	{/if}
</div>

<div id="button">
	<Button
		callback={function () {
			addEmptyRoutine()
			goTo(Routine, { i: $computedRoutines.length - 1 }, "")
		}}
	/>
</div>

<style>
	div {
		width: 100%;
	}
	#list {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		text-align: center;
		margin-top: 3vh;
		list-style: none;
	}

	#notfound {
		font-size: x-large;
	}

	#button {
		position: fixed;
		top: 100%;
		left: 100%;
		transform: translate(-150%, -150%);
		width: auto;
	}
</style>
