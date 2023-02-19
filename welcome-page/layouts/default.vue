<template>
	<div>
		<NavBar />
		<ClientOnly>
			<slot />
		</ClientOnly>
		<Footer />
	</div>
</template>