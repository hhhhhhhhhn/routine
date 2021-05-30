import { writable, get } from "svelte/store"

/** Extended writable store.
   Saved and loaded to localstorage with name. 
   Also exposes save() function to do it manually */
export function persistant(name, initial) {
	let storedValue = JSON.parse(localStorage.getItem(name))

	let store = writable(storedValue === null ? initial : storedValue)

	store.save = function() {
		localStorage.setItem(name, JSON.stringify(get(store)))
		// console.log(`${name} saved!`)
	}

	window.addEventListener("beforeunload", store.save)
	return store
}
