import { derived, get, writable } from "svelte/store"
import Routines from "./Routines.svelte"

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

export const hist = writable([ // history
	{page: Routines, props: {}, title: "Routines"}
])

/** Goes to a component as page */
export const goTo = function (page = Routines, props = {}, title = "Routines") {
	window.history.pushState({}, title, location.href)
	hist.update(function(old) {
		return [{page, props, title}, ...old]
	})
}

/** Goes back n pages in history */
export const goBack = function (n = 1) {
	if(get(hist).length <= 1) return true
	window.history.go(-n)
}

/** Handles the back button */
window.onpopstate = function () {
	if(get(hist).length <= 1) return
	hist.update(function(old) {
		return old.slice(1)
	})
}

/** Gets the total time of the ith routine. Includes breaks */
export const getRoutineTime = function (i) {
	let routine
	try {
		routine = get(routines)[i]
	} catch {
		return 0
	}

	if (routine.exercises.length == 0) return 0
	let totalTime = 0

	for(let { time } of routine.exercises) {
		totalTime += time || 0
	}
	totalTime += routine.break * (routine.exercises.length - 1)

	return Math.round(totalTime)
}

/** Gets the total calories of the ith routine. */
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
		return Math.round(totalCalories / 10) * 10 // Round to decimal
	}
	catch {
		return 0
	}
}

export let dialogue = writable({text: "", callback: function(){}})

/** Returns answers of yes/no question. */
export const ask = async function(text) {
	if(get(dialogue).text) return new Promise(function(resolve) { // already asking
		resolve(false)
	})
	return new Promise(function(resolve) {
		dialogue.set({text: text, callback: function(value) {
			dialogue.set({text: "", callback: function(){}})
			resolve(value)
		}})
	})
}

/** Returns the index of the option chosen for the question text given. */
export const multiple = async function (text, options) {
	if(get(dialogue).text) return new Promise(function(resolve) { // already asking
		resolve(false)
	})
	return new Promise(function(resolve) {
		dialogue.set({text: text, options: options, callback: function(value) {
			dialogue.set({text: "", callback: function(){}})
			resolve(value)
		}})
	})
}


let id = Number(localStorage.getItem("id")) || 99
/** Generates new non-repeating ID. */
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