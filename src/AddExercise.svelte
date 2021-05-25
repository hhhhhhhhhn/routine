<script>
	export let routineIndex = 0
	export let routineExerciseIndex = 0
	import {
		exerciseTable,
		computedRoutines,
		getExerciseById
	} from "./js/store.js"
	import { hist } from "./js/history.js"

	let routineExercise =
		$computedRoutines[routineIndex].exercises[routineExerciseIndex]
	let exercise = getExerciseById(routineExerciseIndex)

	$: [exercise.name, exercise.calories, exerciseTable.save()] // saves on
	$: [routineExercise.time, routineExercise.reps, routines.save()] // change
</script>

<h1 contenteditable="true" bind:textContent={routineExercise.name} />

<info>
	<div>
		<input type="number" bind:value={routineExercise.calories} /><span
			>kcal.</span
		>
	</div>
	<div>
		<input type="number" bind:value={routineExercise.time} /><span
			>seconds</span
		>
	</div>
	<div>
		<input type="number" bind:value={routineExercise.reps} /><span
			>reps</span
		>
	</div>
</info>
<button
	on:click={function () {
		// goes back to routine
		hist.update(function (old) {
			old.shift()
			if (old[0].title === "Add Exercise") old.shift()
			return old
		})
		exercise.lastReps = routineExercise.reps
		exercise.lastTime = routineExercise.time
	}}>OK</button
>

<style>
	info {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		flex-wrap: wrap;
		text-align: center;
		font-size: large;
	}
	h1 {
		font-size: 4em;
		margin: 50px;
		text-align: center;
	}
	input {
		width: 2em;
		text-align: center;
		margin-right: 1em;
	}
	div {
		padding: 15px;
		padding-left: 75px;
		padding-right: 75px;
	}
	button {
		padding: 1em;
		padding-top: 0.4em;
		padding-bottom: 0.4em;
		font-size: 1.2em;
		display: block;
		margin: 20px auto;
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
