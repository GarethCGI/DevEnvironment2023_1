<!-- NavBar.vue -->
<template>
	<div class="nav-bar">
		<div class="nav-bar__logo">
			<AnimatedLogo size=90 />
			<div href="/" class="nav-bar__logo__text">
				{{ runtimeConfig.brand }}
			</div>
		</div>
		<div class="nav-bar__links">
			<a :href="runtimeConfig.helpURL">Help</a>
		</div>
	</div>
</template>
<script lang="ts" setup>

const runtimeConfig = useRuntimeConfig();

</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Carter+One&family=Oswald:wght@600&display=swap');
.nav-bar {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1rem;
}
.nav-bar__logo {
	display: flex;
	align-items: center;
}
.nav-bar__logo img {
	width: 2rem;
	height: 2rem;
	margin-right: 0.5rem;
}
.nav-bar__logo__text {
	font-size: 2rem;
	padding-left: 2rem;
	/* Institutional font */
	font-family: 'Oswald', sans-serif;
	color: var(--text-primary);
}
.nav-bar__links {
	display: flex;
	font-family: 'Carter One', cursive;
	align-items: center;
	/* Remove the underline from the links */
	text-decoration: none;
	justify-content: space-between;
	color: var(--text-primary);
}
.nav-bar__links a {
	margin-left: 1rem;
	margin-right: 1rem;
	text-decoration: none;
	color: var(--text-primary);
}
.nav-bar__links a:hover {
	text-decoration: underline;
}

</style>