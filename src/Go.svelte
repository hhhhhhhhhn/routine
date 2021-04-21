<script>
	export let i = 0 // Routine index

	import { computedRoutines } from "./store.js"

	let currentExerciseIndex = -1 // -1 means not to start yet.
	$: currentExercise =
		$computedRoutines[i].computedExercises[currentExerciseIndex]

	let currentTime = 0 // time from exercise start in seconds, (ds preciscion)
	let inBreak = false

	setInterval(function () {
		if (currentExerciseIndex == -1) return

		currentTime += 0.1
		if (inBreak) {
			if (currentTime >= $computedRoutines[i].break) {
				currentTime = 0
				inBreak = false
			}
		} else {
			if (currentTime >= currentExercise.time) {
				currentTime = 0
				inBreak = true
				if (
					currentExerciseIndex <
					$computedRoutines[i].computedExercises.length - 1
				)
					currentExerciseIndex++
				else currentExerciseIndex = -1
			}
		}
	}, 100)
</script>

{#if currentExerciseIndex == -1}
	<button
		on:click={function () {
			currentExerciseIndex = 0
		}}>Start</button
	>
{:else}
	<h1>{inBreak ? "Break" : currentExercise.name}</h1>
	<h1>{currentTime}</h1>
{/if}
