<template>
	<div>
		<NavBar />
		<ClientOnly>
			<slot />
		</ClientOnly>
		<Footer />
	</div>
</template>
<style>
@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css');
:root {
	--primary: #dc3545;
	--secondary: rgb(255, 255, 255);
	--text-primary: #000;
	--background: #f8f9fa;
}
body {
	background-color: var(--background);
}
</style>