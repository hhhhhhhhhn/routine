<script>
	import { goTo } from "./js/history.js"
	import { addEmptyCategory, computedCategories } from "./js/store.js"
	import HorizontalCard from "./comps/HorizontalCard.svelte"
	import Button from "./comps/Button.svelte"
	import Category from "./Category.svelte"

	export let routineIndex = 0
</script>

<list>
	{#each $computedCategories as category, i (category.id)}
		<div
			id="exercise"
			on:click={function () {
				goTo(Category, { routineIndex, categoryIndex: i }, "")
			}}
		>
			<HorizontalCard>
				<b>{category.name}</b>
				<p>{category.exercises.length} exercises</p>
			</HorizontalCard>
		</div>
	{/each}
</list>

<div id="button">
	<Button
		callback={function () {
			addEmptyCategory()
			goTo(Category, {
				routineIndex,
				categoryIndex: $computedCategories.length - 1
			})
		}}
	/>
</div>

<style>
	list {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 25px;
	}
	#exercise {
		width: 100%;
	}
	#button {
		position: fixed;
		top: 100%;
		left: 100%;
		transform: translate(-150%, -150%);
		z-index: 10;
	}
</style>
