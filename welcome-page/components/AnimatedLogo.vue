<template>
	<div class="logo-container" :style="{ width: size + 'px', height: size + 'px' }">
		<img class="logo-layer" id="CogWheel" src="/animatedLogo/DGETICog.png" alt="CogWheel"
			:style="{ width: size + 'px', height: size + 'px', animation: `${animation} ${speed}s linear ${animDuration}` }" v-if="!broken" />
		<div class="mask"></div>
		<img class="logo-layer" id="Center" src="/animatedLogo/DGETICenter.png" alt="Center"
			:style="{ width: size + 'px', height: size + 'px' }" />
		<img class="logo-layer" id="Arrow" src="/animatedLogo/DGETIArrow.png" alt="Arrow"
			:style="{ width: size + 'px', height: size + 'px' }" @mouseover="touchStart" @touchstart="touchStart"
			@mouseout="touchEnd" @touchend="touchEnd" />
	</div>
</template>
<script lang="ts" setup>
defineProps<{
	size: string;
}>();
// Speed measured in seconds (lower is faster)
let broken = ref(false);
const maxSpeed = 0.5;
const minSpeed = 10;
let speed = ref(minSpeed);
let handles: Array<NodeJS.Timer> = [];
let heldSeconds = 0;
let animation = ref("spin");
let animDuration = ref("infinite");
function touchStart() {
	clearIntervals();
	if(broken.value) return;
	let handle = setInterval(() => {
		heldSeconds += 0.015;
		speed.value -= 0.01;
		if (speed.value <= maxSpeed) {
			clearIntervals();
		}
	}, 15);
	handles.push(handle);
}
function touchEnd() {
	clearIntervals();
	if(broken.value) return;
	let handle = setInterval(() => {
		heldSeconds = 0;
		speed.value += 0.05;
		if (speed.value >= minSpeed) {
			clearIntervals();
		}
	}, 15)
	handles.push(handle);
}
function breakCog(){
	// Break the cogwheel when the user is holding the arrow for double the max speed
	// loop every 100ms
	setInterval(() => {
		if (heldSeconds >= minSpeed) {
			// Break the cogwheel
			animation.value = "broken";
			speed.value = 1;
			setTimeout(() => {
				broken.value = true;
			}, 1000);
			animDuration.value = "1";
			clearIntervals();
		}
	}, 1000);
}
function clearIntervals() {
	handles.forEach((handle) => {
		clearInterval(handle);
	});
}
onMounted(() => {
	breakCog();
});
</script>
<style scoped>
/* LogoContainer */
/* Overlay all the images */
/* Mask the half right side of the CogWheel */
.mask {
	position: absolute;
	top: 0;
	left: 50%;
	width: 50%;
	height: 100%;
	background-color: var(--background);
	clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
}

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

/* Rotate the CogWheel 
#CogWheel {
	animation: spin 10s linear infinite;
}*/
</style>

<style>
@keyframes spin {
	0% {
		transform: rotate(0deg);
	}

	100% {
		transform: rotate(360deg);
	}
}
@keyframes broken {
	0% {
		transform: translateX(0) rotate(0deg);
	}
	100% {
		transform: translateX(100vw) rotate(360deg);
	}
}
</style>