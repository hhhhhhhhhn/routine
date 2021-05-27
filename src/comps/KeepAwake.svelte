<script>
	import { onDestroy } from "svelte"

	let wakeLock

	try {
		wakeLock = navigator.wakeLock.request("screen")
	} catch (err) {}

	onDestroy(async function () {
		if (wakeLock) {
			wakeLock = await wakeLock
			wakeLock.release()
		}
	})
</script>
