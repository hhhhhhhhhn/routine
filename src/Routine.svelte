<script>
	export let i = 0
	import Button from "./comps/Button.svelte"
	import HorizontalCard from "./comps/HorizontalCard.svelte"
	import Exercises from "./Exercises.svelte"
	import AddExercise from "./AddExercise.svelte"
	import {
		exerciseTable,
		routines,
		getRoutineTime,
		getRoutineCalories,
		goTo
	} from "./store.js"
	import { holdable } from "./comps/holdable.js"
	import { fade } from "svelte/transition"

	let routine = $routines[i]
	$: computedExercises = routine.exercises.map(function (exercise) {
		return {
			...$exerciseTable.find(function (x) {
				return exercise.exerciseId === x.id
			}),
			...exercise
		}
	})
</script>

<h1 contenteditable="true" bind:textContent={routine.name} />
<info>
	{#key (routine, $exerciseTable)}
		<p>{Math.round(getRoutineTime(i) / 60)} minute(s)</p>
		<p>{getRoutineCalories(i)} kcal.</p>
		{#if routine.exercises}
			<p>{routine.exercises.length} exercises</p>
		{/if}
	{/key}
	<div>
		<input type="number" bind:value={routine.break} />
		<span>second breaks</span>
	</div>
</info>

<list>
	{#if routine.exercises && routine.exercises.length}
		{#each computedExercises as { name, reps, time, calories, id }, j (id)}
			<!-- I'm going to hell for this -->
			<div
				use:holdable
				on:hold={function () {
					routine.exercises = [
						...routine.exercises.slice(0, j),
						...routine.exercises.slice(j + 1)
					]
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
					<b>{name}</b>
					{#if reps}
						<p>{reps} reps</p>
						<p>{reps * calories} kcal.</p>
					{:else}
						<p>{time} seconds</p>
						<p>{time * calories} kcal.</p>
					{/if}
				</HorizontalCard>
			</div>
		{/each}
	{:else}
		<p id="notfound" in:fade>No exercises.</p>
	{/if}
</list>

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
		width: 100vw;
		display: flex;
		align-items: center;
		justify-content: space-between;
		text-align: center;
		flex-wrap: wrap;
		align-content: start;
		margin-bottom: 35px;
		text-align: center;
	}
	info p,
	info div {
		padding: 5px;
		padding-right: 100px;
		padding-left: 100px;
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
	}
</style>
