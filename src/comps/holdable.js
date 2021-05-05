export function holdable(node, duration = 750) {
	let clicked = false
	let timeout
	let triggerPress = true
	
	function onDown() {
		clicked = true
		triggerPress = true
		timeout = setTimeout(function () {
			clicked = false
			triggerPress = false
			node.dispatchEvent(new CustomEvent("hold"))
		}, duration)
	}
	
	function onUp() {
		clearTimeout(timeout)
		if (triggerPress && clicked) {
			node.dispatchEvent(new CustomEvent("press"))
		}
		triggerPress = true
		clicked = false
		console.log("clicked")
	}
	
	function onCancel() {
		clearTimeout(timeout)
		triggerPress = true
		clicked = false
	}
	
	node.addEventListener("mousedown", onDown)
	node.addEventListener("click", onUp)

	node.addEventListener("touchstart", onDown)
	node.addEventListener("touchmove", onCancel)
	node.addEventListener("touchcancel", onCancel)
	
	return {
		destroy() {
			node.onmousedown = null
			node.onmouseup = null
			node.ontouchstart = null
			node.ontouchmove = null
			node.ontouchcancel = null
		}
	}
}