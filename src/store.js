import { derived, get, writable } from "svelte/store"
import Routines from "./Routines.svelte"

function persistant(name, initial) {
	let storedValue = JSON.parse(localStorage.getItem(name))
	let store = writable(storedValue === null ? initial : storedValue)
	window.addEventListener("beforeunload", function() {
		localStorage.setItem(name, JSON.stringify(get(store)))
	})
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

export const exerciseTable = persistant("exerciseTable", [
	{id: 5, name: "Example Exercise", calories: 2}
])

export const computedRoutines = derived(
	[routines, exerciseTable],
	function([$routines, $exerciseTable], set) {
		let value = []
		for(let routine of $routines) {
			let computedExercises = routine.exercises.map(function (exercise) {
				return {
					...$exerciseTable.find(function (x) {
						return exercise.exerciseId === x.id
					}),
					...exercise
				}
			})
			value.push({...routine, computedExercises})
		}
		set(value)
	}
)

export const hist = writable([
	{page: Routines, props: {}, title: "Routines"}
])

export const goTo = function (page = Routines, props = {}, title = "Routines") {
	hist.update(function(old) {
		return [{page, props, title}, ...old]
	})
}

export const goBack = function (n = 1) {
	if(get(hist).length <= 1) return true
	hist.update(function(old) {
		return old.slice(Math.min(n, old.length - 1))
	})
}

export const getRoutineTime = function (i) {
	try {
		let routine = get(routines)[i]
		let totalTime = 0

		for(let { time } of routine.exercises) {
			totalTime += time || 0
		}
		totalTime += routine.break * (routine.exercises.length - 1)
	
		return totalTime
	}
	catch {
		return 0
	}
}

export const getRoutineCalories = function (i) {
	try {
		let routine = get(routines)[i]
		let exercises = get(exerciseTable)
		let totalCalories = 0
	
		for(let { exerciseId, reps, time } of routine.exercises) {
			let exercise = exercises.find(function(x) {
				return x.id === exerciseId
			})
			if(exercise === undefined)
				continue
			totalCalories += exercise.calories * (reps || time)
		}
		return totalCalories
	}
	catch {
		return 0
	}
}

export let dialogue = writable({text: "", callback: function(){}})

export const ask = async function(text) {
	if(get(dialogue).text) return new Promise(function(resolve) {
		resolve(false)
	})
	return new Promise(function(resolve) {
		dialogue.set({text: text, callback: function(value) {
			dialogue.set({text: "", callback: function(){}})
			resolve(value)
		}})
	})
}


let id = Number(localStorage.getItem("id")) || 99
export const newId = function() {
	localStorage.setItem("id", `${id + 1}`)
	return id++
}

// /* DEGUB
window.log = function() {
	console.log(get(routines), get(exerciseTable), get(hist), get(dialogue))
}

window.wipe = function() {
	routines.set(null)
	exerciseTable.set(null)
	localStorage.removeItem("routines")
	localStorage.removeItem("exerciseTable")
	window.location.reload()
}

window.ask = ask
// */