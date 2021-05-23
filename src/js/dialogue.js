import { get, writable } from "svelte/store"

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
