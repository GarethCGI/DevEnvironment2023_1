<!-- Footer.vue -->
<template>
	<div class="footer">
		<div class="footer__links">

		</div>
		<ClientOnly>
			<ThemeChanger />
		</ClientOnly>
	</div>
</template>
<style scoped>
.footer {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 20px;
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	height: 60px;
}
@media screen and (max-width: 600px) {
	.footer {
		position: relative;
	}
}

.footer__links {
	display: flex;
}

.footer__links a {
	margin-right: 20px;
}

.footer__links a:last-child {
	margin-right: 0;
}

.footer__links a:hover {
	text-decoration: underline;
}
</style>