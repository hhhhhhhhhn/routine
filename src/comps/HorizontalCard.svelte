<script>
	export let callback = function () {}

	export let trans = function (node, { duration = 200, delay = 0 }) {
		let o = +getComputedStyle(node).opacity
		let h = +getComputedStyle(node).height.slice(0, -2)
		return {
			duration,
			delay,
			css: function (t) {
				return `
					opacity: ${o * t};
					height: ${h * t}px;
				`
			}
		}
	}
</script>

<button on:click={callback} transition:trans|local>
	<slot />
</button>

<style>
	button {
		height: 60px;
		width: 100%;
		border: 2px solid var(--fg);
		border-radius: 15px;
		margin-bottom: 10px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		user-select: none;
		font-size: large;
		transition: filter 0.2s;
		outline: none;
	}

	button:hover {
		filter: brightness(120%);
		cursor: pointer;
	}

	button:active {
		filter: brightness(150%);
	}
</style>
