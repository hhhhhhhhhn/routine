import { derived, get } from "svelte/store"
import { persistant } from "../comps/persistant.js"

export const routines = persistant("routines", [
	{id: 0, name: "Example Routine", break: 10, exercises: [
		{id: 1, exerciseId: 5, reps: 10, time: 60},
		{id: 2, exerciseId: 5, reps: 20, time: 120},
		{id: 3, exerciseId: 5, reps: 25, time: 120},
		{id: 4, exerciseId: 5, reps: 30, time: 120},
	]}
])

routines.subscribe(routines.save)

export const addEmptyRoutine = function() {
	routines.update(function(old) {
		return [
			...old,
			 {id: newId(), name: "New Routine", break: 10, exercises: []}
		]	
	})
}

export const deleteRoutine = function (routineIndex) {
	routines.update(function (old) {
		return [...old.slice(0, routineIndex), ...old.slice(i + routineIndex)]
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

export const categories = persistant("categories", [
	{id: 6, name: "Example Category", exercises: [
		{id: 7, exerciseId: 5}
	]}
])

categories.subscribe(categories.save)

export const computedCategories = derived(
	[categories, exerciseTable],

	function([$categories], set) {
		set($categories.map(function (category) {
			return {
				...category,
				exercises: getCategoryExercises(category)
			}
		}))
	}
)

export const setCategoryName = function(categoryIndex, name) {
	categories.update(function(categories) {
		categories[categoryIndex].name = name
		return categories
	})
}

export const getCategoryExercises = function(category) {
	return category.exercises.map(function (categoryExercise) {
		return {
			...getExerciseById(categoryExercise.exerciseId),
			...categoryExercise
		}
	})
}

export const addEmptyCategory = function() {
	categories.update(function(categories) {
		return [
			...categories,
			{id: newId(), name: "New Category", exercises: []}
		]	
	})
}

export const setRoutineExerciseTimeAndReps = 
	function(routineIndex, routineExerciseIndex, time, reps) {
		routines.update(function(routines) {
			routines[routineIndex].exercises[routineExerciseIndex].time = time
			routines[routineIndex].exercises[routineExerciseIndex].reps = reps
			return routines
		})
	}

export const swapRoutineExercises = function(routineIndex, i, j) {
	routines.update(function(routines) {
		let routineExerciseLength = routines[routineIndex].exercises.length
		if (Math.min(i, j) >= 0 && Math.max(i, j) < routineExerciseLength) {
			let temp = routines[routineIndex].exercises[i]
			routines[routineIndex].exercises[i] = routines[routineIndex].exercises[j]
			routines[routineIndex].exercises[j] = temp
		}
		return routines
	})
}

export const getExerciseById = function(id) {
	for (let exercise of get(exerciseTable)) {
		if(exercise.id === id)
			return exercise
	}
	return undefined
}

export const getExerciseIndexById = function(id) {
	for (let [i, exercise] of get(exerciseTable).entries()) {
		if(exercise.id === id)
			return i
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

export const addEmptyExercise = function() {
	exerciseTable.update(function(exerciseTable) {
		exerciseTable.push({
			id: newId(),
			name: "New Exercise",
			calories: 0.1
		})
		return exerciseTable
	})
}

export const addExerciseToRoutine = function(routineIndex, exercise) {
	routines.update(function(routines) {
		routines[routineIndex].exercises.push({
			id: newId(),
			exerciseId: exercise.id,
			reps: exercise.lastReps ?? 0,
			time: exercise.lastTime ?? 30
		})
		return routines
	})
}

export const addExerciseToCategory = function(categoryIndex, exercise) {
	categories.update(function(categories) {
		categories[categoryIndex].exercises.push({
			id: newId(),
			exerciseId: exercise.id
		})
		return categories
	})
}

export const deleteExerciseById = function(exerciseId) {
	let exerciseIndex = getExerciseIndexById(exerciseId)
	exerciseTable.update(function (exerciseTable) {
		return [
			...exerciseTable.slice(0, exerciseIndex),
			...exerciseTable.slice(exerciseIndex + 1)
		]
	})
}

export const setExerciseNameAndCalories = function(exerciseId, name, calories) {
	let exerciseIndex = getExerciseIndexById(exerciseId)
	exerciseTable.update(function(exerciseTable) {
		exerciseTable[exerciseIndex].name = name
		exerciseTable[exerciseIndex].calories = calories
		return exerciseTable
	})
}

export const setExerciseDefaultTimeAndReps = function(exerciseId, time, reps) {
	let exerciseIndex = getExerciseIndexById(exerciseId)
	exerciseTable.update(function(exerciseTable) {
		exerciseTable[exerciseIndex].lastTime = time
		exerciseTable[exerciseIndex].lastReps = reps
		return exerciseTable
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
	console.log(get(routines), get(exerciseTable), get(computedRoutines), get(categories), get(computedCategories))
}

window.wipe = function() {
	setTimeout(window.location.reload)
	routines.set(null)
	exerciseTable.set(null)
	localStorage.removeItem("routines")
	localStorage.removeItem("exerciseTable")
	window.onbeforeunload = null
}
// */