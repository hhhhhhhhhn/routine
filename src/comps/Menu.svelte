<script>
	export let links = [] // In [Label, Component format]
	export let menuIndex = 0
	let opacity = 100
</script>

<ul>
	{#each links as [text], i}
		<li
			on:click={function () {
				if (menuIndex === i) return
				opacity = 0
				setTimeout(function () {
					menuIndex = i
					opacity = 1
				}, 100)
			}}
			style="--selected: {menuIndex === i ? '20%' : '0%'};"
		>
			{text}
		</li>
	{/each}
</ul>

<div style="--o: {opacity};">
	<svelte:component this={links[menuIndex][1]} />
</div>

<style>
	ul {
		display: flex;
		top: 0;
		left: 0;
		background-color: transparent;
		list-style: none;
		border-bottom: 2px solid var(--fg);
		padding-left: 10px;
		user-select: none;
	}
	li {
		padding: 15px;
		padding-left: 20px;
		--selected: 0%;
		--b: Calc(100% + var(--selected));
		filter: brightness(var(--b));
		transition: filter 0.2s;
	}
	li:hover {
		--b: 120%;
		cursor: pointer;
	}
	li:active {
		--b: 150%;
	}
	div {
		--o: 100;
		opacity: var(--o);
		transition: opacity 0.1s;
	}
</style>
