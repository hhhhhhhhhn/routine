import { derived, get, writable } from "svelte/store"

/** Extended writable store
   Saved and loaded to localstorage with name. 
   Also exposes save() function to do it manually */
function persistant(name, initial) {
	let storedValue = JSON.parse(localStorage.getItem(name))

	let store = writable(storedValue === null ? initial : storedValue)

	store.save = function() {
		localStorage.setItem(name, JSON.stringify(get(store)))
		// console.log(`${name} saved!`)
	}

	window.addEventListener("beforeunload", store.save)
	return store
}

export const routines = persistant("routines", [
	{id: 0, name: "Example Routine", break: 10, exercises: [
		{id: 1, exerciseId: 5, reps: 10, time: 60},
		{id: 2, exerciseId: 5, reps: 20, time: 120},
		{id: 3, exerciseId: 5, reps: 25, time: 120},
		{id: 4, exerciseId: 5, reps: 30, time: 120},
	]}
])

routines.subscribe(routines.save)

export const exerciseTable = persistant("exerciseTable", [
	{id: 5, name: "Example Exercise", calories: 2}
])

exerciseTable.subscribe(exerciseTable.save)

export const computedRoutines = derived(
	[routines, exerciseTable],

	function([$routines], set) {
		set($routines.map(function (routine) {
			return {
				...routine,
				exercises: getRoutineExercises(routine),
				time: getRoutineTime(routine),
				calories: getRoutineCalories(routine)
			}
		}))
	}
)

export const addEmptyRoutine = function() {
	routines.update(function(old) {
		return [...old, {id: newId(), name: "New Routine", break: 10}]	
	})
}

export const deleteRoutine = function (routineIndex) {
	routines.update(function (old) {
		return [...old.slice(0, i), ...old.slice(i + 1)]
	})
}

export const setRoutineNameAndBreak = function(routineIndex, name, breakTime) {
	routines.update(function(old) {
		old[routineIndex].name = name
		old[routineIndex].break = breakTime
		return old
	})
}

export const removeRoutineExercise = function(routineIndex, routineExerciseIndex) {
	routines.update(function(old) {
		old[routineIndex].exercises = [
			...old[routineIndex].exercises.slice(0, routineExerciseIndex),
			...old[routineIndex].exercises.slice(routineExerciseIndex + 1)
		]
		return old
	})
}

export const swapRoutineExercises = function(routineIndex, i, j) {
	routines.update(function(old) {
		try {
			let temp = old[routineIndex].exercises[i]
			old[routineIndex].exercises[i] = old[routineIndex].exercises[j]
			old[routineIndex].exercises[j] = temp
		}
		catch{}
		return old
	})
}

export const getExerciseById = function(id) {
	for (let exercise of get(exerciseTable)) {
		if(exercise.id === id)
			return exercise
	}
	return undefined
}

export const getRoutineExercises = function (routine) {
	return routine.exercises.map(function (routineExercise) {
		return {
			...getExerciseById(routineExercise.exerciseId),
			...routineExercise
		}
	})
}

/** Gets the total time of the ith routine. Includes breaks */
export const getRoutineTime = function (routine) {
	if (!routine.exercises?.length) return 0
	let totalTime = 0

	for(let { time } of routine.exercises) {
		totalTime += time || 0
	}
	totalTime += routine.break * (routine.exercises.length - 1)

	return Math.round(totalTime)
}

/** Gets the total calories of the ith routine. */
export const getRoutineCalories = function (routine) {
	try {
		let totalCalories = 0
	
		for(let { exerciseId, reps, time } of routine.exercises) {
			let exercise = getExerciseById(exerciseId)
			if(exercise !== undefined)
				totalCalories += exercise.calories * (reps || time)
		}
		return Math.round(totalCalories / 10) * 10 // Round to decimal
	}
	catch {
		return 0
	}
}

let id = Number(localStorage.getItem("id")) || 99
/** Generates new non-repeating ID. */
export const newId = function() {
	localStorage.setItem("id", `${id + 1}`)
	return id++
}

// /* DEGUB
window.log = function() {
	console.log(get(routines), get(exerciseTable), get(computedRoutines))
}

window.wipe = function() {
	routines.set(null)
	exerciseTable.set(null)
	localStorage.removeItem("routines")
	localStorage.removeItem("exerciseTable")
	window.onbeforeunload = null
	window.location.reload()
}
// */