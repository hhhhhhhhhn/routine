<script>
	export let i = 0 // Routine index

	import { computedRoutines } from "./store.js"
	import { beep } from "./comps/sounds.js"

	let currentExerciseIndex = -1 // -1 means not to start yet.
	$: currentExercise =
		$computedRoutines[i].computedExercises[currentExerciseIndex]

	let currentTime = 0 // time from exercise start in seconds
	let inBreak = false

	const interval = 100 // time between counts in ms

	setInterval(function () {
		if (currentExerciseIndex == -1) return

		currentTime += interval / 1000
		if (inBreak) {
			if (currentTime >= $computedRoutines[i].break) {
				// break complete
				currentTime = interval / 1000
				inBreak = false
				beep("triangle", 4)
			}
		} else {
			if (currentTime >= currentExercise.time) {
				// exercise complete
				beep("sine", 4)
				currentTime = interval / 1000
				inBreak = true
				if (
					currentExerciseIndex <
					$computedRoutines[i].computedExercises.length - 1
				)
					currentExerciseIndex++
				else currentExerciseIndex = -1
			}
		}
	}, interval)
</script>

<container>
	{#if currentExerciseIndex == -1}
		<button
			on:click={function () {
				currentExerciseIndex = 0
			}}>Start</button
		>
	{:else}
		<div
			id="circle"
			style={`--rotate: ${
				inBreak
					? 360 - (currentTime / $computedRoutines[i].break) * 360
					: (currentTime / currentExercise.time) * 360
			}deg`}
		/>
		<roundthing>
			<h1>{inBreak ? "Break" : currentExercise.name}</h1>
			{#if currentExercise.reps}
				<h2>{currentExercise.reps} reps</h2>
			{/if}
			<h2>
				{(
					(inBreak
						? $computedRoutines[i].break
						: currentExercise.time) - currentTime
				).toFixed(1)} sec.
			</h2>
		</roundthing>
	{/if}
</container>

<style>
	container {
		position: absolute;
		top: 0;
		left: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		width: 100%;
	}
	button,
	roundthing {
		font-size: 3em;
		height: 300px;
		width: 300px;
		border-radius: 300px;
		border-color: var(--fg);
		border-style: solid;
		border-width: 5px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}

	button {
		transition: filter 0.2s;
	}
	button:hover {
		cursor: pointer;
		filter: brightness(120%);
	}
	button:active {
		filter: brightness(150%);
	}
	h1,
	h2 {
		font-size: 0.5em;
		text-align: center;
	}
	h2 {
		font-weight: normal;
	}
	#circle {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 30px;
		height: 30px;
		border-radius: 30px;
		transition: transform 0.1s;
		transition-timing-function: linear;
		background-color: var(--fg);
		--rotate: 20deg;
		transform: translate(-50%, -50%) rotate(var(--rotate))
			translateY(-150px);
	}
</style>
