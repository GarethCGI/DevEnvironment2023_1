<!-- ThemeChanger.vue -->
<template>
	<div class="theme-icon">
		<svg
			@click="toggleTheme"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			:fill="darkMode ? 'white' : 'none'"
			:stroke="darkMode ? 'white' : 'currentColor'"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="feather feather-sun"
		>
			<circle cx="12" cy="12" r="5"></circle>
			<line x1="12" y1="1" x2="12" y2="3"></line>
			<line x1="12" y1="21" x2="12" y2="23"></line>
			<line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
			<line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
			<line x1="1" y1="12" x2="3" y2="12"></line>
			<line x1="21" y1="12" x2="23" y2="12"></line>
			<line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
			<line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
		</svg>
	</div>
</template>
<style scoped>
.theme-icon {
	width: 30px;
	height: 30px;
	cursor: pointer;
}
</style>
<script lang="ts" setup>
let darkMode = ref(false);
function setDarkColors() {
	// Change root styles to dark mode
	document.documentElement.style.setProperty('--primary', '#dc3545');
	document.documentElement.style.setProperty('--secondary', '#212529');
	document.documentElement.style.setProperty('--text-primary', '#f8f9fa');
	document.documentElement.style.setProperty('--background', '#222222');
}
function setLightColors() {
	// Change root styles to light mode
	document.documentElement.style.setProperty('--primary', '#dc3545');
	document.documentElement.style.setProperty('--secondary', '#212529');
	document.documentElement.style.setProperty('--text-primary', '#212529');
	document.documentElement.style.setProperty('--background', '#f8f9fa');
}
function saveTheme() {
	localStorage.setItem('darkMode', `${darkMode.value}`);
}
function toggleTheme() {
	darkMode.value = !darkMode.value;
	if (darkMode.value) {
		setDarkColors();
	} else {
		setLightColors();
	}
	saveTheme();
}
onMounted(() => {
	const savedTheme = localStorage.getItem('darkMode');
	if (savedTheme) {
		darkMode.value = savedTheme === 'true';
		if (darkMode.value) {
			setDarkColors();
		} else {
			setLightColors();
		}
	}
});
</script>