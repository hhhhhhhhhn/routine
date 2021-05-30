<script>
	import { onDestroy } from "svelte"
	import {
		computedCategories,
		setCategoryName,
		addExerciseToRoutine,
		computedRoutines,
		deleteExerciseById,
		getExerciseById,
		addEmptyExercise,
		exerciseTable,
		addExerciseToCategory
	} from "./js/store.js"

	import { goTo } from "./js/history.js"
	import { ask } from "./js/dialogue.js"

	import { holdable } from "./comps/holdable.js"
	import Exercise from "./Exercise.svelte"
	import HorizontalCard from "./comps/HorizontalCard.svelte"
	import Button from "./comps/Button.svelte"

	export let categoryIndex = 0
	export let routineIndex = 0

	let category = $computedCategories[categoryIndex]

	let unsubscribe = computedCategories.subscribe(function (value) {
		category = value[categoryIndex]
	})

	let name = category.name

	$: setCategoryName(categoryIndex, name)

	onDestroy(unsubscribe)
</script>

<h1 contenteditable="true" bind:textContent={name} />
<list>
	{#each category.exercises as exercise (exercise.id)}
		<div
			id="exercise"
			use:holdable
			on:press={function () {
				addExerciseToRoutine(
					routineIndex,
					getExerciseById(exercise.exerciseId)
				)
				goTo(
					Exercise,
					{
						routineIndex: routineIndex,
						routineExerciseIndex:
							$computedRoutines[routineIndex].exercises.length - 1
					},
					""
				)
			}}
			on:hold={async function () {
				if (await ask(`Delete "${exercise.name}"?`))
					deleteExerciseById(exercise.exerciseId)
			}}
		>
			<HorizontalCard>
				<b>{exercise.name}</b>
				<p>{exercise.calories} kcal.</p>
			</HorizontalCard>
		</div>
	{/each}
</list>

<div id="button">
	<Button
		callback={function () {
			addEmptyExercise()
			addExerciseToRoutine(
				routineIndex,
				$exerciseTable[$exerciseTable.length - 1]
			)
			addExerciseToCategory(
				categoryIndex,
				$exerciseTable[$exerciseTable.length - 1]
			)
			goTo(
				Exercise,
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
	h1 {
		text-align: center;
		font-size: 4em;
		margin: 50px;
	}
	#button {
		position: fixed;
		top: 100%;
		left: 100%;
		transform: translate(-150%, -150%);
	}
</style>
