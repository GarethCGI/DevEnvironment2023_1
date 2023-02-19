<template>
	<div>
		<div class="spacer"></div>
		<ClientOnly>
			<slot />
		</ClientOnly>
		<Footer />
	</div>
</template>
<style>
.spacer {
	height: 5rem;
}
</style>