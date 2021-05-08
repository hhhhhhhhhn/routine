<script>
	export let i = 0
	import Button from "./comps/Button.svelte"
	import HorizontalCard from "./comps/HorizontalCard.svelte"
	import Exercises from "./Exercises.svelte"
	import Go from "./Go.svelte"
	import AddExercise from "./AddExercise.svelte"
	import {
		exerciseTable,
		routines,
		getRoutineTime,
		getRoutineCalories,
		goTo,
		computedRoutines,
		multiple
	} from "./store.js"
	import { holdable } from "./comps/holdable.js"
	import { fade } from "svelte/transition"

	$: [$routines[i].name, $routines[i].break, routines.save()] // saves routines when on of them is changed
</script>

<h1 contenteditable="true" bind:textContent={$routines[i].name} />
<info>
	{#key ($routines[i], $exerciseTable)}
		<p>{Math.round(getRoutineTime(i) / 60)} minute(s)</p>
		<p>{getRoutineCalories(i)} kcal.</p>
		{#if $routines[i].exercises}
			<p>{$routines[i].exercises.length} exercises</p>
		{/if}
	{/key}
	<div>
		<input type="number" bind:value={$routines[i].break} />
		<span>second breaks</span>
	</div>
</info>

<list>
	{#if $routines[i].exercises && $routines[i].exercises.length}
		{#each $computedRoutines[i].computedExercises as { name, reps, time, calories, id }, j (id)}
			<div
				use:holdable
				on:hold={async function () {
					let action = await multiple(
						`What do you want to do with "${name}"?`,
						["Remove", "Move Up", "Move Down", "Cancel"]
					)

					switch (action) {
						case 0: // Removes jth exercise
							$routines[i].exercises = [
								...$routines[i].exercises.slice(0, j),
								...$routines[i].exercises.slice(j + 1)
							]
							break
						case 1: // Moves jth exercise up
							if (j == 0) break
							let temp = $routines[i].exercises[j]
							$routines[i].exercises[j] =
								$routines[i].exercises[j - 1]
							$routines[i].exercises[j - 1] = temp
							break
						case 2: // Moves jth exercise down
							if (j == $routines[i].exercises.length - 1) break
							let temp2 = $routines[i].exercises[j]
							$routines[i].exercises[j] =
								$routines[i].exercises[j + 1]
							$routines[i].exercises[j + 1] = temp2
							break
						default:
							// Does nothing
							break
					}
					routines.update(function (old) {
						// just send update
						return old
					})
					routines.save()
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
						<p>{Math.round(reps * calories)} kcal.</p>
					{:else}
						<p>{time} seconds</p>
						<p>{Math.round(time * calories)} kcal.</p>
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
		if ($computedRoutines[i].computedExercises.length)
			goTo(Go, { i: i }, "")
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
