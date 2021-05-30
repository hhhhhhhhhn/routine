<script>
	export let routineIndex = 0

	import {
		exerciseTable,
		computedRoutines,
		addExerciseToRoutine,
		deleteExercise,
		addEmptyExercise
	} from "./js/store.js"
	import { goTo } from "./js/history.js"
	import { ask } from "./js/dialogue"
	import Button from "./comps/Button.svelte"
	import HorizontalCard from "./comps/HorizontalCard.svelte"
	import { holdable } from "./comps/holdable.js"
	import AddExercise from "./Exercise.svelte"
	import { fade } from "svelte/transition"
</script>

<list>
	{#if $exerciseTable.length}
		{#each $exerciseTable as exercise, i}
			<div
				id="exercise"
				use:holdable
				on:press={function () {
					addExerciseToRoutine(routineIndex, exercise)
					goTo(
						AddExercise,
						{
							routineIndex: routineIndex,
							routineExerciseIndex:
								$computedRoutines[routineIndex].exercises
									.length - 1
						},
						""
					)
				}}
				on:hold={async function () {
					if (await ask(`Delete "${exercise.name}"?`))
						deleteExercise(i)
				}}
			>
				<HorizontalCard>
					<b>{exercise.name}</b>
					<p>{exercise.calories} kcal.</p>
				</HorizontalCard>
			</div>
		{/each}
	{:else}
		<h1 id="notfound" in:fade>No exercises.</h1>
	{/if}
</list>

<div id="button">
	<Button
		callback={function () {
			addEmptyExercise()
			addExerciseToRoutine(
				routineIndex,
				$exerciseTable[$exerciseTable.length - 1]
			)
			goTo(
				AddExercise,
				{
					routineIndex: routineIndex,
					routineExerciseIndex:
						$computedRoutines[routineIndex].exercises.length - 1
				},
				""
			)
		}}
	/>
</div>

<style>
	list {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 25px;
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
	#exercise {
		width: 100%;
	}
</style>
