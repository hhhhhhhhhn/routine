<script>
	export let i = 0
	import Button from "./comps/Button.svelte"
	import HorizontalCard from "./comps/HorizontalCard.svelte"
	import Exercises from "./Exercises.svelte"
	import Go from "./Go.svelte"
	import AddExercise from "./AddExercise.svelte"
	import {
		computedRoutines,
		removeRoutineExercise,
		setRoutineNameAndBreak,
		swapRoutineExercises
	} from "./js/store.js"
	import { goTo } from "./js/history.js"
	import { multiple } from "./js/dialogue.js"

	import { holdable } from "./comps/holdable.js"
	import { fade } from "svelte/transition"
	import { onDestroy } from "svelte"

	let routine = $computedRoutines[i]

	let name = routine.name
	let breakTime = routine.break

	let unsubscribe = computedRoutines.subscribe(function (computedRoutines) {
		routine = computedRoutines[i]
	})

	onDestroy(unsubscribe)

	$: setRoutineNameAndBreak(i, name, breakTime)
</script>

<h1 contenteditable="true" bind:textContent={name} />
<info>
	<p>{Math.round(routine.time / 60)} minute(s)</p>
	<p>{routine.calories} kcal.</p>
	{#if routine.exercises}
		<p>{routine.exercises.length} exercises</p>
	{/if}
	<div>
		<input type="number" bind:value={breakTime} />
		<span>second breaks</span>
	</div>
</info>

<list>
	{#if routine?.exercises?.length}
		{#each routine.exercises as exercise, j (exercise.id)}
			<div
				use:holdable
				on:hold={async function () {
					let action = await multiple(
						`What do you want to do with "${exercise.name}"?`,
						["Remove", "Move Up", "Move Down", "Cancel"]
					)

					switch (action) {
						case 0: // Removes jth exercise
							removeRoutineExercise(i, j)
							break
						case 1: // Moves jth exercise up
							swapRoutineExercises(i, j, j - 1)
							break
						case 2: // Moves jth exercise down
							swapRoutineExercises(i, j, j + 1)
							break
						default:
							// Does nothing
							break
					}
				}}
				on:press={function () {
					if (name !== undefined)
						// i.e. if exercise exists
						goTo(AddExercise, {
							routineIndex: i,
							routineExerciseIndex: j
						})
				}}
			>
				<HorizontalCard>
					<b>{exercise.name}</b>
					{#if exercise.reps}
						<p>{exercise.reps} reps</p>
						<p>
							{Math.round(exercise.reps * exercise.calories)} kcal.
						</p>
					{:else}
						<p>{exercise.time} seconds</p>
						<p>
							{Math.round(exercise.time * exercise.calories)} kcal.
						</p>
					{/if}
				</HorizontalCard>
			</div>
		{/each}
	{:else}
		<p id="notfound" in:fade>No exercises.</p>
	{/if}
</list>
<button
	id="go"
	on:click={function () {
		if (routine.exercises.length) goTo(Go, { i: i }, "")
	}}>Go!</button
>

<div id="button">
	<Button
		callback={function () {
			goTo(Exercises, { routineIndex: i }, "Add Exercise")
		}}
	/>
</div>

<style>
	h1 {
		text-align: center;
		font-size: 4em;
		margin: 50px;
	}
	info {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		text-align: center;
		flex-wrap: wrap;
		align-content: start;
		margin-bottom: 35px;
		text-align: cpenter;
		font-size: large;
	}
	info p,
	info div {
		padding: 5px;
		padding-right: 60px;
		padding-left: 60px;
	}
	info input {
		width: 3em;
		text-align: center;
	}
	#button {
		position: fixed;
		top: 100%;
		left: 100%;
		transform: translate(-150%, -150%);
	}
	#notfound {
		font-size: x-large;
		text-align: center;
	}
	list {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
	}
	list div {
		width: 100%;
	}
	#go {
		font-size: 2em;
		font-weight: bold;
		padding: 0.3em;
		padding-left: 0.7em;
		padding-right: 0.7em;
		display: block;
		margin: 35px auto;
		background-color: var(--fg);
		color: var(--bg);
		transition: filter 0.2s;
	}
	#go:hover {
		filter: brightness(83%);
		cursor: pointer;
	}
	#go:active {
		filter: brightness(66%);
	}
</style>
