<script>
	import {
		routines,
		goTo,
		getRoutineTime,
		getRoutineCalories,
		newId,
		ask
	} from "./store"
	import Button from "./comps/Button.svelte"
	import HorizontalCard from "./comps/HorizontalCard.svelte"
	import Routine from "./Routine.svelte"
	import { holdable } from "./comps/holdable.js"
</script>

<div id="list">
	{#each $routines as routine, i (routine.id)}
		<div
			use:holdable
			on:press={function () {
				goTo(Routine, { i }, "")
			}}
			on:hold={async function () {
				if (await ask(`Delete "${routine.name}"?`))
					routines.update(function (old) {
						return [...old.slice(0, i), ...old.slice(i + 1)]
					})
			}}
		>
			<HorizontalCard>
				<b>{routine.name}</b>
				<p>
					{Math.round(getRoutineTime(i) / 60)} min.
				</p>
				<p>{getRoutineCalories(i)} kcal.</p>
			</HorizontalCard>
		</div>
	{/each}
	{#if $routines.length == 0}
		<p id="notfound">No routines</p>
	{/if}
</div>

<div id="button">
	<Button
		callback={function () {
			$routines.push({
				id: newId(),
				name: "New Routine",
				break: 10,
				exercises: []
			})
			routines.save()
			goTo(Routine, { i: $routines.length - 1 }, "")
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
