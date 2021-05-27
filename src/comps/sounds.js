let context = new AudioContext()

/** Makes a beeping sound using the AudioContext API */
export function beep(type = "triangle", duration = 2) {
	let oscilator = context.createOscillator()
	let gain = context.createGain()

	oscilator.connect(gain)
	gain.connect(context.destination)
	oscilator.type = type

	oscilator.start(0)
	gain.gain
		.exponentialRampToValueAtTime(0.0001, context.currentTime + duration)
	oscilator.stop(context.currentTime + duration)
}