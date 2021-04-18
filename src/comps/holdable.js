export function holdable(node, duration = 750) {
	let clicked = false
	let timeout
	let triggerPress = true
	node.addEventListener("mousedown", function() {
		clicked = true
		timeout = setTimeout(function () {
			triggerPress = false
			node.dispatchEvent(new CustomEvent("hold"))
		}, duration)
	})
	node.addEventListener("mouseup", function() {
		if (triggerPress && clicked) {
			clearTimeout(timeout)
			node.dispatchEvent(new CustomEvent("press"))
		}
		triggerPress = true
		clicked = false
	})
	
	return {
		destroy() {
			node.onmousedown = null
			node.onmouseup = null
		}
	}
}