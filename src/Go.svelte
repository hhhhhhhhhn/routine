<script>
	export let i = 0 // Routine index

	import { computedRoutines } from "./store.js"
	import { beep } from "./comps/sounds.js"
	import { onDestroy } from "svelte"

	let currentExerciseIndex = -1 // -1 means not to start yet.
	$: currentExercise =
		$computedRoutines[i].computedExercises[currentExerciseIndex]

	let currentTime = 0 // time from exercise/break start in seconds
	let inBreak = false
	let paused = false

	const intervalTime = 0.1 // time between counts in seconds

	let interval = setInterval(function () {
		if (currentExerciseIndex == -1 || paused) return
		currentTime += intervalTime

		if (inBreak) {
			if (currentTime >= $computedRoutines[i].break) {
				// break complete
				beep("triangle", 4)
				currentTime = intervalTime
				inBreak = false
			}
			return
		}

		// if not in break
		if (currentTime >= currentExercise.time) {
			// exercise complete
			beep("sine", 4)
			currentTime = intervalTime
			inBreak = true
			if (
				currentExerciseIndex <
				$computedRoutines[i].computedExercises.length - 1
			)
				currentExerciseIndex++
			else currentExerciseIndex = -1
		}
	}, intervalTime * 1000)

	onDestroy(function () {
		clearInterval(interval)
	})
</script>

<container>
	{#if currentExerciseIndex == -1}
		<button
			id="start"
			on:click={function () {
				currentExerciseIndex = 0
				currentTime = 0
				paused = false
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
{#if currentExerciseIndex !== -1}
	<div id="controlbuttons">
		<button
			on:click={function () {
				if (currentTime > 3) {
					currentTime = 0
					return
				}
				if (inBreak) {
					currentExerciseIndex--
					inBreak = false
					currentTime = 0
					return
				}
				if (currentExerciseIndex == 0) {
					currentExerciseIndex = -1
					return
				}
				inBreak = true
				currentTime = 0
			}}>⏮︎&#xFE0E;</button
		>
		<button
			on:click={function () {
				paused = !paused
			}}>{paused ? "⏵︎" : "⏸︎"}&#xFE0E;</button
		>
		<button
			on:click={function () {
				currentTime = inBreak
					? $computedRoutines[i].break
					: currentExercise.time
			}}>⏭︎&#xFE0E;</button
		>
	</div>
{/if}

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
		z-index: -1;
	}
	#start,
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
	#start {
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
		--rotate: 0deg;
		transform: translate(-50%, -50%) rotate(var(--rotate))
			translateY(-150px);
	}
	#controlbuttons {
		position: fixed;
		top: 100%;
		left: 50%;
		transform: translate(-50%, -150%);
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 300px;
	}
	#controlbuttons button {
		font-size: 5em;
		border: none;
	}
</style>
