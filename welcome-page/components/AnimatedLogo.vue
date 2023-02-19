<template>
	<div class="logo-container" :style="{ width: size + 'px', height: size + 'px' }">
		<img class="logo-layer" id="CogWheel" src="/animatedLogo/DGETICog.png" alt="CogWheel" :style="{ width: size + 'px', height: size + 'px' }" />
		<img class="logo-layer" id="NegativeCog" src="/animatedLogo/DGETINegativeCircle.png" alt="NegativeCog" :style="{ width: size + 'px', height: size + 'px' }" />
		<img class="logo-layer" id="Center" src="/animatedLogo/DGETICenter.png" alt="Center" :style="{ width: size + 'px', height: size + 'px' }" />
		<img class="logo-layer" id="Arrow" src="/animatedLogo/DGETIArrow.png" alt="Arrow" :style="{ width: size + 'px', height: size + 'px' }" />
	</div>
</template>
<script lang="ts" setup>
defineProps<{
	size: string;
}>();

</script>
<style scoped>
/* LogoContainer */
/* Overlay all the images */
.logo-container {
	position: relative;
}

/* LogoLayer */
/* Position the images */
.logo-layer {
	position: absolute;
	top: 0;
	left: 0;
}

/* Rotate the CogWheel */
#CogWheel {
	animation: spin 10s linear infinite;
}

@keyframes spin {
	0% {
		transform: rotate(0deg);
	}

	100% {
		transform: rotate(360deg);
	}
}

</style>
