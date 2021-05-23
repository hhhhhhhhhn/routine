import { writable, get } from "svelte/store"
import Routines from "../Routines.svelte"

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