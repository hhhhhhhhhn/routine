<script>
	export let routineIndex = 0

	import { exerciseTable, routines, goTo, newId, ask } from "./store.js"
	import Button from "./comps/Button.svelte"
	import HorizontalCard from "./comps/HorizontalCard.svelte"
	import { holdable } from "./comps/holdable.js"
	import AddExercise from "./AddExercise.svelte"
	import { fade } from "svelte/transition"
</script>

<list>
	{#if $exerciseTable.length}
		{#each $exerciseTable as exercise, i}
			<div
				use:holdable
				on:press={function () {
					$routines[routineIndex].exercises.push({
						id: newId(),
						exerciseId: exercise.id,
						reps: 0,
						time: 30
					})
					goTo(
						AddExercise,
						{
							routineIndex: routineIndex,
							routineExerciseIndex:
								$routines[routineIndex].exercises.length - 1
						},
						""
					)
				}}
				on:hold={async function () {
					if (await ask(`Delete "${exercise.name}"?`))
						exerciseTable.update(function (old) {
							return [...old.slice(0, i), ...old.slice(i + 1)]
						})
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
			$exerciseTable.push({
				id: newId(),
				name: "New Exercise",
				calories: 0.1
			})
			$routines[routineIndex].exercises.push({
				id: newId(),
				exerciseId: $exerciseTable[$exerciseTable.length - 1].id,
				reps: 0,
				time: 30
			})
			goTo(
				AddExercise,
				{
					routineIndex: routineIndex,
					routineExerciseIndex:
						$routines[routineIndex].exercises.length - 1
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
</style>
